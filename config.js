require('dotenv').config()
   module.exports = {
       USERNAME: process.env.USERNAME,
       PASSWORD: process.env.PASSWORD,
       PORT: process.env.PORT || 3000,
       NEDB_URI: process.env.NEDB_URI || './db/hellos'
   }