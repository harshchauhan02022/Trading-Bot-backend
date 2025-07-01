require('dotenv').config();
const twilio = require('twilio');
const AdminUser = require('../models/admin.model');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const genOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOTP = async (req, res) => {
  const { mobile } = req.body;

  if (!/^\d{10}$/.test(mobile)) {
    return res.status(400).json({ error: 'Invalid mobile number' });
  }
  try {
    const otp = genOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    const [user] = await AdminUser.findOrCreate({
      where: { mobile },
      defaults: { otp, otpExpiry: expiry },
    });
    if (!user.isNewRecord) await user.update({ otp, otpExpiry: expiry });

await client.messages.create({
  body: `Your OTP is ${otp}`,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: `+91${mobile}`,
});


    return res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('OTP send error:', err);
    return res.status(500).json({ error: 'Failed to send OTP' });
  }
};
exports.verifyOTP = async (req, res) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp) {
    return res.status(400).json({ error: 'Mobile number and OTP are required' });
  }

  try {
    const user = await AdminUser.findOne({ where: { mobile } });

    if (!user || user.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ error: 'OTP expired' });
    }

    await user.update({ otp: null, otpExpiry: null });

    return res.status(200).json({
      message: 'OTP verified successfully',
      userId: user.id
    });
  } catch (err) {
    console.error('OTP verify error:', err.message);
    return res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

