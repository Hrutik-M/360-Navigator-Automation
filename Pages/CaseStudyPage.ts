
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

class CaseStudyPage extends BasePage {
    // Navigation
    private workManagementMenu: Locator;
    private gembaCraftProductivityMenu: Locator;
    private scheduledEventsMenu: Locator;

    // Buttons
    private addCaseStudyButton: Locator;
    private saveButton: Locator;

    // Form Fields
    private workOrderId: Locator;
    private estimatedMinutes: Locator;
    private description: Locator;

    // Job Selection
    private jobDropdown: Locator;
    private quantity: Locator;

    // Success Message
    private successMessage: Locator;
    private duplicateMessage: Locator;

    constructor(page: Page) {
        super(page);

        // Navigation
        this.workManagementMenu = page
            .locator('a')
            .filter({ hasText: 'Work Management' });

        this.gembaCraftProductivityMenu = page
            .locator('a')
            .filter({ hasText: 'GEMBA Craft Productivity' });

        this.scheduledEventsMenu = page
            .locator('a')
            .filter({ hasText: 'Scheduled Events' });

        // Buttons
        this.addCaseStudyButton = page.getByRole('button', {
            name: ' Add Case Study'
        });

        this.saveButton = page.getByRole('button', {
            name: /Save/i
        });

        // Form Fields
        this.workOrderId = page.getByRole('textbox', {
            name: 'Enter work order id'
        });

        this.estimatedMinutes = page.getByRole('spinbutton', {
            name: 'Enter estimated minutes'
        });

        this.description = page.getByRole('textbox', {
            name: 'Enter work order description'
        });

        // Job Selection
        this.jobDropdown = page.getByText('Please Select', {
            exact: true
        });

        this.quantity = page.getByRole('spinbutton', {
            name: 'Quantity'
        });

        // Success Message
        this.successMessage = page.locator('#swal2-title');
        this.duplicateMessage = page.locator('#swal2-html-container');
    }

    async navigateToScheduledEvents(): Promise<void> {
        await this.click(this.workManagementMenu);
        await this.click(this.gembaCraftProductivityMenu);
        await this.click(this.scheduledEventsMenu);
    }

    async clickAddCaseStudy(): Promise<void> {
        await this.click(this.addCaseStudyButton);
    }

    async enterWorkOrderId(workOrderId: string): Promise<void> {
        await this.fill(this.workOrderId, workOrderId);
    }

    async enterEstimatedMinutes(minutes: number): Promise<void> {
        await this.fill(this.estimatedMinutes, String(minutes));
    }

    async enterDescription(description: string): Promise<void> {
        await this.fill(this.description, description);
    }

    async selectJob(
        jobName: string,
        quantity: number
    ): Promise<void> {

        await this.click(this.jobDropdown);

        const jobOption: Locator = this.page.getByRole('option', {
            name: jobName,
            exact: true
        });

        await this.click(jobOption);

        const selectedCraft = this.page.getByRole('listitem').filter({
            hasText: jobName
        });

        await this.fill(
            selectedCraft.getByRole('spinbutton', {
                name: 'Quantity'
            }),
            String(quantity)
        );
    }

    async clickSave(): Promise<void> {
        await this.click(this.saveButton);
    }

    async verifyCaseStudySaved(): Promise<void> {
        await expect(this.successMessage)
            .toContainText('Saved successfully!');
    }

    async verifyDuplicateCaseStudy(): Promise<void> {
        await expect(this.duplicateMessage)
            .toContainText('Record already exists. Please add another record.');
    }

    async addCaseStudy(
        workOrderId: string,
        estimatedMinutes: number,
        description: string,
        jobName: string,
        quantity: number
    ): Promise<void> {

        await this.navigateToScheduledEvents();

        await this.clickAddCaseStudy();

        await this.enterWorkOrderId(workOrderId);

        await this.enterEstimatedMinutes(
            estimatedMinutes
        );

        await this.enterDescription(
            description
        );

        await this.selectJob(
            jobName,
            quantity
            
        );
      
        await this.clickSave();

        await this.verifyCaseStudySaved();
    }
}

export { CaseStudyPage };

