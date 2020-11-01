import Account from "./Account";

class Client{
  private _name: string = "";
  private _email: string = "";
  private _account: Account | null = null;
  
  constructor(readonly id: string, email: string, name: string){
    this._name = name;
    this._email = email;
  }
  
  get name(): string {
    return this._name;
  }
  
  set name(newName: string ){
    this._name = newName;
  }
  
  get email(): string {
    return this._email;
  }
  
  set email(newEmail: string){
    this._email = newEmail;
  }
  
  get account(): Account | null{
    return this._account;
  }
  
  set account(acc: Account | null){
    this._account = acc;
  }
}

export default Client;