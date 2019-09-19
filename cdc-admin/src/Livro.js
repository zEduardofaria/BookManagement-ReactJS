import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js'
import TratadorErros from './TratadorErros';

import Input from './componentes/Input';

class Form extends Component { 

    constructor() {
        super();
        this.state = { titulo: '', preco: '', autorId: '' };
    }

    enviaForm = (evento) => {
        evento.preventDefault();

        const { titulo, preco, autorId } = this.state

        $.ajax({
          url: 'http://cdc-react.herokuapp.com/api/livros',
          contentType: 'application/json',
          dataType: 'json',
          type: 'post',
          data: JSON.stringify({ 
            titulo, 
            preco, 
            autorId
          }),
          success: (novaListagem) => {
            PubSub.publish('atualiza-lista-livros', novaListagem);
            this.setState({ titulo: '', preco: '', autorId: '' })
          },
          error: (resposta) => {
              if (resposta.status === 400) {
                  new TratadorErros().publicaErros(resposta.responseJSON)
              }
          },
          beforeSend: function() {
              PubSub.publish('limpa-erros', {});
          }
        })
    }
    
    setTitulo = (evento) => {
      this.setState({ titulo: evento.target.value });
    }

    setPreco = (evento) => {
      this.setState({ preco: evento.target.value });
    }

    setAutorId = (evento) => {
      this.setState({ autorId: evento.target.value });
    }


    render () {
        const { 
            state: { 
                titulo, 
                preco, 
                autorId 
            }, 
            enviaForm, 
            setTitulo,
            setPreco,
            setAutorId
        } = this

        return (
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={enviaForm} method="post">
                <Input id="titulo" type="text" label="Titulo" name="titulo" value={titulo} onChange={setTitulo} />
                <Input id="preco" type="text" label="Preco" name="preco" value={preco} onChange={setPreco} />
                <div className="pure-control-group">
                    <label htmlFor="autorId">Autor</label>
                    <select value={autorId} id="autorId" name="autorId" onChange={setAutorId}>
                        {
                          this.props.autores.map(function(autor) {
                            return <option value={autor.id}>{autor.nome}</option>
                          })
                        }
                    </select>
                </div>

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
                      <th>Título</th>
                      <th>Preço</th>
                      <th>Autor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.lista.map(function(livro) {
                        const { titulo, preco, autor } = livro

                        return (
                          <tr>
                            <td>{titulo}</td>
                            <td>{preco}</td>
                            <td>{autor}</td>
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

export default class LivroBox extends Component {

    constructor() {
        super();
        this.state = { lista: [], autores: [] };
    }
    
    componentDidMount() {
      $.ajax({
        url: 'http://cdc-react.herokuapp.com/api/livros',
        dataType: 'json',
        success: (resposta) => {
          this.setState({ 
            lista: resposta, 
          });
        }
      })

      $.ajax({
        url: 'http://cdc-react.herokuapp.com/api/autores',
        dataType: 'json',
        success: (resposta) => {
          this.setState({ 
            autores: resposta, 
          });
        }
      })

      PubSub.subscribe('atualiza-lista-livros', (topico, lista) => {
        this.setState({ lista });
      })
    }

    render() {
        return (
            <Fragment>
              <div className="header">
                <h1>Cadastro de livros</h1>
              </div>
              <div className="content" id="content">
                <Form autores={this.state.autores} />
                <Table lista={this.state.lista} />
              </div>
            </Fragment>
        );
    }
}