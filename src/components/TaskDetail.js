import React, { Component } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import "./Styles/TaskDetail.css";
import "./Styles/modal.css";
import "./Styles/Comments.css";
import TaskCard from "./TaskCard";
import Comments from './Comments'
//import TaskCard from "./TaskCard";
import TaskCardDetail from "./TaskCardDetail";
import { withRouter } from "react-router";
import {
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBContainer,
  } from "mdbreact";
import { connect } from 'react-redux';

import { getTaskComments } from '../store/actions/rootActions';
import { deleteTask } from '../store/actions/rootActions';
import { createTaskComments } from '../store/actions/rootActions';
import { editTask } from '../store/actions/rootActions';
import { updateComment } from '../store/actions/rootActions';

// import { rootReducer } from "../store/reducers/rootReducer";

import {deleteComment} from '../store/actions/rootActions';

class TaskDetail extends Component {
    constructor(props) {
        super(props);
        this.state= {
            comments:[],
            // searchField: "",
            modal: false,
            commentString:'',
            commentedBy:1,
            groupID: 1,
            taskID: 0,
            toggleMod:false
        };
        
    }

     componentDidMount(){
        document.title = `FairShare - Task`;
        this.props.getTaskComments(this.props.match.params.id);
    }

    getTaskDetails(){
        let taskId = this.props.match.params.id;
        axios.get(`http://localhost:9000/api/task/${taskId}`)
        .then(response => {
          this.setState({
            name: response.data.taskName,
            task: response.data.id  
          }, () => {
            console.log(this.state);
          });
        })
        .catch(err => console.log(err));
        }
        // editTask(newTask){
        //     axios.request({
        //       method:'put',
        //       url:`http://localhost:9000/api/task/${this.state.id}`,
        //       data: newTask
        //     }).then(response => {
        //       this.props.history.push('/');
        //     }).catch(err => console.log(err));
        //   }
        
          onSubmit(e){
            const newTask = {
              name: this.refs.name.value,
              task: this.refs.task.value
              
            }
            this.editTask(newTask);
            e.preventDefault();
          }
    

    removeTask = e => {
        e.preventDefault();
        this.props.deleteTask(this.props.match.params.id);
        this.props.history.goBack();
        //window.location = `/groups/${this.props.match.params.id}/tasktrak`; //routes back to group Task page
      
    }

     createComments = (e) => {
        e.preventDefault();
        this.setState({commentString: ''});
        let comment = {
            commentString:this.state.commentString,
            commentedBy:this.state.commentedBy,
            groupID:this.state.groupID,
            taskID: this.props.match.params.id
        }

        this.props.createTaskComments(comment, this.props.match.params.id);
        // window.location.reload()      
    };
      
      handleChanges=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    
    handleUpdateCommentChange=(e)=> {
        this.setState({[e.target.name]:e.target.value});
    }

    handleInputChange=(e)=>{
      this.setState({[e.target.name]:e.target.value})
        // const target = e.target;
        // const value = target.value;
        // const name = e.target.name;
        // //api/task/:id
        // this.setState({
        //   [name]: value
        // });
      }

      backToTask = (e) => {
        e.preventDefault();
        this.props.history.goBack();
    }

    updateTask = (e) => {
        e.preventDefault();
        this.setState({taskName: ''});
        let id = this.props.match.params.id
        console.log(id)
        let task = {
            taskName:this.state.taskName,
            
        }

        this.props.editTask(task,id);
    this.setState({toggleMod:!this.state.toggleMod});

    };//<-needed?
    editComment = (e, id) => {
        e.preventDefault();
        let comment = {
            commentString: this.state.commentString
        }
        this.props.updateComment(comment,id)
    }

       
    removeComment = (e, id) => {
        e.preventDefault();
        this.props.deleteComment(id, this.props.match.params.id);
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
            {/* <form onSubmit={this.updateTask}>
          <div className="input-field">
            <input type="text" name="taskName" ref="name" value={this.state.taskName} onChange={this.handleInputChange} />
            <label htmlFor="name">Name</label>
          </div>
          {/* <div className="input-field">
            <input type="text" name="task" ref="task" value2={this.state.task} onChange={this.updateTask} />
            <label htmlFor="task">Task</label>
          </div> */}
          {/*</MDBContainer><input type="submit" value="EDIT" className="btn" />
          </form> */}
         

          <form onSubmit={this.createComments}>
            <input 
                type="text"
                placeholder="Write Comment"
                name="commentString"
                value={this.state.commentString}
                onChange={this.handleChanges}
              />
              <button type='submit'>Submit</button>
          </form>
          
          {/* <form onSubmit={(e)=>this.editComment(e,5)}>
            <input 
                type="text"
                placeholder="Comment Changes"
                name="commentString"
                value={this.state.commentString}
                onChange={this.handleUpdateCommentChange}
              />
              <button type='submit'>Edit</button>
          </form> */}
            
            <div className= {
                this.state.toggleMod=== false
                    ? 'custom-mod-hidden'
                    : 'custom-mod-display'}>
                                
                <span className="x" onClick={this.toggleMod}>X</span>
                <form onSubmit={this.updateTask}>
          <div className="input-field">
            <input type="text" name="taskName" ref="name" value={this.state.taskName} onChange={this.handleInputChange} />
            <label htmlFor="name">Name</label>
          </div>
          {/* <div className="input-field">
            <input type="text" name="task" ref="task" value2={this.state.task} onChange={this.updateTask} />
            <label htmlFor="task">Task</label>
          </div> */}
          <input type="submit" value="EDIT" className="btn" />
          </form>
            </div>
            
            


            <MDBContainer className="task-card">
                {console.log (this.props.match.params.id)}
                <TaskCardDetail
                    taskID = {this.props.match.params.id}
                    taskname={""}
                    taskDescription={this.props.taskDescription}
                    requestedBy={""}
                    done={0}
                    comments={0}
                    repeated={0}
                    assignee={""}
                
                    // group={1}
                    // updateGroup={this.saveGroupName}
                    // removeGroup={this.deleteGroup}
                />
       
                <div>
                    {/* {console.log(this.props.taskComments)} */}
                    
                    {this.props.taskComments !== null
                        ? this.props.taskComments.data.map(comment => {
                            console.log(comment);
                            return(
                            <>
                            <Comments 
                            commentString= {comment.commentString}
                            taskID = {this.props.match.params.id}
                            commentedOn={comment.commentedOn}
                            commentID={comment.id}



                            />
                             <div className="buttons">
                                <button type="submit" onClick={(e)=>this.editComment(e,comment.id)}>Edit</button>
                                <button type="button" outline color="success" onClick={(e) => this.removeComment(e, comment.id)}>Delete</button> 
                             </div>
                            </>
                       
                        )})
                        : null
                    } 
                </div>  
                

            </MDBContainer>
        </MDBContainer>
        
    )
    }
}

const mapStateToProps = state => {
    state = state.rootReducer; // pull values from state root reducer
    return {
      //state items
      taskComments: state.taskComments,
      errorMessage: state.errorMessage,currentGroup:state.currentGroup
    };
};
  
export default withRouter(connect(mapStateToProps,{ deleteComment,deleteTask,editTask,getTaskComments,createTaskComments,updateComment })(TaskDetail));





