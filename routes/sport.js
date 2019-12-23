const express = require("express");
const router = express.Router();
const data = require("../data");
const playerData = data.players;
const teamData = data.teams;
const leagueData = data.leagues;

  router.post("/sport", async function (req,res){
    try{
        const sporty = req.body.sport;
        const rend = "layouts/sports/" + sporty;
        res.render(rend, {sport: sporty});
        return;
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  });

  module.exports = router;