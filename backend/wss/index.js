const socket = require("socket.io")


module.exports = (appInstance)=>{

	const corsOptions = {
		cors:{
			origin:"*",
			methods:["GET","POST"]
		}
	}
  
    const io = socket(appInstance,corsOptions)


    io.on("connection",socket=>{

        const {userId,roomId} = socket.handshake.query

        console.log(userId, " just connected")

        console.log(roomId)

        socket.join(roomId)

        socket.on("user-connected",(userId)=>{
          
          // console.log("user-connected")
          socket.broadcast.to(roomId).emit("user-connected",userId)

        })


        socket.on("disconnect",()=>{

        	console.log(userId, " has disconnected")
             
             socket.broadcast.to(roomId).emit("user-disconnected",userId)
        })
    })

}
