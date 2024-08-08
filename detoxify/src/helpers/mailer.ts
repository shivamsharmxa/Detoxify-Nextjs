import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import verifyTokenExpiry from "../models/User"
import User from '../models/User'





export const sendEmail = async({email, emailType, userId}: any) => {
    try{
        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}
            )
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
                {forgetPasswordToken: hashedToken,
                 forgetPasswordTokenExpiry: Date.now() + 3600000}
            )
        }




 
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

          const mailOptions = {
            from: 'shivam@gmail.com', 
            to: email, 
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: "<b>Hello world?</b>", 
          };
          const mailResponse = await transporter.sendMail(mailOptions);
          return mailResponse;
    }
    catch(error: any){
        throw new Error(error.message)
    }
}