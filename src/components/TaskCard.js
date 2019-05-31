import React, {Component} from "react";
import axios from 'axios';
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
import { getTaskComments, getUserName, getGroupTasks,getSingleTask} from '../store/actions/rootActions';
// import { rootReducer } from "../store/reducers/rootReducer";

import "./Styles/TaskCard.css";
import "./Styles/Comments.css";

//import { rootReducer } from "../store/reducers/rootReducer";

class TaskCard extends Component {
  constructor(props) {
    super(props);
    this.state= {
        searchField: "",
        groupId: null,
        userId: null,
        taskComments: [],
        assigneeName: "",
        task: {}
    };
  }
  componentWillMount(){
        document.title = `FairShare - Task`; 
        this.setState({task: this.props.task
                      // taskComments: this.props.taskComments
                    });

        let backendURL;
        if(process.env.NODE_ENV === 'development'){
        backendURL = `http://localhost:9000`
        } else {
        backendURL = `https://labs12-fairshare.herokuapp.com`
        }
        
        let token = localStorage.getItem('jwt');
        let options = {
            headers: {
            Authorization: `Bearer ${token}`
            }
        }

        axios.get(`${backendURL}/api/user/${this.props.task.completedBy}/name`, options).then(response => {
            // console.log('res', response.data.name);
            this.setState({
                assigneeName: response.data.name
            })
        })
    //   this.props.getUserName(this.props.task.completedBy);
    }  


  getComments = e => {
    e.preventDefault();
    this.props.getTaskComments(this.props.match.params.id);
  };

  handleClickTaskCard = (e) =>{
    e.preventDefault();
    this.props.history.push(`/groups/${this.props.match.params.id}/task/${this.state.task.id}`)
  }

  render(){

  return (
      //RECURRING
      <MDBCard className="task-card" 
        onClick={this.handleClickTaskCard}>
        <MDBCardBody className="task-card-body">
            <div className="task-card-left">
                <h5 className="assigned-To">Assigned To: {this.state.task.assigneeName}</h5>
                <div className="requested-By">Requested by: {this.state.task.createdBy}</div>
            </div>
            <div className="task-card-middle">
            <div className="task-Name">{this.state.task.taskName}</div>
                <div className="task-Description">Details: {this.state.task.taskDescription}</div>
            </div>
            <div className="task-card-right">
                {this.props.task.numberOfComments > 0
                  ? <img onClick ={this.getComments} src={commentImg} alt='' height="30" width="30"></img>
                  : null
                }
                {/* <img onClick ={this.getComments} src={commentImg} alt='' height="30" width="30"></img> */}
                {/* <input type="checkbox" name="vehicle" value="Bike" onClick={(event)=>{event.stopPropagation()}}></input> */}
                <div className="complete">Status: {this.state.task.completed !==0
                      ? "Complete": "Incomplete"}</div>
                <div className={
                  this.state.task.recurringTime.length > 0
                  ? 'recurring-display'
                  : 'recurring-hidden'
                }>
                  Complete every: {this.state.task.recurringTime}
                </div>
            </div>
        </MDBCardBody>
      </MDBCard>
  );
  }
};

const mapStateToProps = state => {
  state = state.rootReducer; // pull values from state root reducer
  return {
    //state items
    // taskComments: state.taskComments,
    errorMessage: state.errorMessage,
    assigneeName: state.tempUserName,
    currentTask: state.currentTask,
    singleTask: state.singleTask
  };
};

export default withRouter(connect(mapStateToProps,{
  getTaskComments,
  getUserName,
  getGroupTasks,
  getSingleTask
})(TaskCard));
