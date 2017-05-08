import React, { Component } from 'react';

class ChatBar extends Component {


  render() {
    return ( < footer className = "chatbar" >
      < input className = "chatbar-username"
      onBlur = { this.props.handleOnBlur }
      placeholder = { this.props.username }
      />
      < input className = "chatbar-message"
      onKeyPress = { this.props.handleKeyPress }
      placeholder = "Type a message and hit ENTER" />
      < /footer>
    );
  }
}

export default ChatBar;
