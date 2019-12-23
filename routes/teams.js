const express = require("express");
const router = express.Router();
const data = require("../data");
const playerData = data.players;
const teamData = data.teams;
const leagueData = data.leagues;


//Get team by ID
router.get("/:id", async (req, res) => {
  try {
    const team = await teamData.get(req.params.id);
    res.json(team);
  } catch (e) {
    res.status(404).json({ Error: "Can't find ID" });
  }
});

//Get all teams
router.get("/", async (req, res) => {
  try {
    const teamList = await teamData.getAll();
    res.json(teamList);
  } catch (e) {
    res.status(500).send();
  }
});

//Add team to database
router.post("/", async (req, res) => {
  const teamInfo = req.body;
  const { name, players } = teamInfo;
  if(teamInfo && name && players) {
      try{
          const newT = await teamData.create(name, players);
          res.status(200).send(newT);
      }catch(e){
          res.sendStatus(500);
      }        
  }else if(!name){
      res.status(400).json({Error: "Need a name"});
      return;
  }else{
      res.status(400).json({error: "Need players"});
      return;
  }
});

//Delete team from database
router.delete("/:id", async (req,res) =>{
  var id = req.params.id;
  try{
      await teamData.get(id);
  }catch(e){
      res.status(404).json({Error: "Can't find ID"});
      return;
  }
  try{
      const delTeam = await teamData.remove(id);
      res.status(200).send(delTeam);
      return;
  }catch(e){
      res.status(500).json({Error: e});
      return;
  }
});

module.exports = router;