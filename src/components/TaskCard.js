import React from "react";
import { connect } from 'react-redux';
import commentImg from '../images/comment-img.jpg';
import {
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import { withRouter } from "react-router-dom";
import "./Styles/TaskCard.css";

import { getTaskComments } from '../store/actions/rootActions';

const TaskCard = props => {
  
  const getComments = e => {
    e.preventDefault();
    props.getTaskComments(props.match.params.id);
  };

  return (
      <MDBCard className="task-card" 
        onClick={()=>props.history.push(`/task/${props.taskID}`)}
      >
        <MDBCardBody className="task-card-body">
            <div className="task-card-left">
                <h7>{props.taskID}</h7>
                <h7>Requested by: {props.requestedBy}</h7>
            </div>
            <div className="task-card-middle">
                <h5>{props.assignee}</h5>
            </div>
            <div className="task-card-right">
                <img onClick ={getComments} src={commentImg} height="30" width="30"></img>
                <input type="checkbox" name="vehicle" value="Bike"></input>
                <h7>Done</h7>
            </div>
        </MDBCardBody>
      </MDBCard>
    
  );
};
const mapStateToProps = state => {
  state = state.rootReducer; // pull values from state root reducer
  return {
    //state items
    taskComments: state.taskComments,
    errorMessage: state.errorMessage
  };
};

export default withRouter(connect(mapStateToProps,{getTaskComments})(TaskCard));
