import React, { useState, useEffect } from 'react'

import { CollectList } from '../components/Mission'
import { AppBarSubHeader } from '../components/M-ui'
import { db } from '../../firebase/firebase'
/* ===================================================================== */

export const Collect = () => {
  const [missions, setMissions] = useState('')
  const [submits, setSubmits] = useState('')
  console.log(missions)
  console.log(submits)

  // URLからmidを取得
  let mid = window.location.pathname.split('/mission/collect')[1]
  if (mid !== '') {
    mid = mid.split('/')[1]
  }

  useEffect(() => {
    // qidから投稿情報と回答情報を取得する
    db.collection('missions')
      .doc(mid)
      .get()
      .then((snapshot) => {
        const missions = snapshot.data()
        setMissions(missions)
      })

    db.collection('missions')
      .doc(mid)
      .collection('submits')
      .get()
      .then((snapshots) => {
        const submitLists = []
        snapshots.forEach((snapshots) => {
          const submit = snapshots.data()
          submitLists.push(submit)
        })
        setSubmits(submitLists)
      })
  }, [mid])

  return (
    <section className="main">
      <AppBarSubHeader subtitle={'課題集計'} />
      <div className="contents_style">
        <CollectList
          missions={missions}
          submits={submits}
          file={submits.file}
          createrUid={submits.creater_uid}
          createrName={submits.creater_name}
        />
      </div>
    </section>
  )
}
