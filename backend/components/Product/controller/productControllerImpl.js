/**
 *  Object containing all helper methods for Product objects
 * @module ProductController
 * @param {Object} ProductService - Object containing all helper functions for the Product objects
 */
const productController = (ProductService) => {
  return {
    /**
     * @function createProduct
     * @description Create a new product
     * <br>Access: Private/Admin
     * @route   POST /api/products/
     * @returns {Product} The newly created product
     */
    createProduct: createProduct(ProductService),
    /**
     * @function getProductById
     * @description Get a product by ID
     * <br>Access: Private
     * @route GET /api/products/:id
     * @returns {Product} Product Object
     */
    getProductById: getProductById(ProductService),
    /**
     * @function getProducts
     * @description Get all products
     * <br>Access: Private
     * @route GET /api/products/
     * @returns {Product[]} List of all Products in the DB
     */
    getProducts: getProducts(ProductService),
    /**
     * @function updateProduct
     * @description Update product
     * <br>Access: Private/Admin
     * @route PUT /api/products/:id
     * @returns {Product} The updated product
     */
    updateProduct: updateProduct(ProductService),

    /**
     * @function deleteProduct
     * @description Delete a product
     * <br>Access: Private/Admin
     * @route   DELETE /api/products/:id
     * @returns {Object} Object with `message` parameter
     */
    deleteProduct: deleteProduct(ProductService),
  };
};

export default productController;
