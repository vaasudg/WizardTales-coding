import express from 'express'
import path from "path";
import { homeRouter } from './routes';

const app = express()

app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

console.log(path.join(__dirname, "public"))

// Start router
homeRouter(app)

app.listen(5000, () => {
    console.log(`server started at http://localhost:${'port'}`);
});

// const directoryPath: string = 'https://github.com/user/repo';
// const keyword: string = 'license';

// // scanFilesForKeyword(directoryPath, keyword, (err, results) => {
// //     if (err) {
// //         console.error(err);
// //         return;
// //     }

// //     console.log('Results:', results);
// // });
