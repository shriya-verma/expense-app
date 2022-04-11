const sgMail = require('@sendgrid/mail')

sgMail.setApiKey('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')
const fs = require("fs");




function sendemail(usermail){

    const msg = {
      to: usermail.email, // Change to your recipient
      from: 'vermashriya12@gmail.com', // Change to your verified sender
      subject: 'You need to clear your loan',
      text: 'Please clear your mail before due date',
      html: '<strong>Please clear your mail before due date</strong>',
    }

    sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0])
        console.log(response[0].headers)
      })
      .catch((error) => {
        console.error(error)
      })
}

async function daily_report(report, usermail){
    
    console.log('CSV FILE:',report)
    await report.toDisk('./services/csvFiles/test.csv')
    pathToAttachment = `${__dirname}/csvFiles\/test.csv`;
    attachment = fs.readFileSync(pathToAttachment).toString("base64");
      const msg = {
      to: usermail.email, // Change to your recipient
      from: 'vermashriya12@gmail.com', // Change to your verified sender
      subject: 'Your daily expense report',
      text: 'Here\'s a reminder of your daily/monthly expense',
      attachments: [
        {
          content: attachment,
          filename: "test.csv",
          type: "application/csv",
          disposition: "attachment"
        }
      ]
    }

    sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0])
        console.log(response[0].headers)
      })
      .catch((error) => {
        console.error(error)
      })
}


module.exports = {
    sendemail,
    daily_report
    
}