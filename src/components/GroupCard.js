import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBNavLink,
  MDBCardFooter,
  MDBIcon,
  MDBCardTitle,
  MDBBtn
} from "mdbreact";
import { withRouter } from "react-router-dom";
import "./Styles/GroupCard.css";

class  GroupCard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        userId: localStorage.getItem('userId')
    }
  }
  
  render(){
    return (
    <div className="group-card">
      <MDBCard className="text-center">
        <MDBCardHeader color="primary-color" tag="h3">
          {this.props.group.name}
        </MDBCardHeader>
        <MDBCardBody>
          <MDBCardTitle />
          <div className={'group-user-image'}>
            {this.props.group.members !== undefined
                ? this.props.group.members.map(usr => <img  key={usr.name} src={usr.profilePicture} alt='user profile' />)
              : null}
          </div>
          <MDBNavLink key={this.props.key} to={`/groups/${this.props.group.id}`}>
            <MDBBtn color="success">Enter</MDBBtn>
          </MDBNavLink>
        </MDBCardBody>
        {
          this.props.group.userID !== Number(localStorage.getItem("userId")) ? null :
              <MDBCardFooter style={{ background: "#2A922D" }}>
                <div className="group-card-footer">
                  <div
                      className="group-card-footer-button"
                      onClick={() =>
                          this.props.updateGroup(this.props.group.id)
                      }
                  >
                    <MDBIcon icon="edit" />
                  </div>

                  <div
                      className="group-card-footer-button"
                      onClick={() =>
                          this.props.removeGroup(this.props.group.id, this.state.userId)
                      }
                  >
                    <MDBIcon icon="trash" />
                  </div>
                </div>
              </MDBCardFooter>
        }

      </MDBCard>
    </div>
  );
      }
      
};



export default withRouter(GroupCard);
