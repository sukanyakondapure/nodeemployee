const mysqlConnection = require('../config/dbconfig')
//get all employees
module.exports.getEmployee = (req, res) => {

    // mysqlConnection.query('select * from new_database.employees', (err, rows, fields) => {
    mysqlConnection.query('select * from bvj5ouvj9pdfx4ry6iwp.employees', (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        } else {
            res.send(err)
        }
    })
}
//create employee
module.exports.createEmployee = async (req, res) => {

    let { emp_name, email_id, department, designation } = req.body;
    // mysqlConnection.query('select * from new_database.employees where email_id =?', [email_id], async (err, rows, fields) => {
        mysqlConnection.query('select * from bvj5ouvj9pdfx4ry6iwp.employees where email_id =?', [email_id], async (err, rows, fields) => {
        if (rows.length !== 1) {
            // let sql = 'insert into new_database.employees set emp_name =? ,email_id=?,department=?,designation=?';
            let sql = 'insert into bvj5ouvj9pdfx4ry6iwp.employees set emp_name =? ,email_id=?,department=?,designation=?';
            try {
                let data = await mysqlConnection.query(sql, [emp_name, email_id, department, designation]);
                res.send(data)
            }
            catch (err) {
                res.send(err);
            }
        } else {
            res.send({ status: 401, msg: 'User Already Exists!' });
        }
    })


}

//delete employee
module.exports.deleteEmployee = (req, res) => {
    // let sql = 'delete from new_database.employees where emp_id =?';
    let sql = 'delete from bvj5ouvj9pdfx4ry6iwp.employees where emp_id =?';
    let { emp_id } = req.params;
    console.log("Hii")
    mysqlConnection.query(sql, [emp_id], (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        }
        else {
            res.send(err)
        }
    })
}

//updates employee
module.exports.updateEmployee = (req, res) => {
    // let sql = 'update new_database.employees set emp_name =?,email_id=?,department=?,designation=? where emp_id =?';
    let sql = 'update bvj5ouvj9pdfx4ry6iwp.employees set emp_name =?,email_id=?,department=?,designation=? where emp_id =?';

    let { emp_id } = req.params;
    let { emp_name, email_id, department, designation } = req.body
    mysqlConnection.query(sql, [emp_name, email_id, department, designation, emp_id], (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        }
        else {
            res.send(err)
        }
    })
}

//get single employee
module.exports.getOneEmployee = (req, res) => {
    let { emp_id } = req.params;
    // mysqlConnection.query('select * from new_database.employees where emp_id =?', [emp_id], (err, rows, fields) => {
    mysqlConnection.query('select * from bvj5ouvj9pdfx4ry6iwp.employees where emp_id =?', [emp_id], (err, rows, fields) => {
        if (!err) {
            res.send(rows)
        } else {
            res.send(err)
        }
    })
}

