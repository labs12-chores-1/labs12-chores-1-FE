import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { deleteComment } from '../store/actions/rootActions';

import './Styles/Comments.css'

class Comments extends Component {
    constructor(props){
        super(props)
        this.state = {
            commentID:this.props.commentID,
            commentString:props.commentString,
            taskID:props.taskID,
            commentedOn:props.commentedOn,
            name: localStorage.getItem('name'),
            img_url: localStorage.getItem('img_url')
            
        }
    }

    // removeComment = (e, id) => {
    //     e.preventDefault();
    //     this.props.deleteComment(id, this.props.match.params.id);
    //   }


    render(){
        return(
            <>
            <div className="comments-container">
                
                <div className="user-section">
                    <h3 className="name">{this.state.name}</h3> 
                    <img className="usr-img" alt="userimg" src={this.state.img_url} width="18px" height="19px"/>
                </div>
                   
                    <div className="comment-details">
                        <p className="comment">{this.state.commentString}</p>
                        <h6 className="date">{this.state.commentedOn}</h6>
                    </div>

                    
            </div>
            </>
        )

    }

}

const mapStateToProps = state => {
    state = state.rootReducer; // pull values from state root reducer
    return {
      //state items
      taskComments: state.taskComments,
      errorMessage: state.errorMessage
    };
};

export default withRouter(connect(mapStateToProps,{deleteComment})(Comments));


