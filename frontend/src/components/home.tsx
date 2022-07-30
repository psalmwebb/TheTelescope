
import "../scss/home.scss";
import {useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {addSocketRoomId,addHost,addSocketObj,addSocketUserId} from "../actions/action";
import io from "socket.io-client";
import {v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel, faCross, faCrosshairs, faSatellite, faSatelliteDish, faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";


const URL = "/";

interface RootState {
    socketReducer:{isHost:boolean,socketObj:any,userId:string,roomId:string}
}


export default function Home(props:any)
{
    const [showHostId,setShowHostId] = useState<boolean>(false)
    const [showJoinForm,setShowJoinForm] = useState<boolean>(false)
    const [inputFieldValue,setInputFieldValue] = useState("")

    
    const dispatch = useDispatch()

    const {roomId,userId,socketObj} = useSelector((state:RootState)=> state.socketReducer)


    const handleHost =() : void =>{
         
        let roomId = Math.floor((Math.random() * 10E11)).toString(32);

        const userId = uuidv4()

        let socketObj = io(URL,{query:{roomId,userId}});

        console.log(socketObj);

        dispatch(addHost(true))
        dispatch(addSocketRoomId(roomId))
        dispatch(addSocketObj(socketObj))
        dispatch(addSocketUserId(userId))
        setShowHostId(true)
        setShowJoinForm(false)
    }

    const handleJoin = (e:any) : void=>{
       
        e.preventDefault()

        if(!inputFieldValue) return

        const userId = uuidv4()

        let socketObj =  io(URL,{query:{roomId:inputFieldValue,userId}})

        console.log(socketObj);

        dispatch(addSocketRoomId(inputFieldValue))
        dispatch(addSocketObj(socketObj))
        dispatch(addSocketUserId(userId))
        setShowJoinForm(false);
    }

    const handleChange = (e:any) : void=>{
        setInputFieldValue(e.target.value);
    }
       
     if(roomId && userId) 
            return <Navigate to="/room"/>
        

    return (
        <div className="Home">
           {/* <nav>
               <ul>
                   <li >Host</li>
                   <li>Join</li>
               </ul>
           </nav> */}

           <nav>
              <span>
                <FontAwesomeIcon icon={faSatelliteDish} style={{color:"white",margin:"5px",fontSize:"40px"}}/>
              </span>
              <span style={{margin:"5px"}}>theTelescope</span>
           </nav>

           <main>
              <div className="left-section">
                 <div>
                    <div style={{width:"350px",
                           height:"350px",
                           display:"flex",
                           backgroundColor:"#222",
                           alignItems:"center",
                           justifyContent:"center",
                           borderRadius:"100%",
                           margin:"20px auto",
                           }}>
                        <FontAwesomeIcon icon={faSatelliteDish} style={{color:"green",textAlign:"center",fontSize:"200px"}}/>
                    </div>
                    <p>
                        Free video conferencing for everyone
                    </p>
                 </div>
              </div>

              <div className="right-section">
                  <div>
                    <button onClick={handleHost}>NEW MEETING</button>
                    <button onClick={()=> {setShowJoinForm(true); setShowHostId(false)}}>JOIN A MEETING</button>
                  </div>
              </div>
           </main>

            
           { showJoinForm && !showHostId &&
             <>
               <div className="cover">
                <span onClick={()=> setShowJoinForm(false)}><FontAwesomeIcon icon={faXmark} style={{color:"white",fontSize:"40px"}}/></span>
               </div>
               <form className="join-form">
                 <input type="text" placeholder="Enter room id" onChange={handleChange}/><button onClick={handleJoin}>Join</button>
               </form>
             </>
           }
        </div>
    )
}