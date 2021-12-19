const Router = require("express").Router;
const participantController = require("./controller_file_async");

const participantRouter = new Router();

//CRUD

participantRouter.get("/",participantController.getAll);
participantRouter.get("/query",participantController.getQuery);
participantRouter.get("/:id",participantController.getById);
participantRouter.delete("/:id",participantController.delete);
participantRouter.post("/",participantController.post);
participantRouter.post("/:id",participantController.patch);
participantRouter.get("/getParticipant",participantController.getParticipant);

//participantRouter.post("/",participantController.addCollection);


module.exports = participantRouter;