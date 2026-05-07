// tests/search.spec.js

// Notice — we import from our FIXTURE, not from @playwright/test
// This gives us 'authenticatedPage' which is already logged in
const { test, expect } = require('../fixtures/auth.fixture');
const { SearchPage }   = require('../pages/SearchPage');

test.describe('Search', () => {

  test('should show movie results for a valid query', async ({ authenticatedPage }) => {
    const searchPage = new SearchPage(authenticatedPage);

    // Go directly to search with a query
    await searchPage.goto('Inception', 'movies');

    // Wait for results to load
    await searchPage.waitForResults();

    // Assert at least one card is visible
    const cards = searchPage.getCards();
    await expect(cards.first()).toBeVisible();
    console.log(`Found ${await cards.count()} movie results`);
  });

  test('should show book results after switching to books tab', async ({ authenticatedPage }) => {
    const searchPage = new SearchPage(authenticatedPage);

    await searchPage.goto('Harry Potter', 'books');
    await searchPage.waitForResults();

    const cards = searchPage.getCards();
    await expect(cards.first()).toBeVisible();
    console.log(`Found ${await cards.count()} book results`);
  });

  test('should show music results after switching to music tab', async ({ authenticatedPage }) => {
    const searchPage = new SearchPage(authenticatedPage);

    await searchPage.goto('Beatles', 'music');
    await searchPage.waitForResults();

    const cards = searchPage.getCards();
    await expect(cards.first()).toBeVisible();
    console.log(`Found ${await cards.count()} music results`);
  });

});