require('dotenv').config()
module.exports = {
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    PORT: process.env.PORT || 3000,
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/very_basic_express_auth_example'
}