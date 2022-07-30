import {ADD_SOCKET_ROOM_ID,DELETE_SOCKET_ROOM_ID,ADD_SOCKET_OBJ,HOST, ADD_SOCKET_USER_ID, DELETE_SOCKET_PROPS} from "../constants"

interface actionType{
    type:string,
    payload:{roomId:string,isHost:boolean,userId:string,socketObj:any}
}

const initState = {
    roomId:"",
    userId:"",
    isHost:false,
    socketObj:{}
}

export default function SocketReducer(state=initState,action:actionType)
{
    switch(action.type){
        case ADD_SOCKET_ROOM_ID:
            return {...state,roomId:action.payload.roomId}
        case DELETE_SOCKET_ROOM_ID:
            return {...state,roomId:""}
        case HOST:
            return {...state,isHost:action.payload.isHost}
        case ADD_SOCKET_USER_ID:
            return {...state,userId:action.payload.userId}
        case ADD_SOCKET_OBJ:
            return {...state,socketObj:action.payload.socketObj}
        case DELETE_SOCKET_PROPS:
            console.log(initState)
            return {...initState}
        default:
            return state
    }
}