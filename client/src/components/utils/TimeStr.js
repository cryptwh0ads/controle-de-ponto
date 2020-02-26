import moment from 'moment-timezone'
import React from 'react'

/**
 *
 * @param moment time format 'time' - the time will be formated
 * @param moment timezone 'tz' - the time zone to which it will be converted
 */

const TimeStr = ({ time, tz }) => {
  const d = moment.tz(time, tz)
  if (time !== null) {
    return <span>{d.format('H:mm')}</span>
  }
  return null
}

export default TimeStr
