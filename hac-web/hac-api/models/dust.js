const mongoose = require('mongoose');

const dustSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        defualt: 0
    },
    locationID: {
        type: String,
    },
    dustIPAddress: {
        type: String,
    },
    version: {
        type: String
    },
    dustType: {
        type: String
    },
    dustName: {
        type: String
    },
    image: String,
    memo: String,
    isActive: Number,
    createDate: {
        type: Date,
        default: () => new Date(),
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId
    },
    updateDate: {
        type: Date,
        default: () => new Date(),
    },
    updateBy: {
        type: mongoose.Schema.Types.ObjectId
    }
});

const Dust = mongoose.model('Dust', dustSchema);;

module.exports=Dust;
