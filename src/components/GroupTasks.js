import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Styles/GroupTask.css";
import TaskCard from "./TaskCard";
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
    MDBInput
  } from "mdbreact";

class GroupTasks extends Component {
    // constructor(props) {
    //     super();
        state= {
            tasks:[],
            searchField: "",


        // };
        }

render() {
    return (
        <div className="task-container">
            <div className="tasks-cards">
                {/* {this.props.groupTasks !== null
                    ? this.props.userGroups.map(group => ( */}
                        <TaskCard
                            task={1}
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
                    {/* ))
                    : null
                } */}

            </div>
            <Link to={`/groups/${this.props.match.params.id}`}><button> Shop Trak!!!</button></Link>
        </div>
    )
    }
}

export default GroupTasks;