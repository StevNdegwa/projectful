import Users from "../helpers/firebase/Users";
import Account from "./Account";
import Client from "./Client";

class ClientData{
  static createUserAccount(email:string, password:string, displayName:string): Promise<Client>{
    
    return Users.add(email, password, displayName)
    .then(function(user: any){
      return new Client(user.uid, email, displayName);
    })
  }
  
  static getUserAccount(email:string): Promise<Client>{
    return Users.get(email)
    .then(function(user:any) {
      let client = new Client(user.uid, user.email as string, user.displayName as string);
      
      if(!!user.customClaims){
        client.account = new Account(user.customClaims.accountId);
      }
      
      return client;
    });
  }
  
  static linkAppAccount(client:Client): Promise<boolean>{
    let accountId = client.account ? client.account.id : "";
    return Users.addAttribute(client.id, "accountId", accountId);
  }
}

export default ClientData;