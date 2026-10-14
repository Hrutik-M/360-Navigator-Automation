import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

class CaseStudyAnalysisPage extends BasePage {
  // Navigation Menu
  private workManagementMenu: Locator;
  private gembaCraftProductivityMenu: Locator;
  private caseStudyAnalysisMenu: Locator;

  // Page Elements
  private pageTitle: Locator;
  private mainContent: Locator;
  private siteFilter: Locator;
  private siteFilterInput: Locator;
  private applyFilterButton: Locator;

  // Table Elements
  private dataTable: Locator;
  private tableRows: Locator;
  private tableColumns: Locator;

  // Chart Elements
  private donutChart: Locator;
  private barChart: Locator;
  private laborConversionChart: Locator;
  private delayAnalysisChart: Locator;
  private delayMinutesChart: Locator;

  // Tabs
  private taskAnalysisTab: Locator;
  private sankeyTab: Locator;

  // Buttons & Controls
  private toggleGraphButton: Locator;
  private resetButton: Locator;

  constructor(page: Page) {
    super(page);

    // Navigation Menu
    this.workManagementMenu = page.locator('a').filter({ hasText: /Work Management/ });
    this.gembaCraftProductivityMenu = page.locator('a').filter({ hasText: /GEMBA Craft Productivity/ });
    this.caseStudyAnalysisMenu = page.locator('a').filter({ hasText: 'Case Study Analysis' }).first();

    // Page Elements
    this.pageTitle = page.locator('span').filter({ hasText: 'Case Study Analysis' }).first();
    this.mainContent = page.locator('app-wom-dd-wm-dashboard');
    this.siteFilter = page.locator('app-kendo-multiselect:visible').first();
    this.siteFilterInput = this.siteFilter.locator('input.k-input-inner[role="combobox"]').first();
    this.applyFilterButton = page.getByRole('button', { name: /Apply Filter/i });

    // Table Elements
    this.dataTable = page.locator('[role="table"], table').first();
    this.tableRows = this.dataTable.locator('[role="row"], tbody tr');
    this.tableColumns = page.locator('[role="columnheader"], th');

    // Chart Elements
    this.donutChart = page.locator('[data-testid="donut-chart"], canvas').first();
    this.barChart = page.locator('[data-testid="bar-chart"], canvas').nth(1);
    this.laborConversionChart = page.locator('[data-testid="labor-chart"], canvas').nth(2);
    this.delayAnalysisChart = page.locator('[data-testid="delay-chart"], canvas').nth(3);
    this.delayMinutesChart = page.locator('[data-testid="delay-minutes-chart"], canvas').nth(4);

    // Tabs
    this.taskAnalysisTab = page.getByRole('tab', { name: /Task Analysis/i });
    this.sankeyTab = page.getByRole('tab', { name: /Sankey/i });

    // Buttons & Controls
    this.toggleGraphButton = page.getByRole('button', { name: /Toggle Graph/i });
    this.resetButton = page.getByRole('button', { name: /Reset/i });
  }

  // Navigation Methods
  async navigateToCaseStudyAnalysis(): Promise<void> {
    await this.click(this.workManagementMenu);
    await this.click(this.gembaCraftProductivityMenu);
    await this.click(this.caseStudyAnalysisMenu);
    await this.page.waitForLoadState('networkidle');
  }

  // Page Verification Methods
  async verifyPageLoaded(): Promise<void> {
    await expect(this.mainContent).toBeVisible();
  }

  async verifyPageTitle(expectedTitle: string): Promise<void> {
    await expect(this.pageTitle).toContainText(expectedTitle);
  }

  async verifyBrowserTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(new RegExp(expectedTitle, 'i'));
  }

  async verifyPageUrl(expectedPath: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(expectedPath, 'i'));
  }

  async getPageLoadTime(): Promise<number> {
    const startTime = Date.now();
    await this.verifyPageLoaded();
    return Date.now() - startTime;
  }

  // Menu Verification Methods
  async verifyMenuItemHighlighted(menuItemText: string): Promise<boolean> {
    const menuItem = this.page.locator('li:visible').filter({ hasText: menuItemText }).first();
    return await menuItem.evaluate((element) =>
      element.classList.contains('active') ||
      element.classList.contains('selected') ||
      element.getAttribute('aria-current') === 'page' ||
      Array.from(element.querySelectorAll('*')).some((child) =>
        child.classList.contains('active') ||
        child.classList.contains('selected') ||
        child.getAttribute('aria-current') === 'page' ||
        (child.classList.contains('bg-sky-700') && child.classList.contains('text-white'))
      )
    );
  }

  async verifyMenuItemExists(menuItemText: string): Promise<boolean> {
    const menuItem = this.page.locator('li:visible').filter({ hasText: menuItemText }).first();
    return await menuItem.isVisible();
  }

  async verifyMenuItemClickable(menuItemText: string): Promise<boolean> {
    const menuItem = this.page.locator('li:visible').filter({ hasText: menuItemText }).first();
    return await menuItem.isEnabled();
  }

  // Filter Methods
  private getVisibleSiteOption(siteName: string): Locator {
    return this.page
      .locator('[role="option"]:visible, .k-list-item:visible')
      .filter({ hasText: new RegExp(`^\\s*${siteName}\\s*$`, 'i') })
      .first();
  }

  async verifySiteOptions(siteNames: string[]): Promise<void> {
    await this.click(this.siteFilterInput);
    await expect(this.siteFilterInput).toHaveAttribute('aria-expanded', 'true');

    const availableSites = await this.page
      .locator('[role="option"]:visible, .k-list-item:visible')
      .allTextContents();
    const normalizedAvailableSites = availableSites
      .map((site) => site.trim().toUpperCase())
      .filter(Boolean);
    console.log('Available site options:', normalizedAvailableSites);

    for (const siteName of siteNames) {
      const normalizedSiteName = siteName.trim().toUpperCase();
      const isMatched = normalizedAvailableSites.includes(normalizedSiteName);
      console.log(`Site option "${siteName}": matched = ${isMatched}`);
      expect(isMatched).toBeTruthy();
    }

    await this.page.keyboard.press('Escape');
  }

  async selectSite(siteName: string): Promise<void> {
    await this.click(this.siteFilterInput);
    await expect(this.siteFilterInput).toHaveAttribute('aria-expanded', 'true');
    const option = this.getVisibleSiteOption(siteName);
    await this.click(option);
  }

  async verifySiteSelected(siteName: string): Promise<void> {
    await expect(this.siteFilter).toContainText(siteName);
  }

  async verifyApplyFilterEnabled(): Promise<void> {
    await expect(this.applyFilterButton).toBeVisible();
    await expect(this.applyFilterButton).toBeEnabled();
  }

  async applyFilter(): Promise<void> {
    await this.click(this.applyFilterButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectSiteAndApplyFilter(siteName: string): Promise<void> {
    await this.selectSite(siteName);
    await this.applyFilter();
  }

  async getTableText(): Promise<string> {
    return await this.dataTable.textContent() || '';
  }

  // Table Methods
  async verifyTableVisible(): Promise<void> {
    await expect(this.dataTable).toBeVisible();
  }

  async getTableRowCount(): Promise<number> {
    return await this.tableRows.count();
  }

  async getTableColumnCount(): Promise<number> {
    return await this.tableColumns.count();
  }

  async verifyColumnExists(columnName: string): Promise<boolean> {
    const column = this.page.locator('[role="columnheader"], th').filter({ hasText: new RegExp(columnName, 'i') });
    return await column.isVisible();
  }

  async getTableCellValue(rowIndex: number, columnIndex: number): Promise<string> {
    const cell = this.dataTable.locator('[role="row"], tbody tr').nth(rowIndex).locator('[role="cell"], td').nth(columnIndex);
    return await cell.textContent() || '';
  }

  async sortByColumn(columnName: string): Promise<void> {
    const columnHeader = this.page.locator('[role="columnheader"], th').filter({ hasText: new RegExp(columnName, 'i') });
    await this.click(columnHeader);
  }

  // Chart Methods
  async verifyDonutChartVisible(): Promise<void> {
    await expect(this.donutChart).toBeVisible();
  }

  async verifyBarChartVisible(): Promise<void> {
    await expect(this.barChart).toBeVisible();
  }

  async verifyLaborConversionChartVisible(): Promise<void> {
    await expect(this.laborConversionChart).toBeVisible();
  }

  async verifyDelayAnalysisChartVisible(): Promise<void> {
    await expect(this.delayAnalysisChart).toBeVisible();
  }

  async verifyDelayMinutesChartVisible(): Promise<void> {
    await expect(this.delayMinutesChart).toBeVisible();
  }

  async getChartValue(chartType: string): Promise<string> {
    let chartLocator: Locator;
    
    switch(chartType.toLowerCase()) {
      case 'donut':
        chartLocator = this.donutChart;
        break;
      case 'bar':
        chartLocator = this.barChart;
        break;
      default:
        chartLocator = this.donutChart;
    }

    const value = chartLocator.locator('text, .chart-value').first();
    return await value.textContent() || '';
  }

  // Tab Methods
  async clickTaskAnalysisTab(): Promise<void> {
    await this.click(this.taskAnalysisTab);
  }

  async clickSankeyTab(): Promise<void> {
    await this.click(this.sankeyTab);
  }

  async verifyTaskAnalysisTabActive(): Promise<boolean> {
    return await this.taskAnalysisTab.evaluate((el) => {
      return el.getAttribute('aria-selected') === 'true' || el.classList.contains('active');
    });
  }

  // Button Methods
  async clickToggleGraph(): Promise<void> {
    await this.click(this.toggleGraphButton);
  }

  async clickReset(): Promise<void> {
    await this.click(this.resetButton);
  }

  // Utility Methods
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await expect(this.mainContent).toBeVisible();
  }

  async verifyPageResponsive(width: number): Promise<void> {
    await this.page.setViewportSize({ width, height: 768 });
    await expect(this.mainContent).toBeVisible();
  }

  async verifyElementAccessible(locator: Locator): Promise<void> {
    await locator.focus();
    await expect(locator).toBeFocused();
  }
}

export { CaseStudyAnalysisPage };
