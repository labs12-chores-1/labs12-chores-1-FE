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
            <ul className="comment-section">
                <li className= "comment user-comment">
                    <div className="info">
                        <p className="name">{this.state.name}</p>
                        <span className="date">{this.state.commentedOn}</span>
                    </div>
                    
                    <div className="avatar">
                        <img className="usr-img" alt="userimg" src={this.state.img_url} width="35px"/>    
                    </div>
                    <p className="comments">{this.state.commentString}</p>

                    <div className="comment-cta">
                        <button className="cta-comment-edit custom-switch" type="submit" onClick={(e)=> this.props.editComment(e, this.props.commentID)}><i class="fas fa-pen"></i></button>
                        <button className="cta-comment-close" type="button" onClick={(e) => this.props.removeComment(e, this.props.commentID)}><i class="fas fa-times"></i></button> 
                    </div>
                </li>
            </ul>
// test //
                // <div className="comments-container">
                //     <div className="user-section">
                //         <img className="usr-img" alt="userimg" src={this.state.img_url} width="94px" height="82px"/>
                //         <h3 className="name">{this.state.name}</h3>
                //         <button className="cta-comment-edit custom-switch" type="submit" onClick={(e)=> this.props.toggleCommentModal(e, this.props.commentID)}><i class="fas fa-pen"></i></button>
                //         <button className="cta-comment-close" type="button" onClick={(e) => this.props.removeComment(e, this.props.commentID)}><i class="fas fa-times"></i></button> 
                //     </div> 

                //     <div className="comment-details">
                //         <h6 className="date">{this.state.commentedOn}</h6>
                //     </div>       
                    
                //     <div className="cta-comment">
                //         <p className="comment">{this.state.commentString}</p> 
                //     </div>

                               
                // </div>

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
