const express = require("express");
const router = express.Router();
const data = require("../data");
const playerData = data.players;
const teamData = data.teams;
const leagueData = data.leagues;

//Get player by ID
router.get("/:id", async (req, res) => {
    try {
      const league = await leagueData.get(req.params.id);
      res.json(league);
    } catch (e) {
      res.status(404).json({ Error: "Can't find ID" });
    }
  });

  //Get all leagues
  router.get("/", async (req, res) => {
    try {
      const leagueList = await leagueData.getAll();
      res.json(leagueList);
    } catch (e) {
      res.status(500).send();
    }
  });

  //Add league to database
  router.post("/", async (req, res) => {
    const leagueInfo = req.body;
    const { name, teams } = leagueInfo;
    if(leagueInfo && name && teams) {
        try{
            const newL = await leagueData.create(name, teams);
            res.status(200).send(newL);
        }catch(e){
            res.sendStatus(500);
        }        
    }else if(!name){
        res.status(400).json({Error: "Need a name"});
        return;
    }else{
        res.status(400).json({error: "Need teams"});
        return;
    }
  });

//Delete league from database
router.delete("/:id", async (req,res) =>{
    var id = req.params.id;
    try{
        await leagueData.get(id);
    }catch(e){
        res.status(404).json({Error: "Can't find ID"});
        return;
    }
    try{
        const delLeague = await leagueData.remove(id);
        res.status(200).send(delLeague);
        return;
    }catch(e){
        res.status(500).json({Error: e});
        return;
    }
});

module.exports = router;