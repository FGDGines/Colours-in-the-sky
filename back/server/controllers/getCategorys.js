const { request, response } = require('express')
const { Categoria } = require('../db/models')

const getCategorys = async (req = request, res = response) => {
  try {
    const categorias = await Categoria.findAll({
      attributes: ['id', 'label']
    })
    return res.status(200).json({ status: 200, msg: 'Categorias obtenidas con exito', categorias })
  } catch (err) {
    return res.status(200).json({ status: 500, msg: 'No podemos obtener las categorias en este momento', err })
  }
}

module.exports = getCategorys
