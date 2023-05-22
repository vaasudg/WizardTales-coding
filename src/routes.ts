import { Application, Request, Response } from 'express'
import { ScanFiles } from './utils/helpers'

export const homeRouter = (app: Application) => {
    app.get('/', async (req: Request, res: Response) => {
        try {
            const files = await ScanFiles.prototype.startScan({ directoryPath: 'https://github.com/vaasudg/nocode-just-test', keyword: 'Copyright' })
            res.render('index', {
                files: files?.filter(Boolean)
            })
        } catch (error) {
            console.log({ error })
        }
    })

    app.post('/readDir', async (req: Request, res: Response) => {
        const { url } = req.body
        const dir = await ScanFiles.prototype.startScan({ directoryPath: url, keyword: 'Copyright', repoUrl: url })
        res.json({ dir: dir?.filter(Boolean) })
    })
}
