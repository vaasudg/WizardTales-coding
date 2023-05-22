import axios, { ResponseType } from 'axios'
import url from 'url'
import { spawn } from 'child_process'
import { Logs } from './constants'
import { ServiceCall } from './services'
const { log } = new Logs('helper')

const { get, post } = new ServiceCall()

interface ScanFilesI {
    directoryPath: string,
    keyword: string,
    repoUrl?: string,
    responseType?: ResponseType,
    callback?: ((data: any) => boolean) | undefined
}

export class ClipBoard {
    public copy(data: any): void {
        if (typeof data !== 'string') {
            log().info(`Coping text can be string format only`)
            return
        }
        const { stdin } = spawn('pbcopy')
        stdin.write(data)
        stdin.end()
    }
}

export class ScanFiles {
    constructor() { }

    /**
      * Recursively scans the directory and its subdirectories to search for a keyword in files.
      * @param directoryPath The path of the directory to scan.
      * @param keyword The keyword to search for in the files.
      * @param repoUrl The URL of the repository.
      * @param responseType The response type for API requests.
      * @param callback Optional callback function for handling the results.
      * @returns An array of objects representing files matching the keyword.
      */
    public async startScan(
        options: ScanFilesI
    ): Promise<any> {
        const { directoryPath, keyword, repoUrl, responseType, callback } = options;
        const { pathname, protocol, host } = url.parse(directoryPath)
        const [author, repo]: any = pathname?.split('/').slice(1, 3)
        const apiUrl = repoUrl ? repoUrl : `${protocol}//api.${host}/repos/${author}/${repo}/contents`

        try {
            const { data } = await get(apiUrl)

            // ClipBoard.prototype.copy(JSON.stringify(data))

            return await Promise.all<void>(
                data?.map(async (item: any) => {

                    const itemPath = decodeURIComponent(item.path)
                    const responseType: ResponseType = item.type === 'file' ? 'text' : 'json'

                    if (item.type === 'dir') {
                        // Recursive call to scan subdirectories
                        const subDirectoryResults = await this.startScan({
                            directoryPath: item?.url,
                            keyword,
                            repoUrl: item.url,
                            responseType,
                        })
                        return {
                            name: item.name,
                            type: item.type,
                            link: item.url,
                            isKeyword: subDirectoryResults?.some(
                                (result: any) => result?.value?.includes(keyword)
                            ),
                        }
                    } else {
                        const { data } = await get(item.download_url)
                        const lines = data.split('\n')
                        const matches = []

                        // Search for keyword in each line of the file
                        for (let i = 0; i < lines.length; i++) {
                            if (lines[i].includes(keyword)) {
                                matches.push({
                                    name: item.name,
                                    lineNumber: i + 1,
                                    value: lines[i].trim(),
                                    type: item.type,
                                })
                            }
                        }

                        // Return the first match or null if no matches
                        return matches.length ? matches[0] : null
                    }
                })
            )
            // @ts-ignore
            // callback(null, results.filter((result) => result !== null).flat());
        } catch (error) {
            log().info('Error', error)
            // @ts-ignore
            // callback(error)
        }
    }
}
