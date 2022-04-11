const Expenses = require('../models/Expense');
const OweAmounts = require('../models/OweAmount');

async function addExpense(expense) {
  try {
    const isShared = expense.shared;
    await Expenses.create(expense);
    const expenseamount = expense.sharedUser;
    if (isShared) {
      expenseamount.forEach(async (item) => {
        let userExpense = await Expenses.findAll({
          attributes: ['expense', 'id'],
          where: {
            username: item.username,
          },
        });
        console.log(
          'UserExpense: ',
          parseInt(userExpense[0].dataValues.expense)
        );
        const value =
          parseInt(userExpense[0].dataValues.expense) + parseInt(item.expense);
        console.log(' Value:' + value);
        await Expenses.upsert({
          expense: value,
          id: userExpense[0].dataValues.id,
        });
      });
    } else {
      console.log('No share expense');
    }
  } catch(err) {
     console.log(err)     
  }
}
async function addOweAmount(OweAmount) {
  await OweAmounts.create(OweAmount);
}

module.exports = {
  addExpense,
  addOweAmount,
};
