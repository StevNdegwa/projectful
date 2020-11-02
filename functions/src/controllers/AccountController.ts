import AppDB from "../models/AppDB";
import ClientData from "../models/ClientData";
import AccountData from "../models/AccountData";
import Account from "../models/Account";
import Client from "../models/Client";

const Async = require("async");

class AccountController{
  static async registerNewAccount(request:any, response:any, next:any): Promise<any>{
    try{
      let newAccount = request.body;
      
      return Async.waterfall([
        //Create new account (tenant)
        function(callback:any){
          
          return AccountData.configureNewAcc((newAccount.name as string).replace(/\s/g, "-").toLowerCase())
          .then((account)=>{
            return callback(null, account);
          })
          .catch((error)=>{
            return callback(error);
          })
        },
        
        //Create new client(user) account
        function(account:Account, callback:any){ 
          let {client} = newAccount;
          
          return ClientData.createUserAccount(client.email, client.password, client.name)
          .then((client)=>{
            account.name = newAccount.name;
            client.account = account;
            return callback(null, client)
          })
          .catch((error)=>{
            return callback(error);
          })
        },
        //Add the account id to client account as attribute
        function(client:Client, callback:any){
          return ClientData.linkAppAccount(client)
          .then((linked)=>{
            return callback(null, client);
          })
          .catch((error)=>{
            return callback(error);
          })
        }
      ],
      function(error:any, client:Client){//Send response to client
        if(!!error){
          return response.json({
            created:false,
            message:"An unknown error occured"
          })
        }else{
          return response.json({
            created:true, 
            message:`Account for ${client.email} successfully created`
          })
        }
      })
    }catch(error){      
      return next(error);
    }
  }
  
  static async activateAccount(request:any, response:any, next:any): Promise<any>{
    try{
      
      let {client} = request.body;
      
      //Create a new database
      return Async.waterfall([
        function(callback:any){
          return AppDB.create(client)
          .then(function(dbName){
            callback(null, dbName);
          })
          .catch(function(error){
            callback(error)
          })
        }
      ],
      function(error:any, result:any){
        if(!!error){
          return response.json({
            activated:false,
            message:"An unknown error occured"
          })
        }else{
          return response.json({
            activated:true,
            message:"Account hass been successfully activated",
            dbName:result
          })
        }
      })
    }catch(error){
      return next(error);
    }
  }
}

export default AccountController;