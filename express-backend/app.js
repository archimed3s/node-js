import express from "express";
import bodyParser from "body-parser";
import { router } from "./controllers";
import { cookie, query } from "./middlewares";

export const app = express();

app.use(bodyParser.json());

// Logic should be implemented
app.use(cookie);
app.use(query);

app.use('/api', router);
