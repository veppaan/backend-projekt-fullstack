const Item = require("../models/item.model");

module.exports = (server) => {
    //Route
server.route([
    {
        method: "GET",
        path: "/items",
        handler: async (request, h) => {
            try {
                return await Item.find();
            } catch (error) {
                return h.response("There was an error fetching all items: " + error).code(500);
            }
        }
    },
    {
        method: "POST",
        path: "/items",
        handler: async (request, h) => {
            try {
                const item = new Item(request.payload);
                return await item.save();
            } catch (error) {
                return h.response("There was an error posting an item: " + error).code(500);
            }
        }
    }
])
}