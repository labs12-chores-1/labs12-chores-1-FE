import React, { Component } from 'react';

//import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import "./Styles/TaskDetail.css";
import "./Styles/modal.css";
import TaskCard from "./TaskCard";
import { withRouter } from "react-router";
import {
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBContainer
  } from "mdbreact";
import { getTaskComments } from '../store/actions/rootActions';
 import { createTaskComments } from '../store/actions/rootActions';
 import { deleteTask } from '../store/actions/rootActions';
// import { rootReducer } from "../store/reducers/rootReducer";

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

    // };

    removeTask = e => {
        e.preventDefault();
        this.props.deleteTask(this.props.match.params.id);
        this.props.history.goBack();
        //window.location = `/groups/${this.props.match.params.id}/tasktrak`; //routes back to group Task page

    }
     createComments = (e) => {
        e.preventDefault();
        let comment = {
            commentString:this.state.commentString,
            commentedBy:this.state.commentedBy,
            groupID:this.state.groupID,
            taskID: this.props.match.params.id
        }

        this.props.createTaskComments(comment);
        window.location.reload()      
    };
      
      handleChanges=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    backToTask = (e) => {
        e.preventDefault();
        this.props.history.goBack();
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
                    taskname={"Walk Dog"}
                    requestedBy={"John"}
                    done={0}
                    comments={0}
                    repeated={0}
                    assignee={"Jane"}
                
                    // group={1}
                    // updateGroup={this.saveGroupName}
                    // removeGroup={this.deleteGroup}
                />   
                <div>
                    {/* {console.log(this.props.taskComments)} */}
                    {this.props.taskComments !== null
                        ? this.props.taskComments.data.map(comment => (
                            <h4 key={comment.id}>{comment.commentString}</h4>
                        ))
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
      deleteMessage: state.deleteMessage,
      taskComments: state.taskComments,
      errorMessage: state.errorMessage
    };
};
  

export default withRouter(connect(mapStateToProps,{deleteTask, getTaskComments,createTaskComments})(TaskDetail));
