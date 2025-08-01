import { Router } from 'express';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const defaultRoute = Router();

defaultRoute.get('/',(req,res) => {
    res.send(path.join(__dirname, '..', 'index.html'))
})


