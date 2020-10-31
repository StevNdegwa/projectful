import Account from "./Account";

class Client{
  private _name: string | undefined = "";
  private _email: string | undefined = "";
  private _account: Account | null = null;
  
  constructor(readonly id: string, email: string | undefined, name: string | undefined){
    this._name = name;
    this._email = email;
  }
  
  get name(): string | undefined{
    return this._name;
  }
  
  set name(newName: string | undefined){
    this._name = newName;
  }
  
  get email(): string | undefined{
    return this._email;
  }
  
  set email(newEmail: string | undefined){
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