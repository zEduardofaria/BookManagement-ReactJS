import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class Input extends Component {

    constructor() {
        super();
        this.state = { msgErro: '' };
    }

    componentDidMount() {
        PubSub.subscribe('erro-validacao', (topico, erro) => {
            if (erro.field === this.props.name) {
                this.setState({ msgErro: erro.defaultMessage });
            }
        })

        PubSub.subscribe('limpa-erros', (topico, erro) => {
            this.setState({ msgErro: '' });
        })
    }

    render() {
        const { id, type, name, value, onChange, label } = this.props

        return (
            <div className="pure-control-group">
              <label htmlFor={id}>{label}</label> 
              <input id={id} type={type} name={name} value={value} onChange={onChange} />
              <span className="error">{this.state.msgErro}</span>                
            </div>
        )
    }
}

export default Input;