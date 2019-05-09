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
import { getTaskComments, getUserName} from '../store/actions/rootActions';
// import { rootReducer } from "../store/reducers/rootReducer";

import "./Styles/TaskCard.css";

class TaskCard extends Component {
  constructor(props) {
    super(props);
    this.state= {
        tasks:[],
        searchField: "",
        groupId: null,
        userId: null

    };
  }
  componentWillMount(){
      document.title = `FairShare - Task`;
      this.props.getGroupTasks(this.props.match.params.id);
  }
  getComments = e => {
    e.preventDefault();
    this.props.getTaskComments(this.props.match.params.id);//<----------------??
  };

  getUserName = id =>{
    console.log(this.props.tempUserName)
    this.props.getUserName(id);
    return this.props.tempUserName;
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
                <h5>{this.getUserName}</h5>
            </div>
            <div className="task-card-right">
                <img onClick ={this.getComments} src={commentImg} alt="" height="30" width="30"></img>
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
    errorMessage: state.errorMessage
  };
};

const mapStateToProps = state => {
  state = state.rootReducer; // pull values from state root reducer
  return {
    //state items
    taskComments: state.taskComments,
    errorMessage: state.errorMessage
  };
};

export default withRouter(connect(mapStateToProps,{getTaskComments, getUserName})(TaskCard));
