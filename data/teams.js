const mongoCollections = require("./collections");
const teams = mongoCollections.teams;
const players = require("./players");
const leagues = require("./leagues");

module.exports = {
    //Create and add a team to the database
    async createID(name) { //ADD A LOT MORE PLAYER DETAILS TO THIS
      if (name == undefined) throw new Error("Name is undefined.");
      //if (players == undefined) throw new Error("Players is undefined.");//MAYBE FINE TO HAVE NO PLAYERS
      if (typeof name !== "string") throw new Error("Name needs to be a string.");
      //if (typeof players !== "array") throw new Error("Players needs to be an array.");
  
      const data = await teams();
  
      var teamObj = {
        teamName: name,
        playerArr: []
      };
  
      const insertInfo = await data.insertOne(teamObj);
      if (insertInfo.insertedCount === 0) throw new Error("Could not add team.");
      const newId = insertInfo.insertedId;
      const team = await this.get(newId);
      return newId;
    },
  
    //Returns all teams in database
    async getAll(){
      const teamCollection = await teams();
      const team = await teamCollection.find({}).toArray();
      return team;
    },

    //Adds player to the team
    async addPlayer(teamID, player){
      const Tdata = await teams();
      console.log(player);
      ObjectId = require('mongodb').ObjectID;
      await Tdata.updateOne(
        {_id: ObjectId(teamID)},
        {$push: {playerArr: player}}
      );
      const team = await this.get(teamID);
      return player;
    },

    //Get the team given ID
    async get(id){
      if(id == undefined) throw new Error("ID is undefined.");
      if(typeof id != "object" && typeof id !="string") throw new Error("ID must be string.");
      
      var ObjectID = require('mongodb').ObjectID;
      if(ObjectID.isValid(id)){
        id = new ObjectID(id); // wrap in ObjectID
      }else{
        throw new Error("ID is not a valid ObjectID");
      }
  
      const data = await teams();
      const str = await data.findOne({_id: id })
      if(str===null) throw new Error("Can't find ID");
      return str;
    },
  
    //Remove team from database
    //Remember to also remove team from leagues and players if necesary?
    async remove(id){
      if(id==undefined) throw new Error("ID is undefined");
      if(typeof id != "object" && typeof id !="string") throw new Error("ID must be string.");
      const teamCollection = await teams();
      var temp = await this.get(id);
  
      var ObjectID = require('mongodb').ObjectID;
      id = new ObjectID(id);
      
      let deleted = {deleted: true, data: temp};
  
      const deletionInfo = await teamCollection.removeOne({ _id: id });
      if (deletionInfo.deletedCount === 0) {
        throw new Error("Could not delete team with id of ${id}");
      }
      return deleted;
    },
  
    //Adds team to league
    async addTeamToLeague(){
      //uhh
    },
  
    //Add data if they win/lose and stuff
    async addTeamData(){
      //uhh
    },

      //Adds player to team
    async addPlayerToTeam(){
        //uhh
    }
    //Not sure if I should add players to teams here or in players?
    //Prolly here actually
  };