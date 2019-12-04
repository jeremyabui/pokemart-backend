const mongoose = require('mongoose');
const dbUrl = process.env.MONGODB_URI || 'Connected to server';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(`MongoDB connection error: ${err}`));

module.exports = {
    User: require('./User'),
    Product: require('./Product'),
}