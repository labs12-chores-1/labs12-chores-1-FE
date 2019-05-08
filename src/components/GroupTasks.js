import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DropdownPage from './DropdownPage';
import {getUserProfile, checkEmail} from '../store/actions/rootActions';
import "./Styles/GroupTask.css";
import TaskCard from "./TaskCard";
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import axios from 'axios';
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


class GroupTasks extends Component {
    // constructor(props) {
    //     super();
    componentWillMount(){
        if(this.props.user){
            // console.log('USER', this.props.user);
            this.getLocalUser(this.props.user.userID)        }
    }

    constructor(props){
        super(props);
        this.state = {
            targetUser: null
        }
    }

    getLocalUser = id => {
        let backendURL;
        if(process.env.NODE_ENV === 'development'){
        backendURL = `http://localhost:9000`
        } else {
        backendURL = `https://labs12-fairshare.herokuapp.com/`
        }
        
        let token = localStorage.getItem('jwt');
        let options = {
            headers: {
            Authorization: `Bearer ${token}`
            }
        }

        axios.get(`${backendURL}/api/user/${id}`, options).then(response => {
            // console.log('localuser', response);
            this.setState({
                targetUser: response.data
            })
        })
    }


render() {
    return (
        <MDBContainer className="group-task-container">
            <MDBRow>
                <MDBCol md="12" className="mb-4">
                    <a href={`/groups/${this.props.match.params.id}`} className="card-link"><MDBIcon icon="chevron-left" />Back to ShopTrak</a>
                    <div className="nav-btns">
                        <MDBBtn outline color="success">New Task</MDBBtn>
                        <MDBBtn outline color="success">Delete Task</MDBBtn> 
                    </div>


                </MDBCol>
            </MDBRow>
            <MDBContainer className="task-cards">
                {/* {this.props.groupTasks !== null
                    ? this.props.userGroups.map(group => ( */}
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
                            // group & groupID# axios get to that
                            // look at state/variables after that

                        />
                    {/* ))
                    : null
                } */}

            </MDBContainer>
   
        </MDBContainer>
    )
    }
}

export default withRouter(GroupTasks);