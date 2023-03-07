const { request, response } = require('express')
const { Categoria, Producto } = require('../db/models')
const extenciones = require('../helpers/extenciones')
const { subirArchivo } = require('../helpers/fileHandler')

const addProducto = async (req = request, res = response) => {
  const { ipName: name, ipSlug: slug, ipCategory: category, ipPrice: price, ipDetails: details } = req.body
  const { files } = req

  try {
    const categoria = await Categoria.findByPk(category)

    if (!categoria) {
      return res.status(200).json({ status: 500, msg: 'No existe la categora proporcionada' })
    }

    const image = []
    const tryUpload = await subirArchivo(files, extenciones.imagen, '../../public/uploads/productos')
      .catch(err => {
        console.log(err)
        throw new Error(err)
      })

    if (tryUpload.status === 200) {
      image.push(tryUpload.bag)
    }

    const producto = new Producto({ name, slug, image, category, price, estado: 1, details })
    await producto.save()
    return res.status(200).json({ status: 200, msg: 'Producto creado con exito' })
  } catch (err) {
    return res.status(200).json({ status: 500, msg: 'No podemos crear productos en este momento', err })
  }
}

module.exports = addProducto
