const { request, response } = require('express')
const { Categoria } = require('../db/models')

const delCategory = async (req = request, res = response) => {
  const { ipId: id } = req.body
  try {
    const categoria = await Categoria.findByPk(id)
    if (!categoria) {
      return res.status(200).json({ status: 500, msg: 'No existe la categoria con el id solicitado' })
    }
    await categoria.destroy()
    return res.status(200).json({ status: 200, msg: 'Categoria eliminada' })
  } catch (err) {
    return res.status(200).json({ status: 500, msg: 'No podemos eliminar categorias en este momento', err })
  }
}

module.exports = delCategory
