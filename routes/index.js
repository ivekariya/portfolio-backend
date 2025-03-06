var express = require('express');
require("dotenv").config();
var router = express.Router();
const contact = require('../module/contact');
const nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/add', async function (req, res, next) {
  try {
    const obj = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    }
    var data = await contact.create(obj);
    res.status(200).json({
      status: "sucess",
      data
    })
  } catch (err) {
    res.status(401).json({
      status: "err",
      err
    })
  }
});
router.get('/get', async function (req, res, next) {
  try {
    var data = await contact.find();
    res.status(200).json({
      status: "sucess",
      data
    })
  } catch (error) {
    res.status(401).json({
      status: "err",
      err
    })
  }
});
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Validation: Ensure all fields are filled
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Configure Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail, Outlook, Yahoo, etc.
    auth: {
      user: "ivekariya27@gmail.com",  // Replace with your email
      pass: "hary lwts uepa cgro",  // Use an app password (not your real password)
    },
  });

  // Define email content
  let mailOptions = {
    from: email, // User's email address
    to: "ivekariya27@gmail.com", // Your email to receive messages
    subject: `New Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.json({ success: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

module.exports = router;
