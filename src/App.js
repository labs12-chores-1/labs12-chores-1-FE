import React, { Component } from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Callback from './components/Callback';
import GroupsPage from "./components/GroupsPage";
import GroupsProfile from "./components/GroupsProfile";
import Navigation from './components/Navigation';
import BillingPage from './components/BillingPage';
import Invite from './components/Invite';
import {getCurrentUser, checkEmail} from './store/actions/rootActions';
import GroupDataBar from './components/GroupDataBar';
import GroupDataDoughnut from './components/GroupDataDoughnut';
import GroupTasks from './components/GroupTasks';
import TaskDetail from './components/TaskDetail';
class App extends Component {

  componentWillMount(){
    if(localStorage.getItem('email') && !this.props.currentUser){
      this.props.checkEmail();
    }
  }

  render() {
    return (
      <div>
      <Navigation />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path = '/profile' component={UserProfile} />
        <Route path = '/callback' component = {Callback} />
        <Route exact path='/groups' component={GroupsPage} />
        <Route exact path='/groups/:id' render={props => <GroupsProfile {...props}/>} />
        <Route exact path= '/groups/:id/tasktrak' render={props => <GroupTasks {...props}/>} />
        <Route exact path= '/groups/:groupId/task/:taskId' render={props => <TaskDetail {...props}/>} />
        <Route path = '/billing' component = {BillingPage} />
        <Route path = '/invite' component = {Invite} />
        <Route path = '/data/:id' component = {GroupDataBar} />
        <Route path = '/doughnut/:id' component = {GroupDataDoughnut} />
      </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => {
  state = state.rootReducer; // pull values from state root reducer
  return {
      //state items
      currentUser: state.currentUser
  }
}

export default withRouter(connect(mapStateToProps, {
  // actions
  getCurrentUser,
  checkEmail,
})(App));