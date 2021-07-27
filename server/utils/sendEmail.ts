import { SentMessageInfo } from "nodemailer/lib/sendmail-transport";
import mailer from "../core/mailer";

interface ISendEmailProps {
  emailFrom: string;
  emailTo: string;
  subject: string;
  html: string;
}

export const sendEmail = ({
  emailFrom,
  emailTo,
  subject,
  html,
}: ISendEmailProps) => {
  mailer.sendMail(
    {
      from: emailFrom,
      to: emailTo,
      subject,
      html,
    },
    function (err: Error | null, info: SentMessageInfo) {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    }
  );
};
