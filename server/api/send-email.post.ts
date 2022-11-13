import { createTransport } from 'nodemailer'
import { EmailBodyProps } from '~/types/contact.types'

export default defineEventHandler(async (event) => {
  const { to, from, subject, text } = await useBody<EmailBodyProps>(event)

  const transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'snoohd@gmail.com',
      pass: 'ceafurqyqraksuax'
    }
  })

  let html = `From: ${from}<br/>`
  html += `Subject: ${subject}<br/>`
  html += `Message:<br/>`
  html += text

  try {
    await transporter.sendMail({
      to,
      from,
      subject: 'Message from portfolio 2022 form',
      html
    })
  } catch (error: any) {
    return sendError(event, error)
  }

  return send(event, 'ok')
})
