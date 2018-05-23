import React, { Component } from 'react';
import './css/CommentList.css';
import Comment from './Comment';


const makeCommentList = (comment) => {
    return comment.map((item, index) => (
        <Comment name={item.name} body={item.body} key={index}/>
    ));
}

const CommentList = ({comment}) => {
    return (
        <ul className="CommentList">
            {
                makeCommentList(comment)
            }
        </ul>
    );
}
export default CommentList;