import { test, expect } from "../fixtures/fixture";

//Load the json data
const configData = require("../config.json");
const productName: string = configData.productInfo.itemName;
test.describe("Search", { tag: "@e2e" }, async () => {
  test.beforeEach(
    "It can navigate to the 'Welcome Page' and accept the 'Terms'",
    async ({ welcomePage }) => {
      await welcomePage.launchAndAcceptTerms();
    }
  );

  test("C7520: Search becomes active", async ({ homePage }) => {
    test.info().annotations.push({
      type: "Description",
      description:
        "Verify that search becomes active after entering 3 characters",
    });

    await test.step("It can click in the Search bar & validate the Cursor is visible and the Search Bar icon is inactive", async () => {
      //Click inside the Search Bar
      await homePage.clickSearchInputBox();

      //Validating if the cursor is active on click - Search Input Box
      await expect(await homePage.getLocator_cursorActive(), {
        message: "Cursor is visible ",
      }).toBeVisible();

      //Validating if the search icon is inactive/disabled - Search Input Box
      await expect(await homePage.getLocator_stateSearchIcon(), {
        message: "Search Bar icon is inactive.",
      }).toBeDisabled();
    });

    await test.step("It can enter two characters & validate Search bar icon is inactive", async () => {
      await homePage.enterTwoChar_SearchItemBox(configData.productInfo.twoChar);

      //Validating if the search icon is disabled after entering two characters- Search Input Box
      await expect(await homePage.getLocator_stateSearchIcon(), {
        message: "Search Bar icon is inactive.",
      }).toBeDisabled();
    });

    await test.step("It can add an additional character & validate Search Bar icon becomes active.", async () => {
      //Enter one more character
      await homePage.enterSingleChar_SearchItemBox(
        configData.productInfo.singleChar
      );

      //Validating if the search icon is enabled - Search Input Box
      await expect(await homePage.getLocator_stateSearchIcon(), {
        message: "Search Bar icon becomes active.",
      }).toBeEnabled();
    });
  });

  test("C7521: Search displays valid results", async ({
    homePage,
    productListingPage,
  }) => {
    test.info().annotations.push({
      type: "Description",
      description:
        "Verify that searching for a valid product will display matches that are relevant to the search.",
    });

    await test.step("It can click in the Search bar & validate the Cursor is visible and the Search Bar icon is inactive", async () => {
      //Click inside the Search Bar
      await homePage.clickSearchInputBox();

      //Validating if the cursor is active on click - Search Input Box
      await expect(await homePage.getLocator_cursorActive(), {
        message: "Cursor is visible ",
      }).toBeVisible();

      //Validating if the search icon is inactive/disabled - Search Input Box
      await expect(await homePage.getLocator_stateSearchIcon(), {
        message: "Search Bar icon is inactive.",
      }).toBeDisabled();
    });

    // //Click inside the Search Bar
    // await homePage.clickSearchInputBox();

    // //Validating if the cursor is active on click - Search Input Box
    // await expect(await homePage.getLocator_cursorActive()).toBeVisible();

    // //Validating if the search icon is disabled - Search Input Box
    // await expect(await homePage.getLocator_stateSearchIcon()).toBeDisabled();

    await test.step("It can enter a search term for that will generate results & validate Search Bar icon becomes active.", async () => {
      //Search the valid product name
      await homePage.enterProductNameToSearchBox(productName);

      //Validating if the search icon is enabled - Search Input Box
      await expect(await homePage.getLocator_stateSearchIcon(), {
        message: "Search Bar icon becomes active.",
      }).toBeEnabled();
    });

    await test.step("It can click on the Search Bar icon & validate results are displayed that match the term entered", async () => {
      //clicking on the search icon - Search Input Box
      await homePage.click_SearchIcon_SearchInputBox();

      // Validating if the results matches the enetered product name
      await expect(
        await productListingPage.getLocator_addToCartButtonForDesiredProduct(
          productName
        )
      ).toBeVisible();
    });
  });

  //Test Case 3
  test("C7522: No search results", async ({ homePage, productListingPage }) => {
    test.info().annotations.push({
      type: "Description",
      description:
        "Verify that searching for an invalid product will display a message that search returned no results",
    });
    await test.step("It can click in the Search bar & validate the Cursor is visible and the Search Bar icon is inactive", async () => {
      //Click inside the Search Bar
      await homePage.clickSearchInputBox();

      //Validating if the cursor is active on click - Search Input Box
      await expect(await homePage.getLocator_cursorActive(), {
        message: "Cursor is visible ",
      }).toBeVisible();

      //Validating if the search icon is inactive/disabled - Search Input Box
      await expect(await homePage.getLocator_stateSearchIcon(), {
        message: "Search Bar icon is inactive.",
      }).toBeDisabled();
    });
    // await homePage.clickSearchInputBox();

    // //Validating if the cursor is active on click - Search Input Box
    // await expect(await homePage.getLocator_cursorActive()).toBeVisible();

    // //Validating if the search icon is disabled - Search Input Box
    // await expect(await homePage.getLocator_stateSearchIcon()).toBeDisabled();

    await test.step("It can enter a term that or string or a string of over 3 characters that will not generate results & validate Search Bar icon becomes active", async () => {
      //Enter an invalid item name/string that will not generate the results
      await homePage.enterProductNameToSearchBox(
        configData.productInfo.invalidItemName
      );
      //Validating if the search icon is enabled - Search Input Box
      await expect(await homePage.getLocator_stateSearchIcon(), {
        message: "Search Bar icon becomes active",
      }).toBeEnabled();
    });

    await test.step("It can click on the Search Bar icon & validate search returned no results", async () => {
      await homePage.click_SearchIcon_SearchInputBox();

      //     //Validating that it should not return the result
      //     await expect(
      //       await productListingPage.getLocator_noProductFoundText()
      //     ).toBeVisible({ timeout: 15000 });
      //   });
      // });
      //Validating that it should not return the result
      await expect(
        await await productListingPage.getLocator_noProductFoundText()
      ).toContainText(configData.appConstants.noSearchResult);
    });
  });

  //Test Case 4
  test("C7523: Search makes suggestions", async ({
    homePage,
    productListingPage,
  }) => {
    test.info().annotations.push({
      type: "Description",
      description:
        "Verify that once you begin typing the name of a specific item that search suggestions are made",
    });

    await test.step("It can click in the Search bar & validate the Cursor is visible and the Search Bar icon is inactive", async () => {
      //Click inside the Search Bar
      await homePage.clickSearchInputBox();

      //Validating if the cursor is active on click - Search Input Box
      await expect(await homePage.getLocator_cursorActive(), {
        message: "Cursor is visible ",
      }).toBeVisible();

      //Validating if the search icon is inactive/disabled - Search Input Box
      await expect(await homePage.getLocator_stateSearchIcon(), {
        message: "Search Bar icon is inactive.",
      }).toBeDisabled();
    });
    // await homePage.clickSearchInputBox();

    // //Validating if the cursor is active on click - Search Input Box
    // await expect(await homePage.getLocator_cursorActive()).toBeVisible();

    // //Validating if the search icon is disabled - Search Input Box
    // await expect(await homePage.getLocator_stateSearchIcon()).toBeDisabled();

    await test.step("It can begin typing the name of the product & validate search suggestion appears under the search bar", async () => {
      await homePage.autoSuggest_searchProduct(
        await configData.productInfo.autoSuggestItem
      );
      // await page.waitForTimeout(1000);
      //const list = await homePage.getLocator_autoSuggestionsList();
      await expect(
        await (await homePage.getLocator_autoSuggestionsList()).first()
      ).toBeVisible();
      //const text = await list.allTextContents();
    });
    await test.step("It can click on the search suggestion & validate results are displayed that match the search suggestion", async () => {
      const list = await homePage.getLocator_autoSuggestionsList();
      // const list = await page.getByRole("listbox").locator("li");

      // const text = await list.allTextContents();
      // text.forEach((text, index) => {
      //   console.log("Line 123" + `${index + 1}. ${text}`);
      // });
      // await expect(list.first()).toBeVisible();
      //Get Text of the first suggestion from the list
      // const firstSugText = await list.first().innerText();
      // const lastSugText = await list.last().innerText();
      const firstSuggestion = await list.first().innerText();

      //  console.log("Line 131" + (await list.last().innerText()));
      await list.first().click();
      const productGridList = await productListingPage.getLocator_productGrid();
      await expect((await productGridList.innerText()).toLowerCase()).toContain(
        firstSuggestion.toLowerCase()
      );
    });
  });
  test("C7584: Search by SKU", async ({ homePage, loginPage, page }) => {
    await homePage.clickSearchInputBox();

    //Validating if the cursor is active on click - Search Input Box
    await expect(await homePage.getLocator_cursorActive()).toBeVisible();

    //Validating if the search icon is disabled - Search Input Box
    await expect(await homePage.getLocator_stateSearchIcon()).toBeDisabled();

    await homePage.searchProduct(configData.productInfo.sku);

    const productN = await page.locator(".product-item-link").innerText();
    await expect(productN).toEqual(await configData.productInfo.skuItemName);

    const toolbarCount = await page.locator(".toolbar-number").innerText();
    await expect(Number(toolbarCount)).toEqual(1);
  });
});
