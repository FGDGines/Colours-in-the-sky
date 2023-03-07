
const { DataTypes } = require('sequelize')
const { db } = require('./conexion')

const Producto = db.define('producto', {
  name: {
    type: DataTypes.STRING
  },
  slug: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.JSON
  },
  category: {
    type: DataTypes.NUMBER
  },
  price: {
    type: DataTypes.NUMBER
  },
  estado: {
    type: DataTypes.NUMBER
  },
  details: {
    type: DataTypes.STRING
  }
})

const EstadoProducto = db.define('estado_producto', {
  label: {
    type: DataTypes.STRING
  }
}, {
  updatedAt: false,
  createdAt: false
})

const Categoria = db.define('categorias', {
  label: {
    type: DataTypes.STRING
  }
}, {
  updatedAt: false,
  createdAt: false
})

Producto.belongsTo(Categoria, { foreignKey: 'category', as: 'categoria' })
Producto.belongsTo(EstadoProducto, { foreignKey: 'estado', as: 'estados' })

module.exports = {
  Producto,
  Categoria,
  EstadoProducto
}
