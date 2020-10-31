import * as admin from "firebase-admin";

class Tenants{
  private readonly manager: admin.auth.TenantManager;

  constructor(private readonly adminAuth: admin.auth.Auth){
    this.manager = this.adminAuth.tenantManager();
  }
  
  //Create a new tenant
  create(name:string): Promise<admin.auth.Tenant>{
    name = name.trim();
    
    return this.manager.createTenant({
      displayName: name,
      emailSignInConfig: {
        enabled: true,
        passwordRequired: true,
      }
    })
    .then((createdTenant) => {
      return createdTenant;
    })
  }
  
  //Get the data of a tenant
  get(id:string): Promise<admin.auth.Tenant>{
    id = id.trim();
    
    return this.manager.getTenant(id)
      .then((tenant) => {
        return tenant;
      })
  }
}

export default Tenants;