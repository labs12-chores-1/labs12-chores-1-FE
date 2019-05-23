import React, { Component } from "react";
import {
  checkEmail,
  clearError,
  createGroup,
  acceptInvite,
  getCurrentUser,
  getUserGroups,
  clearCurrentGroup,
  updateGroupName,
  removeGroup
} from "../store/actions/rootActions";
import { connect } from "react-redux";
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
import GroupCard from "./GroupCard";

import "./Styles/GroupsPage.css";

class GroupsPage extends Component {
  constructor (props){
    super(props);
  
  this.state = {
    modal14: false,
    modal15: false,
    modal16: false,
    groupName: "",
    delete: "",
    groupId: null,
    modal17: true,
    toggleMod:false,
    newGroupName:'',
    userId: localStorage.getItem('userId')
  };
  this.toggle = this.toggle.bind(this);

}

  componentWillMount() {
    if (localStorage.getItem("email") && !this.props.currentUser) {
      this.props.checkEmail();
    }
  }

  componentDidMount() {
    console.log("here: ", this.props.currentUser);
    document.title = `FairShare - Groups`;
    if (!this.props.userGroups && this.props.currentUser) {
      this.props.getUserGroups(this.props.currentUser.id);
    }

    // invitation handling on groups redirect
    if (
      sessionStorage.getItem("pendingInvite") &&
      localStorage.getItem("isLoggedIn")
    ) {
      let inviteCode = sessionStorage.getItem("pendingInvite");
      console.log("pending invite", inviteCode);
      this.props.acceptInvite(inviteCode); // tell the server to add the now logged-in user to the invite group

      sessionStorage.removeItem("pendingInvite");
    }
  }

  componentWillReceiveProps = newProps => {
    if (
      newProps.currentUser &&
      !this.props.userGroups &&
      this.props.errorMessage === null
    ) {
      // console.log("In newProps.currentUser: ", this.props.currentUser);
      this.props.getUserGroups(newProps.currentUser.id);
    }
  };

  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  };

  saveGroupName = (id) => {
    this.setState({ groupId: id,  modal15: true });
  };

  deleteGroup = (id, userId) => {
    this.setState({ groupId: id, userId: userId, toggleMod: true });
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleInputChanges = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleAddGroup = (event) => {
    event.preventDefault();
    this.props.createGroup(this.state.groupName, this.props.currentUser.id);
    this.toggle(14);
    this.props.getUserGroups(this.props.currentUser);
    //         this.props.addGroup(this.state.groupName);
    // this.setState({ modal14: false });
    if (!this.props.userGroups) {
      this.props.getUserGroups(this.props.currentUser.id);
    }
    
  };

  handleUpdateGroupName = (e) => {
      e.preventDefault();
      const changes = { name: this.state.newGroupName };
      this.props.updateGroupName(this.state.groupId, changes);

      this.setState({ modal15: false });
      this.props.getUserGroups(this.state.userId)
    
    //causes page to reload - added this because the new name would not show otherwise
    // window.location.reload();
  };

  handleDeleteGroup = event => {
    event.preventDefault();

    if (this.state.groupId !== null) {
      this.props.removeGroup(
        this.state.groupId,
        localStorage.getItem("userId")
      );
      this.setState({ toggleMod: false });
    }
  };

  handleClearError = () => {
    this.props.clearError();
  };

  keyPress = event => {
    if(event.keyCode === 13){
      this.handleAddGroup(event);
    }
  }

  nameUpdateKeyPress = event => {
    if(event.keyCode === 13){
      this.handleUpdateGroupName(event);
    }
  }

  deleteKeyPress = event => {
    if(event.keyCode === 13){
      this.handleDeleteGroup(event);
    }
  }

  toggleMod= (e) => {
    e.preventDefault();
    this.setState({
        toggleMod:!this.state.toggleMod
    })
    console.log('toggleModalState:',this.state.toggleMod);
}

  render() {
    const user = localStorage.getItem("userId");
    return (
            <div className="groups-container">
              {
                user === null ? <div className="user-notlogged user-notlogged-groups">
                      <h1>You must be logged in to view this page</h1>
                    </div>
                  :
                    <div className="groups-cards">
                      <div className="add-group-container">
                        <MDBCard className="text-center">
                          <MDBCardBody>
                            <MDBCardTitle>Create New Group</MDBCardTitle>
                            <MDBCardText>
                              Create a new group and share with confidence!
                            </MDBCardText>
                            <form>
                              <input
                                className="create-input"
                                label="Group Name"
                                name={"groupName"}
                                onChange={this.handleInput}
                                defaultValue={this.state.groupName}
                                onKeyDown={this.keyPress}
                                placeholder="e.g new group"
                              />
                              <button className="create-button" onClick={this.handleAddGroup}>Create Group</button>
                            </form>
                          </MDBCardBody>
                        </MDBCard>
                      </div>

                      {this.props.userGroups !== null
                          ? this.props.userGroups.map(group => (
                              <GroupCard
                                  group={group}
                                  key={group.id}
                                  updateGroup={this.saveGroupName}
                                  removeGroup={this.deleteGroup}
                              />
                          ))
                          : null
                      } 
                    </div>


              }
              <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
                <MDBModalHeader toggle={this.toggle(14)}>
                  Create A New Group
                </MDBModalHeader>
                <MDBModalBody>
                  <MDBInput
                      label="Group Name"
                      name={"groupName"}
                      onChange={this.handleInput}
                      defaultValue={this.state.groupName}
                      onKeyDown={this.keyPress}
                      onClick={this.handleAddGroup}
                  />
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={this.toggle(14)}>
                    Close
                  </MDBBtn>
                  <MDBBtn color="primary" onClick={this.handleAddGroup}>
                    Create
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModal>

              {/*Update Group Name Modal*/}

              <div className= {
                this.state.modal15=== false
                    ? 'custom-mod-hidden'
                    : 'custom-mod-display'}>
                
                <form className={'create-task-form'}>
                <span className="x" onClick={this.toggle(15)}>X</span>
                <h2>Update Group Name</h2>
                <input
                 type="text"
                 name="newGroupName"
                 value={this.state.newGroupName}
                 onChange={this.handleInputChanges}
                 placeholder="Update Group Name"
                />
                <button className="cta-submit" type='submit'onClick={this.handleUpdateGroupName}>submit</button>
                    
                </form>
            </div>
              
              
              {/* <MDBModal isOpen={this.state.modal15} toggle={this.toggle(15)} centered>
                <MDBModalHeader toggle={this.toggle(15)}>
                  <p>Update Group Name</p>
                </MDBModalHeader>
                <MDBModalBody>
                  <MDBInput
                      label="Change Group Name"
                      name={"groupName"}
                      onChange={this.handleInput}
                      defaultValue={this.state.groupName}
                      onKeyDown={this.nameUpdateKeyPress}
                  />
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={this.toggle(15)}>
                    Close
                  </MDBBtn>
                  <MDBBtn color="primary" onClick={this.handleUpdateGroupName}>
                    Update
                  </MDBBtn>
                </MDBModalFooter>
              </MDBModal> */}
              
              {/* Modal for delete group*/ }
              <div className= {
                this.state.toggleMod=== false
                    ? 'custom-mod-hidden'
                    : 'custom-mod-display'}>
                <form className={'create-task-form'}>
                <span className="x" onClick={this.toggleMod}>X</span>
                <h3>Delete this group?</h3>
                <h6>(cannot be undone)</h6>
                    
                    
                    
                    <button className="cta-submit" type='submit'onClick={this.handleDeleteGroup}>yes</button>
                    <button className="cta-submit" type='submit' onClick={this.toggleMod}>no</button>

                </form>
            </div>
              
              
              
              
              
              {this.props.errorMessage !== null ? (
                  <MDBModal
                      isOpen={this.state.modal17}
                      toggle={this.handleClearError}
                      centered
                  >
                    <MDBModalHeader toggle={this.toggle(17)}>Warning</MDBModalHeader>
                    <MDBModalBody>
                      <h6>{this.props.errorMessage}</h6>
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color="secondary" onClick={this.handleClearError}>
                        Ok
                      </MDBBtn>
                    </MDBModalFooter>
                  </MDBModal>
              ) : null}


            </div>

    );
  }
}

const mapStateToProps = state => {
  state = state.rootReducer; // pull values from state root reducer
  return {
    //state items
    currentUser: state.currentUser,
    userGroups: state.userGroups,

    userId: state.userId,
    name: state.name,
    email: state.email,
    profilePicture: state.profilePicture,
    groups: state.groups,
    errorMessage: state.errorMessage
  };
};

export default connect(
  mapStateToProps,
  {
    checkEmail,
    getUserGroups,
    clearError,
    clearCurrentGroup,
    createGroup,
    getCurrentUser,
    updateGroupName,
    removeGroup,
    acceptInvite
  }
)(GroupsPage);
