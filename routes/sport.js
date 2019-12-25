const express = require("express");
const router = express.Router();
const data = require("../data");
const playerData = data.players;
const teamData = data.teams;
const leagueData = data.leagues;
const fs = require("fs");
  router.post("/sport", async function (req,res){
    try{
        const sporty = req.body.sport;
        const rend = "layouts/sports/" + sporty;
        if(sporty=='soccer'){
          res.render("layouts/home", {title: "FM-Online",sport: sporty, soccer: true});
        }else if(sporty=='football'){
          res.render("layouts/home", {title: "FM-Online",sport: sporty, football: true});
        }else if(sporty=='basketball'){
          res.render("layouts/home", {title: "FM-Online",sport: sporty, basketball: true});
        }else if(sporty=='baseball'){
          res.render("layouts/home", {title: "FM-Online",sport: sporty, baseball: true});
        }
        return;
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.post("/soccerLeague", async function (req,res){
    try{
        const leag = req.body.league;
        const rend = "layouts/soccer/"+ leag;
        console.log("wuh");
        fs.readFile(__dirname+'/' + leag + '.txt', 'utf8', function(err, contents) {
          if (err) throw err;
          console.log(contents);
          res.render(rend, {league: leag, file: contents});
        });
        return;
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.post("/baseballLeague", async function (req,res){
    try{
        const leag = req.body.league;
        const rend = "layouts/baseball/"+ leag;
        fs.readFile(__dirname+'/' + leag + '.txt', 'utf8', function(err, contents) {
          if (err) throw err;
          console.log(contents);
          res.render(rend, {league: leag, file: contents});
        });
        return;
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.post("/basketballLeague", async function (req,res){
    try{
        const leag = req.body.league;
        const rend = "layouts/basketball/"+ leag;
        fs.readFile(__dirname+'/' + leag + '.txt', 'utf8', function(err, contents) {
          if (err) throw err;
          console.log(contents);
          res.render(rend, {league: leag, file: contents});
        });
        return;
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.post("/footballLeague", async function (req,res){
    try{
        const leag = req.body.league;
        const rend = "layouts/football/"+ leag;
        fs.readFile(__dirname+'/' + leag + '.txt', 'utf8', function(err, contents) {
          if (err) throw err;
          console.log(contents);
          res.render(rend, {league: leag, file: contents});
        });
        return;
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  });

  module.exports = router;