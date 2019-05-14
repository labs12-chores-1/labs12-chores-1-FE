import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import "./Styles/GroupTask.css";
import TaskCard from "./TaskCard";
//import { withRouter } from "react-router";
import {
    MDBBtn,
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
    getGroupTasks,
    createGroupTask
} from "../store/actions/rootActions";
import { connect } from "react-redux";
//import { bool } from 'prop-types';

class GroupTasks extends Component {
    constructor(props) {
        super(props);
        this.state= {
            tasks:[],
            taskName: "",
            taskDescription:"",
            taskCompleted: false,
            taskcompletedBy: 1,
            searchField: "",
            groupId: null,
            userId: null
            

        };
    }
    componentWillMount(){
        document.title = `FairShare - Task`;
        this.props.getGroupTasks(this.props.match.params.id);
    }
    handleChanges=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    createTask = (e) => {
        e.preventDefault();
        this.setState({taskName: ''});
        let task = {
            taskName:this.state.taskName,
            groupID:this.props.match.params.id
        }

        this.props.createGroupTask(task, this.props.match.params.id);

       
    };
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
            <form onSubmit={this.createTask}>
        <input 
            type="text"
            placeholder="enter task"
            name="taskName"
            value={this.state.taskName}
            onChange={this.handleChanges}
          />
          <button type='submit'>Submit</button>
      </form>
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
        getGroupTasks,
        createGroupTask
    }
)(GroupTasks);
  