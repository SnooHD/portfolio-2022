import { createTransport } from 'nodemailer'

export default defineEventHandler(async (event) => {
  const data = await useBody(event)

  const transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'snoohd@gmail.com',
      pass: 'ceafurqyqraksuax'
    }
  })

  try {
    await transporter.sendMail(data)
  } catch (error) {
    return sendError(event, error)
  }

  return send(event, 'ok')
})
