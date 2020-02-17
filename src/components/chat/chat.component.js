import React, {Component} from "react"
import { connect } from "react-redux";
import { sendMessage, loadMessages, saveMessage } from "../../redux/actions/message.actions";

import "./chat.component.css";

class ChatComponent extends Component{
    constructor(props){
        super(props);
        this.messageRef = React.createRef();
        this.state = { 
            chatId: null,
            messages: []
         };
    }

    handleMessage = () => {
        const { sendMessage, currentuser, saveMessage } = this.props;
        var text = this.messageRef.current.value;
        var date = new Date(Date.now()).toLocaleString();
        var author = currentuser.fullname;
        // console.log("The message is: ", { text, author  , date });
        saveMessage( this.state.chatId, author, date, text );
        sendMessage( author, text, date, this.state.chatId );
    }

    getUser = (conversation) => {
        let { currentuser } = this.props;
        let contactId = conversation.participants.filter( participant => participant !== currentuser._id ).map( participant => participant )[0];
        let myContact = currentuser.contacts.filter( contact => contact._id === contactId ).map( contact => contact )[0];
        return myContact;
    }

    selectConversation = (id) => {
        const { loadMessages } = this.props;
        this.setState({chatId: id});
        loadMessages(id);
        console.log("The conversation Id is: ", id);
    }
    
    render(){
        return(
            <div className="chat-component-container">
                <div className="my-contacts">
                    <h3>My Conversations</h3>
                        {
                            ((!this.props.currentuser.conversations) || (this.props.currentuser.conversations.length === 0)) ? (
                                <h4>You don't have any conversations</h4> 
                            ):(
                                this.props.currentuser.conversations.map( conversation => {
                                    return(
                                        <div key={conversation._id} className={ (conversation._id === this.state.chatId) ? "conversation-container-active" : "conversation-container" } onClick={() => this.selectConversation(conversation._id)}>
                                            <h4>{this.getUser(conversation).fullname}</h4> 
                                            <h5>{conversation.createdAt}</h5> 
                                        </div>
                                    )
                                })
                            )
                        }
                </div>
                <div className="chat-component">
                    <div className="chat-content">
                    {
                        (this.state.chatId === null)?( <img className="message-icon" src={require("../../assets/images/messages-icon.png")} alt="messages-icon"/>):(
                            (this.props.messagesList)?(
                                this.props.messagesList.map( message => {
                                    return(
                                        <div key={message._id}>
                                        <h4>Author: {message.author}</h4>
                                        <h4>Text: {message.text}</h4>
                                        </div>
                                    )
                                })
                            ):(
                                <h2>No Messages</h2>
                            )
                        )
                    }
                    </div>
                    <div className="input-container">
                        <input className="message-input" type="text" ref={ this.messageRef }/>
                        <input className="button-input" type="button" value="send" onClick={this.handleMessage}/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    const { loggedIn, messages } = state;
    return { 
        currentuser: (loggedIn) ? loggedIn : null,
        messagesList: (messages) ? messages: null 
    }
}

const mapDispatchToProps = dispatch => ({
    sendMessage: (author, text, date, conversationId) => dispatch(sendMessage({ author, text, date, conversationId })),
    loadMessages: (conversationId) => dispatch(loadMessages({conversationId})),
    saveMessage: (conversationId, author, text, date) => dispatch(saveMessage({conversationId ,author, text, date }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);