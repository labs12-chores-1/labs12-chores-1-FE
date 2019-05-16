import React, { Component } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import "./Styles/TaskDetail.css";
import "./Styles/modal.css";
import TaskCard from "./TaskCard";
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
            groupID:1,
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
        axios.get(`http://localhost:3000/api/task/${taskId}`)
        .then(response => {
          this.setState({
            name: response.data.name,
            task: response.task.city  
          }, () => {
            console.log(this.state);
          });
        })
        .catch(err => console.log(err));
        }
        editTask(newTask){
            axios.request({
              method:'put',
              url:`http://localhost:3000/api/task/${this.state.id}`,
              data: newTask
            }).then(response => {
              this.props.history.push('/');
            }).catch(err => console.log(err));
          }
        
          onSubmit(e){
            const newTask = {
              name: this.refs.name.value2,
              city: this.refs.city.value2,
              address: this.refs.address.value2
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

    handleInputChange(e){
        const target = e.target;
        const value2 = target.value2;
        const name = target.name;
    
        this.setState({
          [name]: value2
        });
      }

    backToTask = (e) => {
        e.preventDefault();
        this.props.history.goBack();
    }

    updateTask = (e) => {
        e.preventDefault();
        this.setState({taskName: ''});
        let task = {
            taskName:this.state.taskName,
            groupID:this.props.match.params.id
        }

        this.props.editTask(task, this.props.match.params.id);
    
    };//<-needed?

       
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
            <div className= {
                this.state.toggleMod=== false
                    ? 'custom-mod-hidden'
                    : 'custom-mod-display'}>
                                
                <span className="x" onClick={this.toggleMod}>X</span>
                <form className={'create-task-form'}onSubmit={this.createTask}>
                    <input 
                        type="text"
                        placeholder="enter task"
                        name="taskName"
                        value={this.state.taskName}
                        onChange={this.handleChanges}
                    />
                    <input 
                        type="text"
                        placeholder="enter description"
                        name="taskDescription"
                        value={this.state.taskDescription}
                        onChange={this.handleChanges}
                    />
                    <button type='submit'>Submit</button>
                </form>
            </div>
            
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


            <MDBContainer className="task-card">
                <TaskCard
                    taskID={1}
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
                            return(<>
                            <h4 key={comment.id}>{comment.commentString}</h4>
                             <MDBBtn outline color="success" onClick={(e) => this.removeComment(e, comment.id)}>Delete Comment</MDBBtn> </>
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
      errorMessage: state.errorMessage
    };
};
  
export default withRouter(connect(mapStateToProps,{deleteComment,deleteTask,getTaskComments,createTaskComments})(TaskDetail));

//GetTaskDetails(){
  //  let taskId = this.props.match.params.id;
 //   axios.get(`http://localhost:9000/api/task/${taskId}`)
  //  .then(response => {
  //    this.setState({
  //      id: response.data.id,
    //    name: response.data.name,



