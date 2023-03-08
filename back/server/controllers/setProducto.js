const { request, response } = require('express')
const { Producto, Categoria, EstadoProducto } = require('../db/models')

const setProducto = async (req = request, res = response) => {
  const { body } = req
  const { id, name, slug, price, details, category, estado } = body
  const ediciones = {}

  if (!id) {
    return res.status(200).json({ status: 400, msg: 'El id del producto a editar es obligatorio' })
  }

  try {
    const producto = await Producto.findByPk(id)

    if (!producto) {
      return res.status(200).json({ status: 400, msg: 'No existe producto con el id proporcionado' })
    }

    if (name) {
      const last = producto.name
      await producto.update({
        name
      })
      ediciones.name = { last, now: name }
    }

    if (slug) {
      const last = producto.slug
      await producto.update({
        slug
      })
      ediciones.slug = {
        last, now: slug
      }
    }

    if (price) {
      const last = producto.price
      await producto.update({ price })
      ediciones.price = { last, now: price }
    }

    if (details) {
      const last = producto.details
      await producto.update({ details })
      ediciones.details = { last, now: details }
    }

    if (category) {
      const newCategory = await Categoria.findByPk(category)
      if (!newCategory) {
        // throw new Error('No existe categoria con el id proporcionado')
        // Ver como pasar la descripcion del error al manejador del mismo
      } else {
        const categoria = await Categoria.findByPk(producto.category)
        const last = categoria.label
        await producto.update({ category })
        ediciones.category = {
          last, now: newCategory.label
        }
      }
    }

    if (estado) {
      const newEstado = await EstadoProducto.findByPk(estado)
      if (!newEstado) {
        // throw new Error('No existe categoria con el id proporcionado')
        // Ver como pasar la descripcion del error al manejador del mismo
      } else {
        const lastEstado = await EstadoProducto.findByPk(producto.estado)
        const last = lastEstado.label
        await producto.update({ estado })
        ediciones.estado = { last, now: newEstado.label }
      }
    }
    res.status(200).json({ status: 200, msg: 'Ediciones realizadas con exito', ediciones })
  } catch (err) {
    return res.status(200).json({ status: 500, msg: 'Ha ocurrido un error mientras se editaba el producto', err, ediciones })
  }
}

module.exports = setProducto
