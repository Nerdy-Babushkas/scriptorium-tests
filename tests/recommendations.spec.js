// tests/recommendations.spec.js
const { test, expect }           = require('../fixtures/auth.fixture');
const { RecommendationsPage }    = require('../pages/RecommendationsPage');

test.describe('AI Recommendations', () => {

  test('should load the recommendations page', async ({ authenticatedPage }) => {
    const recsPage = new RecommendationsPage(authenticatedPage);

    await recsPage.goto();

    // Page should have the three tabs visible
    await expect(recsPage.tabMovies).toBeVisible();
    await expect(recsPage.tabMusic).toBeVisible();
    await expect(recsPage.tabBooks).toBeVisible();
    await expect(recsPage.newPicksBtn).toBeVisible();
  });

  test('should load movie recommendations or show empty state', async ({ authenticatedPage }) => {
    const recsPage = new RecommendationsPage(authenticatedPage);

    await recsPage.goto();

    // Check if AI is even enabled for this account
    const aiEnabled = await recsPage.isAiEnabled();
    if (!aiEnabled) {
      console.log('AI is disabled for this account — skipping rec checks');
      return;
    }

    // Wait for movies tab to finish loading
    await recsPage.waitForTab('movies');

    // Either cards loaded OR empty state is showing — both are valid
    const cardCount = await recsPage.getCards('movies').count();
    const emptyVisible = await recsPage.emptyMovies.isVisible();

    console.log(`Movie cards: ${cardCount}, Empty state: ${emptyVisible}`);
    expect(cardCount > 0 || emptyVisible).toBe(true);
  });

  test('should switch to music tab and load', async ({ authenticatedPage }) => {
    const recsPage = new RecommendationsPage(authenticatedPage);

    await recsPage.goto();

    const aiEnabled = await recsPage.isAiEnabled();
    if (!aiEnabled) return;

    // Movies load on page init — switch to music
    await recsPage.switchTab('music');
    await recsPage.waitForTab('music');

    const cardCount   = await recsPage.getCards('music').count();
    const emptyVisible = await recsPage.emptyMusic.isVisible();

    console.log(`Music cards: ${cardCount}, Empty state: ${emptyVisible}`);
    expect(cardCount > 0 || emptyVisible).toBe(true);
  });

  test('should switch to books tab and load', async ({ authenticatedPage }) => {
    const recsPage = new RecommendationsPage(authenticatedPage);

    await recsPage.goto();

    const aiEnabled = await recsPage.isAiEnabled();
    if (!aiEnabled) return;

    await recsPage.switchTab('books');
    await recsPage.waitForTab('books');

    const cardCount    = await recsPage.getCards('books').count();
    const emptyVisible = await recsPage.emptyBooks.isVisible();

    console.log(`Book cards: ${cardCount}, Empty state: ${emptyVisible}`);
    expect(cardCount > 0 || emptyVisible).toBe(true);
  });

  test('New Picks should refresh movie recommendations', async ({ authenticatedPage }) => {
    const recsPage = new RecommendationsPage(authenticatedPage);

    await recsPage.goto();

    const aiEnabled = await recsPage.isAiEnabled();
    if (!aiEnabled) return;

    // Wait for initial load
    await recsPage.waitForTab('movies');

    // Click New Picks
    await recsPage.clickNewPicks();

    // Grid should clear and reload
    await recsPage.waitForTab('movies');

    const cardCount    = await recsPage.getCards('movies').count();
    const emptyVisible = await recsPage.emptyMovies.isVisible();

    expect(cardCount > 0 || emptyVisible).toBe(true);
  });

});