class Account{
  //Use of parameter properties
  constructor(public readonly id:string, private _name:string = ""){}
  
  get name(): string{
    return this._name;
  }
  
  set name(newName: string){ //Check if there is an account by that name
    this._name = newName;
  }
}

export default Account;