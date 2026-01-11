const adminController = require("../controllers/admin.controller");
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
            //GET-route för personalens förnamn
            method: "GET",
            path: "/admins",
            handler: adminController.getAllFirstnames
        },
        {
            //GET-route för personalens förnamn
            method: "POST",
            path: "/admins/login",
            handler: adminController.login
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
                        lastname: Joi.string()
                            .messages({
                                'string.base': 'Förnamn måste vara en sträng!'
                            }),
                        jobtitle: Joi.string().min(3).max(50).required()
                            .messages({
                                'string.empty': 'Jobbtitel får inte vara tomt!',
                                'any.required': 'Jobbtitel är obligatorisk att fylla i!',
                                'string.base': 'Jobbtitel måste vara en sträng!',
                                'string.min': 'Jobbtitel får inte vara mindre än 3 tecken!',
                                'string.max': 'Jobbtitel får inte vara längre än 50 tecken!'
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
                    failAction: failAction
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
                        lastname: Joi.string()
                            .messages({
                                'string.base': 'Förnamn måste vara en sträng!'
                            }),
                        jobtitle: Joi.string().min(3).max(50).required()
                            .messages({
                                'string.empty': 'Jobbtitel får inte vara tomt!',
                                'any.required': 'Jobbtitel är obligatorisk att fylla i!',
                                'string.base': 'Jobbtitel måste vara en sträng!',
                                'string.min': 'Jobbtitel får inte vara mindre än 3 tecken!',
                                'string.max': 'Jobbtitel får inte vara längre än 50 tecken!'
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
                    failAction: failAction
                },
            }
        },
        {
            //Radera en admin med angivet id
            method: "DELETE",
            path: "/admins/{id}",
            handler: adminController.deleteAdmin
        }
    ])
}