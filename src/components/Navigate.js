import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import './css/Navigate.css';

const Navigate = ({postId, fatching, click}) => {
    return (
        <div className="Navigate">
            <Button
                color="teal"
                content="Previous"
                icon="left arrow"
                labelPosition="left"
                disabled={fatching}
                onClick={() => click(false)} />
            <div className="Navigate-page-num">
                {postId}
            </div>
            <Button
                color="teal"
                content="Next"
                icon="right arrow"
                labelPosition="right" 
                className="Navigate-right-button"
                disabled={fatching}
                onClick={() => click(true)}/>
        </div>);
}

export default Navigate;