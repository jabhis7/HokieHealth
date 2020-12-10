const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        role: {type:String, required: true},
        prevProb: {type: String},
        currMed: {type: String},
        patients: [{type: mongoose.SchemaTypes.ObjectId, ref: 'User'}],
        records: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Record'}],
        doc: { type: mongoose.SchemaTypes.ObjectId }
    } 
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);