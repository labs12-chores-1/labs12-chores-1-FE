import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DropdownPage from './DropdownPage';
import {getUserProfile, checkEmail} from '../store/actions/rootActions';
import "./Styles/GroupTask.css";
import TaskCard from "./TaskCard";
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import axios from 'axios';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBInput,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBContainer
  } from "mdbreact";
import {
    checkEmail,
    clearError,
    createGroup,
    acceptInvite,
    getCurrentUser,
    getUserGroups,
    clearCurrentGroup,
    updateGroupName,
    removeGroup,
    getGroupTasks
} from "../store/actions/rootActions";
import { connect } from "react-redux";


class GroupTasks extends Component {
<<<<<<< HEAD
    // constructor(props) {
    //     super();
    componentWillMount(){
        if(this.props.user){
            // console.log('USER', this.props.user);
            this.getLocalUser(this.props.user.userID)        }
    }

    constructor(props){
        super(props);
        this.state = {
            targetUser: null
        }
    }

    getLocalUser = id => {
        let backendURL;
        if(process.env.NODE_ENV === 'development'){
        backendURL = `http://localhost:9000`
        } else {
        backendURL = `https://labs12-fairshare.herokuapp.com/`
        }
        
        let token = localStorage.getItem('jwt');
        let options = {
            headers: {
            Authorization: `Bearer ${token}`
            }
        }
=======
    constructor(props) {
        super(props);
        this.state= {
            tasks:[],
            searchField: "",
            groupId: null,
            userId: null
            

        };
    }
    componentWillMount(){
        document.title = `FairShare - Task`;
        this.props.getGroupTasks(this.props.match.params.id);
    }
>>>>>>> c514acb36fc0ddde17b281c563aa695690f1f873

        axios.get(`${backendURL}/api/user/${id}`, options).then(response => {
            // console.log('localuser', response);
            this.setState({
                targetUser: response.data
            })
        })
    }


render() {
    return (
        <MDBContainer className="group-task-container">
            <MDBRow>
                <MDBCol md="12" className="mb-4">
                    <a href={`/groups/${this.props.match.params.id}`} className="card-link"><MDBIcon icon="chevron-left" />Back to ShopTrak</a>
                    <div className="nav-btns">
                        <MDBBtn outline color="success">New Task</MDBBtn>
                    
                    </div>
                </MDBCol>
            </MDBRow>
            <MDBContainer className="task-cards">
                {/* {console.log(this.props.currentGroupTasks)} */}
                {this.props.currentGroupTasks !== null
                    ? this.props.currentGroupTasks.data.map(task => (
                        <TaskCard
                            taskID={task.id}
                            taskName={task.taskName}
                            requestedBy={"Alex"}
                            done={task.completed}
                            comments={task.comments}
                            repeated={0}
                            assignee={task.completedBy}
                            // group={1}
                            // updateGroup={this.saveGroupName}
                            // removeGroup={this.deleteGroup}
                            // group & groupID# axios get to that
                            // look at state/variables after that

                        />
                      ))
                    : null
                }  

            </MDBContainer>
   
        </MDBContainer>
    )
    }
}

const mapStateToProps = state => {
    state = state.rootReducer; // pull values from state root reducer
    return {
        //state items
        currentUser: state.currentUser,
        currentGroup: state.currentGruop,
        currentGroupTasks: state.currentGroupTasks
        // userGroups: state.userGroups,
        // userId: state.userId,
        // name: state.name,
        // email: state.email,
        // profilePicture: state.profilePicture,
        // groups: state.groups,
        // errorMessage: state.errorMessage
    };
};

export default connect(
    mapStateToProps,
    {
        checkEmail,
        getUserGroups,
        clearError,
        clearCurrentGroup,
        createGroup,
        getCurrentUser,
        updateGroupName,
        removeGroup,
        acceptInvite,
        getGroupTasks
    }
)(GroupTasks);
  