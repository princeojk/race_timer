import router from './routes/routes.js'
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const port = 8080;

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.use(express.static(path.join(dirname, '..', 'client')));
app.use(express.static(path.join(dirname, '..', 'client', 'screens')));
app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
    res.sendFile(path.join(dirname, '..', 'client', 'screens', 'home.html'))
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});