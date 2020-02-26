import React, { Component } from 'react';
import { connect } from "react-redux";
import { logout, loadProfile } from "../../redux/actions/user.actions";
import './dashboard-page.css';
import ChatComponent from "../../components/chat/chat.component";
import SettingsComponent from "../../components/settings/settings.component";
import UsersComponent from "../../components/users/users.component";
import NotificationsComponent from "../../components/notifications/notifications.component";
import ModalComponent from "../../components/modal/modal.component"
import { MdChatBubble, MdPersonAdd, MdSettings, MdPowerSettingsNew, MdNotifications, MdSentimentSatisfied } from "react-icons/md";

import { FormattedMessage } from 'react-intl';

class DashboardPage extends Component{
    constructor(props){
        super(props);
        // console.log("Dashboard Component");
        this.state = {
            section: "chats",
            modal: false
        }
    }

    componentDidMount(){
        const { loadProfile } = this.props;
        loadProfile(this.props.loggedIn.userId);
        // console.log(this.props.loggedIn);
        // console.log("The fullname before loading socket is: ", this.props.loggedIn.fullname);
        // loadSocket(this.props.loggedIn.fullname);
        // this.socket = io('http://localhost:4001');
    }

    submitHandler = () => {
        const { logout } = this.props;
        logout();
    }

    modalHandler = () => {
        this.setState({modal: !this.state.modal});
    }

    render(){
        return(
            <div>
                {/* NAVBAR */}
                <div className="navbar">
                    <h1><FormattedMessage id="dashboard.title" defaultMessage="Dashboard" /><span role="img" aria-label="doggie">&#128021;</span></h1>
                    <h3 className="welcome"><FormattedMessage id="dashboard.welcome" defaultMessage="Welcome" /> { this.props.loggedIn.fullname }</h3>
                </div>
                <div className="dashboard-container">
                <div className="sidebar">
                    <ul>
                        <li onClick={ () => this.setState({section: "notifications"}) } ><MdNotifications/></li>
                        <li onClick={ () => this.setState({section: "chats"}) } ><MdChatBubble/></li>
                        <li onClick={ () => this.setState({section: "users"}) } ><MdPersonAdd/></li>
                        <li onClick={ () => this.setState({section: "settings"}) } ><MdSettings/></li>
                        <li onClick={ this.submitHandler }><MdPowerSettingsNew/></li>
                        <li onClick={ this.modalHandler } ><MdSentimentSatisfied/></li>
                    </ul>
                </div>
                <div className="dashboard-body">
                    {   (this.state.section === "chats") ? (
                        <ChatComponent/>
                    ):(
                        (this.state.section === "users") ? (
                            <UsersComponent/>
                        ) : (
                            (this.state.section === "settings") ? (
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
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    loadProfile:(userId) => dispatch(loadProfile(userId))
})

const mapStateToProps =(state) => {
    const { loggedIn } = state;
    return { loggedIn: loggedIn }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

