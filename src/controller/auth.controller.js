const { validationResult } = require('express-validator');
const mysqlConnection = require('../config/dbconfig')
const md5 = require('md5');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

//for signUp
exports.signup = async (req, res) => {
    let sql = 'INSERT INTO new_database.users (name, email, password) VALUES (?, ?, ?)';
    const hashedPassword = md5(req.body.password.toString());

    let { name, email, passoword = hashedPassword } = req.body;
    try {
        let data = await mysqlConnection.query(sql, [name, email, passoword]);
        res.send(data)
    }
    catch (err) {
        res.send(err);
    }

};
//For login
exports.login = async (req, res) => {

    let { email, password } = req.body;
    const hashed_password = md5(password.toString());

    // const sql = `SELECT * FROM new_database.users WHERE email = ? AND password = ?`
    const sql = `SELECT * FROM bvj5ouvj9pdfx4ry6iwp.users WHERE email = ? AND password = ?`
    
    mysqlConnection.query(
        sql, [email, hashed_password],
        function (err, result, fields) {
            console.log("--> ",err," result --> ",result)
            if (!err) {
                if (result.length !== 1) {

                    res.send({ status: 401, data: err, msg: "Incorrect email and password" });
                } else {

                    let payload = { subject: result.emp_id }
                    let token = jwt.sign(payload,'secretKey');
                    res.send({ status: 200, data: result, token: token });
                }
            } else {
                res.send({ status: 500, data: err, msg: "Internal error" });
            }
        })
};




//For forgot password
exports.forgot_password = async (req, res) => {

    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    console.log(otp);


    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: 'Gmail',

        auth: {
            user: 'ss7718642@gmail.com',
            pass: 'coucvzofnivljdke'
        },
        secureConnection: 'false',
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
        }

    });


    let { email } = req.body;
    // const hashed_password = md5(password.toString());

    // const sql = `SELECT * FROM new_database.users WHERE email = ?`
    const sql = `SELECT * FROM bvj5ouvj9pdfx4ry6iwp.users WHERE email = ?`
    mysqlConnection.query(
        sql, [email],
        function (err, result, fields) {
            if (!err) {
                if (result.length !== 1) {
                    res.send({ status: 401, data: err, msg: "Incorrect email" });
                } else {
                    var mailOptions = {
                        from: 'ss7718642@gmail.com',
                        to: result[0].email,
                        subject: "Otp  ",
                        text: "Please verify your OTP. Your OTP is " + otp
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            res.send({ status: 200, msg: "Email sent.." });
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    // mysqlConnection.query('update new_database.users set otp =? where email =?', [otp, email], (err, rows, fields) => {
                        mysqlConnection.query('update bvj5ouvj9pdfx4ry6iwp.users set otp =? where email =?', [otp, email], (err, rows, fields) => {
                        
                        if (!err) {
                            res.send({ status: 200, msg: "OTP sent.." });
                        } else {
                            res.send(err)
                        }
                    })

                }
            } else {
                res.send({ status: 500, data: err, msg: "Internal error" });
            }
        })
};

//For forgot password
exports.reset_password = async (req, res) => {

    let { email, password, otp } = req.body;
    const hashed_password = md5(password.toString());
    // mysqlConnection.query('select * from new_database.users where email=? and otp=?', [email, otp], (err, result, fields) => {
    mysqlConnection.query('select * from bvj5ouvj9pdfx4ry6iwp.users where email=? and otp=?', [email, otp], (err, result, fields) => {
        if (!err) {
            if (result.length !== 1) {
                res.send({ status: 401, msg: "OTP doesn't match." });
            } else {
                // mysqlConnection.query('update new_database.users set password =? where email =?', [hashed_password, email], (err, rows, fields) => {
                mysqlConnection.query('update bvj5ouvj9pdfx4ry6iwp.users set password =? where email =?', [hashed_password, email], (err, rows, fields) => {
                    if (!err) {
                        res.send({ status: 200, msg: "Password reset done..!" });
                    } else {
                        res.send(err)
                    }
                })
            }
        } else {
            res.send(err)
        }
    })




};
















