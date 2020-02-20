import "./notifications.component.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { handleRequest } from "../../redux/actions/user.actions";


class NotificationsComponent extends Component{

    friendshipRequestHandler(value, requestId, sourceId, sourceName, targetId, targetName){
        const { handleRequest } = this.props;
        handleRequest(value, requestId, sourceId, sourceName, targetId, targetName);
    }

    render(){
        return(
            <div className="notifications-container">
                <h1>This is the notifications component</h1>
                {
                    (this.props.currentUser.pendingRequests.length > 0)?(
                        this.props.currentUser.pendingRequests.map( pendingRequest => {
                            return(
                                <div key={pendingRequest.requestId}>
                                    <h2>Pending Requests</h2>
                                    <div className="pending-request-frame">
                                        <h4>{ pendingRequest.targetName + " "} hasn't approve your friend request</h4>
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
                                <div key={request.requestId}>
                                    <h2>Friendship Requests</h2>
                                    <div  className="request-frame">
                                        <h4>{request.sourceName + " "} wants to be your friend</h4>
                                        <div className="request-buttons">
                                            <input onClick = { () => this.friendshipRequestHandler(true, request.requestId, request.sourceId, request.sourceName, request.targetId, request.targetName) } className="accept-buton" type="button" value="Accept"/>
                                            <input onClick = { () => this.friendshipRequestHandler(false, request.requestId, request.sourceId, request.sourceName,  request.targetId, request.targetName) } className="decline-buton" type="button" value="Decline"/>
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

const mapDispatchToProps = dispatch => ({
    handleRequest: (value, requestId, sourceId, sourceName, targetId, targetName) => dispatch(handleRequest({value, requestId, sourceId, sourceName, targetId, targetName}))
  })

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsComponent);