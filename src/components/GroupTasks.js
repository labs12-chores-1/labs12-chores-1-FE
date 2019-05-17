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
    createGroupTask,
    editTask
} from "../store/actions/rootActions";
import { connect } from "react-redux";
//import { bool } from 'prop-types';

class GroupTasks extends Component {
    constructor(props) {
        super(props);
        this.state= {
            taskName: "",
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
        // console.log(this.props.match.params.id);
        this.props.getGroupTasks(this.props.match.params.id);        
        this.setState({...this.state,
            currentGroupTasks: this.props.currentGroupTasks});
        }
        
    componentDidMount(){
            // console.log(this.props.currentGroupTasks);
            // console.log("this.state: ",this.state.currentGroupTasks);
    }

    componentDidUpdate(previousProps){
        // console.log("this.props: ",this.props.currentGroupTasks);
        if(previousProps.currentGroupTasks !== this.props.currentGroupTasks){
            // console.log("here");
            this.setState({currentGroupTasks:this.props.currentGroupTasks});
        }
    }

    handleAddTask=(e)=>{
        this.setState({[e.target.name]:e.target.value});
        // console.log(this.state.taskName);
    }
    createTask = (e) => {
        e.preventDefault();
        // this.setState({...this.state,
        //                     tempTaskName: ''});
        let task = {
            taskName:this.state.taskName,
            groupID:this.props.match.params.id,
            createdBy:localStorage.getItem("name"),
            completedBy:1
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
                    <form className="form-inline">
                        <i className="fas fa-search" aria-hidden="true"></i>
                        <input 
                            className="form-control form-control-sm ml-3 w-75" 
                            name="searchField" 
                            type="text" 
                            value={this.state.searchField} 
                            placeholder="Search by name" aria-label="Search" 
                            onChange={this.handleSearch}/>
                    </form>

                    <div className="dropdown">
                        <span>Assigned</span>
                        <div className="dropdown-content">
                            <div className="dropdown-item" onClick={(event)=>this.handleFilter(event,"all")}>All</div>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Me</a>
                            <a className="dropdown-item" href="#">Alex</a>
                        </div>
                    </div>
                    <div className="dropdown">
                        <span>Complete</span>
                        <div className="dropdown-content">
                            <div className="dropdown-item" onMouseOver={(event)=>this.handleFilter(event,"all-completeness")}>All</div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item" onMouseOver={(event)=>this.handleFilter(event,"completed")}>Complete</div>
                            <div className="dropdown-item" onMouseOver={(event)=>this.handleFilter(event,"incomplete")}>Incomplete</div>
                        </div>
                    </div>                    
                </div>
                <br></br>
                {/* {console.log(this.state.currentGroupTasks)} */}
                {this.state.currentGroupTasks !== null
                    ? this.state.currentGroupTasks.data.map(task => (
                     
                        <TaskCard
                            task={task}
                            taskID={task.id}
                            taskName={task.taskName}
                            requestedBy={task.createdBy}
                            done={task.completed}
                            comments={task.comments}
                            repeated={0}
                            assignee={task.completedBy}
                            group={task.groupID}
                            updateGroup={this.saveGroupName}
                            removeGroup={this.deleteGroup}
                        />
                      ))
                    : null
                }  
            </MDBContainer>
            {/* <form onSubmit={this.createTask}>
                <input 
                    type="text"
                    placeholder="enter task"
                    name="taskName"
                    value={this.state.taskName}
                    onChange={this.handleChanges}
                />
                <button type='submit'>Submit</button>
            </form> */}
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
