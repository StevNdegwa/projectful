const tools = require("firebase-tools");

class RealtimeDB{
  static async createInstance(name:string): Promise<string>{
    let instanceName = "projectful-f5097-".concat(name);
    return tools.database.instances.create(instanceName)
    .then(function(result:any){
      return instanceName;
    })
  }
}

export default RealtimeDB;