import "../scss/room.scss";
import { useEffect,useRef,useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import Peer from "peerjs";
import {handleVideoSection,getUserMedia} from "../utils";
import Loader from "./loader";
import Footer from "./footer";
import { Navigate } from "react-router-dom";


interface RootState {
    socketReducer:{isHost:boolean,socketObj:any,userId:string,roomId:string}
}

export default function Room(props:any)
{

    const {userId,isHost,roomId,socketObj} = useSelector((state:RootState)=> state.socketReducer)

    console.log(socketObj);

    const videoGridRef: any = useRef();

    const userVideoStream : any = useRef();

    const peers : any = useRef({})

    const dispatch = useDispatch()

    const [showLoader,setShowLoader] = useState(true);

    if(!(roomId && userId)) return <Navigate to="/"/>

    useEffect(()=>{

        console.log('effect in room');

        let socket = socketObj

        let videoGrid = videoGridRef.current

        socket.on("connect",()=>{

            console.log("i am connected to the socket server")

            const peer = new Peer(userId,{
                config : {
                    iceServers:[
                        {
                          urls:"stun:stun.stunprotocol.org"
                        },
                        {
                          urls:"turn:numb.viagenie.ca",
                          credential:"muazkh",
                          username:"webrtc@live.com"
                        }
                    ]
                }
            })

            peer.on("open", async ()=>{

                setShowLoader(false);

                userVideoStream.current = await getUserMedia()

                let obj = {
                    videoGrid,
                    section:document.createElement("section"),
                    video:document.createElement("video"),
                    label:document.createElement("label"),
                    displayName:"You",
                    stream:userVideoStream.current,
                    action:"add",
                    isRemote:false

                }

                handleVideoSection(obj)

                console.log("connected to peer server")

                socket.emit("user-connected",userId)
            
                socket.on("user-connected",(remoteUserId:string)=>{
                
                    console.log(remoteUserId," has joined")

                    let call = peer.call(remoteUserId,userVideoStream.current);

                    peers.current[remoteUserId] = call

                    const section = document.createElement("section")

                    call.on("stream",(remoteUserStream:any)=>{
                        console.log("The new user replied us with their stream");

                        let obj = {
                            videoGrid,
                            section,
                            video:document.createElement("video"),
                            label:document.createElement("label"),
                            displayName:remoteUserId,
                            stream:remoteUserStream,
                            action:"add",
                            isRemote:true
                        }

                        handleVideoSection(obj);
                    })

                    call.on("close",()=>{
                        handleVideoSection({videoGrid,section,video:null,label:null,displayName:null,stream:null,action:"remove",isRemote:false});
                    })
                })

                peer.on("call",(call:any)=>{
                   
                    peers.current[call.peer] = call
                    console.log("Other user called me")

                    call.answer(userVideoStream.current)

                    let section = document.createElement("section")

                    call.on("stream",(remoteUserStream:any)=>{
                       
                        console.log("Other user sent us their stream")

                        let obj = {
                            videoGrid,
                            section:section,
                            video:document.createElement("video"),
                            label:document.createElement("label"),
                            displayName:call.peer,
                            stream:remoteUserStream,
                            action:"add",
                            isRemote:true
                        }

                        handleVideoSection(obj);
                    })

                    call.on("close",()=>{
                        handleVideoSection({videoGrid,section,video:null,label:null,displayName:null,stream:null,action:"remove",isRemote:false});
                    })
                })

                socket.on("user-disconnected",(remoteUserId:string)=>{
                    console.log(remoteUserId, " has disconnected...")
                    peers.current[remoteUserId].close()
                })
            })
        })

        return ()=>{
                socket.off("user-connected",()=>{})
                socket.off("user-disconnected",()=>{})
                // socket.close()

            videoGrid.innerHTML = ""
        }
    },[])

    return (
        <div className="Room">

            {showLoader && <Loader text="Joining"/>}
            {isHost && <div>Welcome to your Room : {roomId}</div>}

            <div className="video-grid" ref={videoGridRef}></div>

            <Footer userStream={userVideoStream}/>
        </div>
    )
}