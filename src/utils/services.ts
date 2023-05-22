import axios, { AxiosResponse, ResponseType } from 'axios'
import dotenv from 'dotenv'
dotenv.config({})


interface headerI {
    Authorization: string
    Accept: string
    'X-GitHub-Api-Version'?: string
}

const httpOptions: any = (token: string, responseType: ResponseType = 'json') => {
    return {
        responseType,
        headers: {
            Authorization: token,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        } as headerI
    }
}
export class ServiceCall {
    private GIT_TOKEN: string | undefined

    constructor() {
        this.GIT_TOKEN = process.env.GIT_TOKEN_C
    }

    public async get(url: string): Promise<any> {
        const response: AxiosResponse = await axios.get(url, httpOptions(process.env.GIT_TOKEN_C))
        return response

    }
    public async post(
        url: string,
        data?: any,
    ): Promise<any> {
        const response: AxiosResponse = await axios.post(url, data, httpOptions(this.GIT_TOKEN))
        return response;
    }
    // public async ServiceCall(options: axiosI): Promise<void> {
    //     const { method, url, responseType = 'json', headers } = options
    //     return await axios.get(url, {
    //         responseType,
    //         headers: {
    //             Authorization: this.GIT_TOKEN,
    //             Accept: 'application/vnd.github+json',
    //             'X-GitHub-Api-Version': '2022-11-28'
    //         }
    //     })

    // }
}