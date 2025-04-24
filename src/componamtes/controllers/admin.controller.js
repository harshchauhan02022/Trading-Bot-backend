const AdminUser = require('../models/admin.model');
const nodemailer = require('nodemailer');
const { generateOTP } = require('../utils/otpGenerator');
require('dotenv').config();

const allowedMobiles = [
  process.env.ALLOWED_MOBILE_1,
  process.env.ALLOWED_MOBILE_2,
];

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendOTP = async (req, res) => {
  const { mobile } = req.body;

  if (!allowedMobiles.includes(mobile)) {
    return res.status(403).json({ message: 'Unauthorized mobile number' });
  }

  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 5 * 60000); 

  try {
    const user = await AdminUser.findOne({ where: { mobile } });

    if (user) {
      await user.update({ otp, otpExpiry });
    } else {
      await AdminUser.create({ mobile, otp, otpExpiry });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, 
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}`,
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  const { mobile, otp } = req.body;

  try {
    const user = await AdminUser.findOne({ where: { mobile, otp } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const now = new Date();

    if (now > user.otpExpiry) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    await user.update({ otp: null, otpExpiry: null });

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP', error: error.message });
  }
};
