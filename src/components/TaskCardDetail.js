import React, {Component} from "react";
import { connect } from 'react-redux';
import commentImg from '../images/comment-img.jpg';
import {
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import { withRouter } from "react-router-dom";


// import { rootReducer } from "../store/reducers/rootReducer";

import "./Styles/TaskCard.css";
import "./Styles/Comments.css";

import { getTaskComments } from '../store/actions/rootActions';
//import { rootReducer } from "../store/reducers/rootReducer";

class TaskCardDetail extends Component {
  
  constructor(props){
    super(props);
    this.state={
      modal:false,
      
        groupId: null,
        userId: null,
        comments: props.comments,
        assigneeName: "",
        task: {}
    }
  }

   getComments = e => {
    e.preventDefault();
    this.props.getTaskComments(this.props.match.params.id);//<----------------??
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  

  render(){

  return (
      <>
      
      <MDBCard className="task-card" 
        //onClick={()=>this.props.history.push(`/task/${this.props.taskID}`)}
      >
        <MDBCardBody className="task-card-body">
            <div className="task-card-left">
                <h7>{this.props.task.taskName}</h7>
                <h7>Requested by: {this.props.task.createdBy}</h7>
            </div>
            <div className="task-card-middle">
                <h5>{this.props.task.assignee}</h5>
            </div>
            <div className="task-card-right">
                <img onClick ={this.getComments} src={commentImg} alt='' height="30" width="30"></img>
                <input type="checkbox" name="vehicle" value="Bike"></input>
                <h7>Done</h7>
            </div>
        </MDBCardBody>
      </MDBCard>
      </>
  );
  }
};


const mapStateToProps = state => {
  state = state.rootReducer; // pull values from state root reducer
  return {
    //state items
    taskComments: state.taskComments,
    errorMessage: state.errorMessage,
    assigneeName: state.tempUserName,
    currentTask: state.currentTask
  };
};

export default withRouter(connect(mapStateToProps,{getTaskComments})(TaskCardDetail));
