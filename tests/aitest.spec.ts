import { test, expect } from '@playwright/test';
import { auto } from 'auto-playwright';

test('Add an new employee', async ({ page }) => {
  await page.goto('/employees.html');
  //await page.goto('/employee-form.html');
  await auto('Click .nav.navbar-nav.navbar-right', { page, test });
  await page.getByLabel('Dept :').selectOption('2');
  await auto('Fill out the form with Name and Phone', { page, test });
  await auto('Submit the Save button', { page, test });
  await auto('Wait for employee table to be visible', { page, test });

  //await paginationLastPage(page);
  await auto('Scroll to bottom of page and Click on last but one page from Pagination', { page, test });

  const lastRecord = await auto('Get the Name record of last //tbody/tr', { page, test });
  const lastPhone = await auto('Get the Phone record of the last td', { page, test });
  console.log("The Employee name and phone which was added was " + lastRecord + " and " + lastPhone);

});
test('Update a employee name', async ({ page }) => {
  await page.goto('/employees.html');
  const options = {
    model: "gpt-3.5-turbo"
  };
  await page.selectOption('select[name="tb-employee_length"]', { label: '100' });

  await page.locator('td a.btn-primary:has-text("Edit")').last().click();
  await page.getByLabel('Dept :').selectOption('2');
  await auto('Fill out the form with a different Name like Joe_Updated and a different Phone', { page, test });
  await auto('Submit the Save button', { page, test });

  await page.waitForSelector('select[name="tb-employee_length"]', { state: 'visible' });
  await page.selectOption('select[name="tb-employee_length"]', { label: '100' });

  const lastRecord = await auto('Get the Name record of the last //tbody/tr', { page, test });
  console.log("Updated name is " + lastRecord);
  expect(lastRecord).toContain("_Updated");

});

test('Delete the last record from employees', async ({ page }) => {
  await page.goto('/employees.html');

  await page.selectOption('select[name="tb-employee_length"]', { label: '100' });
  const lastRecord = await auto('Get the Name record of the last //tbody/tr', { page, test });
  const lastPhone = await auto('Get the Phone record of the last td', { page, test });
  console.log("The Employee name and phone which was deleted was "+lastRecord + " and " + lastPhone);

  await page.locator('td a.btn-danger:has-text("Delete")').last().click();

});

test('Booking a flight', async ({ page }) => {
  await page.goto('https://travel.agileway.net/login');

  await auto('Enter username as agileway and password as testwise and Click on Sign in', { page, test });

  await page.selectOption('select[name="fromPort"]', { label: 'Sydney' });
  await page.selectOption('select[name="toPort"]', { label: 'New York' });

  await page.selectOption('select[name="departMonth"]', { label: 'November 2024' });
  await page.selectOption('select[name="returnMonth"]', { label: 'December 2024' });

  await page.getByRole('checkbox').first().click();
  await auto('Click on Continue', { page, test });

  await auto('Enter the first and last name and Click on Next', { page, test });
  await auto('Choose card type as Visa then Enter Card holder name and Card Number and Click Pay now', { page, test });

  const bookingNumber = await page.getByText('Booking number:').innerText();
  console.log(bookingNumber);
});

async function paginationLastPage(page) {
  // Targeting the last numbered page in the pagination (excluding 'Previous' and 'Next')
  const paginationLinks = page.locator('.pagination a.page-link');
  const totalPages = await paginationLinks.count();
  await paginationLinks.nth(totalPages - 2).click(); // -2 to exclude 'Next'
}

