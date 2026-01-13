const Admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Hämta alla i personalens förnamn
exports.getAllFirstnames = async(request, h) => {
    try {
        return await Admin.find({ firstname });
    } catch(err) {
        return h.response("Error with get-route: " + err).code(500);
    }
}

//Registrera en admin
exports.register = async(request, h) => {
    try {
        const {username, firstname, lastname, jobtitle, password} = request.payload;
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = new Admin({
            username,
            firstname,
            lastname,
            jobtitle,
            password: hashedPassword
        })

        return await admin.save();
    } catch(err) {
        return h.response("Error register an admin: " + err.messages).code(500);
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

        if(!matchedPassword){
            return h.response({ message: "Ogiltigt användarnamn/lösenord!"}).code(401);
        }else{
            //Skapa JWT
            const payload = { username: username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); 

            return h.response({ message: "Du är inloggad! ", token: token}).code(200);
        }

    } catch(err) {
        return h.response("Error logging in: " + err).code(500);
    }
}

//Uppdatera admin
exports.updateAdmin = async(request, h) => {
    try {
            const updateAdmin = await Admin.findByIdAndUpdate(request.params.id, request.payload,{ new: true, runValidators: true });
            if(!updateAdmin){
                return h.response({ message: "Admin med angivet id hittas inte, kontrollera och försök igen"}).code(404);
            } else {
                return h.response({message: `Uppdateringen lyckades med admin ${updateAdmin.firstname}`});
            }
    } catch(err) {
        return h.response("Error with update-route: " + err.messages).code(500);
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
