const { body, param, validationResult } = require('express-validator');


const validateParamID = param('id')
                        .notEmpty()
                        .withMessage('ID is required')
                        .isInt({min: 1})
                        .withMessage('ID must be a positive Integer');

const validateBodyName = body('name')
                        .notEmpty()
                        .withMessage('Name is required')
                        .isString()
                        .withMessage('Name must be a string');

const validateBodyDescription = body('description')
                                .optional()
                                .isString()
                                .withMessage('Description must be a string');
                                
const validateBodyPrice =  body('price')
                            .notEmpty()
                            .withMessage('Price is required')
                            .isFloat({ gt: 0 })
                            .withMessage('Price must be a positive number')
                            .custom((value) => {
                                if (typeof value !== 'number') {
                                  throw new Error('Price must be a number');
                                }
                                return true;
                              });  
                            
const validateBodyQuantity = body('quantity')
                            .notEmpty()
                            .withMessage('Quantity is required')
                            .isInt({ min: 0 })
                            .withMessage('Quantity must be a non-negative integer')
                            .custom((value) => {
                                if (typeof value !== 'number') {
                                  throw new Error('Quantity must be a number');
                                }
                                return true;
                              });          


const validateNewItems = [
    validateBodyName,
    validateBodyDescription,
    validateBodyPrice,
    validateBodyQuantity,
];


const checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
    validateParamID,
  validateNewItems,
  checkValidationResult
};
