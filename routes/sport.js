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

  router.post("/createSoccerLeague", async function (req,res){
    try{
        const leagueName = req.body.leagueName;
        const teamName = req.body.teamName;//Check to see if any teams are already named this or not whatever
        const playerName = req.body.playerName;
        const leagueID = await leagueData.createID(leagueName);
        const player = await playerData.create(playerName);
        const teamID = await teamData.createID(teamName);
        await teamData.addPlayer(teamID, player);//Adds player to league
        const team = await teamData.get(teamID);
        await leagueData.addTeam(leagueID, team);//Adds team to league
        const leagues = await leagueData.getAll();
        if(req.body.leagueName){
          //Add the league
        }
        res.render("layouts/soccer/create", {leagues: leagues})
        return;
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.post("/createSoccerTeam", async function (req,res){
    try{
        const leagueName = req.body.leagueName;
        const teamName = req.body.teamName;//Check to see if any teams are already named this or not whatever
        const playerName = req.body.playerName;
        const leagueID = await leagueData.createID(leagueName);
        const player = await playerData.create(playerName);
        const teamID = await teamData.createID(teamName);
        await teamData.addPlayer(teamID, player);//Adds player to league
        const team = await teamData.get(teamID);
        await leagueData.addTeam(leagueID, team);//Adds team to league
        const leagues = await leagueData.getAll();
        res.render("layouts/soccer/create", {leagues: leagues})
        return;
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.post("/createSoccerPlayer", async function (req,res){
    try{
        const leagueName = req.body.leagueName;
        const teamName = req.body.teamName;//Check to see if any teams are already named this or not whatever
        const playerName = req.body.playerName;
        const leagueID = await leagueData.createID(leagueName);
        const player = await playerData.create(playerName);
        const teamID = await teamData.createID(teamName);
        await teamData.addPlayer(teamID, player);//Adds player to league
        const team = await teamData.get(teamID);
        await leagueData.addTeam(leagueID, team);//Adds team to league
        const leagues = await leagueData.getAll();
        res.render("layouts/soccer/create", {leagues: leagues})
        return;
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.post("/soccerLeague", async function (req,res){
    try{
        const leag = req.body.league;
        if(leag=='create'){
          const teams = await teamData.getAll();
          res.render("layouts/soccer/create", {teams: teams})
          return;
        }
        if(leag=='bpl'){//THIS DOESNT WORK IM THINKING WE COULD STORE THE HANDLEBARS STRING IN MONGO AND THEN GRAB IT HERE AND HANDLEBAR IT SEPERATELY ON THE SAME PAGE
                        //OR ACTUALLY WE COULD JUST READ THE HANDLEBAR STRING HERE AND PASS IT TO THE BPL HANDLEBAR AS 'FILE' CONTENTS
          var spawn = require("child_process").spawn; 
          var process = spawn('python',["./test.py"]);
        }
        const rend = "layouts/soccer/"+ leag;
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