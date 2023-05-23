import { Router } from "express";
import { getPersons } from "../../controllers/persons/personsController";
import auth from "../../middlewares/authMiddleware/authMiddleware";

const personsRouter = Router();

personsRouter.get("/", auth, getPersons);

export default personsRouter;
