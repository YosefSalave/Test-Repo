import { expect, Page } from '@playwright/test';
import { Base } from './Base';

export class Products extends Base {
  constructor(page: Page) {
    super(page);
  }

  async verifyProductsPage() {
    await expect(this.page.locator('[class=app_logo]')).toHaveText('Swag Labs');
    await expect(this.page.getByText('Products')).toHaveText('Products');
  }
}

