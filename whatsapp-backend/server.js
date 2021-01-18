
//importing
import express from "express"
import mongoose from "mongoose"
import Messages from "./dbMessages.js";

//importing pusher 
//pusher makes mongodb realtime
//it is connected between frontend and backend
import Pusher from 'pusher';


//app creating and config
const app = express();
const port =process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1140089",
  key: "c9c1e6e954f78324b956",
  secret: "a4f5169d7e9a8598553f",
  cluster: "ap2",
  useTLS: true
});

//middleware to get the file back in json format
app.use(express.json());

//this allows request to come from any endpoint
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
})


//DB config
const connection_url='mongodb+srv://admin:ImXbrJJdb1TzwjJN@cluster0.jcova.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(process.env.MONGODB_URI || connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//config pusher
const db =mongoose.connection
db.once('open',()=>{
    console.log("Db connected");

    const msgCollection =db.collection("messagecontents");
    const changeStream=msgCollection.watch();

    //this function runs when there is a change in database
    changeStream.on('change',(change)=>{
        console.log("A change occured",change);

        if(change.operationType === 'insert'){
            const messageDetails=change.fullDocument;
            //triggering pusher
            pusher.trigger('messages','inserted',
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            });
        }else{
            console.log('Error triggering pusher');
        }
    });

});

//????

//api routes
//anything in the 200 range is OK and 201 is create
app.get("/", (req , res) => res.status(200).send("hello world"));

//to get all messages back
app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

//posting messages to database
app.post('/messages/new',(req,res)=>{
    const dbMessage=req.body

    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(ree)
        }else{
            res.status(201).send(data)
        }
    })
})

//listen
app.listen(port,()=>console.log(`Listening on localhost:${port}`));

