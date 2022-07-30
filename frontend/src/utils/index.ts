type objectType = {
    videoGrid : any,
    section: any ,
    video:HTMLVideoElement | null,
    label:any,
    displayName:string | null,
    stream:any,
    action:string
    isRemote:Boolean
}

export function handleVideoSection({videoGrid,section,video,label,displayName,stream,action,isRemote} : objectType)
{
    if(action === "add"){
        video!.srcObject = stream
        video!.muted = isRemote ? false : true
        video!.autoplay = true
    
        label!.textContent = displayName!.length > 4 ? displayName?.slice(0,5) : displayName

        section.appendChild(video)
        section.appendChild(label)
        
        videoGrid.appendChild(section)
    }
    else if(action === "remove"){
        section.remove()
    }

    switch(videoGrid.children.length){
        case 1:
            videoGrid.style.gridTemplateColumns = "repeat(1,1fr)"
            videoGrid.style.gridTemplateRows = "repeat(1,1fr)"
            break
        case 2:
            videoGrid.style.gridTemplateColumns = "repeat(2,1fr)"
            videoGrid.style.gridTemplateRows = "repeat(1,1fr)"
            break
        case 3:
            videoGrid.style.gridTemplateColumns = "repeat(3,1fr)"
            videoGrid.style.gridTemplateRows = "repeat(1,1fr)"
            break
        case 4:
            videoGrid.style.gridTemplateColumns = "repeat(2,1fr)"
            videoGrid.style.gridTemplateRows = "repeat(2,1fr)"
            break
        case 5:
            videoGrid.style.gridTemplateColumns = "repeat(3,1fr)"
            videoGrid.style.gridTemplateRows = "repeat(2,1fr)"
            break
        case 6:
            videoGrid.style.gridTemplateColumns = "repeat(3,1fr)"
            videoGrid.style.gridTemplateRows = "repeat(2,1fr)"
            break
        case 7:
            videoGrid.style.gridTemplateColumns = "repeat(3,1fr)"
            videoGrid.style.gridTemplateRows = "repeat(3,1fr)"
            break
        case 8:
            videoGrid.style.gridTemplateColumns = "repeat(4,1fr)"
            videoGrid.style.gridTemplateRows = "repeat(2,1fr)"
            break
        case 9:
            videoGrid.style.gridTemplateColumns = "repeat(3,1fr)"
            videoGrid.style.gridTemplateRows = "repeat(3,1fr)"
            break
        case 10:
            videoGrid.style.gridTemplateColumns = "repeat(5,1fr)"
            videoGrid.style.gridTemplateRows = "repeat(2,1fr)"
            break
        default:
            
    }
}


export function getUserMedia(){

    const constraints = {
        audio:true,
        video:true
    }

    return navigator.mediaDevices.getUserMedia(constraints);
}