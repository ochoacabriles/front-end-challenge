import styled, { createGlobalStyle } from 'styled-components'

// STYLES
// Rows and columns
// Column width calculator
function calculateWidth(span) {
  if (!span) return

  let width = span / 12 * 100
  return `width: ${width}%`
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #EFF4FF
  }`

const Wrapper = styled.div`
  background-color: ${props => props.primary
    ? '#2b5797'
    : 'transparent'}
  possition: absolute;
  top: ${props => props.primary
    ? '10%'
    : '90%'}
  left: 1em;
  width: 100%;
`

const Row = styled.div`
  padding: ${props => props.primary
    ? '1em'
    : '2em'}
  font-size: ${props => props.primary
    ? '1.5em'
    : '1em'}
  font-family: Arial, Helvetica, sans-serif;
  color: ${props => props.primary
    ? '#FFFFFF'
    : '#2B5797'}
  &::after {
    content: ""
    clear: both
    display: table
  }`

const Column = styled.div`
  float: left
  ${({ xs }) => xs
    ? calculateWidth(xs)
    : 'width: 100%'}
  
  @media only screen and (min-width: 768px) {
    ${({ sm }) => sm && calculateWidth(sm)}
  }
  
  @media only screen and (min-width: 992px) {
    ${({ md }) => md && calculateWidth(md)}
  }

  @media only screen and (min-width: 1200px) {
    ${({ lg }) => lg && calculateWidth(lg)}
  }
  `

// Table style
const Table = styled.table`
  width: 40%
  th, td {
    text-align: left
  }
  th, td {
    border-bottom: 1px solid #2B5797
    height: 20px
  }
  border-collapse: collapse`

// Button style
const ButtonStyle = styled.button`
  background: ${props => props.primary
    ? '#2B5797'
    : '#EFF4FF'}
  color: ${props => props.primary
    ? '#EFF4FF'
    : '#2B5797'}
  :hover {
    color: ${props => props.primary
    ? '#FFFFFF'
    : '#000000'}
  }
  font-size: 1em
  margin: 1em
  border: 2px solid #2B5797
  border-radius: 3px`

// Modal wrapper
const ModalWrapper = styled.div`
  position: absolute;
  top: 14em;
  left: 1em;
  height: 60%
  width: 100%;
  padding: 1em;
  background-color: #EFF4FF
`

export { Row, Column, Table, ButtonStyle, ModalWrapper, Wrapper, GlobalStyle }