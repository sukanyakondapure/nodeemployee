const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request header')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request token')
    }
    let payload = jwt.verify(token,'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request payload')
    }
    req.userId = payload.subject
    next()
}

const EmployeeController = require('../controller/employee.controller')
router.get('/getEmployee', verifyToken, EmployeeController.getEmployee)
router.post('/addEmployee', EmployeeController.createEmployee)
router.delete('/deleteEmployee/:emp_id', EmployeeController.deleteEmployee)
router.put('/editEmployee/:emp_id', EmployeeController.updateEmployee)
router.get('/getEmployee/:emp_id', EmployeeController.getOneEmployee)


module.exports = router