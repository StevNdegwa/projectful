import * as admin from "firebase-admin";
import Tenants from "./Tenants";

import Account from "../../models/Account";
import Client from "../../models/Client";

/* interface Resource{

} */

class Admin{
  //Manage client app accounts
  static account(){
    let t:Tenants = new Tenants(admin.auth());
    
    return {
      //Create a new account (tenant)
      create: async function(name:string): Promise<Account>{
        let tenant:admin.auth.Tenant = await t.create(name);
        return new Account(tenant.tenantId, tenant.displayName);
      },
      //Get an account (Tenant)
      get: async function(id:string): Promise<Account>{
        let tenant:admin.auth.Tenant = await t.get(id);
        return new Account(tenant.tenantId, tenant.displayName);
      }
    }
  }
  //Manage clients user accounts
  static client(){
    return {
      //Create a client (user) account
      create: async function(email:string, password:string, displayName:string): Promise<Client>{
        
        return admin.auth().createUser({
          email,
          emailVerified: false,
          password,
          displayName,
        })
        .then(function(user){
    
          return new Client(user.uid, email, displayName)
          
        })
      },
      //Get a client (user) account
      get: async function(email:string): Promise<Client>{
        
        return admin.auth().getUserByEmail(email)
          .then(function(user) {
            
            return new Client(user.uid, user.email, user.displayName)
          
          })
      },
      //Add the account id to user account
      linkAccount: async function(clientId:string, accountId:string): Promise<void>{
        return admin.auth().setCustomUserClaims(clientId, {accountId})
      }
    }
  }
}

export default Admin;