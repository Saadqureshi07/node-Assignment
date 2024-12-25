const {Product} = require('./ProductSchema.js');
const {Category} = require('./CategorySchema.js');

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

module.exports = {Product,Category};