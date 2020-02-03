import React, { Component } from 'react';
import { connect } from "react-redux";
import { logout, loadProfile, loadSocket } from "../../redux/actions/user.actions";
import './dashboard-page.css';
import ChatComponent from "../../components/chat/chat.component";
import SettingsComponent from "../../components/settings/settings.component";
import UsersComponent from "../../components/users/users.component";
import NotificationsComponent from "../../components/notifications/notifications.component";
import { MdChatBubble, MdPersonAdd, MdSettings, MdPowerSettingsNew, MdNotifications } from "react-icons/md";
import io from 'socket.io-client';


class DashboardPage extends Component{
    constructor(props){
        super(props);
        console.log("Dashboard Component");
        this.state = {
            section: "chats"
        }
    }

    componentDidMount(){
        const { loadProfile, loadSocket } = this.props;
        loadProfile(this.props.loggedIn.userId);
        loadSocket();
        // this.socket = io('http://localhost:4001');
    }

    submitHandler = () => {
        const { logout } = this.props;
        logout();
    }

    render(){
        return(
            <div>
                {/* NAVBAR */}
                <div className="navbar">
                    <h1>Dashboard  &#128021;</h1>
                    <h3 className="welcome">Welcome { this.props.loggedIn.fullname }</h3>
                </div>
                <div className="dashboard-container">
                <div className="sidebar">
                    <ul>
                        <li onClick={ () => this.setState({section: "notifications"}) } ><MdNotifications/></li>
                        <li onClick={ () => this.setState({section: "chats"}) } ><MdChatBubble/></li>
                        <li onClick={ () => this.setState({section: "users"}) } ><MdPersonAdd/></li>
                        <li onClick={ () => this.setState({section: "settings"}) } ><MdSettings/></li>
                        <li onClick={ this.submitHandler }><MdPowerSettingsNew/></li>
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
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    loadProfile:(userId) => dispatch(loadProfile(userId)),
    loadSocket: () => dispatch(loadSocket())
})

const mapStateToProps =(state) => {
    const { loggedIn } = state;
    return { loggedIn: loggedIn }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

