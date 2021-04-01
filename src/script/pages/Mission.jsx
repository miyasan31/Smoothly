import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'

import { MissionList } from '../components/Mission'
import { AppBarSubHeader, ToolTip } from '../components/M-ui'
import { readMissions } from '../../reducks/missions/operations'
import { getUserValue } from '../../reducks/users/selectors'
import { getUserId } from '../../reducks/users/selectors'
import { getMissionLists } from '../../reducks/missions/selectors'

import EditIcon from '@material-ui/icons/Edit'
import Fab from '@material-ui/core/Fab'
/* ===================================================================== */

const Mission = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const current_uid = getUserId(selector)
  const current_value = getUserValue(selector)
  const missions = getMissionLists(selector)

  // 課題作成ボタンクリック
  const pushHandleClick = () => {
    dispatch(push('/mission/edit'))
  }
  // 全投稿を取得
  useEffect(() => {
    dispatch(readMissions())
  }, [])

  return (
    <section className="main">
      <AppBarSubHeader subtitle={'課題一覧'} />

      {current_value === 'teacher' && (
        <div className="edit_addbtn">
          <ToolTip title="課題作成">
            <Fab color="secondary" onClick={pushHandleClick}>
              <EditIcon />
            </Fab>
          </ToolTip>
        </div>
      )}

      <div className="contents_style">
        {missions.length > 0 ? (
          missions.map((mission) => (
            <MissionList
              currentUid={current_uid}
              key={mission.mid}
              mid={mission.mid}
              title={mission.title}
              item={mission.item}
              file={mission.file}
              limitTime={mission.limit_time}
              createrUid={mission.creater_uid}
              updateTime={mission.update_time}
            />
          ))
        ) : missions.length === 0 ? (
          <h3>現在出ている課題はありません</h3>
        ) : null}
      </div>
    </section>
  )
}
export default Mission
