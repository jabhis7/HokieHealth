const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        heartrate: {type: Number, required: true},
        date: {type: Date, default: new Date(), required: true},
        user: {type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true}
    } 
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Record', schema);