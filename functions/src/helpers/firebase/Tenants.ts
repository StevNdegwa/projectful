import * as admin from "firebase-admin";

class Tenants{
  //Create a new tenant
  static create(name:string): Promise<admin.auth.Tenant>{
    
    return admin.auth().tenantManager().createTenant({
      displayName: name,
      emailSignInConfig: {
        enabled: true,
        passwordRequired: true,
      }
    })
    .then((createdTenant:any) => {
      return createdTenant;
    })
  }
  
  //Get the data of a tenant
  static get(id:string): Promise<admin.auth.Tenant>{
    
    return admin.auth().tenantManager().getTenant(id)
      .then((tenant:any) => {
        return tenant;
      })
  }
}

export default Tenants;