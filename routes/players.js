const express = require("express");
const router = express.Router();
const data = require("../data");
const playerData = data.players;
const teamData = data.teams;
const leagueData = data.leagues;

//Get player by ID
router.get("/:id", async (req, res) => {
    try {
      const player = await playerData.get(req.params.id);
      res.json(player);
    } catch (e) {
      res.status(404).json({ Error: "Can't find ID" });
    }
  });

  //Get all players
  router.get("/", async (req, res) => {
    try {
        console.log()
      const playerList = await playerData.getAll();
      res.json(playerList);
    } catch (e) {
      res.status(500).send();
    }
  });

  //Add player to database
  router.post("/", async (req, res) => {
    const playerInfo = req.body;
    const { name } = playerInfo;
    if(playerInfo && name) {
        try{
            const newP = await playerData.create(name);
            res.status(200).send(newP);
        }catch(e){
            res.sendStatus(500);
        }        
    }else if(!name){
        res.status(400).json({Error: "Need a name"});
        return;
    }else{
        res.status(400).json({error: "Need a type"});
        return;
    }
  });

//Delete player from database
router.delete("/:id", async (req,res) =>{
    var id = req.params.id;
    try{
        await playerData.get(id);
    }catch(e){
        res.status(404).json({Error: "Can't find ID"});
        return;
    }
    try{
        const delPlayer = await playerData.remove(id);
        res.status(200).send(delPlayer);
        return;
    }catch(e){
        res.status(500).json({Error: e});
        return;
    }
});

module.exports = router;