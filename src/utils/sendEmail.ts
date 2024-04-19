import nodemailer from 'nodemailer'
async function sendEmail(to: string, subject: string, message: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Configure for Gmail
    auth: {
      user: 'abelabreham55@gmail.com',
      pass: 'oubu mrmp heoa hkiv', // **Important:** Consider using app passwords for enhanced security (see next step)
    },
  })

  const mailOptions = {
    from: '"Radiovision" <abelabreham55@gmail.com>',
    to,
    subject,
    text: message,
  }

  const info = await transporter.sendMail(mailOptions)
  console.log('Email sent:', info.response)
  return info
}
export default sendEmail
