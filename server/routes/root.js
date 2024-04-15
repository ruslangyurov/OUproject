import { Router } from 'express';
import * as path from 'path';


export const defaultRoute = Router();

defaultRoute.get('/',(req,res) => {
    res.send(path.join(__dirname, '..', 'index.html'))
})


