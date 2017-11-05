export default class User {
  id;
  name;
  age;

  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
}

export const users = [
  new User(0, "vlad", 45),
  new User(1, "max", 13)
];