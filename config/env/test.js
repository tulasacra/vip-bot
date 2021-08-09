/*
  These are the environment settings for the TEST environment.
  This is the environment run with `npm start` if KOA_ENV=test.
  This is the environment run by the test suite.
*/

module.exports = {
  session: 'secret-boilerplate-token',
  token: 'secret-jwt-token',
  database: process.env.DB_test,
  env: 'test'
}
