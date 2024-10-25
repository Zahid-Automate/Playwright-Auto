This `README.md` file provides the steps for installation, setting up OpenAI, and a usage example, making it easy to integrate `auto-playwright` into Playwright tests.

# Auto Playwright

Run Playwright tests using AI with `auto-playwright`.

## Setup

1. Install the `auto-playwright` dependency: </br>
   ```
   npm install auto-playwright -D
  
2. This package relies on talking with OpenAI (https://openai.com/). You must export the API token as an enviroment variable or add it to your .env file: </br>
   For MAC
   ```
    export OPENAI_API_KEY='sk-...'
   ```
   FOR WINDOWS
   ```
    setx OPENAI_API_KEY 'sk-....'
   ```

## Pricing Details
1. You need to purchase the API key online, there are costs associated with using OpenAI. You can find more pricing information here: https://openai.com/pricing/.
2. Recommend using gpt-4 and above version to make your tests work without errors

## Screenshot for one of the test results
![Screenshot_9-10-2024_1362_localhost](https://github.com/user-attachments/assets/ac800611-21da-4987-9990-e68207705379)


## Video Grab showing test results of all the test cases run using Playwright Auto

[Playwright-Auto.webm](https://github.com/user-attachments/assets/c52df977-7ff6-440e-9f5c-27881e136525)
