import React, {Component} from "react"
import { connect } from "react-redux";
import { getConversationsRequest } from "../../redux/actions/user.actions";
import { sendMessage, loadMessages, saveMessage, selectConversation } from "../../redux/actions/message.actions";
import { ObjectID } from '../../utils/utils';
import { FormattedMessage } from 'react-intl';
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

    componentDidMount(){
        const { getConversationsRequest, currentuser } = this.props;
        let userId = (currentuser._id) ? currentuser._id : currentuser.userId;
        getConversationsRequest(userId);
    }

    handleMessage = () => {
        const { sendMessage, currentuser, saveMessage } = this.props;
        var text = this.messageRef.current.value;
        var date = new Date(Date.now()).toLocaleString();
        var author = currentuser.fullname;
        var messageID = ObjectID();
        // console.log("The message Id is: ", messageID)
        this.messageRef.current.value = "";
        saveMessage( messageID, this.state.chatId, author, text, date );
        sendMessage( messageID, author, text, date, this.state.chatId );
    }

    getUser = (conversation) => {
        let { currentuser } = this.props;
        let contactId = conversation.participants.filter( participant => participant._id !== currentuser._id ).map( participant => participant.name )[0];
        // console.log(contactId)
        return contactId;
    }

    selectConversation = (id) => {
        const { loadMessages, selectConversation } = this.props;
        this.setState({chatId: id});
        selectConversation(id);
        loadMessages(id);
        console.log("The conversation Id is: ", id);
    }
    
    render(){
        return(
            <div className="chat-component-container">
                <div className="my-contacts">
                    <h3>
                        <FormattedMessage id="conversations.title" defaultMessage="My Conversations" />
                    </h3>
                        {
                            ((!this.props.currentuser.conversations) || (this.props.currentuser.conversations.length === 0)) ? (
                                <h4>
                                    <FormattedMessage id="conversations.empty" defaultMessage="You don't have any conversations" />
                                </h4> 
                            ):(
                                this.props.currentuser.conversations.map( conversation => {
                                    return(
                                        <div key={conversation._id} className={ (conversation._id === this.state.chatId) ? "conversation-container-active" : "conversation-container" } onClick={() => this.selectConversation(conversation._id)}>
                                            <h4>{(conversation.name === 'noname') ? (this.getUser(conversation)):(conversation.name)}</h4> 
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
                            (this.props.messagesList && this.props.messagesList.length > 0)?(
                                this.props.messagesList.map( message => {
                                    return(
                                        <div key={message._id} className="messageContainer">
                                            <div className={(message.author === this.props.currentuser.fullname) ? "sentMessagePosition" : "recievedMessagePosition"}>
                                                <div className={(message.author === this.props.currentuser.fullname) ? " messageBubble sentMessageColor" : "messageBubble recievedMessageColor"}>
                                                    <h5>Author: {message.author}</h5><br/>
                                                    <h5>Text: {message.text}</h5><br/>
                                                    <h5>Date: {message.createdAt}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ):(
                                <h2>
                                    <FormattedMessage id="messages.empty" defaultMessage="No Messages" />
                                </h2>
                            )
                        )
                    }
                    </div>
                    {
                        (this.state.chatId === null)?(<br/>):(
                            <div className="input-container">
                                <input className="message-input" type="text" ref={ this.messageRef }/>
                                <FormattedMessage id="chat.button" defaultMessage="Send">
                                    { value => <input className="button-input" type="button" value={value} onClick={this.handleMessage}/> }
                                </FormattedMessage>
                            </div>       
                        )
                    }
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
    sendMessage: (_id, author, text, date, conversationId) => dispatch(sendMessage({ _id, author, text, date, conversationId })),
    loadMessages: (conversationId) => dispatch(loadMessages({conversationId})),
    saveMessage: (_id, conversationId, author, text, date) => dispatch(saveMessage({_id, conversationId ,author, text, date })),
    selectConversation: (conversationId) => dispatch(selectConversation({conversationId})),
    getConversationsRequest: (_id) => dispatch(getConversationsRequest({_id}))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);