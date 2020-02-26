const connDev = {
  client: 'sqlite3',
  connection: {
    filename: './devdb.sqlite'
  },
  useNullAsDefault: true
}

const connProd = {
  client: 'pg',
  connection: {
    host: '10.10.10.26',
    database: 'prod_db',
    user: 'mrs',
    password: 'MRSc0ntr0l3'
  },
  migrations: {
    directory: __dirname + '/db/migrations'
  },
  seeds: {
    directory: __dirname + '/db/seeds/development'
  }
}

module.exports = {
  connDev,
  connProd
}
