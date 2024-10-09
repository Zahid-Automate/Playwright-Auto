import { test, expect } from '@playwright/test';
import { auto } from 'auto-playwright';

test('Add an new employee', async ({ page }) => {
  await page.goto('/employees.html');
  await page.goto('/employee-form.html');
  //await auto('Click on link Add New Employee', {page,test});
  await page.getByLabel('Dept :').selectOption('2');
  await auto('Fill out the form with Name and Phone', {page,test});
  await auto('Submit the Save button', {page,test});
  await auto('Wait for employee table to be visible', {page,test});

  // Targeting the last numbered page in the pagination (excluding 'Previous' and 'Next')
  const paginationLinks = page.locator('.pagination a.page-link');
  const totalPages = await paginationLinks.count();
  await paginationLinks.nth(totalPages - 2).click(); // -2 to exclude 'Next'

  const lastRecord = await auto('Get the Name record of last //tbody/tr', { page, test });
  const lastPhone = await auto('Get the Phone record of the last td', { page, test });
  console.log("The Employee name and phone which was added was "+lastRecord + " and " + lastPhone);

});
test('Update a employee name', async ({ page }) => {
  await page.goto('/employees.html');
      const options = {
        model: "gpt-3.5-turbo"   
    };
    // Targeting the last numbered page in the pagination (excluding 'Previous' and 'Next')
    const paginationLinks = page.locator('.pagination a.page-link');
    const totalPages = await paginationLinks.count();
    await paginationLinks.nth(totalPages - 2).click(); // -2 to exclude 'Next'
    
    await page.locator('td a.btn-primary:has-text("Edit")').last().click();
    await page.getByLabel('Dept :').selectOption('2');
    await auto('Fill out the form with a different Name like Joe_Updated and a different Phone', {page,test});
    await auto('Submit the Save button', {page,test});

     // Targeting the last numbered page in the pagination (excluding 'Previous' and 'Next')
     const paginationLinks1 = page.locator('.pagination a.page-link');
     const totalPages1 = await paginationLinks1.count();
     await paginationLinks1.nth(totalPages1 - 2).click();

     const lastRecord = await auto('Get the Name record of last //tbody/tr', { page, test });
     console.log("Updated name is "+ lastRecord);
     expect(lastRecord).toContain("_Updated");

});

test('Delete the last record from employees', async({page}) => {
   await page.goto('/employees.html');
      const options = {
        model: "gpt-3.5-turbo"   
    };
    // Targeting the last numbered page in the pagination (excluding 'Previous' and 'Next')
    const paginationLinks = page.locator('.pagination a.page-link');
    const totalPages = await paginationLinks.count();
    await paginationLinks.nth(totalPages - 2).click(); // -2 to exclude 'Next'
    
    const lastRecord = await auto('get the name record of the last td', { page, test });
    const lastPhone = await auto('get the phone record of the last td', { page, test });
    console.log("The Employee name and phone which was deleted was "+lastRecord + " and " + lastPhone);

    await page.locator('td a.btn-danger:has-text("Delete")').last().click();

  });

test('Pagination', async({page}) => {
    await page.goto('/employees.html');
    const options = {
      //model: "gpt-3.5-turbo"
      //model: "gpt-4"   
     };

    //await auto("Scroll to the bottom of the page and Click on last but one page from Pagination", { page, test },options);
    //await auto('Scroll to the bottom of the page', {page,test} , options);
    await auto('Click on last but one page from Pagination', { page, test },options);

  });

test('Booking a flight', async ({ page }) => { 
    await page.goto('https://travel.agileway.net/login');
    
    await auto('Enter username as agileway and password as testwise and Click on Sign in',{page,test});

    await page.selectOption('select[name="fromPort"]', { label: 'Sydney' });
    await page.selectOption('select[name="toPort"]', { label: 'New York' });

    await page.selectOption('select[name="departMonth"]', { label: 'November 2024' });
    await page.selectOption('select[name="returnMonth"]', { label: 'December 2024' });

    await page.getByRole('checkbox').first().click();
    await auto('Click on Continue',{page,test});

    await auto('Enter the first and last name and Click on Next',{page,test});
    await auto('Choose card type as Visa then Enter Card holder name and Card Number and Click Pay now',{page,test});
    
    const bookingNumber = await page.getByText('Booking number:').innerText();
    console.log(bookingNumber);
  });
  
