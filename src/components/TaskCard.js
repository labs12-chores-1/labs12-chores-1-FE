import React, {Component} from "react";
import commentImg from '../images/comment-img.jpg';
import {
  MDBCard,
  MDBCardBody,
  // MDBCardHeader,
  // MDBNavLink,
  // MDBCardFooter,
  // MDBIcon,
  // MDBCardTitle,
  // MDBBtn,
  // MDBInput
} from "mdbreact";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getTaskComments, getUserName, getGroupTasks} from '../store/actions/rootActions';
// import { rootReducer } from "../store/reducers/rootReducer";

import "./Styles/TaskCard.css";
import "./Styles/Comments.css";
<<<<<<< HEAD
// import { rootReducer } from "../store/reducers/rootReducer";
=======

import { getTaskComments } from '../store/actions/rootActions';
//import { rootReducer } from "../store/reducers/rootReducer";
>>>>>>> master

class TaskCard extends Component {
  constructor(props) {
    super(props);
    this.state= {
        tasks:[],
        searchField: "",
        groupId: null,
        userId: null,
        comments: props.comments,
        assigneeName: props.tempUserName

    };
  }
  componentWillMount(){
      document.title = `FairShare - Task`;
      this.props.getGroupTasks(this.props.match.params.id);  
      

      this.props.getUserName(this.props.assignee);
      // console.log(this.props.assignee);
  }


  getComments = e => {
    e.preventDefault();
    this.props.getTaskComments(this.props.match.params.id);
  };

  getUserName = () =>{
    // e.preventDefault();
    
    this.props.getUserName(this.props.assignee);
    this.setState({
      assigneeName: this.props.tempUserName
    });
    console.log("here");
    console.log(this.state.assigneeName); 
    return this.state.assigneeName;//this.props.tempUserName;
  }

  render(){
<<<<<<< HEAD
    return (
        
        <MDBCard className="task-card" 
          onClick={()=>this.props.history.push(`/task/${this.props.taskID}`)} >
          <MDBCardBody className="task-card-body">
              <div className="task-card-left">
                  <h7>{this.props.taskName}</h7>
                  <h7>Requested by: {this.props.requestedBy}</h7>
              </div>
              <div className="task-card-middle">
                  <h5>{this.props.assignee}</h5>
              </div>
              <div className="task-card-right">
                  <img onClick ={this.getComments} src={commentImg} height="30" width="30" alt=""></img>
                  <input type="checkbox" name="vehicle" value="Bike"></input>
                  <h7>Done</h7>
              </div>
          </MDBCardBody>
        </MDBCard>
    )}
=======

  return (
      <>
      
      <MDBCard className="task-card" 
        onClick={()=>this.props.history.push(`/task/${this.props.taskID}`)}
      >
        <MDBCardBody className="task-card-body">
            <div className="task-card-left">
                <h7>{this.props.taskName}</h7>
                <h7>Requested by: {this.props.requestedBy}</h7>
            </div>
            <div className="task-card-middle">
                <h5>{this.props.assignee}</h5>
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
>>>>>>> master
};

const mapStateToProps = state => {
  state = state.rootReducer; // pull values from state root reducer
  return {
    //state items
    taskComments: state.taskComments,
    errorMessage: state.errorMessage,
    assigneeName: state.tempUserName
  };
};

export default withRouter(connect(mapStateToProps,{
  getTaskComments,
  getUserName,
  getGroupTasks
})(TaskCard));
