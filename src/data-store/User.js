import {
  KEY_USER_DATA,
  KEY_USER_LAST_ID,
  KEY_USER_LOGGED_IN
} from './data-config';

export default class User {
  id = 0
  constructor(firstname, lastname, email, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }

  static save(user) {
    const userList = User.getUserList();
    user.id = User.generateNewId()
    userList.push(user);

    localStorage.setItem(KEY_USER_DATA, JSON.stringify(userList));
  }

  static getUserByEmail(email) {
    const userList = User.getUserList();
    return userList.filter((user) => user.email == email)[0];
  }

  static getUserList() {
    let data = localStorage.getItem(KEY_USER_DATA);

    if (!data) {
      data = JSON.stringify([]);
      localStorage.setItem(KEY_USER_DATA, data);
    }

    return JSON.parse(data);
  }

  static login(email, password) {
    const user = User.getUserByEmail(email)

    if (user && user.password == password) {
      localStorage.setItem(KEY_USER_LOGGED_IN, JSON.stringify(user))
      return true;
    }

    return false;
  }

  static getUserLogged() {
    let data = localStorage.getItem(KEY_USER_LOGGED_IN);

    if (data) {
      return JSON.parse(data);
    }

    return undefined
  }

  static removeUserLogged() {
    localStorage.removeItem(KEY_USER_LOGGED_IN);
  }

  static generateNewId() {
    const newId = User.getLastId() + 1;
    localStorage.setItem(KEY_USER_LAST_ID, newId);
    return newId;
  }

  static getLastId() {
    const lastId = localStorage.getItem(KEY_USER_LAST_ID);

    if (!lastId) {
      return 0;
    }

    return Number(lastId);
  }
}
