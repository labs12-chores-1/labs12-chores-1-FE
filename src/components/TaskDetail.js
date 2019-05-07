import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Styles/TaskDetail.css";
import TaskCard from "./TaskCard";
import { withRouter } from "react-router";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBInput,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBContainer
  } from "mdbreact";

class TaskDetail extends Component {
    // constructor(props) {
    //     super();
        state= {
            tasks:[],
            // searchField: "",


        // };
        }

render() {
    return (
        <MDBContainer className="task-detail-container">
            <MDBRow>
                <MDBCol md="12" className="mb-4">
                    <a href={`/groups/${this.props.match.params.id}`} className="card-link"><MDBIcon icon="chevron-left" />Back to ShopTrak</a>
                    <div className="nav-btns">
                        <MDBBtn outline color="success">New Task</MDBBtn>
                        <MDBBtn outline color="success">Delete Task</MDBBtn> 
                    </div>


                </MDBCol>
            </MDBRow>

            <MDBContainer className="task-card">
                
                        <TaskCard
                            taskID={1}
                            taskname={"Walk Dog"}
                            requestedBy={"Alex"}
                            done={0}
                            comments={0}
                            repeated={0}
                            assignee={"Tsai"}
                            done={false}
                            // group={1}
                            // updateGroup={this.saveGroupName}
                            // removeGroup={this.deleteGroup}
                        />          

            </MDBContainer>
        </MDBContainer>
    )
    }
}

export default withRouter(TaskDetail);