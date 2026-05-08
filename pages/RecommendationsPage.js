// pages/RecommendationsPage.js

class RecommendationsPage {
  constructor(page) {
    this.page = page;

    // Tab buttons
    this.tabMovies = page.locator('.tab-btn[data-tab="movies"]');
    this.tabMusic  = page.locator('.tab-btn[data-tab="music"]');
    this.tabBooks  = page.locator('.tab-btn[data-tab="books"]');

    // New Picks button
    this.newPicksBtn = page.locator('button.btn-refresh');

    // Grids — where cards render
    this.gridMovies = page.locator('#grid-movies');
    this.gridMusic  = page.locator('#grid-music');
    this.gridBooks  = page.locator('#grid-books');

    // Loading states
    this.loadingMovies = page.locator('#loading-movies');
    this.loadingMusic  = page.locator('#loading-music');
    this.loadingBooks  = page.locator('#loading-books');

    // Empty states
    this.emptyMovies = page.locator('#empty-movies');
    this.emptyMusic  = page.locator('#empty-music');
    this.emptyBooks  = page.locator('#empty-books');

    // AI disabled banner — shown if AI is turned off in account settings
    this.aiDisabledBanner = page.locator('#ai-disabled-banner');
  }

  async goto() {
    await this.page.goto('/ai-recommendations');
  }

  async switchTab(type) {
    if (type === 'movies')     await this.tabMovies.click();
    else if (type === 'music') await this.tabMusic.click();
    else if (type === 'books') await this.tabBooks.click();
  }

  // Wait for a tab to finish loading — either cards appear or empty state shows
  async waitForTab(type) {
    const loading = this.page.locator(`#loading-${type}`);
    const grid    = this.page.locator(`#grid-${type}`);
    const empty   = this.page.locator(`#empty-${type}`);

    // Wait for loading spinner to disappear first
    await loading.waitFor({ state: 'hidden', timeout: 30000 });

    // Then either cards or empty state should be visible
    await Promise.race([
      grid.locator('.rec-card').first().waitFor({ timeout: 30000 }),
      empty.waitFor({ state: 'visible', timeout: 30000 }),
    ]);
  }

  getCards(type) {
    return this.page.locator(`#grid-${type} .rec-card`);
  }

  async clickNewPicks() {
    await this.newPicksBtn.click();
  }

  async isAiEnabled() {
    // Returns false if the disabled banner is visible
    try {
      await this.aiDisabledBanner.waitFor({ state: 'visible', timeout: 5000 });
      return false;
    } catch {
      return true;
    }
  }
}

module.exports = { RecommendationsPage };