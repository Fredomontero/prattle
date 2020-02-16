import React, {Component} from "react"
import { retrieveUsers, addContact } from "../../redux/actions/user.actions";
import { connect } from "react-redux";

import "./users.component.css";

class UsersComponent extends Component{
    constructor(props){
        super(props);
        // console.log("This is the Users Component");

        this.state = {
            pattern: ""
        }
        this.patternRef = React.createRef();
    }

    componentDidMount(){
        // console.log("The tempData is: ", this.props.tempData);
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
                <input type="text" id="pattern" placeholder="Search users" ref={this.patternRef}/>
                <input type="button" value="Search" onClick={ this.submitHandler }/>
                <h1>Users</h1>
                {
                    (!this.props.tempData)?(
                        <h2>There are no contacts...</h2>
                    ):(
                        this.props.tempData.filter( user => user._id !== currentuser._id && !currentuser.contacts.includes(user.fullname) )
                        .map(user => {
                            return(
                                <div key={user._id} className="user-card">
                                    <img className="profile-picture" src="https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png" alt="user_icon"/>
                                    <h3>{user.fullname}</h3>
                                    <h3>{user.email}</h3>
                                    <input className="add-buton" type="button" value="Add" onClick={ () => this.addcontactHandler(user._id, user.fullname) }/>
                                </div>
                            )
                        })
                    )
                }
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
        currentuser: (loggedIn) ? loggedIn : null 
    }
  }

const mapDispatchToProps = dispatch => ({
    addContact: (sourceId, sourceName, targetId, targetName) => dispatch(addContact({sourceId, sourceName, targetId, targetName,})),
    retrieveUsers: (pattern) => dispatch(retrieveUsers({pattern}))
    
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersComponent);