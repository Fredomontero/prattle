import React, { Component } from 'react';
import { connect } from "react-redux";
import { logout, loadProfile, closeNotificationBar } from "../../redux/actions/user.actions";
import './dashboard-page.css';
import ChatComponent from "../../components/chat/chat.component";
import SettingsComponent from "../../components/settings/settings.component";
import UsersComponent from "../../components/users/users.component";
import NotificationsComponent from "../../components/notifications/notifications.component";
import SidebarComponent from "../../components/sidebar/sidebar.component";
import ModalComponent from "../../components/modal/modal.component";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import { FormattedMessage } from 'react-intl';

class DashboardPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            section: "chats",
            modal: false
        }
    }

    componentDidMount(){
        const { loadProfile } = this.props;
        loadProfile(this.props.loggedIn.userId);
    }

    submitHandler = () => {
        const { logout } = this.props;
        logout();
    }

    modalHandler = () => {
        this.setState({modal: !this.state.modal});
    }

    openSnack = () => {
        this.setState({open: true});
    }

    handleClose = (event) => {
        const { closeNotificationBar } = this.props;
        closeNotificationBar();
    }

    getLastNotification = () => {
        let { notifications } = this.props;
        let length = notifications.length;
        return notifications[length].text;
    }

    render(){
        return(
           <div className="main-container">
                <div className="navbar">
                    <h1><FormattedMessage id="dashboard.title" defaultMessage="Dashboard" /><span role="img" aria-label="doggie">&#128021;</span></h1>
                    <h3 className="welcome"><FormattedMessage id="dashboard.welcome" defaultMessage="Welcome" /> { this.props.loggedIn.fullname }</h3>
                </div>
                <div className="dashboard-body">
                    <div className="side-menu">
                        <SidebarComponent handler = {this.modalHandler}/>
                    </div>
                    <div className="interactive-container">
                        {   (this.props.dashboardTab === "chats") ? (
                                <ChatComponent/>
                            ):(
                                (this.props.dashboardTab === "users") ? (
                                    <UsersComponent/>
                                ) : (
                                    (this.props.dashboardTab === "settings") ? (
                                        <SettingsComponent/>
                                    ) : (
                                        <NotificationsComponent/>
                                    )
                                    
                                )
                            )
                        }
                    </div>
                </div>
                {(this.state.modal === true) ? (<ModalComponent handler={this.modalHandler} />):(null)}
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.props.notificationsBar}
                    autoHideDuration={3000}
                    onClose={this.handleClose}
                    message={ (this.props.notifications.length > 0) ? this.props.notifications[this.props.notifications.length - 1].text : "New Notification" }
                    action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={this.handleClose}>
                        UNDO
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    loadProfile:(userId) => dispatch(loadProfile(userId)),
    closeNotificationBar:() => dispatch(closeNotificationBar())
})

const mapStateToProps = (state) => {
    const { loggedIn, dashboardTab, notificationsBar, notifications } = state;
    return { 
        loggedIn: loggedIn,
        dashboardTab: dashboardTab,
        notifications: notifications,
        notificationsBar: notificationsBar
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

