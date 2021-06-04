import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { db } from '../../../firebase/firebase'
import { getUserId } from '../../../reducks/users/selectors'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemPrimaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'
/* ===================================================================== */

export const RoomUserList = (props) => {
  const selector = useSelector((state) => state)
  const current_uid = getUserId(selector)
  const [userList, setUserList] = useState([])

  // 自分以外のユーザーを取得
  useEffect(() => {
    db.collection('users')
      .where('uid', '!=', current_uid)
      .get()
      .then((snapshots) => {
        const userList = []
        snapshots.forEach((snapshots) => {
          const user = snapshots.data()
          const userData = {
            uid: user.uid,
            user_name: user.user_name,
            class_name: user.class_name,
            icon: user.icon.path,
          }
          userList.push(userData)
        })
        const data = userList.filter((e) => {
          return e.class_name === props.className
        })
        setUserList(data)
      })
  }, [])

  // ユーザー選択イベント
  const handleToggle = (uid, name) => () => {
    const currentIndex = props.checked.indexOf(uid)
    const newChecked = [...props.checked]
    const newName = [...props.userName]
    if (currentIndex === -1) {
      newChecked.push(uid)
      newName.push(`${name}　ー　${props.classValueName}`)
    } else {
      newChecked.splice(currentIndex, 1)
      newName.splice(currentIndex, 1)
    }
    props.setChecked(newChecked)
    props.setUserName(newName)
  }

  return (
    <List className="full_width" dense>
      {userList !== '' &&
        userList.map((data) => {
          const labelId = `checkbox-list-label-${data.uid}`
          return (
            <ListItem
              button
              key={data.uid}
              onClick={handleToggle(data.uid, data.user_name)}
            >
              <ListItemAvatar>
                <Avatar src={data.icon} />
              </ListItemAvatar>

              <ListItemText id={labelId} primary={data.user_name} />

              <ListItemPrimaryAction>
                <Checkbox
                  edge="end"
                  color="primary"
                  id={labelId}
                  onChange={handleToggle(data.uid, data.user_name)}
                  checked={props.checked.indexOf(data.uid) !== -1}
                />
              </ListItemPrimaryAction>
            </ListItem>
          )
        })}
    </List>
  )
}
