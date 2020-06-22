var mongoose = require('mongoose');
var schema = new mongoose.Schema({ name: 'string', age: 'number' });
var CONFIG = require('./config.json');

const connectString = `mongodb+srv://${CONFIG.user}:${CONFIG.password}@ludo.88brw.mongodb.net/userdb?retryWrites=true&w=majority`
var connection = mongoose.createConnection(connectString);
var ludousers = connection.model('ludousers', schema);

// Inserting single entry
ludousers.create({ name: 'Shrey' }, function (err, small) {
  if (err) return handleError(err);
  // saved!
});

// Inserting multiple entries
ludousers.insertMany([
    {name: 'Ram', age: 24},
    {name: 'Shyam', age: 32},
    {name: 'Dayum'}
])

// Deleting entry
ludousers.deleteOne({ name: 'Shrey' }, function (err) {
    if (err) return handleError(err);
  });

