import Logger from 'bunyan'
import { config } from './../config'


export const BASE_ROUTER = (router: string): string => `/api/${router}/v1`

export class Logs {
    private title: string
    constructor(title: string) {
        this.title = `::${title.toUpperCase()}${':'.repeat(15)}`
        if (!title || title === '') {
            this.title = 'WARNING: Logger title cannot be empty, add title for getting the logger information...'
        }
    }
    public log = (): Logger => config.logger(this.title)
}