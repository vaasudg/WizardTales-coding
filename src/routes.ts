import { Application, Request, Response } from 'express'
import { ScanFiles } from './utils/helpers'

export const homeRouter = (app: Application) => {
    app.get('/', async (req: Request, res: Response) => {
        try {
            // const files = await ScanFiles.prototype.startScan('https://github.com/rust-lang/rust', 'Copyright (C)')
            const files = await ScanFiles.prototype.startScan('https://github.com/rust-lang/rust', 'Copyright (C)')
            // const files = [
            //     { name: 'Folder 1', type: 'folder', license: 'MIT License', copyright: '2023' },
            //     { name: 'File 1.txt', type: 'file', license: 'Apache License 2.0', copyright: '2022' },
            //     { name: 'Folder 2', type: 'folder', license: 'GPLv3', copyright: '2021' },
            //     { name: 'File 2.txt', type: 'file', license: 'BSD 3-Clause License', copyright: '2023' },
            // ];

            res.render('index', {
                files: files.filter(Boolean)
            })
        } catch (error) {
            console.log({ error })
        }
    })

    app.post('/readDir', async (req: Request, res: Response) => {
        const { url } = req.body
        const dir = await ScanFiles.prototype.readDir(url, 'Copyright (C)')

        res.json({ Pmsg: 'Helloo....', dir: dir.filter(Boolean) })
    })
}
