const {Product,Category} = require("../Schema/Association.js")

const createCategory = async (req, res) => {
  try {
    const data = req.body;
    const category = await Category.create(data);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).send("Category name is required to update.");
  }
  try {
    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category) {
      return res.status(404).send("Category not found");
    }
    category.name = name;
    await category.save();
    res.send("Category name updated successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category) {
      return res.status(404).send("Category not found");
    }
    const associatedProducts = await Product.findAll({ where: { categoryId } });
    if (associatedProducts.length > 0) {
      return res.status(400).send("Cannot delete category with associated products.");
    }
    await Category.destroy({ where: { id: categoryId } });

    res.send("Category deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
};
