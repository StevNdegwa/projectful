import Admin from "../helpers/firebase/Admin";
import Account from "../models/Account";
import Client from "../models/Client";

const Async = require("async");

class AccountController{
  static async registerNewAccount(request:any, response:any, next:any): Promise<any>{
    try{
      let newAccount = request.body;
      
      return Async.waterfall([
        function(callback:any){ //Create new account (tenant)
          return Admin.account().create(newAccount.name)
          .then((account)=>{
            return callback(null, account);
          })
          .catch((error)=>{
            return callback(error);
          })
        },
        function(account:Account, callback:any){ //Create new client(user) account
          let {client} = newAccount;
          
          return Admin.client().create(client.email, client.password, client.name)
          .then((client)=>{
            
            client.account = account;
            
            return callback(null, client)
          })
          .catch((error)=>{
            return callback(error);
          })
        },
        function(client:Client, callback:any){ //Add the account id to client account as attribute
          if(client.account){
            return Admin.client().linkAccount(client.id, client.account.id)
            .then((linked)=>{
              return callback(null, linked);
            })
            .catch((error)=>{
              return callback(error);
            })
          }else{
            return callback(new Error("Account is null"))
          }
        },
        function(error:any, linked:boolean){//Send response to client
          if(!!error){
            return response.json({created:false, message:"An unknown error occured"})
          }else{
            if(linked){
              console.log("Client and account linked");
              response.json({created:true, message:"Account successfully created"})
            }
          }
        }
      ])
    }catch(error){
      
      return next(error);
      
    }
  }
}

export default AccountController;