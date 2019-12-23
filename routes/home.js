const express = require("express");
const router = express.Router();
const data = require("../data");
const playerData = data.players;
const teamData = data.teams;
const leagueData = data.leagues;

router.get("/", async (req, res) => {
    try {
        res.render("layouts/home", {title: "FM-Online"});
    } catch (e) {
      res.status(500).send();
    }
  });

  module.exports = router;