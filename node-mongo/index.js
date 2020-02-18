const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');
const url = 'mongodb://localhost:27017';

const dbname = 'conFusion';

MongoClient.connect(url)
.then((client) =>{
    // assert.equal(err,null);
    console.log('Connected to the server');
    const db = client.db(dbname);
    return dboper.insertDocument(db, {name:"sks",description:"Test"},"dishes")
    .then((result)=>{
        console.log('Insert document: ',result.result);
        return dboper.findDocuments(db, "dishes");
    })
    .then((docs)=>{
        console.log('Found documents ',docs);
        return dboper.updateDocument(db,{name:"sks"},{description:"updated description"},'dishes')
    })
    .then((result)=>{
        console.log('Updated document ',result.result);
        return db.dropCollection('dishes')
    })
    .then((result)=>{
        console.log('Dropped collection: ',result);
        client.close();
    });
}).
catch((err)=>{
    console.error('Error  : ',err);
});
