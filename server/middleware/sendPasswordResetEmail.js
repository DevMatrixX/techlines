import nodemailer from 'nodemailer'

export const sendPasswordResetEmail = (email, name, token) => {

    const html = `
    <html>
    <body>
    <h3>Dear ${name}</h3>
    <p>Please click on the link below to reset your password.</p>
    <a href="http://localhost:3000/password-reset/${token}">Click here!</a>
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
        subject: 'Tech Lines: Reset your password request',
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