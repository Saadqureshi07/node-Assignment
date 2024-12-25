const {Product,Category} = require("../Schema/Association.js")

const createProduct = async (req, res) => {
  console.log(req.body)
  try {
    const { name, CategoryName } = req.body;
    if (!CategoryName) {
      return res.status(400).json({ message: "CategoryName is required" });
    }
    const category = await Category.findOne({ where: { name: CategoryName } });
    if (!category) {
      return res.status(404).json({ message: "Category not Found" });
    }
    const product = await Product.create({ name, categoryId: category.id });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


const getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findOne({
      where: { id: productId },
      include: [{ model: Category, attributes: ['name'] }]
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      ProductId: product.id,
      name: product.name,
      CategoryName: product.Category ? product.Category.name : "Category not found",
      CategoryId: product.categoryId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: Category,
        attributes: ['name'] 
      }]
    });
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    const productsWithCategory = products.map(product => ({
      ProductId: product.id,
      name: product.name,
      category: product.Category ? product.Category.name : "Category not found",
      CategoryId: product.categoryId,
    }));
    return res.status(200).json(productsWithCategory);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getProductsByPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const products = await Product.findAll({
      offset: offset,
      limit: limit,
      include: [{
        model: Category,
        attributes: ['name']
      }]
    });
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    const totalProducts = await Product.count();
    const totalPages = Math.ceil(totalProducts / pageSize);
    const productsWithCategory = products.map(product => ({
      ProductId: product.id,
      ProductName: product.name,
      CategoryName: product.Category ? product.Category.name : "Category not found",
      CategoryId: product.categoryId,
    }));
    return res.status(200).json({
      products: productsWithCategory,
      pagination: {
        totalProducts: totalProducts,
        totalPages: totalPages,
        currentPage: page,
        pageSize: pageSize,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  if (!productId) {
    return res.status(400).send("Product ID is required");
  }
  try {
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    await Product.destroy({ where: { id: productId } });
    const remainingProducts = await Product.findAll({
      where: { categoryId: product.categoryId }
    });
    if (remainingProducts.length === 0) {
      await Category.destroy({ where: { id: product.categoryId } });
    }
    res.send("Product and category (if empty) deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name } = req.body;  
  if (!name) {
    return res.status(400).send("Name is required to update the product.");
  }
  try {
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    product.name = name;  
    await product.save();
    res.send("Product updated successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { createProduct, getProducts ,getProductById,getProductsByPagination, deleteProduct , updateProduct};