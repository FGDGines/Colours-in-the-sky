const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { db } = require('../db/conexion')

class Server {
  constructor (arg) {
    this.__port = arg
    this.app = express()
    this.middleares()
    this.upDB()
    this.routes()
    this.run()
  }

  middleares () {
    // cors
    this.app.use(cors())

    // Lectura y parseo del Body
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    // File Upload
    this.app.use(fileUpload({
      useTempFiles: false,
      tempFileDir: '/temp/'
    }))
    // Protocolos de seguridad

    // Directorio publico
    this.app.use(express.static('public'))
  }

  async upDB () {
    try {
      await db.authenticate()
      console.log('DB Online')
    } catch (err) {
      console.log('Error al conectar con la BD\n\n')
      console.log(err)
      throw new Error('\n\nNo se ha podido conectar con la base de datos')
    }
  }

  routes () {
    // Rutas post
    this.app.use('', require('../routes/get'))
    // Rutas get
    this.app.use('', require('../routes/post'))
    // Rutas API
    this.app.use('/api', require('../routes/api'))
  }

  run () {
    this.app.listen(this.__port, () => {
      console.log(`Server running on port ${this.__port}`)
    })
  }
}

module.exports = Server
