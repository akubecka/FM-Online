const playerRoutes = require("./players");
const teamRoutes = require("./teams");
const leagueRoutes = require("./leagues");
const homeRoute = require("./home");
const sportRoutes = require("./sport");
const createsoccerRoutes = require("./createsoccer");


const constructorMethod = app => {
  app.use("/", homeRoute)
  app.use("/players", playerRoutes);
  app.use("/teams", teamRoutes);
  app.use("/leagues", leagueRoutes);
  app.use("/sport", sportRoutes);
  app.use("/createsoccer", createsoccerRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;