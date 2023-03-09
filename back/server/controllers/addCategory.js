const { request, response } = require('express')
const { Categoria } = require('../db/models')

const addCategory = async (req = request, res = response) => {
  const { ipName: label } = req.body
  try {
    const category = new Categoria({ label })
    await category.save()
    return res.status(200).json({ status: 200, msg: 'Categoría creada con éxito' })
  } catch (err) {
    return res.status(200).json({ status: 500, msg: 'No podemos crear categorias en este momento', err })
  }
}

module.exports = addCategory
