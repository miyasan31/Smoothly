import React from 'react'
import { push } from 'connected-react-router'
import { useDispatch } from 'react-redux'

import { ChatRoomList } from '../components/Chat'
import { AppBarSubHeader, MuiTooltip } from '../components/M-ui'

import GroupSharpIcon from '@material-ui/icons/GroupSharp'
/* ===================================================================== */

export const Chat = () => {
  const dispatch = useDispatch()

  // ルーム作成ボタンクリック
  const pushHandleClick = () => {
    dispatch(push('/chat/edit'))
  }

  return (
    <section className="main">
      <AppBarSubHeader subtitle={'ルーム一覧'} />

      <MuiTooltip
        title="ルーム作成"
        icon={<GroupSharpIcon />}
        onClick={pushHandleClick}
      />

      <ChatRoomList />
    </section>
  )
}
