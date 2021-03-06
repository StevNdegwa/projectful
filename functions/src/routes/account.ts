import * as express from "express";
import AccountValidation from "../middleware/AccountValidation";
import AccountController from "../controllers/AccountController";

const app:any = express.Router();

app.put("/register", AccountValidation.newAccount, AccountController.registerNewAccount);
app.post("/activate", AccountValidation.activationData, AccountController.activateAccount);

export default app;