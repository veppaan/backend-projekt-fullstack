const itemController = require("../controllers/item.controller");
const Joi = require("joi");

module.exports = (server) => {
           //Felhantering som gör så att specifika meddelanden från joi kan visas
           const failAction = (request, h, error) => {
            return h.response({
              success: false,
              error: error.details[0].message
            }).code(400).takeover();
          };
    //Routes
    server.route([
        {
            //GET-route för alla varor
            method: "GET",
            path: "/items",
            handler: itemController.getAllItems,
            options: { auth: 'jwt' }
        },
        {
            //GET-route för angivet id
            method: "GET",
            path: "/items/{id}",
            handler: itemController.getOneItem,
            options: { auth: 'jwt' }
        },
        {
            //POST-route med valideringar och meddelanden 
            method: "POST",
            path: "/items",
            handler: itemController.addItem,
            options: {
                auth: 'jwt',
                validate: {
                    payload: Joi.object({
                        name: Joi.string().min(3).max(50).required()
                            .messages({
                                'string.empty': 'Namn får inte vara tomt!',
                                'any.required': 'Namn är obligatorisk att fylla i!',
                                'string.base': 'Namn måste vara en sträng!',
                                'string.min': 'Namn får inte vara mindre än 3 tecken!',
                                'string.max': 'Namn får inte vara längre än 50 tecken!'
                            }),
                        description: Joi.string()
                            .messages({
                                'string.base': 'Namn måste vara en sträng!'
                            }),
                        price: Joi.number().min(1).max(10000).required()
                            .messages({
                                'number.base': 'Pris måste vara ett nummer!',
                                'any.required': 'Pris är obligatorisk att fylla i!',
                                'number.min': 'Pris får inte vara mindre än 1!',
                                'number.max': 'Pris får inte vara mer än 10000!'
                            }),
                        stock: Joi.number().min(0).max(10000).required()
                            .messages({
                                'number.base': 'Stock (lagersaldo) måste vara ett nummer!',
                                'any.required': 'Stock (lagersaldo) är obligatorisk att fylla i!',
                                'number.min': 'Stock (lagersaldo) får inte vara mindre än 1!',
                                'number.max': 'Stock (lagersaldo) får inte vara mer än 10000!'
                            }),
                        articleNumber: Joi.number().min(1).max(999).required()
                            .messages({
                                'number.base': 'Artikelnummer måste vara ett nummer!',
                                'any.required': 'Artikelnummer är obligatorisk att fylla i!',
                                'number.min': 'Artikelnummer får inte vara mindre än 1!',
                                'number.max': 'Artikelnummer får inte vara mer än 999!'
                            }),
                        image: Joi.string()
                            .messages({
                                'string.base': 'Bildens url måste vara en sträng!',
                            })
                    }),
                    failAction: failAction
                },
            }
        },
        {
            //Uppdatera en vara med angivet id
            method: "PUT",
            path: "/items/{id}",
            handler: itemController.updateItem,
            options: {
                auth: 'jwt',
                validate: {
                    payload: Joi.object({
                        name: Joi.string().min(3).max(50).required()
                            .messages({
                                'string.empty': 'Namn får inte vara tomt!',
                                'any.required': 'Namn är obligatorisk att fylla i!',
                                'string.base': 'Namn måste vara en sträng!',
                                'string.min': 'Namn får inte vara mindre än 3 tecken!',
                                'string.max': 'Namn får inte vara längre än 50 tecken!'
                            }),
                        description: Joi.string()
                            .messages({
                                'string.base': 'Namn måste vara en sträng!'
                            }),
                        price: Joi.number().min(1).max(10000).required()
                            .messages({
                                'number.base': 'Pris måste vara ett nummer!',
                                'any.required': 'Pris är obligatorisk att fylla i!',
                                'number.min': 'Pris får inte vara mindre än 1!',
                                'number.max': 'Pris får inte vara mer än 10000!'
                            }),
                        stock: Joi.number().min(0).max(10000).required()
                            .messages({
                                'number.base': 'Stock (lagersaldo) måste vara ett nummer!',
                                'any.required': 'Stock (lagersaldo) är obligatorisk att fylla i!',
                                'number.min': 'Stock (lagersaldo) får inte vara mindre än 1!',
                                'number.max': 'Stock (lagersaldo) får inte vara mer än 10000!'
                            }),
                        articleNumber: Joi.number().min(1).max(10000).required()
                            .messages({
                                'number.base': 'Artikelnummer måste vara ett nummer!',
                                'any.required': 'Artikelnummer är obligatorisk att fylla i!',
                                'number.min': 'Artikelnummer får inte vara mindre än 1!',
                                'number.max': 'Artikelnummer får inte vara mer än 999!'
                            }),
                        image: Joi.string()
                            .messages({
                                'string.base': 'Bildens url måste vara en sträng!',
                            })
                    }),
                },
            }
        },
        {
            //Uppdatera en saldo med angivet id
            method: "PUT",
            path: "/items/edit/{id}",
            handler: itemController.updateStock,
            options: {
                auth: 'jwt',
                validate: {
                    payload: Joi.object({
                        stock: Joi.number().min(0).max(10000).required()
                            .messages({
                                'number.base': 'Stock (lagersaldo) måste vara ett nummer!',
                                'any.required': 'Stock (lagersaldo) är obligatorisk att fylla i!',
                                'number.min': 'Stock (lagersaldo) får inte vara mindre än 1!',
                                'number.max': 'Stock (lagersaldo) får inte vara mer än 10000!'
                            })
                    }),
                },
            }
        },
        {
            //Radera en vara med angivet id
            method: "DELETE",
            path: "/items/{id}",
            handler: itemController.deleteItem,
            options: { auth: 'jwt' }
        }
    ])
}