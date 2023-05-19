import express, { Application } from 'express';
import http from 'http';
import path from "path";

import { config } from './config';
import { homeRouter } from './routes';
import { Logs } from './utils/constants';

const { log } = new Logs('Server')

export class WTServer {
    private app: Application
    constructor(app: Application) {
        this.app = app
    }

    public start(): void {
        this.startServer(this.app)
        this.startMiddleware(this.app)
        this.startRouter(this.app)
    }

    private startServer(app: Application) {
        try {
            const httpServer: http.Server = new http.Server(app)
            this.startHttpServer(httpServer)
        } catch (error) {
            log().error({ error })
        }
    }

    private startHttpServer(httpServer: http.Server): void {
        log().info(`Server running the processor of ${process.pid}`)
        httpServer.listen(config.PORT, () => {
            log().info(`${config.PORT} running`)
        })
    }

    private startMiddleware(app: Application): void {
        app.use(express.json());
        app.set("views", path.join(__dirname, "views"));
        app.set("view engine", "ejs");
        app.use(express.static(path.join(__dirname, "public")));
    }

    private startRouter(app: Application): void {
        homeRouter(app)
    }
}