const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        console.log("Header Unauthorized request")
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        console.log("Null Unauthorized request")
        return res.status(401).send('Unauthorized request') 
    }
    let payload = jwt.verify(token, 'secretKey')
    // console.log(payload);
    if(!payload) {
        console.log("Payload Unauthorized request")
        return res.status(401).send('Unauthorized request')
    }
    console.log("Token Verified!", payload);
    req.name = payload.name;
    console.log(payload.name)
    next()
}

const EmployeeController = require('../controller/employee.controller')
router.get('/getEmployee', verifyToken, EmployeeController.getEmployee)
router.post('/addEmployee', EmployeeController.createEmployee)
router.delete('/deleteEmployee/:emp_id', EmployeeController.deleteEmployee)
router.put('/editEmployee/:emp_id', EmployeeController.updateEmployee)
router.get('/getEmployee/:emp_id', EmployeeController.getOneEmployee)


module.exports = router