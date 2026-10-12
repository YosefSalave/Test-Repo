import { Page, Locator, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import environment from 'dotenv';

environment.config();

export class Base {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private toLocator(selectorOrLocator: string | Locator) {
    return typeof selectorOrLocator === 'string'
      ? this.page.locator(selectorOrLocator)
      : selectorOrLocator;
  }

  async goto(relativePath = '') {
    const base = process.env.BASE_URL || '';
    const url = base.endsWith('/') || relativePath.startsWith('/') ? `${base}${relativePath}` : `${base}/${relativePath}`;
    await this.page.goto(url);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async click(selectorOrLocator: string | Locator, options?: { timeout?: number }) {
    const locator = this.toLocator(selectorOrLocator);
    await locator.click({ timeout: options?.timeout });
  }

  async fill(selectorOrLocator: string | Locator, text: string) {
    const locator = this.toLocator(selectorOrLocator);
    await locator.fill(text);
  }

  async type(selectorOrLocator: string | Locator, text: string, options?: { delay?: number }) {
    const locator = this.toLocator(selectorOrLocator);
    await locator.type(text, options);
  }

  async getText(selectorOrLocator: string | Locator) {
    const locator = this.toLocator(selectorOrLocator);
    return await locator.textContent();
  }

  async isVisible(selectorOrLocator: string | Locator) {
    const locator = this.toLocator(selectorOrLocator);
    return await locator.isVisible();
  }

  async waitForVisible(selectorOrLocator: string | Locator, timeout = 5000) {
    const locator = this.toLocator(selectorOrLocator);
    await locator.waitFor({ state: 'visible', timeout });
  }

  async waitForHidden(selectorOrLocator: string | Locator, timeout = 5000) {
    const locator = this.toLocator(selectorOrLocator);
    await locator.waitFor({ state: 'hidden', timeout });
  }

  async waitForNavigation(options?: Parameters<Page['waitForNavigation']>[0]) {
    await this.page.waitForNavigation(options);
  }

  async selectOption(selectorOrLocator: string | Locator, value: string) {
    const locator = this.toLocator(selectorOrLocator);
    await locator.selectOption(value);
  }

  async hover(selectorOrLocator: string | Locator) {
    const locator = this.toLocator(selectorOrLocator);
    await locator.hover();
  }

  async screenshot(name = 'screenshot') {
    const dir = path.resolve(process.cwd(), 'screenshots');
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (e) {
      // ignore
    }
    const file = path.join(dir, `${name}.png`);
    await this.page.screenshot({ path: file, fullPage: true });
    return file;
  }

  async expectVisible(selectorOrLocator: string | Locator) {
    const locator = this.toLocator(selectorOrLocator);
    await expect(locator).toBeVisible();
  }
}
