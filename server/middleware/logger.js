import format from 'date-fns/format/index.js';
import { v4 as uuidv4 } from 'uuid';
import {fs} from 'fs';
import * as fs1 from 'fs/promises';
import * as path from 'path';

const logEvents = async(message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
   

    try {
        if (!fs.existsSync(path.join(__dirname, '..', logs))) {
        await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs',
    logFileName),logItem)
    }   catch (err)   {
        console.log(err)
    }   

}


const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'regLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}   

module.exports = {logEvents, logger}
