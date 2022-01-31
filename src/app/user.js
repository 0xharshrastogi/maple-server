import UserQuery from "../database/query/user.query";

class User {
  constructor(data) {
    this.firstname = data.firstname;
    this.familyname = data.familyname;
    this.givenname = data.givenname;
    this.imageURL = data.imaageURL;
    this.email = data.email;
    this.userID = data.userID;
    this.id = data.id;
  }

  _sanitize() {
    const data = Object.assign({}, this);
    delete data.id;
    return data;
  }

  toJSON() {
    return this._sanitize();
  }

  static async create(data) {
    const userData = await UserQuery.create(data);
    const { userID } = new User(userData);
    return { userID };
  }
}

export default User;
