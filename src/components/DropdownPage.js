// import React from 'react';

import './Styles/Navigation.css';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,
    MDBBtn } from "mdbreact";

const DropdownPage = props => {
    return (
      <MDBDropdown>
        <MDBDropdownToggle caret color="primary">
          <h5>{props.title}</h5>
        </MDBDropdownToggle>
        <MDBDropdownMenu basic>
          <MDBDropdownItem>{props.option1}</MDBDropdownItem>
          <MDBDropdownItem>Another Person</MDBDropdownItem>
          <MDBDropdownItem>Someone else here</MDBDropdownItem>
          <MDBDropdownItem divider />
          <MDBDropdownItem>Separate link</MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    );
  }

  export default DropdownPage;