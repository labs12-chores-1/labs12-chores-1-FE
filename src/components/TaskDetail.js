import React, { Component } from 'react';

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
        };
        
    }

     componentDidMount(){
        document.title = `FairShare - Task`;
        this.props.getTaskComments(this.props.match.params.id);
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

    backToTask = (e) => {
        e.preventDefault();
        this.props.history.goBack();
    }

    removeComment = (e, id) => {
        e.preventDefault();
        this.props.deleteComment(id, this.props.match.params.id);
      }

render() {
    return (
        <>
          <MDBContainer className="task-detail-container">
            <MDBRow>
                <MDBCol md="12" className="mb-4">
                <div onClick={this.backToTask}>
                    <MDBIcon className="card-link" icon="chevron-left" />Back to Task
                </div>
                    <div className="nav-btns">
                        <MDBBtn outline color="success">Edit Task</MDBBtn>
                        <MDBBtn onClick={this.toggle} outline color="success">Add Comment</MDBBtn>
                        <MDBBtn outline color="success" onClick={this.removeTask}>Delete Task</MDBBtn>           
                    </div>


                </MDBCol>
            </MDBRow>

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
                            <h4 key={comment.id}>{comment.commentString}</h4>
                             <button type="button" outline color="success" onClick={(e) => this.removeComment(e, comment.id)}>x</button> 
                            </>
                       
                        )})
                        : null
                    } 
                </div>  
                

            </MDBContainer>
        </MDBContainer>
        </>
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