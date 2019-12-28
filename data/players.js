const mongoCollections = require("./collections");
const players = mongoCollections.players;
const leagues = require("./leagues");
const teams = require("./teams");

module.exports = {
  //Create and add a player to the database
  async create(name) { //ADD A LOT MORE PLAYER DETAILS TO THIS
    if (name == undefined) throw new Error("Name is undefined.");
    if (typeof name !== "string") throw new Error("Name needs to be a string.");
    //if (typeof animalType !== "string") throw new Error("String needs to be a string.");

    const data = await players();

    var playerObj = {
      playerName: name,
    };

    const insertInfo = await data.insertOne(playerObj);
    if (insertInfo.insertedCount === 0) throw new Error("Could not add player.");
    const newId = insertInfo.insertedId;
    const player = await this.get(newId);
    return player;
  },

  //Returns all players in database
  async getAll(){
    const playerCollection = await players();
    const player = await playerCollection.find({}).toArray();
    return player;
  },

  //Get the player given ID
  async get(id){
    if(id == undefined) throw new Error("ID is undefined.");
    if(typeof id != "object" && typeof id !="string") throw new Error("ID must be string.");
    var ObjectID = require('mongodb').ObjectID;
    if(ObjectID.isValid(id)){
      id = new ObjectID(id); // wrap in ObjectID
    }else{
      throw new Error("ID is not a valid ObjectID");
    }
    const data = await players();
    const str = await data.findOne({_id: id })
    if(str===null) throw new Error("Can't find ID");
    return str;
  },

  //Remove player from database
  //Remember to also remove him from teams and leagues if necesary?
  async remove(id){
    if(id==undefined) throw new Error("ID is undefined");
    if(typeof id != "object" && typeof id !="string") throw new Error("ID must be string.");
    const playerCollection = await players();
    var temp = await this.get(id);

    var ObjectID = require('mongodb').ObjectID;
    id = new ObjectID(id);
    
    let deleted = {deleted: true, data: temp};

    const deletionInfo = await playerCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
      throw new Error("Could not delete player with id of ${id}");
    }
    return deleted;
  },

  //Adds player to team
  async addPlayerToTeam(){
    //uhh
  },

  //Add data if they score and stuff
  async addPlayerData(){
    //uhh
  }
};
