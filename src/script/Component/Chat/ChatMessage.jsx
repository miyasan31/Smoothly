import React, { useState } from 'react'

import { ChatMessageList } from '../render'
import { AppBarSubHeader } from '../../MaterialUi/materialui'
/* ===================================================================== */

const ChatMessage = () => {
  const [roomName, setRoomName] = useState('')

  return (
    <section className="main">
      <AppBarSubHeader subtitle={roomName} view={true} />

      <ChatMessageList setRoomName={setRoomName} />
    </section>
  )
}
export default ChatMessage
