const express=require('express')
const cors=require('cors')
const app=express()
const mysqlConnection=require('./src/config/dbconfig')
const {use}=require('./src/routes/employee.routes')

app.use(cors())
app.use(express.json())


const port = 5000
mysqlConnection.getConnection((err)=>{
    if(err){
        console.log('Error in connection',err)
    }else{
        console.log('Connection established')
    }
})


app.get('/', (req, res) => {
    console.log("Get request");
    res.json("GET Request Called");  
})

const EmployeeRoutes=require('./src/routes/employee.routes')
app.use('/',EmployeeRoutes)

const authRoutes=require('./src/routes/auth.routes')
app.use('/auth', authRoutes);

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})