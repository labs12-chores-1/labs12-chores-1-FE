import React from "react";
import { connect } from 'react-redux';
import commentImg from '../images/comment-img.jpg';
import {
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import { withRouter } from "react-router-dom";

import "./Styles/TaskCard.css";
import "./Styles/Comments.css";

import { getTaskComments } from '../store/actions/rootActions';
import { rootReducer } from "../store/reducers/rootReducer";

const TaskCard = props => {
  
  const getComments = e => {
    e.preventDefault();
    props.getTaskComments(props.match.params.id);
    console.log(props.match.params.id);
  };

  return (
      <>
      
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
      {console.log(props.taskComments)}

      {/* <div >{props.taskComments.map(comment => (
        (console.log('inside commennt:',{comment})),
          <h2 className="comments" key={comment.id}>{comment.commentString}</h2>
        ))}</div> */}

      
      
       
      
      
      

      
      
      

      </>
    
  );
};
const mapStateToProps = state => ({
   // pull values from state root reducer
   
  
    //state items
    taskComments: state.taskComments,
    errorMessage: state.errorMessage

  
});

export default withRouter(connect(mapStateToProps,{getTaskComments})(TaskCard));
