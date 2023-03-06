require('dotenv').config()
console.clear()
const Server = require("./models/server")
console.log(process.env.PORT)
const app = new Server(process.env.PORT)

