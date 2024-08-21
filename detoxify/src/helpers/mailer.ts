import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import verifyTokenExpiry from "../models/User"
import User from '../models/User'





export const sendEmail = async({email, emailType, userId}: any) => {
    try{
        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if(emailType === "VERIFY"){
            const updatedUser = await User.findByIdAndUpdate(userId,
                {
                    $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: new Date(Date.now() + 3600000)}

        });
        console.log("Updated User For VERIFY", updatedUser)
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{
                $set:
            
                {forgetPasswordToken: hashedToken,
                 forgetPasswordTokenExpiry:new Date( Date.now() + 3600000)}
        })
        }




 
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "9d98957ab91cf9",
              pass: "5c3e48db014861"
            }
          });

          const mailOptions = {
            from: 'hitesh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

          const mailResponse = await transport.sendMail(mailOptions);
          return mailResponse;
    }
    catch(error: any){
        throw new Error(error.message)
    }
}