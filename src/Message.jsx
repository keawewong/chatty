import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      this.props.type == 'incomeNotification' ?
      < div class = "message system" >
      {this.props.content} < /div> :
      < div className = "message" >
      < span className = "message-id" > { this.props.id } < /span> < span className = "message-username" > { this.props.username } < /span> < span className = "message-content" > { this.props.content } < /span> < /div>

    );
  }
}
export default Message;
