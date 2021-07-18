
const environmentVariable = require('../config')
const mongoose = require('mongoose')

const database = () => {
    console.log('CONNECT DB '+environmentVariable.DATABASE_CONNECTION);
    mongoose.connect(environmentVariable.DATABASE_CONNECTION || "",{
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(() => {
        var db = mongoose.connection
        if(db){
            console.log("CONNECT DB SUCCESS");
            
        } else {
            console.log("CONNECT DB ERROR");
            
        }
    })
    
}

module.exports = database