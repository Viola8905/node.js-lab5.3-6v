const Participants = require("./model_file_async");

const  participantController = {
  getAll: async(req, res) => {
    try {
        res.send(await Participants.read());
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
  },

  getQuery: async(req, res) => {
    try {
        let queriedParticipants = await Participants.read();
        if (req.query.age)
          queriedParticipants =  queriedParticipants.filter(
                (participant) => parseInt(participant.age) == req.query.age);
          
        if (req.query.com1)
            queriedParticipants = queriedParticipants.filter((participant) =>
            parseInt(participant.com1) == req.query.com1);
        res.send(queriedParticipants);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
  },


  getById: async(req, res) => {
    try {
      let participant = await Participants.find((participant) => participant.id == parseInt(req.params.id));

      if(participant != null) res.status(200).send(participant);
      
      else res.status(404).send("Not Found");
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
  },


  delete: async(req, res) => {
    try {
      let deletedParticipant= await Participants.delete((participant) => participant.id === parseInt(req.params.id));
      if (deletedParticipant) {
          res.send(deletedParticipant);
      }
      else res.status(404).send("Not Found");
    }catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
  },

  post: async(req, res) => {
    try {
        let newParticipant = await Participants.create(req.body);
        res.send(newParticipant);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
  },

  patch: async(req, res) => {
    try {
        let updatedParticipant = await Participants.update((participant) => participant.id === parseInt(req.params.id), req.body);
        if (updatedParticipant) {
            res.send(updatedParticipant);
        } else res.status(404).send("Not Found");
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
  },


  //Запит учасників з країни Х, вік яких не менший за Y.
  getParticipant: async(req, res) => {
    try {
      let participants = await Participants.find((participant) => participant.country ==  "Poland"  &&  parseInt(participant.age) >= 18);
      if (participants !== null) res.status(200).send(participants);
      else res.status(404).send("Not Found");
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
  },









};


module.exports = participantController;