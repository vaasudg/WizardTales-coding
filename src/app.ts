import express, { Express } from 'express'
import { WTServer } from './server'

class WTApp {
  public start(): void {
    const app: Express = express()
    const server: WTServer = new WTServer(app)
    server.start()
  }
}

const wtApp: WTApp = new WTApp()
wtApp.start()
