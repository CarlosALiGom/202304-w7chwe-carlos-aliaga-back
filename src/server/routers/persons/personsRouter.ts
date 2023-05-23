import { Router } from "express";
import { getPersons } from "../../controllers/persons/personsController.js";
import auth from "../../middlewares/authMiddleware/authMiddleware.js";

const personsRouter = Router();

personsRouter.get("/", auth, getPersons);

export default personsRouter;
