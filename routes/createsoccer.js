const express = require("express");
const router = express.Router();
const data = require("../data");
const playerData = data.players;
const teamData = data.teams;
const leagueData = data.leagues;
const fs = require("fs");

//We need a thing to check if league array or team array or players is empty
  
  router.post("/league", async function (req,res){
    try{
        const league = req.body.league;
        console.log(league);
        if(league == 'addLeague'){
            res.render("layouts/soccer/create", {addLeague: true})
        }else{
            res.render("layouts/soccer/create", {teamTime: true, teamArr: league.teamArr, leagueID: league})
        }
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.post("/addLeague", async function (req,res){
    try{
        const leagueName = req.body.leagueName;
        const leagueID = await leagueData.createID(leagueName);
        //const leagues = await leagueData.getAll();
        res.render("layouts/soccer/create", {message: "League successfully added.", league: leagueID})
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.post("/team/:id", async function (req,res){
  try{
      const leagueID = req.params.id;
      console.log(leagueID);
      const team = req.body.team;
      if(team == 'addTeam'){
          res.render("layouts/soccer/create", {addTeam: true, leagueID: leagueID});
      }else{
        res.render("layouts/soccer/create", {playerTime:true, leagueChosen: league.leagueName, teamArr: league.teamArr});
      }
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/addTeam/:id", async function (req,res){
  try{
      const leagueID = req.params.id;
      const teamName = req.body.teamName;
      const teamID = await teamData.createID(teamName);
      const team = await teamData.get(teamID);
      await leagueData.addTeam(leagueID, team);
      res.render("layouts/soccer/create", {message: "Team successfully added.", team: teamID, leagueID: leagueID})
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
});



router.post("/player/:teamID/:leagueID", async function (req,res){
    try{
        const teamID = req.params.teamID;
        const leagueID = req.params.leagueID;
        const player = req.body.player;
        if(player == 'addPlayer'){
            res.render("layouts/soccer/create", {addPlayer: true, teamID: teamID, leagueID: leagueID});
        }else{
            res.render("layouts/soccer/create", {teamChosen:team.teamName, playerArr: team.playerArr, teamID: teamID, leagueID: leagueID})
        }
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  });
  
  router.post("/addPlayer/:teamID/:leagueID", async function (req,res){
    try{
        const teamID = req.params.teamID;
        const leagueID = req.params.leagueID;
        const playerName = req.body.playerName;
        const playerID = await playerData.create(playerName);
        const player = await playerData.get(playerID);
        const addPlayertoTeam = await teamData.addPlayer(teamID, player); //PRETTY SURE WE WILL NEED TO UPDATE THE LEAGUES DATABASE TOO WITH EACH PLAYER ADD
        res.render("layouts/soccer/create", {message: "Player successfully added.", player: true, teamID: teamID, leagueID: leagueID})
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  });


  router.post("/successLeague", async function (req,res){
    try{
        const choice = req.body.choice;
        if(choice=='addLeague'){
            const leagues = await leagueData.getAll();
            res.render("layouts/soccer/create", {leagueTime:true, league:leagues})//Render the normal view league page
        }else{
            const league = await leagueData.getLeagueById(choice)
            res.render("layouts/soccer/create", {league: league, leagueID:league._id, addTeam:true});//Render the view league page for that league
        }
        return;
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.post("/successTeam/:id", async function (req,res){
    try{
        const leagueID = req.params.id;
        const choice = req.body.choice;
        console.log(choice);
        if(choice=='addTeam'){
            const leagues = await leagueData.getAll();
            res.render("layouts/soccer/create", {teamTime:true, leagues:leagues, leagueID:leagueID})//Render the normal view league page
        }else{
            console.log(leagueID);
            const league = await leagueData.getLeagueById(leagueID)
            res.render("layouts/soccer/create", {league: league, addPlayer:true, teamID: choice, leagueID:leagueID});//Render the view team page for that league
        }
        return;
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.post("/successPlayer/:teamID/:leagueID", async function (req,res){
    try{
        const teamID = req.params.teamID;
        const leagueID = req.params.leagueID;
        const team = req.body.choice;
        //const league = await leagueData.getLeagueById(choice)
        res.render("layouts/soccer/create", {addPlayer:true, teamID:teamID, leagueID:leagueID});//Render the view league page for that league
        return;
    }catch(e){
      console.log(e);
      res.sendStatus(500);
    }
  });

  module.exports = router;