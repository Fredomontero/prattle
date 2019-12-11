import React, {Component} from "react"
import { retrieveUsers, addContact } from "../../redux/actions/user.actions";
import { connect } from "react-redux";

import "./users.component.css";

class UsersComponent extends Component{
    constructor(props){
        super(props);
        console.log("This is the Users Component");

        this.state = {
            patter: ""
        }
        this.patternRef = React.createRef();
    }

    componentDidMount(){
        console.log("The tempData is: ", this.props.tempData);
      }

    submitHandler = () => {
        const { retrieveUsers } = this.props;
        let pattern = this.patternRef.current.value;
        retrieveUsers(pattern);
    }

    addcontactHandler = (id) => {
        const { addContact } = this.props;
        console.log("The sourceId is:" + this.props.currentuserId + " and the targetId is: " + id);
        addContact(this.props.currentuserId, id);
    }

    
    render(){
        return(
            <div>
                <input type="text" id="pattern" placeholder="Search users" ref={this.patternRef}/>
                <input type="button" value="Search" onClick={ this.submitHandler }/>
                <h1>Users</h1>
                {
                    (!this.props.tempData)?(
                        <h2>There are no contacts...</h2>
                    ):(
                        this.props.tempData.map(user => {
                            return(
                                <div key={user._id} className="user-card">
                                    <img className="profile-picture" src="https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png" alt="user_icon"/>
                                    <h3>{user.firstname + " " + user.lastname}</h3>
                                    <h3>{user.email}</h3>
                                    <input className="add-buton" type="button" value="Add" onClick={ () => this.addcontactHandler(user._id) }/>
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
    if(tempData && loggedIn)
        console.log("tempData: ", tempData, "Current user id: ", loggedIn._id);
    return { 
        tempData: (tempData) ? tempData : null,
        currentuserId: (loggedIn) ? loggedIn._id : null 
    }
  }

const mapDispatchToProps = dispatch => ({
    addContact: (sourceId, targetId) => dispatch(addContact({sourceId, targetId})),
    retrieveUsers: (pattern) => dispatch(retrieveUsers({pattern}))
    
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersComponent);