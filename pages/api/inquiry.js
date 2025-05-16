import { Resend } from "resend";
import { EmailTemplate } from "../../components/email/InquiryTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  console.log(req.body);
  const { data, error } = await resend.emails.send({
    from: "Properties Inquiries <inquiry@acetbanks.com>",
    to: ["info@dreamfortrealtors.com"],
    cc: ["georgemusundi50@gmail.com"],
    subject: "New Website Inquiry",
    react: EmailTemplate(req.body),
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
};
