import React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemPrimaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
/* ===================================================================== */

const RoomCheckedList = (props) => {
  // ユーザー選択イベント
  const handleToggle = (uid, name) => () => {
    const currentIndex = props.checked.indexOf(uid)
    const newChecked = [...props.checked]
    const newName = [...props.userName]
    if (currentIndex === -1) {
      newChecked.push(uid)
      newName.push(name)
    } else {
      newChecked.splice(currentIndex, 1)
      newName.splice(currentIndex, 1)
    }
    props.setChecked(newChecked)
    props.setUserName(newName)
  }

  return (
    <List dense className="fullWidth">
      {props.checked.length !== 0 ? (
        props.checked.map((value, index) => {
          return (
            <ListItem key={value} button>
              <ListItemText primary={props.userName[index]} />
              <ListItemPrimaryAction>
                <Checkbox
                  color="primary"
                  edge="end"
                  onChange={handleToggle(value)}
                  checked={props.checked.indexOf(value) !== -1}
                />
              </ListItemPrimaryAction>
            </ListItem>
          )
        })
      ) : (
        <p style={{ color: '#ef5350' }}>ユーザーを選択してください</p>
      )}
    </List>
  )
}

export default RoomCheckedList
