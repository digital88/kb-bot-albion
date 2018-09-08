import * as fs from 'fs'
import { logger } from './log/logger'

/** Reads file named 'token' in current folder and extracts it's contents as string.
*   File must be ANSI encoded or bot will not connect with resulting string as token
*   (this maybe is related to how Node.js works with strings and encodings).
*   Returns empty string on error.
*/
export function readToken() {
    try {
        let buf = fs.readFileSync('token')
        return buf.toString()
    }
    catch (err) {
        logger.info(err)
        return ''
    }
}