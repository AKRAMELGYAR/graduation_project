import { connectionDB } from "./DB/connectionDb.js";
import passport from "passport";
import './Auth/passport/passport.js';
import globalErrorHandling from "./utils/globalErrorHandling/globalErrorHandling.js";
import cookieParser from "cookie-parser";
import cors from "cors";


export const appController = async (app, express) => {
    app.use(express.json());
    app.use(cookieParser());

    const corsOptions = {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    };
    app.use(cors(corsOptions));

    connectionDB();
    app.use(passport.initialize());
    const authRoutes = await import("./Auth/routes/authRoutes.js");
    app.use("/", authRoutes.default);
    app.use("*", (req, res, next) => {
        return next(new Error("Not found", { cause: 404 }));
    });
    app.use(globalErrorHandling);
};

export default appController;