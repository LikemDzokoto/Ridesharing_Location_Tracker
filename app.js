const express = require('express');
const {createServer} = require('http');
const {Server}  = require('socket-io');
const {initializeRoutes} = require('./routes');

let app = express();
const port  = 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app = initializeRoutes(app);

app.get('/',(req,res)=>{
    res.status(200).send({
        success: true,
        message: "get ready for greatness to unleash"
    })
})

const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin: "*",
        methods: ['GET', 'POST']
    }
})

io.on("connection",(socket) => {
    console.log("We are live and connected");
    console.log(socket.id);
})

httpServer.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`);
});

//create the authentication server 
io.use((socket,next) => {
    if(socket.handshake.headers.auth){
        const {auth} = socket.handshake.headers;
        const token = auth.split("")[1];
        jwt.verify(token.process.env.JWT_SERVER_KEY,async(err, decodedToken) =>{
            if (err){
                throw new Error("Authentication error, Token is invalids");
            }
        const theUSer = await db.User.findByPK(decodedToken.id);
        if(!theUSer)
        throw new Error(
            "Invalid Email or Password, kindly contact the admin if the password is not working"
        );
        socket.theUSer = theUSer;
        return next();

        })
    } else{
        throw new Error("Authentication error,please provide a token")
    }
});

