import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js'

import Input from './componentes/Input';

class Form extends Component { 

    constructor() {
        super();
        this.state = { nome: '', email: '', senha: '' };
    }

    enviaForm = (evento) => {
        evento.preventDefault();

        const { nome, email, senha } = this.state

        $.ajax({
          url: 'http://cdc-react.herokuapp.com/api/autores',
          contentType: 'application/json',
          dataType: 'json',
          type: 'post',
          data: JSON.stringify({ 
            nome: nome, 
            email: email, 
            senha: senha 
          }),
          success: (novaListagem) => {
            PubSub.publish('atualiza-lista-autores', novaListagem);
          },
          error: (resposta) => {
            console.log("erro", resposta);
          }
        })
    }
    
    setNome = (evento) => {
      this.setState({ nome: evento.target.value });
    }

    setEmail = (evento) => {
      this.setState({ email: evento.target.value });
    }

    setSenha = (evento) => {
      this.setState({ senha: evento.target.value });
    }


    render () {
        return (
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                <Input id="nome" type="text" label="Nome" name="nome" value={this.state.nome} onChange={this.setNome} />
                <Input id="email" type="email" label="Email" name="email" value={this.state.email} onChange={this.setEmail} />
                <Input id="senha" type="password" label="Senha" name="senha" value={this.state.senha} onChange={this.setSenha} />

                <div className="pure-control-group">                                  
                  <label></label> 
                  <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                </div>
              </form>             
            </div>
        );
    }
}

class Table extends Component {

    render () {
        return (
            <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.lista.map(function(autor) {
                        const { id, nome, email } = autor

                        return (
                          <tr id={id}>
                            <td>{nome}</td>
                            <td>{email}</td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table> 
            </div>   
        );
    }
}

export default class AutorBox extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
    }
    
    componentDidMount() {
      $.ajax({
        url: 'http://cdc-react.herokuapp.com/api/autores',
        dataType: 'json',
        success: (resposta) => {
          this.setState({ 
            lista: resposta, 
            nome: '', 
            email: '', 
            senha: '' 
          });
        }
      })

      PubSub.subscribe('atualiza-lista-autores', (topico, lista) => {
        this.setState({ lista });
      })
    }

    render() {
        return (
            <Fragment>
                <Form />
                <Table lista={this.state.lista} />
            </Fragment>
        );
    }
}