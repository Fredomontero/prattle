import React, {Component} from "react"
import { connect } from "react-redux";

import "./chats.component.css";

class ChatsComponent extends Component{
    constructor(props){
        super(props);
        console.log("This is the Chats Component");
    }

    componentDidMount(){
        const { currentuser } = this.props;
        console.log("Inside Component Did Mount");
        console.log("The currentUser is: ", currentuser);
    }
    
    render(){
        return(
            <div className="chat-component-container">
                <div className="my-contacts">
                    <h3>My Contacts</h3>
                        {
                            ((!this.props.currentuser.contacts) || (this.props.currentuser.contacts.length === 0)) ? (
                                <h4>You don't have any contacts</h4> 
                            ):(
                                this.props.currentuser.contacts.map( contact => {
                                    return(
                                        <div key={contact._id} className="contact-container">
                                            <h5>{contact.firstname + " " + contact.lastname}</h5>
                                            <h5>{contact.email}</h5>
                                        </div>
                                    )
                                })
                            )
                        }
                </div>
                <div className="chat-component">
                    <div className="chat-content">
                        
                    </div>
                    <div className="input-container">
                        <input className="message-input" type="text"/>
                        <input className="button-input" type="button" value="send"/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    const { loggedIn } = state;
    if(loggedIn)
        console.log("Current user is: ", loggedIn);
    return { 
        currentuser: (loggedIn) ? loggedIn : null 
    }
}

export default connect(mapStateToProps, null)(ChatsComponent);

/*
 <div className="my-contacts">
                    <h3>My Contacts</h3>
                    {
                        ((!this.props.currentuser.contacts) || (this.props.currentuser.contacts.length === 0)) ? (
                            <h4>You don't have any contacts</h4> 
                        ):(
                            this.props.currentuser.contacts.map( contact => {
                                return(
                                    <div key={contact._id} className="contact-container">
                                        <h5>{contact.firstname + " " + contact.lastname}</h5>
                                        <h5>{contact.email}</h5>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
                <div className="chat-component">
                        <div className="chat-content">
                            
                        </div>
                        <div className="input-container">
                            <input className="message-input" type="text"/>
                            <input className="button-input" type="button" value="send"/>
                        </div>
                    </div>

                    .chat-component-container{
    display: inline-block;
    width: 100%;
    box-sizing: content-box;
}

.my-contacts{
    border: 1px solid #eaeef0;
    height: 100%;
    position: fixed;
    text-align: center;
    border-collapse: collapse;
    display: inline-block;
}

.contact-container{
    border: 1px solid #eaeef0;
    text-align: left;
    padding: 0 15px;
    cursor: pointer;
    border-collapse: collapse;
}

.contact-container h5{
    margin: 7px 0;
}

.chat-component{
    display: block;
    margin-left: 150px;
    background-color: #e6e8fa;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    height: 100%;
}

.chat-content{
    margin: 10px;
    width: 77%;
    height: 70%;
    background-color: #fff;
    display: block !important;
}

.input-container{
    display: block !important;
    margin: 10px;
    height: 11%;
}

.input-container .message-input{
    margin: 5px;
    height: 90%;
    width: 70%;
    box-sizing: border-box;
    display: inline-block;
}

.input-container .button-input{
    width: 8%;
    display: inline-block;
    background-color:#0d98ba;
    color: #fff;
    padding: 29px;
}
*/