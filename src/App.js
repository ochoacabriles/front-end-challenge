import React from 'react'

// Import Apollo Packages
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

// Import Styles and Components
import { Row, Wrapper, GlobalStyle } from './Styles'
import { CharacterQuery } from './Components'

// Create Apollo Client
const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql'
})

// App component
function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Wrapper primary={true}>
        <Row primary={true}>
          <h3>Blockdemy Frontend Challenge</h3>
        </Row>
      </Wrapper>
      <CharacterQuery />
    </ApolloProvider>
  )
}

export default App;
