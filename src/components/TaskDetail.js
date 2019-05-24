import React, { Component } from 'react';
// import axios from 'axios';
//import { Link } from 'react-router-dom';
import "./Styles/TaskDetail.css";
import "./Styles/modal.css";
import "./Styles/Comments.css";
// import TaskCard from "./TaskCard";
import Comments from './Comments';
import TaskCardDetail from "./TaskCardDetail";
import { withRouter } from "react-router";
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

import { connect } from "react-redux";

import { getTaskComments } from '../store/actions/rootActions';
import { deleteTask } from '../store/actions/rootActions';
import { createTaskComments } from '../store/actions/rootActions';
import { editTask } from '../store/actions/rootActions';
import { updateComment } from '../store/actions/rootActions';
import { getSingleTask,testFunction } from '../store/actions/rootActions';

// import { rootReducer } from "../store/reducers/rootReducer";

import {deleteComment} from '../store/actions/rootActions';

class TaskDetail extends Component {
    constructor(props) {
        super(props);
        this.state= {
            taskComments:[],
            modal: false,
            commentString:'',
            commentedBy:1,
            groupID: this.props.match.params.groupId,
            taskID: 0,
            toggleMod:false,
            taskDescription: "",
            task: null
        };
        
    }

    componentWilMount(){
      document.title = `FairShare - Task`;  
      
      // this.props.getSingleTask(this.props.match.params.taskId);
      // this.props.getTaskComments(this.props.match.params.taskId);  
    }
    
    componentDidUpdate(previousProps){
      if(previousProps.taskComments !== this.props.taskComments){
          this.setState({ taskComments:this.props.taskComments,
                          task: {...this.state.task,
                            numberOfComments:this.props.taskComments.length}});
      }
      if(this.props.singleTask && previousProps.singleTask !== this.props.singleTask){
          this.setState({task:this.props.singleTask.data[0]});
      }
    }
        
    componentDidMount(){
      this.props.getSingleTask(this.props.match.params.taskId);
      this.props.getTaskComments(this.props.match.params.taskId);
      // this.setState({ taskComments:this.props.taskComments});
      // if(this.props.singleTaskk){
      //   this.setState({task:this.props.singleTask.data[0]});
      // }
    }

  onSubmit(e){
    e.preventDefault();
    const newTask = {
      name: this.refs.name.value,
      task: this.refs.task.value
      
    }
    this.editTask(newTask);
    this.props.getSingleTask(this.props.match.params.taskId);
  }

  removeTask = e => {
      e.preventDefault();
      this.props.deleteTask(this.props.match.params.taskId, this.state.groupID);
      this.props.history.goBack();
      //window.location = `/groups/${this.props.match.params.id}/tasktrak`; //routes back to group Task page
    
  }

  createComments = (e) => {
    e.preventDefault();
    // Create new task comment
    this.setState({commentString: ''});
    let comment = {
        commentString:this.state.commentString,
        commentedBy:this.state.commentedBy,
        groupID:this.state.groupID,
        taskID: this.props.match.params.taskId
    }
    this.props.createTaskComments(comment, this.props.match.params.taskId);

    // Update task attribute: numberOfComments
    this.props.editTask(
      {...this.state.task,
      numberOfComments: this.state.task.numberOfComments+1},this.props.match.params.taskId
    )
    this.props.getSingleTask(this.props.match.params.taskId);
    this.props.getTaskComments(this.props.match.params.taskId);
    this.setState({ task: {...this.props.singleTask,
                      numberOfComments: this.state.task.numberOfComments+1}})
  };
      
  handleChanges=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }

  handleUpdateCommentChange=(e)=> {
    this.setState({[e.target.name]:e.target.value});
  }

  handleInputChange=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }

  backToTask = (e) => {
  e.preventDefault();
  this.props.history.goBack();
}  
  updateTask = (e) => {
        e.preventDefault();
        this.setState({taskName: ''});
        this.setState({taskDescription: ''});
        this.setState({assigneeName: ''});
        let id = this.props.match.params.taskId
        console.log(id)
        let task = {
            taskName:this.state.taskName,
            taskDescription: this.state.taskDescription,
            assigneeName: this.state.assigneeName
            
        }

      this.props.editTask(task,id);      
      this.props.getSingleTask(this.props.match.params.taskId);
      this.setState({toggleMod:!this.state.toggleMod});
  }//<-needed?

  editComment = (e, id) => {
      e.preventDefault();
      let comment = {
          commentString: this.state.commentString
      }
      this.props.updateComment(comment,id)
  }

  removeComment = (e, id) => {
      e.preventDefault();
      this.props.deleteComment(id, this.props.match.params.taskId);
      this.props.editTask(
        {...this.state.task,
        numberOfComments: this.state.task.numberOfComments-1},this.props.match.params.taskId
      )
      this.props.getSingleTask(this.props.match.params.taskId);
      this.props.getTaskComments(this.props.match.params.taskId);
      this.setState({task: {...this.props.singleTask, 
                  numberOfComments: this.state.task.numberOfComments-1}});
  }

  toggleMod= (e) => {
    this.setState({
        toggleMod:!this.state.toggleMod
    })
  }

render() {
    return (

        <MDBContainer className="task-detail-container">
            <MDBRow>
                <MDBCol md="12" className="mb-4">
                    <div onClick={this.backToTask}>
                        <MDBIcon className="card-link" icon="chevron-left" />Back to Task
                    </div>
                    <div className="nav-btns">
                        <MDBBtn onClick={this.toggleMod} outline color="success">Edit Task</MDBBtn>
                        {/* <MDBBtn onClick={this.toggle} outline color="success">Add Comment</MDBBtn> */}
                        <MDBBtn outline color="success" onClick={this.removeTask}>Delete Task</MDBBtn>           
                    </div>
                </MDBCol>
            </MDBRow>
        {/* Edit Task Modal */}
         <div className= {
            this.state.toggleMod=== false
                ? 'custom-mod-hidden'
                : 'custom-mod-display'}>
                <span className="x" onClick={this.toggleMod}>X</span>
            <form className={'create-task-form'}onSubmit={this.updateTask}>
                <h3>Edit Task</h3>
                <input 
                    type="text"
                    placeholder="edit task name"
                    name="taskName"
                    value={this.state.taskName}
                    onChange={this.handleChanges}
                />
                <textarea
                    className="text-description"
                    type="text"
                    placeholder="edit description"
                    name="taskDescription"
                    value={this.state.taskDescription}
                    onChange={this.handleChanges}
                />
                <input 
                    type="text"
                    placeholder="edit assignee"
                    name="assigneeName"
                    value={this.state.assigneeName}
                    onChange={this.handleChanges}
                />
                <button className="cta-submit" type='submit'>EDIT</button>
            </form>
      </div>                 
      <MDBContainer className="task-card">
          {this.state.task !== null
          ? <TaskCardDetail task= {this.state.task} />
          : null
          }
          <div>           
            <form onSubmit={this.createComments}>
                <input
                  type="text"
                  placeholder="Write Comment"
                  name="commentString"
                  value={this.state.commentString}
                  onChange={this.handleChanges}
                />
                <button type="submit">Submit</button>
              </form>                
            {this.state.taskComments.length > 0
                ? this.state.taskComments.map(comment => {
                    return(
                    <div key={comment.id}>
                    <Comments 
                    commentString= {comment.commentString}
                    taskID = {this.props.match.params.taskId}
                    commentedOn={comment.commentedOn}
                    commentID={comment.id}
                    />
                      <div className="buttons">
                        <button type="submit" onClick={(e)=>this.editComment(e,comment.id)}>Edit</button>
                        <button type="button" onClick={(e) => this.removeComment(e, comment.id)}>x</button> 
                      </div>
                    </div> 
                
                )})
                : null
            } 
          </div>  
          
              
      </MDBContainer>
        </MDBContainer>
        

        
    )
    }
}
        // differ
   
const mapStateToProps = state => {
    state = state.rootReducer; // pull values from state root reducer
    return {
      //state items
      taskComments: state.taskComments,
      errorMessage: state.errorMessage,
      currentGroup:state.currentGroup,
      singleTask: state.singleTask
    };
};
  
export default withRouter(connect(mapStateToProps,{ deleteComment,deleteTask,editTask,getTaskComments,createTaskComments,updateComment,getSingleTask,testFunction })(TaskDetail));






