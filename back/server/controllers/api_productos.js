const { request, response } = require('express')
const { Producto, Categoria } = require('../db/models')
const Sequelize = require('sequelize')

const productos = async (req = request, res = response) => {
  const query = req.query
  const limit = Number((query.limit) ? query.limit : 100)
  const offset = Number((query.limit) ? query.offset : 0)

  try {
    const allProductos = await Producto.findAll({
      include: [{ model: Categoria, as: 'categoria' }],
      attributes: ['id', 'name', 'slug', 'image', 'price', 'details', 'createdAt', 'updatedAt', [Sequelize.literal('categoria.label'), 'categoria_label']],
      order: [['createdAt', 'DESC']],
      offset,
      limit,
      raw: true
    })
    res.status(200).json({ status: 200, msg: 'Productos Obtenidos con exito', products: allProductos })
  } catch (err) {
    res.status(200).json({ status: 500, msg: 'No podemos obtener prouductos en este momento', err })
  }
}

module.exports = productos
