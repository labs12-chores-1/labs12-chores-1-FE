import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import "./Styles/GroupTask.css";
import TaskCard from "./TaskCard";
// import { withRouter } from "react-router";
import {
    // MDBCard,
    // MDBCardBody,
    // MDBCardTitle,
    // MDBCardText,
    MDBBtn,
    // MDBModal,
    // MDBModalBody,
    // MDBModalHeader,
    // MDBModalFooter,
    // MDBInput,
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
  