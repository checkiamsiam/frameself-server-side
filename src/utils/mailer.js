const nodemailer = require("nodemailer");
const googleapis = require("googleapis");
require("dotenv").config();

const { OAuth2 } = googleapis.google.auth;

const auth = new OAuth2(process.env.OAUTH_MAILING_ID, process.env.OAUTH_MAILING_SECRET, process.env.OAUTH_MAILING_REDIRECT_URL);

auth.setCredentials({
  refresh_token: process.env.OAUTH_MAILING_REFRESH_TOKEN,
});

module.exports.sendVerificationEmail = async (email , name , token) => {
  try {
    const accessToken = await auth.getAccessToken();
    const transporter =  nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.OAUTH_MAILING_EMAIL,
        clientId: process.env.OAUTH_MAILING_ID,
        clientSecret: process.env.OAUTH_MAILING_SECRET,
        refreshToken: process.env.OAUTH_MAILING_REFRESH_TOKEN,
        accessToken,
      },
    });
    const mailOptions = {
      from: `Frame-Self <${process.env.OAUTH_MAILING_EMAIL}>`,
      to: email,
      subject: "frame-self email verification",
      html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998"><img src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1645134414/logo_cs1si5.png" alt="" style="width:30px"><span>Action require : Please activate your Frame-Self account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto"><span>Hey ${name},</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on Frame-Self. To complete your registration, please confirm your account.</span></div><a href=${`${process.env.FRONT_END_BASE_URL}/activate/${token}`} target="_blank" style="width:200px;padding:10px 15px;background:#4c649b;border-radius:10px;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#898f9c">Frame-Self allows you to stay in touch with all your friends, once registered on Frame-Self,you can share photos,organize events and much more.</span></div></div>`
    };
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};
