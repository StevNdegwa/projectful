import * as Joi from "joi";
import Admin from "../helpers/firebase/admin";

class AccountValidation{
  static async newAccount(request:any, response:any, next:any): Promise<any>{ //New account data validation
    try{
      let {account} = request.body;
      
      if(account.client.password !== account.client.confirmPassword){
        return response.json({created:false, error:"Both passwords should be similar"});
      }
      
      //First check if there's a user by that email
      try{
        await Admin.client().get(account.client.email);
        return response.json({created:false, message:"User already exists"});
      }catch(error){}
      
      //Remove the confirmPassword field
      delete account.client.confirmPassword;
      
      //Data validation
      try{
        let accountSchema = Joi.object().keys({
          name:Joi.string().min(4).max(20).replace(" ", "-").required(),
          client:{
            name:Joi.string().required(),
            email:Joi.string().email().required(),
            password:Joi.string().regex(/^[-a-zA-Z0-9@]{8, 30}$/)
          }
        })
      
        account = await accountSchema.validate(account);
        
        request.body = account.value;
      }catch(error){
        return response.json({created:false, message:"Invalid data"})
      }
      
      return next();
    }catch(error){
      return next(error);
    }
  }
}

export default AccountValidation;