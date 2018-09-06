import { logger } from '../log/logger'

const xhr = require('xmlhttprequest')
const apiUrl = 'https://gameinfo.albiononline.com/api/gameinfo/'

const endpoints = {
    battles: 'battles'
}

export function fetchBattlesInfo() {
    let req = new xhr.XMLHttpRequest()
    req.onreadystatechange = function (ev) {
        logger.info("State: " + this.readyState)
        if (this.readyState === 4) {
            let obj = JSON.parse(this.responseText)
            logger.info(obj)
        }
    }
    req.open('GET', apiUrl + endpoints.battles)
    req.send()
}