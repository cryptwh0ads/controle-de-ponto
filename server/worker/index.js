var CronJob = require('cron').CronJob

const setMissDay = require('./tasks/setMissDay')

new CronJob('50 23 * * * ', setMissDay, null, true, 'America/Sao_Paulo')
