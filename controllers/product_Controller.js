const Products = require('../models/Product'); 
const { Op } = require('sequelize');


const createProduct = async (req, res) => {
    try {
      const {  name,description , price, quantity } = req.body;
      console.log('Received data:', {  name,description , price, quantity }); 
      
      const newProduct = await Products.create({ name,description , price, quantity });
      
      console.log('New Product created:', newProduct); 
      
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating Product:', error); 
      res.status(400).json({ error: 'Error creating Product' });
    }
  };




  const getAllProducts = async (req, res) => {
    const { name } = req.query;
    
    try {
      let products;
  
      if (name) {

        console.log(name)
        products = await Products.findAll({
          where: {
            name: {
              [Op.like]: `%${name}%`, 
            },
          },
        });
      } else {
        products = await Products.findAll();
      }
  
      if (products.length > 0) {
        res.status(200).json(products);
      } else {
        res.status(404).json({ message: name ? `No products found matching the name '${name}'` : 'No products found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving products' });
    }
  };
  
const getProductById = async (req, res) => {
   const productId = parseInt(req.params.id, 10);

  

  try {
    const product = await Products.findByPk(productId); 
    if (product) {
      res.status(200).json(product); 
    } else {
      res.status(404).json({ error: `Product with ID ${productId} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving product' });
  }
};

const updateProduct = async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  const { name, description, price, quantity } = req.body;

  try {
    const product = await Products.findByPk(productId);
    console.log(product)
    if (!product) {
      return res.status(404).json({ error: `Product with ID ${productId} not found` });
    }

    const fieldsToUpdate = {};
    if (name !== undefined) fieldsToUpdate.name = name;
    if (description !== undefined) fieldsToUpdate.description = description;
    if (price !== undefined) fieldsToUpdate.price = price;
    if (quantity !== undefined) fieldsToUpdate.quantity = quantity;

    await Products.update(fieldsToUpdate, { where: { id: productId } });

    const updatedProduct = await Products.findByPk(productId);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
};

const deleteProduct = async (req, res) => {
     const productId = parseInt(req.params.id, 10);
    try {
      const product = await Products.findByPk(productId);
      if (product) {
        await product.destroy();
        res.status(200).json({ message: `Product with ID ${productId} deleted successfully` });
      } else {
        res.status(404).json({ error: `Product with ID ${productId} not found` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting Product' });
    }
  };

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
