class Account{
  //Use of parameter properties
  constructor(public readonly id:string, private _name:string | undefined){}
  
  get name(): string | undefined{
    return this._name;
  }
  
  set name(newName: string | undefined){ //Check if there is an account by that name
    if(typeof newName === "string"){
      newName = newName.trim();
    }
    this._name = newName;
  }
}

export default Account;