import nodemailer from 'nodemailer';
import bcryptjs from "bcryptjs";
import User from '@/models/userModel';

export const sendEmail = async({email, emailType, userID}:any) => {
    try {
        // TODO: Configure mail for usage
        const hashedToken = await bcryptjs.hash(userID.toString(),10);

        if(emailType==="VERIFY"){
          const updatedUser =  await User.findByIdAndUpdate(userID, 
                {
                  $set:{
                    verifyToken:hashedToken, verifyTokenExpiry:Date.now()+3600000
                  }
        });
        console.log("updated user for verify", updatedUser)
        }else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userID, 
                {
                  $set:{
                    forgotPasswordToken:hashedToken, forgotPasswordTokenExpiry:Date.now()+3600000
                  }
        })
        }


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "33b6e2e25d3598",
              pass: "********e42b"
            }
          });
          const mailOptions = {
            from: 'jokerhahaha2226@gmail.com', 
            to: email, 
            subject: email === 'VERIFY' ? "Verify your Email" : "Reset Your Password", 
            html: `<p>Click <a href="${process.env.DOMAIN}/
            verifyemail?token =${hashedToken}">here</a> to $
            {emailType === "VERIFY" ? "verify your email" :
            "reset your password"}
            or copy and Paste the Link below in your Browser.
            <br>
            ${process.env.DOMAIN}/
            verifyemail?token =${hashedToken}
            </p>`, 
          }

          const mailResponse = await transport.sendMail(mailOptions);
          return mailResponse;
    } catch (error:any) {
        throw new Error(error.message);
    }
}
