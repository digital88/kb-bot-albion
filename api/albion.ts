import { logger } from '../log/logger'

const xhr = require('xmlhttprequest')
const apiUrl = 'https://gameinfo.albiononline.com/api/gameinfo/'

const endpoints = {
    battles: 'battles',
    events: 'events',
    eventById: (eventId: number | string) => `events/${eventId}`,
    eventsByFame: 'events/killfame',
    playersByFame: 'events/playerfame',
}

function fetchInfo(endpoint: string) {
    let req = new xhr.XMLHttpRequest()
    req.onreadystatechange = function (ev) {
        logger.info("State: " + this.readyState)
        if (this.readyState === 4) {
            let obj = JSON.parse(this.responseText)
            logger.info('fetched data from ep: ' + endpoint)
        }
    }
    req.open('GET', apiUrl + endpoint)
    req.send()
}

export function fetchBattles() {
    fetchInfo(endpoints.battles)
}

export function fetchEvents() {
    fetchInfo(endpoints.events)
}

export function fetchEvent(eventId: number | string) {
    fetchInfo(endpoints.eventById(eventId))
}