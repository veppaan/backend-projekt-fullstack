//Route för testa token

module.exports = (server) => {
    //Routes
    server.route([
        {
            //GET-route för att kolla testa token
            method: "GET",
            path: "/auth",
            options: { auth: 'jwt' },
            handler: (request, h) => {
                return {valid: true, user: request.auth.credentials}
            }
        }
    ])
}