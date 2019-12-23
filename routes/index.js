const playerRoutes = require("./players");
const teamRoutes = require("./teams");
const leagueRoutes = require("./leagues");
const homeRoute = require("./home");
const sportRoutes = require("./sport");
const soccerRoutes = require("./sports/soccer");
const basketballRoutes = require("./sports/basketball");
const baseballRoutes = require("./sports/baseball");
const footballRoutes = require("./sports/football");

const constructorMethod = app => {
  app.use("/", homeRoute)
  app.use("/players", playerRoutes);
  app.use("/teams", teamRoutes);
  app.use("/leagues", leagueRoutes);
  app.use("/sport", sportRoutes);
  app.use("/sports/soccer", soccerRoutes);
  app.use("/sports/basketball", basketballRoutes);
  app.use("/sports/baseball", baseballRoutes);
  app.use("/sports/football", footballRoutes);
  

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;