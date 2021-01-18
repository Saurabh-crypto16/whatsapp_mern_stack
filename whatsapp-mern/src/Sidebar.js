/*1.IconButton is material ui function that makes icons clickable
  2.SearchOutlined is custom search bar by material ui*/
import React from 'react'
import "./Sidebar.css"
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar,IconButton } from "@material-ui/core";
import {SearchOutlined} from "@material-ui/icons"
import SidebarChat from './SidebarChat';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src="https://images.pexels.com/photos/7059/man-people-space-desk.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500" />

                <div className="sidebar__headerright">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton> 
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>     
                </div>
            </div>

            <div className="sidebar__search">
                    <div className="sidebar__searchConatiner">
                        <SearchOutlined />
                        <input placeholder="Search or start new chat"
                        type="text" />
                    </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat src="https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
                <SidebarChat src="https://images.pexels.com/photos/270557/pexels-photo-270557.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
                <SidebarChat src="https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
            </div>
        </div>
    )
}

export default Sidebar
