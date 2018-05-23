import React, { Component } from 'react';
import './css/Post.css';
import { CommentList } from './index'

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postInfo: {
                title: null,
                body: null,
                comment: []
            },
            animate: false,
            direction: false
        }
    }

    componentWillReceiveProps(nextProp, nextContext) {
        const { title, body } = nextProp.post;
        const { comment } = nextProp;
        if (this.props.postId !== nextProp.postId) {
            const where = (this.props.postId > nextProp.postId) ? false : true;

            //state 값만 변경하여 에니메이션 처리
            this.setState({
                direction: where,
                animate: true
            });
            this.closeAnimation(title, body, comment);
            return;
        }

        this.setState({
            postInfo: {
                title, body, comment
            }
        });
    }

    //시간이 지난뒤에 새 context로 채워 새 animation 실행
    closeAnimation = (title, body, comment) => {
        setTimeout(
            () => {
                this.setState({
                    postInfo: {
                        title, body, comment
                    },
                    animate: false
                });
            }, 500);
    }

    // shouldComponentUpdate(nextProp, nextState) {
    //     console.log('shouldComponentUpdate : ' + this.props.postId + " " + nextProp.postId);
    //     if ((this.props.postId !== nextProp.postId)) {
    //         return true;
    //     }
    //     return false;
    // }


    render() {
        const { title, body, comment } = this.state.postInfo;

        if (title === null) {
            return null;
        }

        const { direction, animate } = this.state;

        const animation = animate
            ? (direction ? 'bounceOutLeft' : 'bounceOutRight')
            : (direction ? 'bounceInRight' : 'bounceInLeft');

        console.log("Post render : " + animation);
        return (
            <div className={`Post animated ${animation}`}>
                <h1>{title}</h1>
                <p>
                    {body}
                </p>
                <CommentList comment={comment} />
            </div>);
    }
}
export default Post;