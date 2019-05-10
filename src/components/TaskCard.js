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

class TaskCard extends Component {
  constructor(props) {
    super(props);
    this.state= {
        tasks:[],
        searchField: "",
        groupId: null,
        userId: null,
        comments: props.comments,
        tempUserName: props.tempUserName

    };
  }
  componentWillMount(){
      document.title = `FairShare - Task`;
      this.props.getGroupTasks(this.props.match.params.id);    

      // console.log(this.props.assignee);
  }

  componentDidMount(){

    this.props.getUserName(this.props.assignee);
  }
  getComments = e => {
    e.preventDefault();
    this.props.getTaskComments(this.props.match.params.id);
  };

  getUserName = () =>{
    // e.preventDefault();
    console.log(this.state.tempUserName); 
    return this.state.tempUserName;//this.props.tempUserName;
  }

  render(){
    return (
      <MDBCard className="task-card" 
        onClick={()=>this.props.history.push(`/task/${this.props.taskID}`)}
      >
        <MDBCardBody className="task-card-body">
            <div className="task-card-left">
                <h7>{this.props.taskName}</h7>
                <h7>Requested by: {this.props.requestedBy}</h7>
            </div>
            <div className="task-card-middle">
                <h5>{this.props.tempUserName}</h5>
            </div>
            <div className="task-card-right">
                <img onClick ={this.getComments} src={commentImg} alt="" height="30" width="30" key={this.props.taskID}></img>
                <input type="checkbox" name="vehicle" value="Bike"></input>
                <h7>Done</h7>
            </div>
        </MDBCardBody>
      </MDBCard>
  )}

};
const mapStateToProps = state => {
  state = state.rootReducer; // pull values from state root reducer
  return {
    //state items
    taskComments: state.taskComments,
    errorMessage: state.errorMessage,
    tempUserName: state.tempUserName
  };
};

export default withRouter(connect(mapStateToProps,{
  getTaskComments,
  getUserName,
  getGroupTasks
})(TaskCard));
