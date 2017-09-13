import config from "./config/config.json";
import User from "./models/user.module";
import Product from "./models/product.module";

let user = new User();
let product = new Product();

console.log(config);