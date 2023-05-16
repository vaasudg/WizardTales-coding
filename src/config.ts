import bunyan from 'bunyan'
import dotenv from 'dotenv'

dotenv.config({})

class Config {
    constructor() { }

    public logger(name: string): bunyan {
        return bunyan.createLogger({
            name,
            level: 'debug'
        })
    }
}

export const config: Config = new Config()
