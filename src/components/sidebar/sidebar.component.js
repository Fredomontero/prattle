import React, {Component} from "react"
import { FormattedMessage } from 'react-intl';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import Badge from '@material-ui/core/Badge';
import './sidebar.component.css';
import { connect } from "react-redux";
import { changeSection, logout } from "../../redux/actions/user.actions";

class SidebarComponent extends Component{

    constructor(props){
        super(props);
        this.state={
            modal: false
        }
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
                    <ListItemIcon><Badge badgeContent={1} color="secondary"> <NotificationsIcon className="sidebar-icon"/> </Badge></ListItemIcon>
                    <FormattedMessage id="sidebar.notifications" defaultMessage="Notifications" />
                </ListItem>
                <ListItem className="sidebar-item" button onClick={ () => this.changeConversationHandler('chats') }>
                    <ListItemIcon><Badge badgeContent={1} color="secondary"> <ChatBubbleIcon className="sidebar-icon"/> </Badge></ListItemIcon>
                    <FormattedMessage id="sidebar.messages" defaultMessage="Messages" />
                </ListItem>
                <ListItem className="sidebar-item" button onClick = {this.props.handler}>
                    <ListItemIcon><GroupIcon className="sidebar-icon"/></ListItemIcon>
                    <FormattedMessage id="sidebar.group" defaultMessage="Create Group" />
                </ListItem>
                <ListItem className="sidebar-item" button onClick={ () => this.changeConversationHandler('users') }>
                    <ListItemIcon><PersonAddIcon className="sidebar-icon"/></ListItemIcon>
                    <FormattedMessage id="sidebar.friends" defaultMessage="Friends" />
                </ListItem>
                <ListItem className="sidebar-item" button onClick={ () => this.changeConversationHandler('settings') }>
                    <ListItemIcon><SettingsIcon className="sidebar-icon"/></ListItemIcon>
                    <FormattedMessage id="sidebar.settings" defaultMessage="Settings" />
                </ListItem>
                <ListItem className="sidebar-item" button onClick={ this.submitHandler }>
                    <ListItemIcon><ExitToAppIcon className="sidebar-icon"/></ListItemIcon>
                    <FormattedMessage id="sidebar.logout" defaultMessage="Logout" />
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