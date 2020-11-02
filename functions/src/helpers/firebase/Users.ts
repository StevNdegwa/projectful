import * as admin from "firebase-admin";

class Users{
  static async add(email:string, password:string, displayName:string): Promise<admin.auth.UserRecord>{
    return admin.auth().createUser({email, emailVerified: true, password, displayName})
  }
  
  static async get(email:string): Promise<admin.auth.UserRecord>{
    return admin.auth().getUserByEmail(email);
  }
  
  static async addAttribute(id:string, attribute:string, attributeValue:string): Promise<boolean>{
    /* let currClaims = await admin.auth().getUser(id)
    .then(function(user:admin.auth.UserRecord){
      return user.customClaims;
    }); 
    
    let newClaims = currClaims || {};
    
    newClaims[attribute] = attributeValue; */
    
    return admin.auth().setCustomUserClaims(id, {[attribute]:attributeValue})
    .then(function(){
      return true;
    })
  }
}

export default Users;