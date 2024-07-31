import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import userRouter from "./modules/users/interfaces/http/userRoutes";
import { config } from "./shared/config/config";

const origin = {
	origin: "*",
};

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(helmet());

const v1Router = express.Router();

v1Router.get("/", (req, res) => {
	return res.json({ message: "Yo! we're up" });
});

v1Router.use("/users", userRouter);

app.use("/api/v1", v1Router);

app.listen(config.PORT, () => {
	console.log(`[App]: Listening on port ${config.PORT}`);
});
