/**
 * Auto set the base URL and
 * export it to reducers to make the connection
 * @param string NODE_ENV (development or production)
 * @return baseURL - connection string
 */

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'http://10.10.10.28:3001'

module.exports = {
  baseURL
}
