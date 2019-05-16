import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import "./Styles/GroupTask.css";
import TaskCard from "./TaskCard";
//import { withRouter } from "react-router";
import {
    // MDBBtn,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBContainer
    // MDBInput
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
            tempTaskName: "",
            tempTaskDescription:"",
            tempTaskCompleted: false,
            tempTaskcompletedBy: 1,
            searchField: "",
            groupId: null,
            userId: null,
            currentGroupTasks: null
        };
    }
    componentWillMount(){
        document.title = `FairShare - Task`;
        this.props.getGroupTasks(this.props.match.params.id);
        // this.setState({...this.state,
        //     currentGroupTasks: this.props.currentGroupTasks});
        }
        
    componentDidMount(){
            console.log(this.props.currentGroupTasks);
    }

    componentDidUpdate(previousProps){
        if(previousProps.currentGroupTasks !== this.props.currentGroupTasks){
            this.setState({currentGroupTasks:this.props.currentGroupTasks})
        }
    }

    handleAddTask=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    createTask = (e) => {
        e.preventDefault();
        this.setState({...this.state,
                            tempTaskName: ''});
        let task = {
            taskName:this.state.tempTaskName,
            groupID:this.props.match.params.id,
            createdBy:localStorage.getItem("name")
        }

        this.props.createGroupTask(task, this.props.match.params.id);
    };

    handleSearch= event =>{
        event.preventDefault();
        this.setState({...this.state,
                        [event.target.name]:event.target.value});
        
    }

    handleFilter =(event, filterString) =>{
        event.preventDefault();
        if (filterString === "all-completeness"){
            this.setState({...this.state,
                currentGroupTasks: this.props.currentGroupTasks});
        }
        else if (filterString ==="completed"){
            this.setState({...this.state,
                currentGroupTasks: {
                    data: this.props.currentGroupTasks.data.filter(task=>task.completed)}});
        }
        else if (filterString ==="incomplete"){
            this.setState({...this.state,
                currentGroupTasks: {
                    data:this.props.currentGroupTasks.data.filter(task=>!task.completed)}});
        }
        else if (filterString ==="all-assignee"){
            this.setState({...this.state,
                currentGroupTasks: this.props.currentGroupTasks.filter(task=>task.completedBy.include())});
        }
    }


render() {
    return (
       
        <MDBContainer className="group-task-container">
            <MDBRow>
                <MDBCol md="12" className="mb-4">
                    <a href={`/groups/${this.props.match.params.id}`} className="card-link"><MDBIcon icon="chevron-left" />Back to ShopTrak</a>
                    <form onSubmit={this.createTask}>
                        <input 
                            type="text"
                            placeholder="enter task"
                            name="taskName"
                            value={this.state.taskName}
                            onChange={this.handleAddTask}
                        />
                        <button type='submit'>Submit</button>
                    </form>
                </MDBCol>
            </MDBRow>
            <MDBContainer className="task-cards">
                <div className="search-dropdown-row">
                    <form class="form-inline">
                        <i class="fas fa-search" aria-hidden="true"></i>
                        <input 
                            class="form-control form-control-sm ml-3 w-75" 
                            name="searchField" 
                            type="text" 
                            value={this.state.searchField} 
                            placeholder="Search by name" aria-label="Search" 
                            onChange={this.handleSearch}/>
                    </form>

                    <div class="dropdown">
                        <span>Assigned</span>
                        <div class="dropdown-content">
                            <div class="dropdown-item" onClick={(event)=>this.handleFilter(event,"all")}>All</div>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Me</a>
                            <a class="dropdown-item" href="#">Alex</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <span>Complete</span>
                        <div class="dropdown-content">
                            <div class="dropdown-item" onClick={(event)=>this.handleFilter(event,"all-completeness")}>All</div>
                            <div class="dropdown-divider"></div>
                            <div class="dropdown-item" onClick={(event)=>this.handleFilter(event,"completed")}>Complete</div>
                            <div class="dropdown-item" onClick={(event)=>this.handleFilter(event,"incomplete")}>Incomplete</div>
                        </div>
                    </div>                    
                </div>
                <br></br>
                {/* {console.log(this.props.currentGroupTasks)} */}
                {this.state.currentGroupTasks !== null
                    ? this.state.currentGroupTasks.data.map(task => (
                     
                        <TaskCard
                            taskID={task.id}
                            taskName={task.taskName}
                            requestedBy={task.createdBy}
                            done={task.completed}
                            comments={task.comments}
                            repeated={0}
                            assignee={2}
                            // group={1}
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
        createGroupTask
    }
)(GroupTasks);


