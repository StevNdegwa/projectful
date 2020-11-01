import Admin from "../helpers/firebase/Admin";
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
          return Admin.account().create(newAccount.name)
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
          
          return Admin.client().create(client.email, client.password, client.name)
          .then((client)=>{
            
            client.account = account;
            
            return callback(null, client)
          })
          .catch((error)=>{
            return callback(error);
          })
        },
        //Add the account id to client account as attribute
        function(client:Client, callback:any){
          if(client.account){
            return Admin.client().linkAccount(client.id, client.account.id)
            .then((linked)=>{
              return callback(null, client);
            })
            .catch((error)=>{
              return callback(error);
            })
          }else{
            return callback(new Error("Account is null"));
          }
        },
        //create an email verification link
        function(client:Client, callback:any){
          return Admin.client().verificationLink(client.email as string)
          .then((link)=>{
            return callback(null, link);
          })
          .catch((error)=>{
            return callback(error);
          })
        }
      ],
      function(error:any, link:string){//Send response to client
        if(!!error){
          return response.json({
            created:false, 
            message:"An unknown error occured"
          })
        }else{
          return response.json({
            created:true, 
            message:"Account successfully created",
            verificationLink:link
          })
        }
      })
    }catch(error){      
      return next(error);
    }
  }
}

export default AccountController;