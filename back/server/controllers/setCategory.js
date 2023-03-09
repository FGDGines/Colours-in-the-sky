const { request, response } = require('express')
const { Categoria } = require('../db/models')

const setCategory = async (req = request, res = response) => {
  const { ipId: id, ipValue: label } = req.body
  try {
    const categoria = await Categoria.findByPk(id)
    if (!categoria) {
      return res.status(200).json({ status: 400, msg: 'No existe categoria con el id proporcionado' })
    }
    await categoria.update({ label })
    return res.status(200).json({ status: 200, msg: 'La categoria ha sido editada con éxito' })
  } catch (err) {
    return res.status(200).json({ status: 500, msg: 'No podemos modificar categorias en este momento ', err })
  }
}

module.exports = setCategory
