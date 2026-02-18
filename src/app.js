const express = require("express")
const app = express()
const ConnectDB=require("./config/database")



ConnectDB().then(()=>{
    console.log("Database connected Successfully")
    app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000")
})

}).catch((err)=>{
    console.log("Database not connect Successfully"+err)
})
