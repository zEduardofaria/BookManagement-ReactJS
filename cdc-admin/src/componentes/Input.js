import React, { Component } from 'react';

class Input extends Component {

    render() {
        const { id, type, name, value, onChange, label } = this.props

        return (
            <div className="pure-control-group">
              <label htmlFor={id}>{label}</label> 
              <input id={id} type={type} name={name} value={value} onChange={onChange} />                  
            </div>
        )
    }
}

export default Input;