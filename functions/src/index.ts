import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import * as express from "express";
import * as bodyParser from "body-parser";

import account from "./routes/account";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: "projectful-f5097"
});

const app:express.Application = express();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/accounts", account);

app.use((error:any, request:any, response:any, next:any)=>{
  console.log(error);
  //functions.logger.info("Hello logs!", {structuredData: true});
  response.status(500).json({error:true, message:"Currently unavailable"})
})

export const api = functions.https.onRequest(app);