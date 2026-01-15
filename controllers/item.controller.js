const Item = require("../models/item.model");

//Skriv ut välkomsmeddelande
exports.welcomeMessage = async(request, h) => {
    try {
        return "Välkommen till API:et, lägg till ändelsen /items för att komma till alla varor";
    } catch(err) {
        return h.response("Error with welcome-route: " + err).code(500);
    }
}

//Hämta alla varor
exports.getAllItems = async(request, h) => {
    try {
        return await Item.find();
    } catch(err) {
        return h.response("Error with get-route: " + err).code(500);
    }
}

//Hämta en vara
exports.getOneItem = async(request, h) => {
    try {
        const item = await Item.findById(request.params.id);
        //Kollar om varan finns, om inte så skrivs ett felmeddelande ut
        if(!item){
            return h.response({ message: "Vara med angivet id hittas inte, kontrollera och försök igen"}).code(404);
        } else {
            return await Item.findById(request.params.id);
        }
    } catch(err) {
        return h.response("Error with get-route: " + err).code(500);
    }
}

//Lägg till en vara
exports.addItem = async(request, h) => {
    try {
        //Kollar om artikelnummer som skickats in finns
        const { articleNumber } = request.payload
        const checkUniqueArt = await Item.findOne({ articleNumber })
        //Skicka error om den finns
        if(checkUniqueArt && checkUniqueArt !== currrentArt.articleNumber){
            return h.response({
                success: false,
                errors: {
                    articleNumber: 'Artikelnumret måste vara unikt'
                }
            }).code(409)
        }

        const item = new Item(request.payload);
        
        return await item.save();
    } catch(err) {
        return h.response("Error with post-route: " + err.messages).code(500);
    }
}

//Uppdatera vara
exports.updateItem = async(request, h) => {
    try {
            //Kollar om artikelnummer som skickats in finns
            const { id } = request.payload
            const currrentArt = await Item.findById(id)
            const { articleNumber } = request.payload
            const checkUniqueArt = await Item.findOne({ articleNumber })
            //Skicka error om den finns
            if(checkUniqueArt && checkUniqueArt !== currrentArt.articleNumber){
                return h.response({
                    success: false,
                    errors: {
                        articleNumber: 'Artikelnumret måste vara unikt'
                    }
                }).code(409)
            }

            //Uppdaterar varan
            const updateItem = await Item.findByIdAndUpdate(request.params.id, request.payload,{ new: true, runValidators: true });
            if(!updateItem){
                return h.response({ message: "Vara med angivet id hittas inte, kontrollera och försök igen"}).code(404);
            } else {
                return h.response({message: `Uppdateringen lyckades med varan ${updateItem.name}`});
            }
    } catch(err) {
        return h.response("Error with update-route: " + err.messages).code(500);
    }
}

//Uppdatera saldo för en vara
exports.updateStock = async(request, h) => {
    try {
        const { stock } = request.payload
            //Uppdaterar saldot
            const updateStock = await Item.findByIdAndUpdate(request.params.id, { stock },{ new: true, runValidators: true });
            if(!updateStock){
                return h.response({ message: "Vara med angivet id hittas inte, kontrollera och försök igen"}).code(404);
            } else {
                return h.response({message: `Saldot uppdaterades till ${updateStock.stock}`});
            }
    } catch(err) {
        return h.response("Error with updating stock: " + err + err.messages).code(500);
    }
}

//Radera varan
exports.deleteItem = async(request, h) => {
    try {
            const deleteItem = await Item.findByIdAndDelete(request.params.id);
            if(!deleteItem){
                return h.response({ message: "Varan med angivet id hittas inte, kontrollera och försök igen"}).code(404);
            } else {
                return h.response({message: `Raderingen lyckades med varan ${deleteItem.name}`});
            }
        } catch(err) {
        return h.response("Error with delete-route: " + err).code(500);
    }
}
