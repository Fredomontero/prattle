import React, {Component} from "react";
import { connect } from "react-redux";
import { MdClose, MdCheck } from "react-icons/md";


import "./modal.component.css";

class ModalComponent extends Component{
    constructor(props){
        super(props);
        this.state = { 
            render: true
         };
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
                        <h3 className="title">Create new group</h3>
                        <br/>
                        <input className="name-input" type="text" id="name" placeholder="Name of the group" autoComplete="off"/><br/>
                        <div className="user-list">
                            {
                                (currentuser && currentuser.contacts) ? (
                                    currentuser.contacts.map( contact => {
                                        return(
                                            <div className="contact-container" key={contact._id}>
                                                <div className="contact-name">{contact.fullname}</div>
                                                <div className="contact-selected"><MdCheck/></div>
                                            </div>
                                        )
                                    })
                                ):(
                                    <h5>You don't have any contacts</h5>
                                )
                            }
                        </div>
                        <div className="modal-button">Create Group</div>
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

export default connect(mapStateToProps)(ModalComponent);