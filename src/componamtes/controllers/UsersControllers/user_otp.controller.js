const UserOtp = require('../../models/UsersModels/user_otp.model');
const User = require('../../models/UsersModels/user.model');
const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOTP = async (req, res) => {
 const { mobile_number } = req.body;

 if (!mobile_number) {
  return res.status(400).json({ error: "Mobile number is required" });
 }

 const otp = generateOTP();
 const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

 try {
  const user = await User.findOne({ where: { mobile_number } });

  await UserOtp.upsert({
   mobile_number,
   user_id: user ? user.id : null,
   otp,
   otpExpiry
  });

  await client.messages.create({
   body: `Your OTP is: ${otp}`,
   from: twilioPhone,
   to: `+91${mobile_number}`
  });

  // console.log(`OTP sent to ${mobile_number}: ${otp}`);

  return res.status(200).json({ message: "OTP sent successfully" });
 } catch (err) {
  console.error("OTP send error:", err);
  return res.status(500).json({ error: "Failed to send OTP" });
 }
};

exports.verifyOTP = async (req, res) => {
 const { mobile_number, otp } = req.body;

 console.log("📩 Incoming verification data:", { mobile_number, otp });

 if (!mobile_number?.trim() || !otp?.trim()) {
  return res.status(400).json({
   error: 'Mobile number and OTP are required',
   received: { mobile_number, otp }
  });
 }

 try {
  const userOtp = await UserOtp.findOne({ where: { mobile_number } });

  if (!userOtp || userOtp.otp !== otp) {
   return res.status(400).json({ error: 'Invalid OTP' });
  }

  if (new Date() > userOtp.otpExpiry) {
   return res.status(400).json({ error: 'OTP expired' });
  }

  await userOtp.update({ otp: null, otpExpiry: null });

  return res.status(200).json({
   message: 'OTP verified successfully',
   mobile_number,
   user_id: userOtp.user_id || null
  });
 } catch (err) {
  console.error('OTP verify error:', err.message);
  return res.status(500).json({ error: 'Failed to verify OTP' });
 }
};

