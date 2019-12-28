const mongoCollections = require("./collections");
const leagues = mongoCollections.leagues;
const players = require("./players");
const teams = require("./teams");


module.exports = {
    //Returns all the leagues in the database
    async getAll(){
        const leagueCollection = await leagues();
        const league = await leagueCollection.find({}).toArray();
        return league;
    },

    //Returns a specific league given an ID
    async getLeagueById(id){
        if(id == undefined) throw new Error("ID is undefined.");
        if(typeof id != "object" && typeof id !="string") throw new Error("ID must be string.");

        var ObjectID = require('mongodb').ObjectID;
        if(ObjectID.isValid(id)){
            id = new ObjectID(id); // wrap in ObjectID
        }else{
            throw new Error("ID is not a valid ObjectID");
        }
        const leagueCollection = await leagues();
        const league = await leagueCollection.findOne({_id: id });
        if(league===null) throw new Error("Can't find league.");
        return league;
    },

    async addTeam(leagueID, team){
        const Ldata = await leagues();
        //const team = await this.get(teamID);
        await Ldata.updateOne(
          {_id: leagueID},
          {$push: {teamArr: team}}
        )
        return team;
      },
    //Add a league to the database
    async createID(name){
        if(name==undefined) throw new Error("Name is undefined.");
        //if(teams==undefined) throw new Error("Teams is undefined.");
        if(typeof name!="string") throw new Error("Name is not a string.");
        //if(typeof teams!="string") throw new Error("Team is not an array.");

        let newLeague = {
            leagueName: name,
            teamArr: []
        };
        const leagueCollection = await leagues();
        //const animalPoster = await animals.get(authorId);

        const insert = await leagueCollection.insertOne(newLeague);
        const newId = insert.insertedId;
        await this.getLeagueById(newId);
        return newId;
    },

    //Remove the entire league from the database
    async removeLeague(id) {
        if(id==undefined) throw new Error("ID is undefined");
        if(typeof id != "object" && typeof id !="string") throw new Error("ID must be string.");
        const postCollection = await posts();

        var temp = await this.getPostById(id);

        var ObjectID = require('mongodb').ObjectID;
        if(ObjectID.isValid(id)){
            id = new ObjectID(id); // wrap in ObjectID
        }else{
            throw new Error("ID is not a valid ObjectID");
        }
        let deleted = {deleted: true, data: temp};
        const deletionInfo = await postCollection.removeOne({ _id: id });
        if (deletionInfo.deletedCount === 0) {
            throw new Error("Could not delete league with id of ${id}");
        }
        return deleted;
    }    
};
