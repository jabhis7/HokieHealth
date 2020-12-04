const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });


module.exports = {
    User: require('../models/user.model'),
    Record: require('../models/record.model')
};
