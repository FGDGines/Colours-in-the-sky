const { request, response } = require('express')
const { Producto } = require('../db/models')
const extenciones = require('../helpers/extenciones')
const { subirArchivo } = require('../helpers/fileHandler')

const addImagenProducto = async (req = request, res = response) => {
  const { body, files } = req
  const { ipId: id } = body

  try {
    const producto = await Producto.findByPk(id)
    if (!producto) {
      throw new Error('No existe producto con el id proporcionado')
    } else {
      let image = JSON.parse(producto.image)

      const tryUpload = await subirArchivo(files, extenciones.imagen, '../../public/uploads/productos')
        .catch(err => {
          console.log(err)
          throw new Error(err)
        })

      if (tryUpload.status === 200) {
        image.push(tryUpload.bag)
        image = image.filter(arg => arg !== 'unavailable.png')
        await producto.update({ image })
        return res.status(200).json({ status: 200, msg: 'Se ha agregado al imagen al producto' })
      } else {
        return res.status(200).json({ status: 500, msg: 'No hemos podido agregar la  imagen al producto', detalles: tryUpload })
      }
    }
  } catch (err) {
    return res.status(200).json({ status: 500, msg: 'No podemos agregar items en este momento', err })
  }
}
module.exports = addImagenProducto
