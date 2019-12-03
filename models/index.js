const mongoose = require('mongoose');
const dbUrl = process.env.MONGODB_URI || 'Connected to server';

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(`MongoDB connection error: ${err}`));

module.exports = {
    User: require('./Users'),
}