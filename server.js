const express=require('express')
const cors=require('cors')
const mysqlConnection=require('./src/config/dbconfig')
const {use}=require('./src/routes/employee.routes')

const app=express()
app.use(cors())


const port = 5000
app.use(express.json())
mysqlConnection.connect((err)=>{
    if(err){
        console.log('Error in connection',err)
    }else{
        console.log('Connection established')
    }
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})
const EmployeeRoutes=require('./src/routes/employee.routes')
app.use('/',EmployeeRoutes)

const authRoutes=require('./src/routes/auth.routes')
app.use('/auth', authRoutes);