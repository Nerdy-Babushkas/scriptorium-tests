// tests/save.spec.js
const { test, expect } = require('../fixtures/auth.fixture');
const { SearchPage }   = require('../pages/SearchPage');
const { ShelfModal }   = require('../pages/ShelfModal');

test.describe('Save to Shelf', () => {

  test('should save a book to Favourites', async ({ authenticatedPage }) => {
    const searchPage = new SearchPage(authenticatedPage);
    const modal      = new ShelfModal(authenticatedPage);

    // 1. Search for a book
    await searchPage.goto('Harry Potter', 'books');
    await searchPage.waitForResults();

    // 2. Click Add to Library on the first card
    await searchPage.getAddButton(0).click();

    // 3. Modal should open
    await modal.waitForOpen();

    // 4. Confirm the modal title is visible (it shows the book name)
    await expect(modal.modalTitle).toBeVisible();
    console.log(`Saving: ${await modal.modalTitle.textContent()}`);

    // 5. Click Favourites
    await modal.saveToShelf('favourites');

    // 6. Toast should appear confirming the save
    await modal.waitForToast();
    await expect(modal.toastTitle).toHaveText('Saved!');
  });

  test('should save a movie to Watchlist', async ({ authenticatedPage }) => {
    const searchPage = new SearchPage(authenticatedPage);
    const modal      = new ShelfModal(authenticatedPage);

    await searchPage.goto('Inception', 'movies');
    await searchPage.waitForResults();

    await searchPage.getAddButton(0).click();
    await modal.waitForOpen();
    await expect(modal.modalTitle).toBeVisible();

    // For movies the wishlist button label becomes "Watchlist"
    await modal.saveToShelf('wishlist');
    await modal.waitForToast();
    await expect(modal.toastTitle).toHaveText('Saved!');
  });

  test('should save a music track to Favourites', async ({ authenticatedPage }) => {
    const searchPage = new SearchPage(authenticatedPage);
    const modal      = new ShelfModal(authenticatedPage);

    await searchPage.goto('Beatles', 'music');
    await searchPage.waitForResults();

    await searchPage.getAddButton(0).click();
    await modal.waitForOpen();
    await expect(modal.modalTitle).toBeVisible();

    await modal.saveToShelf('favourites');
    await modal.waitForToast();
    await expect(modal.toastTitle).toHaveText('Saved!');
  });

  test('should be able to cancel saving', async ({ authenticatedPage }) => {
    const searchPage = new SearchPage(authenticatedPage);
    const modal      = new ShelfModal(authenticatedPage);

    await searchPage.goto('Inception', 'movies');
    await searchPage.waitForResults();

    await searchPage.getAddButton(0).click();
    await modal.waitForOpen();

    // Cancel — modal should close, no toast
    await modal.cancel();
    await expect(modal.modal).not.toBeVisible();
  });

});