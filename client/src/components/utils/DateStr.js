import moment from 'moment-timezone'
import React from 'react'

/**
 *
 * @param moment date format 'date' - the date will be formated
 * @param moment timezone 'tz' - the time zone to which it will be converted
 */

const DateStr = ({ date, tz }) => {
  const d = moment.tz(date, tz)

  return <span>{d.format('DD/MM/YYYY')}</span>
}

export default DateStr
