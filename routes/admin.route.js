const adminController = require("../controllers/admin.controller");
const Joi = require("joi");

module.exports = (server) => {
    //Felhantering som gör så att specifika meddelanden från joi kan visas
    const failAction = (request, h, error) => {
        const errors = {}
        //Tar ut error-meddelanden med namn i loop
            error.details.forEach(e => {
                const nameErr = e.path[0]
                errors[nameErr] = e.message
            });
        
    return h.response({
        success: false,
        errors: errors
    }).code(400).takeover();
};
    //Routes
    server.route([
        {
            //GET-route för personalens förnamn
            method: "GET",
            path: "/admins",
            handler: adminController.getAllFirstnames,
            options: { auth: 'jwt' }
        },
        {
            //POST-route för att logga in
            method: "POST",
            path: "/admins/login",
            handler: adminController.login,
            options: {
                validate: {
                    payload: Joi.object({
                        username: Joi.string().required()
                            .messages({
                                'string.empty': 'Användarnamn får inte vara tomt!',
                                'any.required': 'Användarnamn är obligatorisk att fylla i!'
                            }),
                        password: Joi.string().required()
                            .messages({
                                'string.empty': 'Lösenord får inte vara tomt!',
                                'any.required': 'Lösenord är obligatorisk att fylla i!'
                            })
                    }),
                    failAction: failAction,
                    options: {
                        abortEarly: false
                    }
                },
            }
        },
        {
            //POST-route med valideringar och meddelanden för registrering av admin
            method: "POST",
            path: "/admins/register",
            handler: adminController.register,
            options: {
                validate: {
                    payload: Joi.object({
                        username: Joi.string().min(3).max(50).required()
                            .messages({
                                'string.empty': 'Användarnamn får inte vara tomt!',
                                'any.required': 'Användarnamn är obligatorisk att fylla i!',
                                'string.base': 'Användarnamn måste vara en sträng!',
                                'string.min': 'Användarnamn får inte vara mindre än 3 tecken!',
                                'string.max': 'Användarnamn får inte vara längre än 50 tecken!'
                            }),
                        firstname: Joi.string().min(3).max(50).required()
                            .messages({
                                'string.empty': 'Förnamn får inte vara tomt!',
                                'any.required': 'Förnamn är obligatorisk att fylla i!',
                                'string.base': 'Förnamn måste vara en sträng!',
                                'string.min': 'Förnamn får inte vara mindre än 3 tecken!',
                                'string.max': 'Förnamn får inte vara längre än 50 tecken!'
                            }),
                        password: Joi.string().min(3).max(100).required()
                            .messages({
                                'string.empty': 'Lösenord får inte vara tomt!',
                                'any.required': 'Lösenord är obligatorisk att fylla i!',
                                'string.base': 'Lösenord måste vara en sträng!',
                                'string.min': 'Lösenord får inte vara mindre än 3 tecken!',
                                'string.max': 'Lösenord får inte vara längre än 100 tecken!'
                            }),
                        key: Joi.string().required()
                            .messages({
                                'string.empty': 'Företagskod får inte vara tomt!',
                                'any.required': 'Företagskod är obligatorisk att fylla i!',
                                'string.base': 'Företagskod måste vara en sträng!'
                            })
                    }),
                    failAction: failAction,
                    options: {
                        abortEarly: false
                    }
                },
            }
        },
        {
            //Uppdatera en admin med angivet id
            method: "PUT",
            path: "/admins/{id}",
            handler: adminController.updateAdmin,
            options: {
                validate: {
                    payload: Joi.object({
                        username: Joi.string().min(3).max(50)
                            .messages({
                                'string.empty': 'Användarnamn får inte vara tomt!',
                                'any.required': 'Användarnamn är obligatorisk att fylla i!',
                                'string.base': 'Användarnamn måste vara en sträng!',
                                'string.min': 'Användarnamn får inte vara mindre än 3 tecken!',
                                'string.max': 'Användarnamn får inte vara längre än 50 tecken!'
                            }),
                        firstname: Joi.string().min(3).max(50)
                            .messages({
                                'string.empty': 'Förnamn får inte vara tomt!',
                                'any.required': 'Förnamn är obligatorisk att fylla i!',
                                'string.base': 'Förnamn måste vara en sträng!',
                                'string.min': 'Förnamn får inte vara mindre än 3 tecken!',
                                'string.max': 'Förnamn får inte vara längre än 50 tecken!'
                            }),
                        password: Joi.string().min(3).max(100).required()
                            .messages({
                                'string.empty': 'Lösenord får inte vara tomt!',
                                'any.required': 'Lösenord är obligatorisk att fylla i!',
                                'string.base': 'Lösenord måste vara en sträng!',
                                'string.min': 'Lösenord får inte vara mindre än 3 tecken!',
                                'string.max': 'Lösenord får inte vara längre än 100 tecken!'
                            })
                    }),
                    failAction: failAction,
                    options: {
                        abortEarly: false
                    }
                },
                auth: 'jwt',
            }
        },
        {
            //Radera en admin med angivet id
            method: "DELETE",
            path: "/admins/{id}",
            handler: adminController.deleteAdmin,
            options: { auth: 'jwt' }
        }
    ])
}