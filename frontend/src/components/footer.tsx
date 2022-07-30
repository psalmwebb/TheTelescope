import React,{useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import {deleteSocketProps} from "../actions/action";
import callEndImg from "../img/call_end.png";
import micNoneImg from "../img/mic_none.png";
import micOffImg from "../img/mic_off.png";
import videoCamImg from "../img/videocam.png";
import videoCamOffImg from "../img/videocam_off.png";
import captionImg from "../img/caption.png";
import captionOffImg from "../img/caption_off.png";
import { RefObject } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlenderPhone, faMicrophone, faMicrophoneAltSlash, faPhone, faPhoneAlt, faPhoneFlip, faPhoneSquare, faPhoneVolume, faVideo, faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


interface RootState {
    socketReducer:{isHost:boolean,socketObj:any,userId:string,roomId:string}
}

interface prop{
    userStream:RefObject<MediaStream>
}

const Footer:React.FC<prop> =({userStream})=>{
    const {socketObj} = useSelector((state:RootState)=> state.socketReducer)

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const [audioEnabled,setAudioEnabled] =  useState(true)

    const [videoEnabled,setVideoEnabled] = useState(true)

    const [captionEnabled,setCaptionEnabled] = useState(false)

    function handleClick()
    {
       userStream.current!.getAudioTracks()[0].stop()
       userStream.current!.getVideoTracks()[0].stop()

       socketObj.close()
       dispatch(deleteSocketProps())
       navigate("/");
    }

    function handleVideoEnabled(){
        console.log('dkdkdk');
        setVideoEnabled(!videoEnabled);
        userStream.current!.getVideoTracks()[0].enabled = !videoEnabled;
    }

    function handleAudioEnabled(){
        setAudioEnabled(!audioEnabled);
        userStream.current!.getAudioTracks()[0].enabled = !audioEnabled;
    }

    return (
        <footer>

            <div className="audio-control-div" onClick={handleAudioEnabled} style={{
                width:"50px",
                height:"50px",
                border:"1px solid white",
                backgroundColor:"white",
                color:"#1b1b1b",
                fontSize:"20px"
            }}>
               <FontAwesomeIcon icon={audioEnabled ? faMicrophone : faMicrophoneAltSlash}/>
            </div>

            <div className="video-control-div" onClick={handleVideoEnabled} style={
                {
                    width:"50px",
                    height:"50px",
                    border:"1px solid white",
                    backgroundColor:"white",
                    color:"#1b1b1b",
                    fontSize:"20px"
                }
            }>
                <FontAwesomeIcon icon={videoEnabled ? faVideo : faVideoSlash}/>
            </div>

            <div className="end-button-div" onClick={handleClick} style={
                {
                    width:"50px",
                    height:"50px",
                    border:"1px solid white",
                    backgroundColor:"white",
                    color:"red",
                    fontSize:"20px"
                }
            }>
                <FontAwesomeIcon icon={faPhone} style={{transform:"rotate(135deg)"}}/>
            </div>
        </footer>
    )
}


export default Footer;

