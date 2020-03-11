import "./notifications.component.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
                        <h2>
                            <FormattedMessage id="pending.requests.title" defaultMessage="Pending Requests" />
                        </h2>
                    ):(<br/>)
                }
                <div className="requests-container">
                    {
                        (this.props.currentUser.pendingRequests.length > 0)?(
                            this.props.currentUser.pendingRequests.map( pendingRequest => {
                                return(
                                    <Card className="request-card" key={pendingRequest.requestId}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt="Friendship request"
                                                height="140"
                                                image="https://www.womeninretail.com/wp-content/uploads/2015/07/1400.jpg"
                                                title="Friendship request"
                                            />
                                            <CardContent>
                                                <h4>{ pendingRequest.targetName + " "} 
                                                    <FormattedMessage id="pending.requests.text" defaultMessage="hasn't approve your friend request" />
                                                </h4>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                )
                            })
                        ):(<br/>)
                    }
                </div>
                {
                    (this.props.currentUser.requests.length > 0)?(
                        <h2>
                            <FormattedMessage id="friendship.requests.title" defaultMessage="Friendship Requests" />
                        </h2>
                    ):(<br/>)
                }
                <div className="requests-container">
                {
                    (this.props.currentUser.requests.length > 0)?(
                        this.props.currentUser.requests.map( request => {
                            return(
                                <Card className="request-card-extended" key={request.requestId}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt="Friendship request"
                                                height="140"
                                                image="https://www.womeninretail.com/wp-content/uploads/2015/07/1400.jpg"
                                                title="Friendship request"
                                            />
                                            <CardContent>
                                                <h4>{request.sourceName + " "} 
                                                    <FormattedMessage id="friendship.requests.text" defaultMessage=" wants to be your friend" />
                                                </h4>
                                            </CardContent>
                                            <div className="request-buttons">
                                                <FormattedMessage id="friendship.requests.accept" defaultMessage="Accept">
                                                    { value => <input onClick = { () => this.friendshipRequestHandler(true, request.requestId, request.sourceId, request.sourceName, request.targetId, request.targetName) } className="accept-buton" type="button" value={value}/> }
                                                </FormattedMessage>
                                                <FormattedMessage id="friendship.requests.decline" defaultMessage="Decline">
                                                    { value => <input onClick = { () => this.friendshipRequestHandler(false, request.requestId, request.sourceId, request.sourceName,  request.targetId, request.targetName) } className="decline-buton" type="button" value={value}/> }
                                                </FormattedMessage>
                                            </div>
                                        </CardActionArea>
                                    </Card>
                            )
                        })
                    ):(<br/>)
                }
                </div>
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