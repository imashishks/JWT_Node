const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jwt').then(() => console.log('Ready to use'), err => console.log('Error'));

