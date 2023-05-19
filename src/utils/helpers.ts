import axios from 'axios';
import url from 'url';
import { spawn } from 'child_process'
import { Logs } from './constants'
const { log } = new Logs('helper')


interface ScanFilesForKeywordI {
    directoryPath: string
    keyword: string
    callback?: Function
}
type PathnameI = {
    owner: string[]
    rep: string[]
}

export class ClipBoard {
    public copy(data: any): void {
        if (typeof data !== 'string') {
            log().info(`Coping text can be string format only`)
            return
        }
        const { stdin } = spawn('pbcopy')
        stdin.write(data)
        stdin.end();
    }
}

export class ScanFiles {
    constructor() { }

    // public async startScan(data: ScanFilesForKeywordI): Promise<void> {
    public async startScan(directoryPath: string, keyword: string, callback?: ((data: any) => boolean) | undefined): Promise<any> {
        const { pathname, protocol, host } = url.parse(directoryPath)
        const [author, repo]: any = pathname?.split('/').slice(1, 3)
        const apiUrl = `${protocol}//api.${host}/repos/${author}/${repo}/contents`

        console.log({ apiUrl })
        try {
            const { data } = await axios.get(apiUrl, {
                headers: {
                    Authorization: 'Bearer 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',
                    Accept: 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            // ClipBoard.prototype.copy(JSON.stringify(data))
            return await Promise.all<void>(
                // const results = await Promise.all<void>(

                data.map(async (item: any) => {


                    if (item.type === 'dir') {
                        // return this.startScan(`${directoryPath}/${itemPath}`, keyword);
                    }

                    // console.log(item)
                    // { name: 'Folder 1', type: 'folder', license: 'MIT License', copyright: '2023' },

                    const itemPath = decodeURIComponent(item.path);


                    if (item.type === 'dir') {
                        return {
                            name: item.name,
                            type: item.type,
                            link: item.git_url,
                        }
                        // return {
                        // }
                        // const { data } = await axios.get(item.download_url, {
                        //     responseType: 'text', headers: {
                        //         Authorization: 'Bearer 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',
                        //         Accept: 'application/vnd.github+json',
                        //         'X-GitHub-Api-Version': '2022-11-28'
                        //     }
                        // })
                        // // console.log({ data })
                        // const lines = data.split('\n');
                        // for (let i = 0; i < lines.length; i++) {
                        //     if (lines[i].includes(keyword)) {
                        //         matches.push({
                        //             itemPath,
                        //             lineNumber: i + 1,
                        //             value: lines[i].trim(),
                        //         });
                        //     }
                        // }
                        // return
                        // return {
                        //     name: item.name,
                        //     type: item.type,
                        //     // ...matches
                        // }
                    } else {
                        const { data } = await axios.get(item.download_url, {
                            responseType: 'text', headers: {
                                Authorization: 'Bearer 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',
                                Accept: 'application/vnd.github+json',
                                'X-GitHub-Api-Version': '2022-11-28'
                            }
                        })
                        const lines = data.split('\n');
                        const matches = [];
                        for (let i = 0; i < lines.length; i++) {
                            if (lines[i].includes(keyword)) {
                                matches.push({
                                    name: itemPath,
                                    lineNumber: i + 1,
                                    value: lines[i].trim(),
                                    link: ''
                                });
                            }
                        }
                        return matches.length ? matches[0] : null;
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
// async function scanFilesForKeyword(directoryPath, keyword, callback) {
//     const { pathname, protocol, host } = url.parse(directoryPath);
//     const [owner, repo] = pathname.split('/').slice(1, 3);

//     const apiUrl = `${protocol}//api.${host}/repos/${owner}/${repo}/contents`;

//     try {
//         const response = await fetch(apiUrl);
//         const contents = await response.json();

//         const results = await Promise.all(
//             contents.map(async (item) => {
//                 const itemPath = decodeURIComponent(item.path);

//                 if (item.type === 'dir') {
//                     return scanFilesForKeyword(`${directoryPath}/${itemPath}`, keyword);
//                 }

//                 if (path.extname(itemPath) !== '.js') {
//                     return null;
//                 }

//                 const fileUrl = item.download_url;
//                 const fileContent = await fetch(fileUrl).then((res) => res.text());
//                 const lines = fileContent.split('\n');
//                 const matches = [];

//                 for (let i = 0; i < lines.length; i++) {
//                     if (lines[i].includes(keyword)) {
//                         matches.push({
//                             filePath: `${directoryPath}/${itemPath}`,
//                             lineNumber: i + 1,
//                         });
//                     }
//                 }

//                 return matches.length ? matches : null;
//             })
//         );

//         callback(null, results.filter((result) => result !== null).flat());
//     } catch (err) {
//         callback(err);
//     }
// }
