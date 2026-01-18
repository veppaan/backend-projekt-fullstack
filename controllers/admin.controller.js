const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Hämta alla i personalens förnamn
exports.getAllFirstnames = async(request, h) => {
    try {
        return await Admin.find({}, {firstname: 1, _id: 0});
    } catch(err) {
        return h.response("Error with get-route: " + err).code(500);
    }
}

//Registrera en admin
exports.register = async(request, h) => {
    try {
        //Kollar om användarnamn som skickats in finns
        const {username, firstname, password, key} = request.payload;
        //Ignorerar nuvarande id för att den inte ska hitta sig själv
        const checkUniqueUser = await Admin.findOne({ username: username, _id: { $ne: request.params.id } })
        //Skicka error om den finns
        if(checkUniqueUser){
            return h.response({
                success: false,
                errors: {
                    username: 'Användarnamnet måste vara unikt'
                }
            }).code(409)
        }
        if(key !== process.env.REGISTER_KEY){
            return h.response({
                success: false,
                errors: {
                    key: 'Fel företagskod för att kunna skapa konto!'
                }
            }).code(401)
        }

        //Hashar lösenord med saltning 10
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({
            username,
            firstname,
            password: hashedPassword,
            key
        })

        return await admin.save();
    } catch(err) {
        return h.response("Error register an admin: " + err).code(500);
    }
}

//Logga in en admin
exports.login = async(request, h) => {
    try {
        const { username, password } = request.payload;
        const adminUsername = await Admin.findOne({ username });

        if(!adminUsername){
            return h.response({ message: "Ogiltigt användarnamn/lösenord!"}).code(401);
        }

        const matchedPassword = await bcrypt.compare(password, adminUsername.password);
        
        const firstnameUser = adminUsername.firstname

        if(!matchedPassword){
            return h.response({ message: "Ogiltigt användarnamn/lösenord!"}).code(401);
        }else{
            //Skapa JWT
            const payload = { username: username, firstname: firstnameUser };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '3h' }); 

            return h.response({ message: "Du är inloggad! ", token: token}).code(200);
        }

    } catch(err) {
        return h.response("Error logging in: " + err).code(500);
    }
}

//Uppdatera admin
exports.updateAdmin = async(request, h) => {
    try {
        const { firstname, username, password } = request.payload;
        const hashedPassword = await bcrypt.hash(password, 10);

            const updateAdmin = await Admin.findByIdAndUpdate(request.params.id, { firstname, username, password: hashedPassword} , { new: true, runValidators: true });
            if(!updateAdmin){
                return h.response({ message: "Admin med angivet id hittas inte, kontrollera och försök igen"}).code(404);
            } else {
                return h.response({message: `Uppdateringen lyckades med admin ${updateAdmin.firstname}`});
            }
    } catch(err) {
        return h.response("Error with update-route: " + err).code(500);
    }
}

//Radera admins inloggning
exports.deleteAdmin = async(request, h) => {
    try {
            const deleteAdmin = await Admin.findByIdAndDelete(request.params.id);
            if(!deleteAdmin){
                return h.response({ message: "Admin med angivet id hittas inte, kontrollera och försök igen"}).code(404);
            } else {
                return h.response({message: `Raderingen lyckades med admin ${deleteAdmin.firstname}`});
            }
        } catch(err) {
        return h.response("Error with delete-route: " + err).code(500);
    }
}
