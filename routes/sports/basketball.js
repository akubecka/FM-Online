const express = require("express");
const router = express.Router();
const data = require("../../data");
const playerData = data.players;
const teamData = data.teams;
const leagueData = data.leagues;

  router.post("/league", async function (req,res){
    try{
        const leag = req.body.league;
        const rend = "layouts/basketball/"+ leag;
        res.render(rend, {league: leag});
        return;
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  });

  module.exports = router;