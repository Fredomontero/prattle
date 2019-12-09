import React, { Component } from 'react';
import { connect } from "react-redux";
import { logout, loadProfile } from "../../redux/actions/user.actions";
import './dashboard-page.css';
import ChatsComponent from "../../components/chats/chats.component";
import SettingsComponent from "../../components/settings/settings.component";
import UsersComponent from "../../components/users/users.component";
import { MdChatBubble, MdPersonAdd, MdSettings, MdPowerSettingsNew } from "react-icons/md";


class DashboardPage extends Component{
    constructor(props){
        super(props);
        console.log("Dashboard Component");
        this.state = {
            section: "chats"
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

    render(){
        return(
            <div>
                {/* NAVBAR */}
                <div className="navbar">
                    <h1>Dashboard  &#128021;</h1>
                </div>
                <div className="dashboard-container">
                <div className="sidebar">
                    <ul>
                        <li onClick={ () => this.setState({section: "chats"}) } ><MdChatBubble/></li>
                        <li onClick={ () => this.setState({section: "users"}) } ><MdPersonAdd/></li>
                        <li onClick={ () => this.setState({section: "settings"}) } ><MdSettings/></li>
                        <li onClick={ this.submitHandler }><MdPowerSettingsNew/></li>
                    </ul>
                </div>
                <div className="dashboard-body">
                    {   (this.state.section === "chats") ? (
                        <ChatsComponent/>
                    ):(
                        (this.state.section === "users") ? (
                            <UsersComponent/>
                        ) : (
                            <SettingsComponent/>
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
    loadProfile:(userId) => dispatch(loadProfile(userId))
})

const mapStateToProps =(state) => {
    const { loggedIn } = state;
    return { loggedIn: loggedIn }
  }

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);

