import "./notifications.component.css";
import React, { Component } from "react";
import { connect } from "react-redux";


class NotificationsComponent extends Component{
    constructor(props){
        super(props);
        console.log("This is the Notifications Component");
    }

    componentDidMount(){
        console.log("currentUser in componentDidMount: ", this.props.currentUser);
    }

    render(){
        return(
            <div className="notifications-container">
                <h1>This is the notifications component</h1>
                {
                    (this.props.currentUser.pendingRequests.length > 0)?(
                        this.props.currentUser.pendingRequests.map( pendingRequest => {
                            return(
                                <div>
                                    <h2>Pending Requests</h2>
                                    <div className="pending-request-frame">
                                        <h4>From: {pendingRequest.sourceId}</h4>
                                        <h4>To: {pendingRequest.targetId}</h4>
                                    </div>
                                </div>
                            )
                        })
                    ):(<br/>)
                }
                {
                    (this.props.currentUser.requests.length > 0)?(
                        this.props.currentUser.requests.map( request => {
                            return(
                                <div>
                                    <h2>Friendship Requests</h2>
                                    <div className="request-frame">
                                        <h4>From: {request.sourceId}</h4>
                                        <h4>To: {request.targetId}</h4>
                                        <div className="request-buttons">
                                            <input className="accept-buton" type="button" value="Accept"/>
                                            <input className="decline-buton" type="button" value="Decline"/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ):(<br/>)
                }
            </div>
        )
    }

}

function mapStateToProps(state){
    const { loggedIn } = state;
    return { currentUser: (loggedIn) ? loggedIn : null }
  }

export default connect(mapStateToProps, null)(NotificationsComponent);