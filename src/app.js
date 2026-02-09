const express = require("express")
const app = express()
// app.get("/", (req, res) => {
//     res.send('Hello from the Server')

// })
// app.get("/hello", (req, res) => {
//     res.send("Hello Hello Hello")
// })


// app.post("/hello", (req, res) => {
//     // Saving data to DB
//     res.send("Data successfully saved to Database")
// })
// app.get("/test/:userId", (req, res) => {
//     console.log(req.params)
//     res.send({ firstName: "Aman", lastName: "Uniyal" })

// })


app.use("/", (req, res, next) => {
    console.log("First Response (Middleware)")
    next()
    // res.send("Aman Uniyal")
})

app.get("/user",(req,res,next)=>{
    console.log("1st Route Handler")
    next()
},(req,res,next)=>{
    console.log("2nd Route Handler")
    res.send("Final Response")
    next()
})

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000")
})