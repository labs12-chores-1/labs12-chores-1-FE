import React from "react";
import commentImg from '../images/comment-img.jpg';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBNavLink,
  MDBCardFooter,
  MDBIcon,
  MDBCardTitle,
  MDBBtn,
  MDBInput
} from "mdbreact";
import { withRouter } from "react-router-dom";
import "./Styles/TaskCard.css";

const TaskCard = props => {
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
                <img src={commentImg} height="30" width="30"></img>
                <input type="checkbox" name="vehicle" value="Bike"></input>
                <h7>Done</h7>
            </div>
        </MDBCardBody>
      </MDBCard>
    // <MDBCard className="task-card">
    //     <MDBCardTitle>{props.task}</MDBCardTitle>
    //     <
        
    // </MDBCard>

    // <div className="task-card">
    //   <MDBCard className="text-center">
    //     <MDBCardHeader color="primary-color" tag="h3">
    //       {props.task.name}
    //     </MDBCardHeader>
    //     <MDBCardBody>
    //       <MDBNavLink key={props.key} to={`/groups/${props.group.id}`}>
    //         <MDBBtn color="success">Enter</MDBBtn>
    //       </MDBNavLink>
    //     </MDBCardBody>
    //     {
    //       props.group.userID !== Number(localStorage.getItem("userId")) ? null :
    //           <MDBCardFooter style={{ background: "#2A922D" }}>
    //             <div className="group-card-footer">
    //               <div
    //                   className="group-card-footer-button"
    //                   onClick={() =>
    //                       props.updateGroup(props.group.id, props.group.name)
    //                   }
    //               >
    //                 <MDBIcon icon="edit" />
    //               </div>

    //               <div
    //                   className="group-card-footer-button"
    //                   onClick={() =>
    //                       props.removeGroup(props.group.id, props.group.name)
    //                   }
    //               >
    //                 <MDBIcon icon="trash" />
    //               </div>
    //             </div>
    //           </MDBCardFooter>
    //     }

    //   </MDBCard>
    // </div>
  );
};

export default withRouter(TaskCard);
