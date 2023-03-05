const mongoose = require('mongoose')

const MONGODB_URI_CLOUD = 'mongodb+srv://users:AfgzMvhbnuytixpC@cluster0.tdjs4tr.mongodb.net/testDB?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI_CLOUD, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('DB connected'))
    .catch(err => console.log('DB Error', err))
