import React, {Component} from "react"
import { FormattedMessage } from 'react-intl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Badge from '@material-ui/core/Badge';
import './sidebar.component.css';
import { connect } from "react-redux";
import { changeSection, logout } from "../../redux/actions/user.actions";

class SidebarComponent extends Component{
    constructor(props){
        super(props);
    }

    submitHandler = () => {
        const { logout } = this.props;
        logout();
    }

    changeConversationHandler = (section) => {
        const { changeSection } = this.props;
        console.log("The section is: ", section);
        changeSection(section);
    }
    
    render(){
        return(
            <List className="sidebar-container">
                <ListItem className="sidebar-item" button onClick={ () => this.changeConversationHandler('notifications') }>
                    <ListItemIcon><Badge badgeContent={4} color="secondary"> <NotificationsIcon className="sidebar-icon"/> </Badge></ListItemIcon>
                    Notifications
                </ListItem>
                <ListItem className="sidebar-item" button onClick={ () => this.changeConversationHandler('chats') }>
                    <ListItemIcon><Badge badgeContent={4} color="secondary"> <ChatBubbleIcon className="sidebar-icon"/> </Badge></ListItemIcon>
                    Messages
                </ListItem>
                <ListItem className="sidebar-item" button onClick={ () => this.changeConversationHandler('users') }>
                    <ListItemIcon><PersonAddIcon className="sidebar-icon"/></ListItemIcon>
                    Friends
                </ListItem>
                <ListItem className="sidebar-item" button onClick={ () => this.changeConversationHandler('settings') }>
                    <ListItemIcon><SettingsIcon className="sidebar-icon"/></ListItemIcon>
                    Settings
                </ListItem>
                <ListItem className="sidebar-item" button onClick={ this.submitHandler }>
                    <ListItemIcon><ExitToAppIcon className="sidebar-icon"/></ListItemIcon>
                    Logout
                </ListItem>
            </List>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    changeSection: (section) => dispatch(changeSection({section})),
    logout: () => dispatch(logout()),
});

const mapStateToProps = (state) => {
    const { dashboardTab } = state;
    return { dashboardTab: dashboardTab }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);