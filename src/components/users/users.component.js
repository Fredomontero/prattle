import React, {Component} from "react"
import { retrieveUsers, addContact } from "../../redux/actions/user.actions";
import { sendMessage } from "../../redux/actions/message.actions";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import "./users.component.css";

class UsersComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            pattern: "",
            contacts: []
        }
        this.patternRef = React.createRef();
    }

    submitHandler = () => {
        const { retrieveUsers } = this.props;
        let pattern = this.patternRef.current.value;
        retrieveUsers(pattern);
    }

    addcontactHandler = (e, id, fullname) => {
        const { addContact, sendMessage } = this.props;
        e.target.className = "add-button-disabled";
        e.target.disabled = true;
        addContact(this.props.currentuser._id, this.props.currentuser.fullname, id, fullname);
        sendMessage( "FRIENDSHIP_REQUEST", this.props.currentuser._id, id, `${this.props.currentuser.fullname} send you a friendship request`);
    }

    
    render(){
        let { currentuser } = this.props;
        return(
            <div className="users-container">
                <div className="users-header">
                    <h1>
                        <FormattedMessage id="users.title" defaultMessage="Users" />
                    </h1>
                    <FormattedMessage id="users.search.bar" defaultMessage="Search users">
                        { placeholder => <input className="user-search" type="text" id="pattern" placeholder={placeholder} ref={this.patternRef}/> }
                    </FormattedMessage>
                    <FormattedMessage id="users.search.button" defaultMessage="Search">
                        { value => <input className="user-search-button" type="button" value={value} onClick={ this.submitHandler }/> }
                    </FormattedMessage>
                </div>
                {/*Users container*/}
                <div className="users-container">
                {
                    (!this.props.tempData)?(
                        <h2>
                            <FormattedMessage id="users.empty" defaultMessage="There are no contacts..." />
                        </h2>
                    ):(
                        this.props.tempData.filter( user => user._id !== currentuser._id && !this.props.contacts.includes(user._id))
                        .map(user => {
                            return(
                                <Card key={user._id} className="user-card">
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="140"
                                            image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {user.fullname}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {user.email}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <FormattedMessage id="user.add.button" defaultMessage="Add">
                                        { value => <input className="add-buton" type="button" value={value} onClick={ (e) => this.addcontactHandler(e, user._id, user.fullname) }/> }
                                    </FormattedMessage>
                                </Card>
                            )
                        })
                    )
                }
                </div>
            </div>
            
        )
    }
}

function mapStateToProps(state){
    const { tempData, loggedIn } = state;
    return { 
        tempData: (tempData) ? tempData : null,
        currentuser: (loggedIn) ? loggedIn : null,
        contacts: (loggedIn.contacts) ? (loggedIn.contacts.map( contact => contact._id )):[]
    }
  }

const mapDispatchToProps = dispatch => ({
    addContact: (sourceId, sourceName, targetId, targetName) => dispatch(addContact({sourceId, sourceName, targetId, targetName,})),
    retrieveUsers: (pattern) => dispatch(retrieveUsers({pattern})),
    sendMessage: (type, source, target, text) => dispatch(sendMessage({type, source, target, text}))
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersComponent);