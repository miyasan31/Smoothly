import React from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'

import { ChatRoomList } from '../render'
import { AppBarSubHeader, ToolTip } from '../../MaterialUi/materialui'

import GroupSharpIcon from '@material-ui/icons/GroupSharp'
import Fab from '@material-ui/core/Fab'
/* ===================================================================== */

const Chat = () => {
  const dispatch = useDispatch()

  // ルーム作成ボタンクリック
  const pushHandleClick = () => {
    dispatch(push('/chat/edit'))
  }

  return (
    <section className="main">
      <AppBarSubHeader subtitle={'ルーム一覧'} />

      <div className="edit_addbtn">
        <ToolTip title="ルーム作成">
          <Fab color="secondary" onClick={pushHandleClick}>
            <GroupSharpIcon />
          </Fab>
        </ToolTip>
      </div>

      <ChatRoomList />
    </section>
  )
}
export default Chat
