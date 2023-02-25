import express from "express";
import mongoose from "mongoose";
import  cors from "cors";
import bodyParser from "body-parser";

import {connect} from './utils/database/connect.js';
import { userRoutes } from "./api/routes/user.routes.js";

connect();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());


app.use('/public', express.static('public'));

app.use('/', userRoutes)

app.listen(PORT, () => {
    console.log(`Node server listening on port http:${PORT}`)
})

app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Algo ha ido mal'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});