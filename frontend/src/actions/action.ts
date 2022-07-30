import { ADD_SOCKET_ROOM_ID,DELETE_SOCKET_ROOM_ID ,HOST,ADD_SOCKET_OBJ, ADD_SOCKET_USER_ID,DELETE_SOCKET_PROPS} from "../constants";


export function addSocketRoomId(roomId:string)
{
    return {type:ADD_SOCKET_ROOM_ID,payload:{roomId}}
}


export function deleteSocketRoomId(){
    return {type:DELETE_SOCKET_ROOM_ID,payload:{roomId:""}}
}

export function addHost(bValue:boolean)
{
  return {type:HOST,payload:{isHost:bValue}}
}

export function addSocketUserId(userId:string)
{
  return {type:ADD_SOCKET_USER_ID,payload:{userId}}
}

export function addSocketObj(socketObj:object)
{
  return {type:ADD_SOCKET_OBJ,payload:{socketObj}}
}

export function deleteSocketProps()
{
  return {type:DELETE_SOCKET_PROPS}
}