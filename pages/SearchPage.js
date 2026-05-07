// pages/SearchPage.js

class SearchPage {
  constructor(page) {
    this.page = page;

    this.tabMovies   = page.locator('#tab-movies');
    this.tabBooks    = page.locator('#tab-books');
    this.tabMusic    = page.locator('#tab-music');
    this.searchInput = page.locator('input[name="title"]');
    this.resultsGrid = page.locator('#resultsGrid');
    this.loadingState = page.locator('#loadingState');
    this.emptyState   = page.locator('#emptyState');
  }

  // Navigate to search — we set localStorage BEFORE navigating
  // so the app reads the correct type on load
  async goto(query, type = 'movies') {
    // First go to any authenticated page so localStorage is accessible
    await this.page.goto('/room');

    // Set the lastSearchType in localStorage before the search page loads
    // This prevents the app from defaulting to whatever was last used
    await this.page.evaluate((t) => {
      localStorage.setItem('lastSearchType', t);
    }, type);

    // Now navigate to the search page — it will read the correct type
    await this.page.goto(`/search?q=${encodeURIComponent(query)}&type=${type}`);
  }

  async switchTab(type) {
    if (type === 'movies')     await this.tabMovies.click();
    else if (type === 'books') await this.tabBooks.click();
    else if (type === 'music') await this.tabMusic.click();
  }

  async waitForResults() {
    await this.loadingState.waitFor({ state: 'hidden', timeout: 20000 });
    await this.resultsGrid.locator('.sr-card').first().waitFor({ timeout: 20000 });
  }

  getCards() {
    return this.resultsGrid.locator('.sr-card');
  }

  getAddButton(cardIndex = 0) {
    return this.getCards().nth(cardIndex).locator('.add-trigger-btn');
  }
}

module.exports = { SearchPage };