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
import { getTaskComments, getUserName, getGroupTasks} from '../store/actions/rootActions';
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
        comments: props.comments,
        assigneeName: "",
        task: {}

    };
  }
  componentWillMount(){
        document.title = `FairShare - Task`; 
        this.setState({task: this.props.task});

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
      // console.log(this.props.tempUserName);
    }
    
    componentDidMount(){

    }



  getComments = e => {
    e.preventDefault();
    this.props.getTaskComments(this.props.match.params.id);
  };

  render(){

  return (
      
      <MDBCard className="task-card" 
        onClick={()=>this.props.history.push(`/task/${this.state.task.id}`)}>
        <MDBCardBody className="task-card-body">
            <div className="task-card-left">
                <h7>{this.state.task.taskName}</h7>
                <h7>Requested by: {this.state.task.createdBy}</h7>
            </div>
            <div className="task-card-middle">
                <h5>Assigned To {this.props.assigneeName}</h5>
                <div>{this.props.taskDescription}</div>
            </div>
            <div className="task-card-right">
                <img onClick ={this.getComments} src={commentImg} alt='' height="30" width="30"></img>
                <input type="checkbox" name="vehicle" value="Bike" onClick={(event)=>{event.stopPropagation()}}></input>
                <h7>Done</h7>
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
    taskComments: state.taskComments,
    errorMessage: state.errorMessage,
    assigneeName: state.tempUserName,
    currentTask: state.currentTask
  };
};

export default withRouter(connect(mapStateToProps,{
  getTaskComments,
  getUserName,
  getGroupTasks
})(TaskCard));
