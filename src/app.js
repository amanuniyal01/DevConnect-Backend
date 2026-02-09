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
app.get("/test/:userId", (req, res) => {
    console.log(req.params)
    res.send({ firstName: "Aman", lastName: "Uniyal" })

})

app.use("/", (req, res, next) => {
    console.log("First Response")
    next()
    // res.send("Aman Uniyal")
},
    (req, res) => {
        res.send("2nd response")
    }
)

app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000")
})