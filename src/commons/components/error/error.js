import React from 'react';
import './error.css'

export default function Error(props) {
 
        return (
            <div className="error">
                <div>Oops!</div>
                <div>{props.code}</div>
                <div>{props.message}</div>
            </div>
        )
    
}