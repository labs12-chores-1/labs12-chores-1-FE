import React, { Component } from 'react';
import { 
    MDBBtn, 
    MDBContainer, 
    MDBRow, 
    MDBCol, 
    MDBIcon,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText
 } from "mdbreact";

class GroupTaskView extends Component {
    constructor() {
        super();
        this.state= {

        };
    }

render() {
    return (
        <div className="taskView-container">
            <MDBContainer className="mt-5">
                <MDBRow>
                    <MDBCol md="12" className="mb-4">
                        <a href="#!" className="card-link"><MDBIcon icon="chevron-left" />  Back to Chore List</a>
                        <MDBBtn outline color="success">New Chore</MDBBtn>
                        <MDBBtn outline color="success">Delete Chore</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
         <div>
         <MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
            <MDBCardBody>
            <MDBCardTitle>Walk dog</MDBCardTitle>
            <MDBCardTitle tag="h6" sub className="mb-2 text-muted">Completed by Marie</MDBCardTitle>
        <MDBCardText>I'll do it tomorrow</MDBCardText>
            <a href="#!" className="card-link"><MDBIcon icon="redo" /> 
        repeats every 3 days </a>
            <a href="#!" className="card-link">
        Another link
            </a>
        </MDBCardBody>
        </MDBCard>

            
         </div>
        </div>
    )
    }
}

export default GroupTaskView;