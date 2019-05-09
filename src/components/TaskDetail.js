import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import "./Styles/TaskDetail.css";
import TaskCard from "./TaskCard";
import { withRouter } from "react-router";
import {
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBContainer
  } from "mdbreact";

import { deleteTask } from '../store/actions/rootActions';

class TaskDetail extends Component{
       // constructor(props) {
    //     super();
    state= {
        tasks:[],
        // searchField: "",


    // };
}
    removeTask = e => {
        e.preventDefault();
        this.props.deleteTask(this.props.match.params.id);
        window.location = `/groups/${this.props.match.params.id}/tasktrak`;

    }

render() {
    return (
        <MDBContainer className="task-detail-container">
            <MDBRow>
                <MDBCol md="12" className="mb-4">
                    <a href={`/groups/${this.props.match.params.id}`} className="card-link"><MDBIcon icon="chevron-left" />Back to ShopTrak</a>
                    <div className="nav-btns">
                        <MDBBtn outline color="success">New Task</MDBBtn>
                        <MDBBtn outline color="success" onClick={this.removeTask}>Delete Task</MDBBtn> 
                    </div>


                </MDBCol>
            </MDBRow>

            <MDBContainer className="task-card">
                
                        <TaskCard
                            taskID={1}
                            taskname={"Walk Dog"}
                            requestedBy={"John"}
                            done={0}
                            comments={0}
                            repeated={0}
                            done={false}
                            assignee={"Jane"}
                            // group={1}
                            // updateGroup={this.saveGroupName}
                            // removeGroup={this.deleteGroup}
                        />          

            </MDBContainer>
        </MDBContainer>
    )
    }
}

    const mapStateToProps = state =>{
        state = state.rootReducer;
        return {
            deleteMessage: state.deleteMessage,
            errorMessage: state.errorMessage
        };
    };

export default withRouter(connect(mapStateToProps,{deleteTask})(TaskDetail));