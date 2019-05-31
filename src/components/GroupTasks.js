import React, { Component } from 'react';
// import axios from 'axios';
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
    editTask,
    getGroupUsers,
    getTaskComments,
    getGroupUserObjs
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
            currentGroupTasks: {data:[]},
            groupMembers: [],
            groupUserObjs: this.props.groupUserObjs,
            toggleMod: false,
            toggleRadio:false,
            recurringTime:"",
            assigneeName:"",
            currentFilterAssignee: ""
        };
        this.handleSearch = this.handleSearch.bind(this);
    }
 
    componentWillMount(){
        document.title = `FairShare - Task`;
        // console.log("this.props.match.params.id: ",this.props.match.params.id);      
        this.props.getGroupTasks(this.props.match.params.id);        
        this.props.getGroupUserObjs(this.props.match.params.id);
        this.setState({
            currentGroupTasks: this.props.currentGroupTasks});        
    }
    
    componentDidUpdate(previousProps){
        if(previousProps.currentGroupTasks !== this.props.currentGroupTasks || previousProps.groupUserObjs !== this.props.groupUserObjs){
            this.setState({currentGroupTasks:this.props.currentGroupTasks,
            groupUserObjs: this.props.groupUserObjs
            });
        }
    }
    componentDidMount(){
        // this.props.getGroupUserObjs(this.props.match.params.id);
        this.setState({...this.state,
            currentGroupTasks: this.props.currentGroupTasks,
            groupUserObjs: this.props.groupUserObjs});
        // console.log("this.state.groupUserObjs: ",this.state.groupUserObjs);
    }
    
    handleChanges=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    createTask = (e) => {
        e.preventDefault();
        let task = {
            taskName:this.state.taskName,
            taskDescription:this.state.taskDescription,
            assigneeName:this.state.assigneeName,
            recurringTime:this.state.recurringTime,
            groupID:this.props.match.params.id,
            createdBy:localStorage.getItem("name"),
            completedBy:1
        }

        this.props.createGroupTask(task, this.props.match.params.id);
        this.setState({
            toggleMod:!this.state.toggleMod,
            recurringTime:"",
            toggleRadio:false,
            taskName: "", 
            taskDescription:"", 
            assigneeName:""
        })
    };

    handleSearch= (event) =>{      
        
        // console.log("this.state.searchField: ", this.state.searchField)
        console.log("this.props.currentGroupTasks.data: ", this.props.currentGroupTasks.data);
        console.log("this.state.currentGroupTasks.data: ", this.state.currentGroupTasks.data);
        // this.setState({[event.target.name]:event.target.value});
        if (this.props.currentGroupTasks.data.length !== 0){
            console.log(this.props.currentGroupTasks.data.filter(task=>task.taskName.includes(event.target.value)));
            event.target.value.length === 0
            ? //console.log("WTF!!")
             this.setState({//[event.target.name]:event.target.value,
                currentGroupTasks: {
                    data: this.props.currentGroupTasks.data}})
            : this.setState({//[event.target.name]:event.target.value,
                            currentGroupTasks: {
                                data: this.props.currentGroupTasks.data.filter(task=>task.taskName.includes(event.target.value))
                            }})
        }
        
    }

    handleFilter =(event, filterArg) =>{
        event.preventDefault();
        let filterResults = this.props.currentGroupTasks.data;
        if (typeof filterArg !== "string"){
            filterResults = filterResults.filter(task=>task.assigneeName===filterArg.name)
        }
        if (typeof filterArg === "string"){
            if (filterArg === "all-completeness" || filterArg === "all-assignee"){
                this.setState({...this.state,
                    currentGroupTasks: this.props.currentGroupTasks});
            }
            else if (filterArg ==="completed"){
                if (this.state.currentGroupTasks.data.length !== 0){
                    this.setState({...this.state,
                        currentGroupTasks: {
                            data: this.props.currentGroupTasks.data.filter(task=>task.completed)}});
                }
            }
            else if (filterArg ==="incomplete"){
                this.setState({...this.state,
                    currentGroupTasks: {
                        data:this.state.currentGroupTasks.data.filter(task=>!task.completed)}});
            }
        }

        this.setState({
            currentFilterAssignee:filterArg.name,
            currentGroupTasks: {
                data:this.state.currentGroupTasks.data.filter(task=>task.assigneeName===filterArg.name)
        }})
    }
                                        
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

    setRecurringTime = (e, recurring) => {
        e.preventDefault();
        if (recurring==='1') {
            this.setState({
                recurringTime:'1 hour'
            })
            // console.log('RECURRING TIME:', this.state.recurringTime)
        }
        else if (recurring === '2') {
            this.setState({
                recurringTime:'2 hours'
            })
            // console.log('RECURRING TIME:', this.state.recurringTime)
        }
        else if (recurring === '3') {
            this.setState({
                recurringTime:'3 hours'
            })
            // console.log('RECURRING TIME:', this.state.recurringTime)
        }
    }

    handleToggleComplete = (e) => {
      e.preventDefault();
      this.setState({taskCompleted:!this.state.taskCompleted});  
    }

render() {
    return (       
        <MDBContainer className="group-task-container">
            <MDBRow>
                <MDBCol md="12" className="mb-4">
                    {/* Link to go back to Group Profile page */}
                    <a href={`/groups/${this.props.match.params.id}`} className="card-link"><MDBIcon icon="chevron-left" />Back to ShopTrak</a>
                    {/* Add New Task button */}
                    <h4>View Your Group's Current Tasks</h4>
                    <div className="nav-btns">
                        <MDBBtn className={"btn-dark-green"} onClick={this.toggleMod} style={{color:"white"}}>New Task</MDBBtn>
                    
                    </div>
                </MDBCol>
            </MDBRow>
            {/* Modal for Add New Task */}
            <div className= {this.state.toggleMod=== false
                            ? 'custom-mod-hidden'
                            : 'create-task-mod-display'}>
                <form className={'create-task-form'}onSubmit={this.createTask}>
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
                        className="text-description"
                        type="text"
                        placeholder="enter description"
                        name="taskDescription"
                        value={this.state.taskDescription}
                        onChange={this.handleChanges}
                    />
                    <div className="dropdown">
                        <input 
                            type="text"
                            placeholder="Assign to (optional)"
                            name="assigneeName"
                            value={this.state.assigneeName}
                            onChange={this.handleChanges}
                        />
                        <div className="dropdown-content">
                            {this.state.groupUserObjs.length >= 1
                            ? this.state.groupUserObjs.map(userObj=>(
                                <div className="dropdown-item" onClick={()=>this.setState({assigneeName: userObj.name})}>{userObj.name}</div>
                            ))                            
                            : null
                            }                           
                        </div>
                    </div>  
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
                            <ul><button onClick={(event)=>this.setRecurringTime(event,"1")}>Every 1 Hour</button></ul>
                            <ul><button onClick={(event)=>this.setRecurringTime(event,"2")}>Every 2 Hours</button></ul>
                            <ul><button onClick={(event)=>this.setRecurringTime(event,"3")}>Every 3 Hours</button></ul>
                        </div>
                    </div>
                    <button className="cta-submit" type='submit'>Submit</button>
                </form>
            </div>
            <MDBContainer className="task-cards">
                <div className="search-dropdown-row">
                    {/* Search by Task Name field */}
                    <form className="form-inline">
                        <i className="fas fa-search" aria-hidden="true"></i>
                        <input 
                            className="form-control form-control-sm ml-3 w-75" 
                            name="searchField" 
                            type="text" 
                            // value={this.state.searchField} 
                            placeholder="Search by Task Name"
                            // aria-label="Search" 
                            onChange={this.handleSearch}/>
                    </form>

                        <div className="filter">Filter By:</div>
                        <div className="dropdown assigned">
                        <span>Assigned</span>
                        <div className="dropdown-content dropdown-primary">
                            <div className="dropdown-item" onClick={(event)=>this.handleFilter(event,"all-assignee")}>All</div>
                            <div className="dropdown-divider"></div>
                            {this.state.groupUserObjs.length >= 1
                            ? this.state.groupUserObjs.map(userObj=>(
                                <div className="dropdown-item" onClick={(event)=>this.handleFilter(event,userObj)}>{userObj.name}</div>
                            ))                            
                            : null
                            }
                        </div>
                    </div>
                    <div className="dropdown comp">
                        <span>Complete</span>
                        <div className="dropdown-content-complete">
                            <div className="dropdown-item" onClick={(event)=>this.handleFilter(event,"all-completeness")}>All</div>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-item" onClick={(event)=>this.handleFilter(event,"completed")}>Complete</div>
                            <div className="dropdown-item" onClick={(event)=>this.handleFilter(event,"incomplete")}>Incomplete</div>
                        </div>
                    </div>                    
                </div>
                <br></br>
                {this.state.currentGroupTasks !== null
                    ? this.state.currentGroupTasks.data.map(task => {
                    // this.props.getTaskComments(task.id);
                    let taskComments = this.props.taskComments;
                    return(
                        <TaskCard
                            key={task.id}
                            task={task}
                            taskComments = {taskComments}
                            taskID={task.id}
                            taskName={task.taskName}
                            taskDescription={task.taskDescription}
                            assigneeName={task.assigneeName}
                            requestedBy={task.createdBy}
                            done={task.completed}
                            repeated={0}
                            recurring={task.recurringTime}
                            assignee={task.completedBy}
                            group={task.groupID}
                            updateGroup={this.saveGroupName}
                            removeGroup={this.deleteGroup}
                        />
                      )})
                    : null
                }  
            </MDBContainer>
        </MDBContainer>
    )
}}


const mapStateToProps = state => {
    state = state.rootReducer; // pull values from state root reducer
    return {
        //state items
        currentUser: state.currentUser,
        currentGroup: state.currentGruop,
        currentGroupTasks: state.currentGroupTasks,
        taskComments: state.taskComments,
        groupUserObjs: state.groupUserObjs
    }
}

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
        getGroupUsers,
        getTaskComments,
        getGroupUserObjs
    }
)(GroupTasks);
