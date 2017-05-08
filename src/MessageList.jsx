import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    return (
      <main className="messages">
   {this.props.children}

      </main>
    );
  }
}

export default MessageList;
