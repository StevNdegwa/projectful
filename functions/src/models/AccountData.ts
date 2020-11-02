import Tenants from "../helpers/firebase/Tenants";
import Account from "./Account";

class AccountData{
  static configureNewAcc(name:string): Promise<Account>{
    //Create an authentication tenant
    return Tenants.create(name)
    .then(function(tenant){
      return new Account(tenant.tenantId);
    })
  }
  
  static getAcc(id:string): Promise<Account>{
    return Tenants.get(id)
    .then(function(tenant){
      return new Account(tenant.tenantId);
    })
  }
}

export default AccountData;