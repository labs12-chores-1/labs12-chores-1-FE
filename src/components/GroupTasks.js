import React, { Component } from 'react';
import axios from 'axios';
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
    createGroupTask,
    editTask,
    getGroupUsers
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
            currentGroupTasks: {data:[]},
            groupMembers: [],
            groupUserNames: []
        };
    }
    componentWillMount(){
        document.title = `FairShare - Task`;
        this.props.getGroupTasks(this.props.match.params.id);        
        this.setState({...this.state,
            currentGroupTasks: this.props.currentGroupTasks});

        //Get info of all group members
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

        axios.get(`${backendURL}/api/groupmember/group/${this.props.match.params.id}`, options)
        .then(response => {
            this.setState({
                groupMembers: response.data
            })
        });
        
    }
        
    componentDidMount(){
   
    }

    componentDidUpdate(previousProps){
        if(previousProps.currentGroupTasks !== this.props.currentGroupTasks){
            this.setState({currentGroupTasks:this.props.currentGroupTasks});
        }
    }

    handleAddTask=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    createTask = (e) => {
        e.preventDefault();
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

    handleFilter =(event, filterArg) =>{
        event.preventDefault();
        if (filterArg === "all-completeness"){
            this.setState({...this.state,
                currentGroupTasks: this.props.currentGroupTasks});
        }
        else if (filterArg ==="completed"){
            // console.log(this.state.currentGroupTasks);
            if (this.state.currentGroupTasks.data.length !== 0){
                this.setState({...this.state,
                    currentGroupTasks: {
                        data: this.props.currentGroupTasks.data.filter(task=>task.completed)}});
            }
        }
        else if (filterArg ==="incomplete"){
            this.setState({...this.state,
                currentGroupTasks: {
                    data:this.props.currentGroupTasks.data.filter(task=>!task.completed)}});
        }
        else if (filterArg ==="all-assignee"){
            this.setState({...this.state,
                currentGroupTasks: this.props.currentGroupTasks})
        }
        else if (this.state.groupMembers !== null){
            this.state.groupMembers.forEach(userID =>{
                if (filterArg === userID){
                    this.setState({...this.state,
                        currentGroupTasks: this.props.currentGroupTasks.filter(task=>task.completedBy===filterArg)})
                }
            })
        }
    }

    getGroupUserNames =()=>{
        if (this.state.groupMembers.length > 0){
            // console.log('hello');
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
            //Map list of group members to list of group user names
            this.state.groupMembers.forEach(function(groupMember){
                console.log(this.groupMember);
                axios.get(`${backendURL}/api/user/${groupMember.userID}/name`, options)
                .then(response => {
                    // console.log(response.data);
                    this.setState({
                        groupUserNames: [...this.state.groupUserNames, response.data]
                    })
                }); 
                })
        }   
    }

render() {
    return (       
        <MDBContainer className="group-task-container">
                 {/* {this.getGroupUserNames()} */}
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
                            <div className="dropdown-item" onClick={(event)=>this.handleFilter(event,"all-assignee")}>All</div>
                            {console.log('state.groupMembers', this.state.groupMembers)}
                            <div className="dropdown-divider"></div>
                            {this.state.groupUserNames.length >= 1
                            ? this.state.groupUserNames.map(groupUser=>(
                                <div className="dropdown-item" onClick={(event)=>this.handleFilter(event,groupUser.userID)}>{groupUser.userID}</div>
                            ))                            
                            : null
                            }
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
    );
    }
};

const mapStateToProps = state => {
    state = state.rootReducer; // pull values from state root reducer
    return {
        //state items
        currentUser: state.currentUser,
        currentGroup: state.currentGruop,
        currentGroupTasks: state.currentGroupTasks,
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
        editTask,
        getGroupUsers
    }
)(GroupTasks);
