import { connectionDB } from "./DB/connectionDb.js";
export const appController =(app,express)=> {
    app.use(express.json());
    connectionDB();


    app.use("*", (req, res, next) => {
        res.status(404).send("404 Not Found");
    })
}
export default appController;