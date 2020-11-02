import * as Joi from "joi";
import ClientData from "../models/ClientData";

class AccountValidation{
  static async newAccount(request:any, response:any, next:any): Promise<any>{ //New account data validation
    try{
      let {account} = request.body;
      
      if(account.client.password !== account.client.confirmPassword){
        return response.json({created:false, error:"Both passwords should be similar"});
      }
      
      //First check if there's a user by that email
      try{
        await ClientData.getUserAccount(account.client.email);
        return response.json({created:false, message:"User already exists"});
      }catch(error){}
      
      //Remove the confirmPassword field
      delete account.client.confirmPassword;
      
      //Data validation
      try{
        let schema = Joi.object().keys({
          name:Joi.string().min(4).max(20).required(),
          client:{
            name:Joi.string().required(),
            email:Joi.string().email().required(),
            password:Joi.string().regex(/^[-a-zA-Z0-9@]{8, 30}$/)
          }
        })
      
        account = await schema.validate(account);
        
        request.body = account.value;
        
      }catch(error){
        return response.json({created:false, message:"Invalid data"})
      }
      
      return next();
    }catch(error){
      return next(error);
    }
  }
  
  static async activationData(request:any, response:any, next:any): Promise<any>{
    try{
      
      let {clientEmail, account} = request.body;
      
      let client = await ClientData.getUserAccount(clientEmail);

      try{
        
        let schema = Joi.object().keys({
          subscription: Joi.string().valid("BASIC", "ENTERPRISE"),
          payment:{
            type:Joi.string().valid("MPESA", "DEBIT", "PAYPAL"),
            acNumber:Joi.string()
          },
          theme:Joi.string().valid("LIGHT", "DARK"),
          template:Joi.string().valid("EMPTY", "SCRUM", "KANBAN"),
          language:Joi.string().valid("ENGLISH", "KISWAHILI"),
          team:Joi.array().items(
            Joi.object({
              name:Joi.string(),
              email:Joi.string().email()
            })
          )
        })
        
        account = schema.validate(account);
        
        request.body = {client, account:account.value};
        
      }catch(error){
        return response.json({activated:false, message:"Invalid data"});
      }
      
      return next();
    }catch(error){
      return next(error);
    }
  }
}

export default AccountValidation;