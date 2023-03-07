const { request, response } = require('express')
const { Producto, Categoria } = require('../db/models')
const Sequelize = require('sequelize')

const producto = async (req = request, res = response) => {
  const query = req.query
  let id = -1
  if (!query.id) {
    return res.status(200).json({ status: 400, msg: 'El parámetro ID es obligatorio' })
  } else {
    id = query.id
  }

  try {
    const currentProducto = await Producto.findByPk(id, {
      include: [{ model: Categoria, as: 'categoria' }],
      attributes: ['id', 'name', 'slug', 'image', 'price', 'details', 'createdAt', 'updatedAt', [Sequelize.literal('categoria.label'), 'categoria_label']],
      raw: true
    })
    if (!currentProducto) {
      res.status(200).json({ status: 400, msg: 'No existe producto con el id solicitado' })
    } else { res.status(200).json({ status: 200, msg: 'Producto Obtenido con exito', bag: currentProducto }) }
  } catch (err) {
    res.status(200).json({ status: 500, msg: 'No podemos obtener el  prouducto en este momento', err })
  }
}

module.exports = producto
