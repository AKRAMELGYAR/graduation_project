import { connectionDB } from "./DB/connectionDb.js";
import passport from "passport";
import './Auth/passport/passport.js';

export const appController = async (app, express) => {
    app.use(express.json());
    connectionDB();

    app.use(passport.initialize());
    const authRoutes = await import("./Auth/routes/authRoutes.js");
    app.use("/", authRoutes.default);

    app.use("*", (req, res, next) => {
        res.status(404).send("404 Not Found");
    });
};

export default appController;