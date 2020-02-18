const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
connect.then((db)=>{
    console.log(`Connected to the database server`);
    const newDish = new Dishes({
        name:"first dish",
        description:"first dish description"
    });
    newDish.save()
    .then((dish)=>{
        console.log(dish);
        return Dishes.find({}).exec();
    })
    .then((dishes)=>{
        console.log('Dishes');
        console.log(dishes);
        return Dishes.remove({});
    })
    .then(()=>{
        mongoose.connection.close();
    })
    .catch((err)=>{
        console.log("Error on inserting finding removing or closing the connection \n",err);
    })
})
.catch((error)=>{
    console.log('Error on connection to the database \n ',error);
})