const express = require('express');
const { Op } = require('sequelize');

const { convertArrayToCSV } = require('convert-array-to-csv');
const expenseService = require('../services/expenseService');
const router = express.Router();
const expenseuser = require('../models/Expense');
const oweuser = require('../models/OweAmount');

router.post('/addExpense', addExpense);
router.get('/listExpense', listExpense);
router.post('/addOweAmount', addOweAmount);
router.post('/listOweAmount', listOweAmount);


function addExpense(req, res) {
  expenseService
    .addExpense(req.body)
    .then(() => res.json('Expense Added Successfuly'))
    .catch((err) => console.log(err));
}

async function listExpense(req, res) {
  // user.findAll().then( res => console.log(res.expenses))
  const users = await expenseuser.findAll();
  console.log(users.every((user) => user instanceof expenseuser)); // true
  console.log('All users:', JSON.stringify(users, null, 2));
}

function addOweAmount(req, res) {
  expenseService
    .addOweAmount(req.body)
    .then(() => res.json('Owed Amount Added Successfuly'))
    .catch((err) => console.log(err));
}

async function listOweAmount(req, res) {
  await oweuser
    .findAll({
      where: {
        username: req.body.username,
      },
    })
    .then((res) => console.log(res));
  
}



module.exports = router;
