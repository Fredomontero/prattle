import React, {Component} from "react";
import { connect } from "react-redux";
import { createGroupRequest } from "../../redux/actions/user.actions";
import { MdClose, MdCheck } from "react-icons/md";
import { FormattedMessage } from 'react-intl';

import "./modal.component.css";

class ModalComponent extends Component{
    constructor(props){
        super(props);
        this.state = { 
            render: true,
            participants: [],
            groupName: ""
         };
         
         this.groupNameRef = React.createRef();
    }

    updateParticipants = (contact) => {
        if(this.verifyContact(contact._id)){
            //Remove Contact
            var updatedArray = this.state.participants.filter( participant => participant._id !== contact._id);
            this.setState({participants: [...updatedArray]});
        }else{
            //Add Contact
            this.setState({participants: [...this.state.participants, {
              _id: contact._id,
               name: contact.fullname,
               addedAt: new Date(Date.now()).toLocaleString()
            }]});
        }
    }

    verifyContact = (id) => {
        var result = this.state.participants.filter( participant => participant._id === id);
        return (result.length > 0) ? true : false;
    }

    createGroup = () => {
        const { createGroupRequest, currentuser } = this.props;
        const groupName = this.groupNameRef.current.value;
        if(groupName.length > 0 && this.state.participants.length > 2){
            createGroupRequest([{
                _id: currentuser._id,
                name: currentuser.fullname,
                addedAt: new Date(Date.now()).toLocaleString()
            }, ...this.state.participants], groupName);
        }
    }

    updateGroupName = () => {
        this.setState({groupName: this.groupNameRef.current.value});
    }


    render(){
        const { render } = this.state;
        const { currentuser } = this.props;
        if(render === false) return null;
        return(
            <div className="modal-container">
                <div className="modal">
                    <div className="top-bar">
                        <div className="close-icon-container"><MdClose className="close-icon" onClick={ this.props.handler }/></div>
                    </div>
                    <div className="modal-content">
                        <h3 className="title">
                            <FormattedMessage id="create.group.title" defaultMessage="Create new group" /> 
                        </h3>
                        <p className="user-message">
                            <FormattedMessage id="create.group.indications" defaultMessage="Type a name and add at least 2 participants" /> 
                        </p>
                        <br/>
                        <FormattedMessage id="create.group.name" defaultMessage="Name of the group">
                            { placeholder => <input className="name-input" type="text" id="name" placeholder={placeholder} autoComplete="off" ref={this.groupNameRef} onChange={this.updateGroupName}/> }
                        </FormattedMessage><br/>
                        <div className="user-list">
                            {
                                (currentuser && currentuser.contacts.length > 2) ? (
                                    currentuser.contacts.map( contact => {
                                        return(
                                            <div className="contact-container" key={contact._id} onClick={() => this.updateParticipants(contact)}>
                                                <div className="contact-name">{contact.fullname}</div>
                                                <div className={this.verifyContact(contact._id)?"contact-selected":"contact-unselected"}><MdCheck/></div>
                                            </div>
                                        )
                                    })
                                ):(
                                    <h5>
                                        <FormattedMessage id="create.group.contacts.message" defaultMessage="You don't have enough contacts for creating a group" /> 
                                    </h5>
                                )
                            }
                        </div>
                        <div className={ (this.state.participants.length > 1 && this.state.groupName.length > 0) ? "modal-button enabled": "modal-button disabled" } onClick={this.createGroup}>
                            <FormattedMessage id="create.group.button" defaultMessage="Create Group" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    const { loggedIn} = state;
    return { 
        currentuser: (loggedIn) ? loggedIn : null
    }
}

const mapDispatchToProps = dispatch => ({
    createGroupRequest: (participants, groupName) => dispatch(createGroupRequest({ participants, groupName }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);