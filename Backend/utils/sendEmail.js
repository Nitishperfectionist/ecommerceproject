// const nodemailer=require("nodemailer");

// const sendEmail=async(options)=>{
// const transporter=nodemailer.createTransport({
//     host:process.env.SMTP_HOST,
//     port:process.env.SMTP_PORT,
//     service:process.env.SMTP_SERVICE,
//     auth:{
//         user:process.env.SMTP_MAIL,
//         pass:process.env.SMTP_PASSWORD,
//     }
// })

// const mailOptions={
//     from:process.env.SMTP_MAIL,
//     to:options.email,
//     subject:options.subject,
//     text:options.message,
// }
// await transporter.sendMail(mailOptions);
// }
// module.exports=sendEmail;


const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 465,
        secure: true,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        },
        logger: true,  // Enable logging
        debug: true    // Enable debugging
    });

    const mailOptions = {
        from: `"Ecommerce" <${process.env.SMTP_MAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
    }
};

module.exports = sendEmail;

