import { connectionDB } from "./DB/connectionDb.js";
import userRoutes from "./user/routes/userRoutes.js";
import passport from "passport";
import './Auth/passport/passport.js';
import globalErrorHandling from "./utils/globalErrorHandling/globalErrorHandling.js";
export const appController = async (app, express) => {
    app.use(express.json());
    connectionDB();
    app.use(passport.initialize());
    const authRoutes = await import("./Auth/routes/authRoutes.js");
    app.use("/", authRoutes.default);
    app.use("/users", userRoutes);
    app.use("*", (req, res, next) => {
        return next(new Error("Not found",{cause:404}));
    });
    app.use(globalErrorHandling);
};

export default appController;