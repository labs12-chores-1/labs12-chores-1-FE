import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import "./Styles/TaskDetail.css";
import TaskCard from "./TaskCard";
import { withRouter } from "react-router";
import {
    // MDBCard,
    // MDBCardBody,
    // MDBCardTitle,
    // MDBCardText,
    MDBBtn,
    // MDBModal,
    // MDBModalBody,
    // MDBModalHeader,
    // MDBModalFooter,
    // MDBInput,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBContainer
  } from "mdbreact";
import { connect } from 'react-redux';
import { getTaskComments } from '../store/actions/rootActions';
// import { rootReducer } from "../store/reducers/rootReducer";

class TaskDetail extends Component {
    constructor(props) {
        super(props);
        this.state= {
            comments:[],
            // searchField: "",


        };
    }

    componentWillMount(){
        document.title = `FairShare - Task`;
        this.props.getTaskComments(this.props.match.params.id);
    }

    // getComments = e => {
    //     e.preventDefault();
    //     this.props.getTaskComments(this.props.match.params.id);
    //   };

render() {
    return (
        <MDBContainer className="task-detail-container">
            <MDBRow>
                <MDBCol md="12" className="mb-4">
                    <a href={`/groups/${this.props.match.params.id}`} className="card-link"><MDBIcon icon="chevron-left" />Back to ShopTrak</a>
                    <div className="nav-btns">
                        <MDBBtn outline color="success">Edit Task</MDBBtn>
                        <MDBBtn outline color="success">Add Comment</MDBBtn>
                        <MDBBtn outline color="success">Delete Task</MDBBtn> 
                    </div>


                </MDBCol>
            </MDBRow>

            <MDBContainer className="task-card">
                
                <TaskCard
                    taskID={1}
                    taskname={"Walk Dog"}
                    requestedBy={"Tsai"}
                    done={0}
                    comments={0}
                    repeated={0}
                    assignee={"Alex"}
                
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
    )
    }
}

const mapStateToProps = state => {
    state = state.rootReducer; // pull values from state root reducer
    return {
      //state items
      taskComments: state.taskComments,
      errorMessage: state.errorMessage
    };
};
  

export default withRouter(connect(mapStateToProps,{getTaskComments})(TaskDetail));