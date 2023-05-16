import { Application } from 'express'

export const homeRouter = (app: Application) => {
    app.get("/", (req: any, res) => {
        const files = [
            { name: 'Folder 1', type: 'folder', license: 'MIT License', copyright: '2023' },
            { name: 'File 1.txt', type: 'file', license: 'Apache License 2.0', copyright: '2022' },
            { name: 'Folder 2', type: 'folder', license: 'GPLv3', copyright: '2021' },
            { name: 'File 2.txt', type: 'file', license: 'BSD 3-Clause License', copyright: '2023' },
        ];
        res.render("index", { files });
    });
};
