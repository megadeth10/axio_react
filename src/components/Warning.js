import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/Warning.css'

const propTypes = {
}

const defaultProps = {
}

class Warning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            close : false
        }
    }

    componentWillReceiveProps(nextProps, nextContext){
        if(this.props.visiable && !nextProps.visiable){
            this.setState({close : true});
            setTimeout(
                () => {
                this.setState({
                    close : false
                })
                }, 1000);
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(this.props.visiable && nextProps.visiable){
            return false;
        }
        return true;
    }


    render() {
        const { messages, visiable } = this.props;

        if(!visiable && !this.state.close){
            return null;
        }
        return (
            <div className="Warning-wrapper">
                <div className={`Warning animated ${this.state.close ? 'bounceOut' : 'bounceIn'}`}>
                    {messages}
                </div>
            </div >
        );
    }
};

Warning.defaultProps = defaultProps;
Warning.propTypes = propTypes;

export default Warning;