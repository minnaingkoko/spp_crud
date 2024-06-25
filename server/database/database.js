const mongoose = require('mongoose');
const config = require('../../config.js');

const Connect = async () => {
    try{
        // mongodb clund connection
        const con = await mongoose.connect(config.MONGO_URI , {
            useNewUrlParser : true,
            useUnifiedTopology: true
        })

        console.log(`MongoDB Connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = Connect