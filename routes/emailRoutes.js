const express = require('express');
const router = express.Router();
const expenseuser = require('../models/Expense');
const emailService = require('../services/emailService');
const { Op } = require('sequelize');
const schedule = require('node-schedule');

const ObjectsToCsv = require('objects-to-csv');
router.post('/emailuser', emailuser);
router.post('/dailyReport', dailyReport);
router.post('/monthlyReport', monthlyReport);

function emailuser(req, res) {
  emailService.sendemail(req.body);
  res.json('Email sent');
}

async function dailyReport (req, res) {
  let datareport = await expenseuser.findAll({
    where: {
      username: req.body.username,
      createdAt: {
        [Op.lt]: new Date(),
        [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
      }
    }
  })
  let report = new Array(datareport[0].dataValues)

  const csv = new ObjectsToCsv(report)

  schedule.scheduleJob('* * * * *', () => {
    
    emailService.daily_report(csv, req.body)
  })
}

async function monthlyReport (req, res) {
  let datareport = await expenseuser.findAll({
    where: {
      username: req.body.username,
      createdAt: {
        [Op.lt]: new Date(),
        [Op.gt]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
      }
    }
  })
  console.log('Report: ', datareport)
  let report = []
  datareport.forEach(item => {
    report.push(item.dataValues)
  })

  const csv = new ObjectsToCsv(report)
  schedule.scheduleJob('* * * * *', () => {
    emailService.daily_report(csv, req.body)
  })
}

module.exports = router
