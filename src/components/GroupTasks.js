import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DropdownPage from './DropdownPage';
import "./Styles/GroupTask.css";


class GroupTasks extends Component {
    constructor() {
        super();
        this.state= {

        };
    }
    

render() {
    return (
        <div className="task-container">
            <h1>Task Trak!!!</h1>
            <Link to={`/groups/${this.props.match.params.id}`}><button> Shop Trak!!!</button></Link>
            <div className = 'dropdown'>
            <DropdownPage title={"complete"} option1={"Allison"}></DropdownPage>
                <DropdownPage title={"assigned"}></DropdownPage>
            </div>
        </div>
        
    )
    }
}

export default GroupTasks;