import RealtimeDB from "../helpers/firebase/RealtimeDB";
import Client from "./Client";

class AppDB{
  static async create(client:Client): Promise<any>{
    let id:string = client.account ? client.account.id : "unknown";
    return RealtimeDB.createInstance(id);
  }
}

export default AppDB;