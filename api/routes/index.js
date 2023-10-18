
const itemsRoutes = require('./items.routes');
const cardsRoutes = require('./cards.routes');
const usersRoutes = require('./users.routes');
const authRoutes = require('./auth.routes');
const commandesRoutes = require('./commandes.routes');
const servicesRoutes = require('./Services.routes');


module.exports = function(app) {

    app.use("/api/items", itemsRoutes);
    app.use("/api/cards", cardsRoutes);
    app.use("/api/users", usersRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/orders", commandesRoutes);
    app.use("/api/services", servicesRoutes);
  };
