import React, {Component} from "react"
import { retrieveUsers, addContact } from "../../redux/actions/user.actions";
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import "./users.component.css";

class UsersComponent extends Component{
    constructor(props){
        super(props);
        // console.log("This is the Users Component");

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

    addcontactHandler = (id, fullname) => {
        const { addContact } = this.props;
        console.log("Current user data: ", this.props.currentuser._id + " " + this.props.currentuser.fullname);
        console.log("Target User: ", id + " " + fullname  )
        addContact(this.props.currentuser._id, this.props.currentuser.fullname, id, fullname);
    }

    
    render(){
        let { currentuser } = this.props;
        return(
            <div>
                <FormattedMessage id="users.search.bar" defaultMessage="Search users">
                    { placeholder => <input type="text" id="pattern" placeholder={placeholder} ref={this.patternRef}/> }
                </FormattedMessage>
                <FormattedMessage id="users.search.button" defaultMessage="Search">
                    { value => <input type="button" value={value} onClick={ this.submitHandler }/> }
                </FormattedMessage>
                <h1>
                    <FormattedMessage id="users.title" defaultMessage="Users" />
                </h1>
                <div className="users-container">
                {console.log("currentUser: ", currentuser)}
                {console.log("tempData: ", this.props.tempData)}
                {
                    (!this.props.tempData)?(
                        <h2>
                            <FormattedMessage id="users.empty" defaultMessage="There are no contacts..." />
                        </h2>
                    ):(
                        this.props.tempData.filter( user => user._id !== currentuser._id && !this.props.contacts.includes(user._id))
                        .map(user => {
                            return(
                                <div key={user._id} className="user-card">
                                    <img className="profile-picture" src="https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png" alt="user_icon"/>
                                    <h3>{user.fullname}</h3>
                                    <h3>{user.email}</h3>
                                    <FormattedMessage id="user.add.button" defaultMessage="Add">
                                        { value => <input className="add-buton" type="button" value={value} onClick={ () => this.addcontactHandler(user._id, user.fullname) }/> }
                                    </FormattedMessage>
                                </div>
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
    // if(tempData && loggedIn)
    //     console.log("tempData: ", tempData, "Current user is: ", loggedIn);
    return { 
        tempData: (tempData) ? tempData : null,
        currentuser: (loggedIn) ? loggedIn : null,
        contacts: loggedIn.contacts.map( contact => contact._id )
    }
  }

const mapDispatchToProps = dispatch => ({
    addContact: (sourceId, sourceName, targetId, targetName) => dispatch(addContact({sourceId, sourceName, targetId, targetName,})),
    retrieveUsers: (pattern) => dispatch(retrieveUsers({pattern}))
    
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersComponent);