import 'dotenv/config';
import express from "express";
import cors, { CorsOptions } from "cors";
import r from "./routes";

const app = express();

app.use(express.json());

var whitelist = ["http://localhost:3000", "http://localhost:8000"];
var corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

app.use("/api", r);

app.get("*", function (req, res) {
  res.status(404).send("Invalid routing");
});

export default app;
