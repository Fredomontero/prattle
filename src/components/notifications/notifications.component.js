import "./notifications.component.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { handleRequest } from "../../redux/actions/user.actions";

import { FormattedMessage } from 'react-intl';

class NotificationsComponent extends Component{

    friendshipRequestHandler(value, requestId, sourceId, sourceName, targetId, targetName){
        const { handleRequest } = this.props;
        handleRequest(value, requestId, sourceId, sourceName, targetId, targetName);
    }

    render(){
        return(
            <div className="notifications-container">
                <h1>
                    <FormattedMessage id="notifications.title" defaultMessage="Notifications" />
                </h1>
                {
                    (this.props.currentUser.pendingRequests.length > 0)?(
                        this.props.currentUser.pendingRequests.map( pendingRequest => {
                            return(
                                <div key={pendingRequest.requestId}>
                                    <h2>
                                        <FormattedMessage id="pending.requests.title" defaultMessage="Pending Requests" />
                                    </h2>
                                    <div className="pending-request-frame">
                                        <h4>{ pendingRequest.targetName + " "} 
                                            <FormattedMessage id="pending.requests.text" defaultMessage="hasn't approve your friend request" />
                                        </h4>
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
                                    <h2>
                                        <FormattedMessage id="friendship.requests.title" defaultMessage="Friendship Requests" />
                                    </h2>
                                    <div  className="request-frame">
                                        <h4>{request.sourceName + " "} 
                                            <FormattedMessage id="friendship.requests.text" defaultMessage=" wants to be your friend" />
                                        </h4>
                                        <div className="request-buttons">
                                            <FormattedMessage id="friendship.requests.accept" defaultMessage="Accept">
                                                { value => <input onClick = { () => this.friendshipRequestHandler(true, request.requestId, request.sourceId, request.sourceName, request.targetId, request.targetName) } className="accept-buton" type="button" value={value}/> }
                                            </FormattedMessage>
                                            <FormattedMessage id="friendship.requests.decline" defaultMessage="Decline">
                                                { value => <input onClick = { () => this.friendshipRequestHandler(false, request.requestId, request.sourceId, request.sourceName,  request.targetId, request.targetName) } className="decline-buton" type="button" value={value}/> }
                                            </FormattedMessage>
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