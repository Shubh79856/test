import { test, expect } from "../fixtures/fixture";
//Load the json data
const configData = require("../config.json");
const appConstant = configData.appConstants;
test.describe("Pickup Hours", { tag: "@e2e" }, async () => {
  //Preconditions
  test.beforeEach(
    "It can navigate to the 'Welcome Page' and accept the 'Terms'",
    async ({ welcomePage }) => {
      await welcomePage.launchAndAcceptTerms();
    }
  );

  test("C7519: Pickup hours are shown and modal can be closed", async ({
    welcomePage,
    page,
    homePage,
  }) => {
    //Click on pickup hours
    await homePage.clickPickupHours();
    test.step("It can open Pickup Hours modal ", async () => {
      await expect(
        (
          await (await homePage.getLocator_pickupHoursModal()).innerText()
        ).trim()
      ).toEqual(appConstant.pickupHoursModal);
    });

    test.step("It can show the times of Pickup for Monday - Sunday.", async () => {
      for (const day of appConstant.days) {
        const dayTag = page.locator(
          `#pickup-business-hour-details p:has-text("${day}")`
        );
        //Validate the day value exist
        await dayTag.waitFor({ state: "visible", timeout: 7000 });
        await expect(dayTag).toBeVisible();

        // Extract the full text (e.g., "Monday: 10 AM - 7 PM")
        const fullText = await dayTag.innerText();

        // Remove the day part to get the time
        const timeText = fullText.replace(day, "").trim();

        // Validate that time is not empty
        await expect(timeText.length).toBeGreaterThan(7);
      }
    });

    test.step("It can click any where on the page & validate Pickup Hours modal is closed", async () => {
      await (await homePage.getLocator_pickupHoursModal()).click();
      await expect(
        await homePage.getLocator_pickupHoursModal()
      ).not.toBeVisible();
    });
  });
});
