// pages/ShelfModal.js

class ShelfModal {
  constructor(page) {
    this.page = page;

    // The modal container
    this.modal = page.locator('#shelfModal');

    // The title displayed inside the modal
    this.modalTitle = page.locator('#modalBookTitle');

    // The shelf buttons
    this.btnFavourites = page.locator('#btn-favourites');
    this.btnWishlist   = page.locator('#btn-wishlist');
    this.btnSpecial    = page.locator('#btn-reading'); // reading / watching / listening
    this.btnFinished   = page.locator('#btn-finished');
    this.btnCancel     = page.locator('#closeModal');

    // Toast notification that appears after saving
    this.toast         = page.locator('#toast');
    this.toastTitle    = page.locator('#toastTitle');
    this.toastMessage  = page.locator('#toastMessage');
  }

  // Wait for modal to be visible after clicking Add to Library
  async waitForOpen() {
    await this.modal.waitFor({ state: 'visible', timeout: 5000 });
  }

  // Save to a specific shelf by name
  async saveToShelf(shelf) {
    switch (shelf) {
      case 'favourites': await this.btnFavourites.click(); break;
      case 'wishlist':   await this.btnWishlist.click();   break;
      case 'special':    await this.btnSpecial.click();    break;
      case 'finished':   await this.btnFinished.click();   break;
    }
  }

  // Wait for the success toast to appear after saving
  async waitForToast() {
    await this.toast.waitFor({ state: 'visible', timeout: 10000 });
  }

  async cancel() {
    await this.btnCancel.click();
  }
}

module.exports = { ShelfModal };