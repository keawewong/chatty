import React, { PropTypes, Component } from 'react'
import '../styles/home.scss'
import MessageList from './MessageList.jsx'
import Message from './Message.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor(props, socket, send) {
    super(props)
    this.state = {
      users: { type: 'userCount', count: 1 },
      currentUser: { name: "user" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [{
        type: 'incomingMessage',
        id: 123,
        username: "Bob",
        content: "Has anyone seen my marbles?"
      }, {
        type: 'incomingMessage',
        id: 431,
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
      }]
    }
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.socket = socket
    this.send = send
  }

  componentDidMount() {

    function getHostName() {
      const parser = document.createElement('a')
      parser.href = document.location;
      return parser.hostname;
    }

    const hostname = getHostName();
    const port = 3001;
    this.socket = new WebSocket(`ws://${hostname}:${port}`)
    this.socket.onopen = () => {
      this.send = (newMessage) => {
        this.socket.send(JSON.stringify(newMessage));
      }
    }
    this.socket.onmessage = (e) => {
      let newMessage = JSON.parse(e.data)
      console.log(newMessage)
      if (newMessage.type == 'userCount') {
        this.setState({ users: newMessage })
        return
      }
      let messages = this.state.messages.concat(newMessage)
      this.setState({ messages: messages })
    }

  }


  // change user name
  handleOnBlur(e) {
    if (this.state.currentUser.name != e.target.value) {
      let currentUser = this.state.currentUser
      let message = `${currentUser.name} has changed their name to ${e.target.value}.`
      currentUser.name = e.target.value
        // update username
      this.setState({ currentUser: currentUser })
        // send notification to server
      let newMessage = { type: 'postNotification', content: message }
      this.send(newMessage)
    }
  }

  //new message
  handleKeyPress(e) {

    if (e.key == 'Enter') {
      let newMessage = { type: 'incomingMessage', username: this.state.currentUser.name, content: e.target.value }
      e.target.value = ''
      this.send(newMessage)
    }
  }


  render() {
    let alignRight = { float: 'right' }
    let messages = this.state.messages.map((message, i) =>
      < Message key = { i }
      type = { message.type }
      id = { message.id }
      username = { message.username }
      content = { message.content }
      />
    )

    return (

      < div >
          < nav className = "navbar" >
          < a href = "/"  className = "navbar-brand" > Chatty < /a>
          < h4 style = { alignRight } > { this.state.users.count } users online < /h4> < /nav >
          < MessageList > { messages } < / MessageList>
          < ChatBar username = { this.state.currentUser.name }
          handleOnBlur = { this.handleOnBlur }
          handleKeyPress = { this.handleKeyPress }
          / >
      < /div >

    )

  }
}


export default App;
