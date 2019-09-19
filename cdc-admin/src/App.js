import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import Input from './componentes/Input';

class App extends Component {

  constructor() {
    super();
    this.state = { lista: [] };
  }

  componentWillMount() {
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
  }

  enviaForm = (evento) => {
    evento.preventDefault();
    
    console.log('this')

    $.ajax({
      url: 'http://cdc-react.herokuapp.com/api/autores',
      contentType: 'application/json',
      dataType: 'json',
      type: 'post',
      data: JSON.stringify({ 
        nome: this.state.nome, 
        email: this.state.email, 
        senha: this.state.senha 
      }),
      success: (lista) => {
        this.setState({ lista })
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

  render() {
    return (
      <div id="layout">
  
          <a href="#menu" id="menuLink" className="menu-link">
              <span></span>
          </a>
  
          <div id="menu">
              <div className="pure-menu">
                  <a className="pure-menu-heading" href="#">Company</a>
  
                  <ul className="pure-menu-list">
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                      <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
                  </ul>
              </div>
          </div>
  
          <div id="main">
              <div className="header">
                  <h1>Cadastro de autores</h1>
              </div>
          </div>
  
          <div className="content" id="content">
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
                        this.state.lista.map(function(autor) {
                          return (
                            <tr>
                              <td>{autor.nome}</td>
                              <td>{autor.email}</td>
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table> 
                </div>             
              </div>
      </div>
    );
  }
}

export default App;
