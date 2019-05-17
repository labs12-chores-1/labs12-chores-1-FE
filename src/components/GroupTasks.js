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
    createGroupTask,
    editTask
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
            userId: null,
            toggleMod: false,
            toggleRadio:false

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
        this.setState({taskName: '', taskDescription:''});
        let task = {
            taskName:this.state.taskName,
            taskDescription:this.state.taskDescription,
            groupID:this.props.match.params.id
        }

        this.props.createGroupTask(task, this.props.match.params.id);
        this.setState({
            toggleMod:!this.state.toggleMod
        })
    };

    toggleMod= (e) => {
        this.setState({
            toggleMod:!this.state.toggleMod
        })
        console.log('toggleModalState:',this.state.toggleMod);
    }

    toggleRadio= (e) => {
        this.setState({
            toggleRadio:!this.state.toggleRadio
        }); console.log('toggleRadiotoggle:', this.state.toggleRadio);
    }


render() {
    return (
        <MDBContainer className="group-task-container">
        
            <MDBRow>
                <MDBCol md="12" className="mb-4">
                    <a href={`/groups/${this.props.match.params.id}`} className="card-link"><MDBIcon icon="chevron-left" />Back to ShopTrak</a> 
                    <div className="nav-btns">
                        <MDBBtn outline onClick={this.toggleMod} color="success">New Task</MDBBtn>
                    
                    </div>
                </MDBCol>
            </MDBRow>
            <div className= {
                this.state.toggleMod=== false
                    ? 'custom-mod-hidden'
                    : 'custom-mod-display'}>
                <form className={'create-task-form'} onSubmit={this.createTask}>
                <span className="x" onClick={this.toggleMod}>X</span>
                <h3>New Task</h3>
                    <input 
                        type="text"
                        placeholder="enter task"
                        name="taskName"
                        value={this.state.taskName}
                        onChange={this.handleChanges}
                    />
                    <textarea 
                        type="text"
                        placeholder="enter description"
                        name="taskDescription"
                        value={this.state.taskDescription}
                        onChange={this.handleChanges}
                    />
                    <input 
                        type="text"
                        placeholder="Assign to (optional)"
                        name="assign"
                        // value={this.state.taskDescription}
                        onChange={this.handleChanges}
                    />
                    <div>
                        {/* <span onClick={this.toggleRadio}>Yes</span> */}
                        <input type="checkbox" name="recurring" value="recurring" onClick={this.toggleRadio}/>
                        <span>Would you like to make this task repeating?</span>
                    </div>
                    <div className= {
                        this.state.toggleRadio=== false
                            ? 'dropdown-hidden'
                            : 'dropdown-display'}>

                        How often should this task be completed?
                        <div className="dropdown-options">
                            <ul>1 hour</ul>
                            <ul>2 hours</ul>
                            <ul>3 hours</ul>
                        </div>
                    </div>
                    <button className="cta-submit" type='submit'>Submit</button>
                </form>
            </div>
            <MDBContainer className="task-cards">
                {/* {console.log(this.props.currentGroupTasks)} */}
                {this.props.currentGroupTasks !== null
                    ? this.props.currentGroupTasks.data.map(task => (
                        <TaskCard
                            taskID={task.id}
                            taskName={task.taskName}
                            taskDescription={task.taskDescription}
                            requestedBy={""}
                            done={task.completed}
                            comments={task.comments}
                            repeated={0}
                            assignee={task.completedBy}
                            group={1}
                            updateGroup={this.saveGroupName}
                            removeGroup={this.deleteGroup}
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
        getGroupTasks,
        createGroupTask,
        editTask
    }
)(GroupTasks);
  






