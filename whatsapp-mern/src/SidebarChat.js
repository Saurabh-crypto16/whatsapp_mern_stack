import { Avatar } from '@material-ui/core'
import React from 'react'
import "./SidebarChat.css"

function SidebarChat({src}) {
    return (
        <div className="sidebarChat">
            <Avatar src={src}/>
            <div className="sidebarChat__info">
                <h2>Room name</h2>
                <p>This is the lat message</p>
            </div>
        </div>
    )
}

export default SidebarChat
