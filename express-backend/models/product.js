export default class Product {
  id;
  name;
  price;
  reviews;

  constructor(id, name, price, reviews) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.reviews = reviews;
  }
}

export const products = [
  new Product(0, "samsung", 600, ["This is a good product", "I like it"]),
  new Product(1, "macbook", 1300, [])
];