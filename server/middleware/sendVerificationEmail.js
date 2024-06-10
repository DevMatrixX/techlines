import nodemailer from 'nodemailer'

export const sendVerificationEmail = (email, name, token) => {

    const html = `
    <html>
    <body>
    <h3>Dear ${name}</h3>
    <p>Thanks for signing up at the Tech Lines!</p>
    <p>Use the link below to verify your email</p>
    <a href="http://localhost:3000/email-verify/${token}">Click here!</a>
</body>
</html>`

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tumasyan.edgar89@gmail.com',
            pass: 'jgvg cmvj oyop xkgu'
        }
    })

    const mailOptions = {
        subject: 'Verify your email address',
        from: 'tumasyan.edgar89@gmail.com',
        to: email,
        html
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error)
        } else{
            console.log(`Email send to ${email}`)
            console.log(info.response)
        }
    })
}