import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import dotenv from 'dotenv';
import invalidLoginData from '../test-data/invalidLoginData.json';

dotenv.config();

test.describe('Invalid Login Tests', () => {
  const dummyPassword = 'test123'; // Dummy password for invalid tests

  test('Should show error with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();
    const testCase = invalidLoginData.emptyUsername;
    
    await loginPage.login(
      testCase.accessCode,
      testCase.username,
      dummyPassword
    );

    // Verify error is shown
    await loginPage.verifyErrorMessageContains(testCase.expectedError);
  });

  test('Should show error with empty access code', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const password = process.env.PASSWORD;

    if (!password) {
      throw new Error('PASSWORD environment variable is not set');
    }

    await loginPage.openLoginPage();
    const testCase = invalidLoginData.emptyAccessCode;
    
    await loginPage.login(
      testCase.accessCode,
      testCase.username,
      password
    );

    await loginPage.verifyErrorMessageContains(testCase.expectedError);
  });

  test('Should show error with both empty username and access code', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const password = process.env.PASSWORD;

    if (!password) {
      throw new Error('PASSWORD environment variable is not set');
    }

    await loginPage.openLoginPage();
    const testCase = invalidLoginData.bothEmpty;
    
    await loginPage.login(
      testCase.accessCode,
      testCase.username,
      password
    );

    await loginPage.verifyErrorMessageContains(testCase.expectedError);
  });

  test('Should show error with invalid email format', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const password = process.env.PASSWORD;

    if (!password) {
      throw new Error('PASSWORD environment variable is not set');
    }

    await loginPage.openLoginPage();
    const testCase = invalidLoginData.invalidEmailFormat;
    
    await loginPage.login(
      testCase.accessCode,
      testCase.username,
      password
    );

    await loginPage.verifyErrorMessageContains(testCase.expectedError);
  });

  test('Should show error with wrong access code', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const password = process.env.PASSWORD;

    if (!password) {
      throw new Error('PASSWORD environment variable is not set');
    }

    await loginPage.openLoginPage();
    const testCase = invalidLoginData.wrongAccessCode;
    
    await loginPage.login(
      testCase.accessCode,
      testCase.username,
      password
    );

    await loginPage.verifyErrorMessageContains(testCase.expectedError);
  });

  test('Should show error with wrong username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const password = process.env.PASSWORD;

    if (!password) {
      throw new Error('PASSWORD environment variable is not set');
    }

    await loginPage.openLoginPage();
    const testCase = invalidLoginData.wrongUsername;
    
    await loginPage.login(
      testCase.accessCode,
      testCase.username,
      password
    );

    await loginPage.verifyErrorMessageContains(testCase.expectedError);
  });

  test('Should handle SQL injection attempt safely', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const password = process.env.PASSWORD;

    if (!password) {
      throw new Error('PASSWORD environment variable is not set');
    }

    await loginPage.openLoginPage();
    const testCase = invalidLoginData.sqlInjection;
    
    await loginPage.login(
      testCase.accessCode,
      testCase.username,
      password
    );

    await loginPage.verifyErrorMessageContains(testCase.expectedError);
  });

  test('Should handle XSS attempt safely', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const password = process.env.PASSWORD;

    if (!password) {
      throw new Error('PASSWORD environment variable is not set');
    }

    await loginPage.openLoginPage();
    const testCase = invalidLoginData.xssAttempt;
    
    await loginPage.login(
      testCase.accessCode,
      testCase.username,
      password
    );

    await loginPage.verifyErrorMessageContains(testCase.expectedError);
  });

  test('Should show error with special characters in username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const password = process.env.PASSWORD;

    if (!password) {
      throw new Error('PASSWORD environment variable is not set');
    }

    await loginPage.openLoginPage();
    const testCase = invalidLoginData.specialCharactersUsername;
    
    await loginPage.login(
      testCase.accessCode,
      testCase.username,
      password
    );

    await loginPage.verifyErrorMessageContains(testCase.expectedError);
  });

  test('Should show error with spaces only in fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const password = process.env.PASSWORD;

    if (!password) {
      throw new Error('PASSWORD environment variable is not set');
    }

    await loginPage.openLoginPage();
    const testCase = invalidLoginData.spacesOnly;
    
    await loginPage.login(
      testCase.accessCode,
      testCase.username,
      password
    );

    await loginPage.verifyErrorMessageContains(testCase.expectedError);
  });

  test('Should show error with access code that is too long', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const password = process.env.PASSWORD;

    if (!password) {
      throw new Error('PASSWORD environment variable is not set');
    }

    await loginPage.openLoginPage();
    const testCase = invalidLoginData.tooLongAccessCode;
    
    await loginPage.login(
      testCase.accessCode,
      testCase.username,
      password
    );

    await loginPage.verifyErrorMessageContains(testCase.expectedError);
  });
});
