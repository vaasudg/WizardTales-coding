import bunyan from 'bunyan'
import dotenv from 'dotenv'

dotenv.config({})

class Config {
  public PORT: string | undefined

  constructor() {
    this.PORT = process.env.PORT || ''
  }

  public logger(name: string): bunyan {
    return bunyan.createLogger({
      name,
      level: 'debug'
    })
  }
}

export const config: Config = new Config()
