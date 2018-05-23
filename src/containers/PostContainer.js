import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PostWrapper, Navigate, Post, Warning } from '../components/index';
import * as Service from '../services/Post';

const propTypes = {
}

const defaultProps = {
}

class PostContainer extends Component {
    constructor(props) {
        super(props);
        this.timerId = null;
        this.state = {
            postId: 1,
            fatching: false,
            post: {
                title: null,
                body: null
            },
            comment: [],
            visiable: false
        };
        // this.handleChangePost = this.handleChangePost.bind(this);
    }

    componentDidMount() {
        this.fetchPostInfo(this.state.postId);
    }

    fetchPostInfo = async (postId) => {
        if (this.state.fatching) {
            return;
        }
        console.log(postId);
        this.setState({ fatching: true });
        try {
            const response = await Promise.all([
                Service.getPost(postId),
                Service.getComment(postId)
            ]);

            let postData = null;
            let commentData = null;

            if (response[0].status === 200) {
                postData = response[0].data;
            }

            if (response[1].status === 200) {
                commentData = response[1].data;
            }

            if (postData && commentData) {
                const { title, body } = postData;

                this.setState({
                    postId,
                    post: {
                        title, body
                    },
                    comment: commentData,
                    fatching: false
                });
            } else {
                throw new Error("post and comment not received");
            }
        } catch (err) {
            console.log("err : " + err);
            this.setState({
                fatching: false,
                visiable: true
            });
            this.showError();
        }


        /*try{
            const post = await Service.getPost(postId);
            if(post.status === 200){
                console.log(post);
            }
        } catch(err){
            console.log("err: : " + err);
        }

        try{
            const comment = await Service.getComment(postId);
            if(comment.status === 200){
                console.log(comment);
            }
        } catch(err){
            console.log("err: : " + err);
        }*/

    }

    handleChangePost = (direction) => {
        if (direction) { //next
            this.fetchPostInfo(this.state.postId + 1);
        } else {//prev
            this.fetchPostInfo(this.state.postId - 1);
        }
    }

    showError = () => {
        if(this.timerId){
            clearTimeout(this.timerId);
        }
        this.timerId = setTimeout(
            () => {
                this.setState({
                    visiable: false
                });
                this.timerId = null;
            }, 2000
        );
    }

    render() {
        return (
            <div>
                <PostWrapper>
                    <Navigate
                        fetching={this.state.fatching}
                        postId={this.state.postId}
                        click={this.handleChangePost} />
                    <Post
                        postId={this.state.postId}
                        post={this.state.post}
                        comment={this.state.comment} />
                </PostWrapper>
                <Warning messages="don't post" visiable={this.state.visiable} />
            </div>
        );
    }
};

PostContainer.defaultProps = defaultProps;
PostContainer.propTypes = propTypes;

export default PostContainer;