// Variables declaration
import axios from "axios";
import inquirer from "inquirer";
import chalk from "chalk";

const currencies = [
  'USD',
  'EUR',
  'GBP',
  'PLN',
  'CAD',
  'JPY',
  'EGY'
];

const questions = [
  {
    type: 'list',
    name: 'from',
    message: 'Convert From:',
    choices: currencies
  },
  {
    type: 'list',
    name: 'to',
    message: 'Convert To:',
    choices: currencies
  },
  {
    type: 'number',
    name: 'amount',
    message: 'Amount to convert:',
    validate: (value) => {
      if (!isNaN(value)) {
        return true;
      }
      return 'Please enter a valid number';
    }
  }
];

const convertCurrency = async (from, to, amount) => {
  const response = await axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
  const result = response.data.rates[to];
  return result.toFixed(2);
};

const run = async () => {
  console.log(chalk.blue.bold('💰 Currency Converter'));
  const answers = await inquirer.prompt(questions);
  const { from, to, amount } = answers;
  const convertedAmount = await convertCurrency(from, to, amount);
  console.log(`${amount} ${chalk.green(from)} = ${chalk.green(convertedAmount)} ${chalk.green(to)}`);
};

run();

