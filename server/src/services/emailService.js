require('dotenv').config
import nodemailer from "nodemailer"

let sentMail = async (data) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Bookstore" <bookstore.shopping.vn@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: "Payment information at bookstore", // Subject line
        text: `Hello ${data.name},`, // plain text body
        html: `
        <h3>Hello ${data.name},</h3>
        <br/>
        <p>We would like to send your purchase invoice:</p>
        <ul style={{paddingLeft: "1em"}}>
            <li><b>Order Code: </b> ${data.orderCode}</li>
            <li><b>Customer Name: </b> ${data.name}</li>
            <li><b>Email: </b> ${data.email}</li>
            <li><b>Address: </b> ${data.address}</li>
            <li><b>Phone: </b> ${data.phone}</li>
            <li><b>Total price: </b> ${data.total}</li>
            <li><b>List book: </b></li>
        </ul>
        <div>
           <p><b>Create on: </b> ${data.createOn} </p> 
           <p><b>Delivery Option: </b> ${data.deliveryOption} </p> 
           <p><b>Status: </b>  ${data.status}</p>
           <p><b>View invoice: </b> <a href=${data.link}>Click here</a></p>
        </div>
        <b>Thank you for purchasing at Bookstore!</b>
        
        `, // html body
    });
}



module.exports = {
    sentMail: sentMail,
}