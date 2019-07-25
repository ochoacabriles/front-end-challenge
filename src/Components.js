import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

import { Row, Column, Table, ButtonStyle, ModalWrapper, Wrapper } from './Styles'

// Define Query const
const QUERY = gql`
  query Character($id: ID!) {
    character(id: $id) {
      image
      name
      id
      status
      species
      type
      gender
      origin { name }
      location { name }
      created
    }
  }`

// COMPONENTS
// Query class
class CharacterQuery extends Component {

  constructor(props) {
    super(props)
    this.state = {
      history: [],
      characterData: null,
      id: null,
      historyId: [],
      showModal: false
    }
    this.showPreviousCharacter = this.showPreviousCharacter.bind(this)
    this.forgetCharacter = this.forgetCharacter.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  renderCharacter() {
    if(!this.state.characterData) {
      return(
        <Column xs='12'>
          No se ha generado ningún personaje
        </Column>
      )
    } else {
      return(
        <CharacterView
          imageURL={this.state.characterData.image}
          name={this.state.characterData.name}
          id={this.state.characterData.id}
          species={this.state.characterData.species}
          gender={this.state.characterData.gender}
          type={this.state.characterData.type}
          status={this.state.characterData.status}
          showModal={this.state.showModal}
        />
      )
    }
  }

  generateId() {
    const id = Math.floor(Math.random() * 493) + 1
    this.setState({
      id: id,
      showModal: false
    })

  }

  executeQuery() {
    const { id, history, historyId } = this.state
    if (id) {
      return(
        <Query
          query={QUERY}
          variables={{ id }}
          onCompleted={data => this.setState({
            characterData: data.character,
            history: history.concat(data.character),
            id: null,
            historyId: historyId.concat(id)
          })}
        >
        {({ loading, error, data }) => {
          if(loading) return null
          if(error) return <p>Ocurrió un error</p>
          this.characterData = data
          return null
        }}
      </Query>
      )
    } else {
      return null
    }
  }

  showPreviousCharacter(id) {
    const { history } = this.state
    const character = history.filter(element => element.id === id)
    this.setState({
      characterData: character[0],
      showModal: false
    })
  }

  forgetCharacter(id) {
    const { history } = this.state
    const updatedHistory = history.filter(element => element.id !== id)
    this.setState({
      history: updatedHistory
    })
  }

  showModal(historyLength) {
    if (!historyLength) {
      return alert('No hay historial para mostrar')
    }
    this.setState({
      showModal: true
    })
  }

  hideModal() {
    this.setState({
      showModal: false
    })
  }

  render() {
    const { history, historyId, showModal } = this.state
    let buttonText = showModal 
      ? 'Ocultar Historial'
      : 'Mostrar Historial'
    return (
      <Wrapper primary={false}>
        <Row primary={false}>
          <Column xs='6'>
            <Button
              onClick={ () => this.generateId() }
              primary={true}
              >
              Generar Personaje
            </Button>
          </Column>
          <Column xs='6'>
            <Button
              onClick={ () => !showModal? this.showModal(history.length) : this.hideModal() }
              primary={true}
            >
              {buttonText}
            </Button>
          </Column>
        </Row>
        <Row primary={false}>
          {this.executeQuery()}
          {this.renderCharacter()}
        </Row>
        <PreviousCharactersView 
          history={history} 
          show={this.showPreviousCharacter}
          forget={this.forgetCharacter}
          historyId={historyId}
          showModal={showModal}
        />
      </Wrapper> 
    )
  }
}


// Current character component
const CharacterView = (props) => {
  const { imageURL, name, id, status, species, type, gender } = props
  return(
    <div>
      <Column xs='12' sm='12' md='2' lg='2'>
        <img src={imageURL} alt='Avatar' height='120' width='120'></img>
      </Column>
      <Column xs='12' sm='12' md='10' lg='10'>
        <Table>
          <tbody>
            <tr>
              <th>Name:</th>
              <td>{name}</td>
            </tr>
            <tr>
              <th>ID:</th>
              <td>{id}</td>
            </tr>
            <tr>
              <th>Status:</th>
              <td>{status}</td>
            </tr>
            <tr>
              <th>Species:</th>
              <td>{species}</td>
            </tr>
            <tr>
              <th>Type:</th>
              <td>{type}</td>
            </tr>
            <tr>
              <th>Gender:</th>
              <td>{gender}</td>
            </tr>
          </tbody>
        </Table>
      </Column>

    </div>  
  )
}

// Previous characters component
const PreviousCharactersView = ({ history, show, forget, showModal }) => {
  const inverseHistory = history.slice().reverse()
  console.log(showModal)
  if (history.length && showModal) {
    return(
      <ModalWrapper>
        <Row primary={false}>
          <Column xs='12'>
            <Table>
              <tbody>
                {inverseHistory.map(character => {
                  return(
                    <tr key={character.id}>
                      <td>
                        <img src={character.image} alt='Avatar' height='50' width='50' display='inline-block'></img>
                      </td>
                      <td>
                        Name: {character.name}
                      </td>
                      <td>
                        <Button
                          onClick={ () => show(character.id) }
                          primary={false}
                        >
                          Show
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={ () => forget(character.id) }
                          primary={false}
                        >
                          Forget
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>    
          </Column>
        </Row>
      </ModalWrapper>
    )
  } else {
    return null
  }
}

// Button component
const Button = ({ onClick, primary, children }) => {
  return (
    <ButtonStyle
      onClick={onClick}
      type='button'
      primary={primary}
    >
      {children}
    </ButtonStyle>
  )
}

export { CharacterQuery, CharacterView, Button, PreviousCharactersView }