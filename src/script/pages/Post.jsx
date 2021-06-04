import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'

import { PostList } from '../components/Post'
import { AppBarSubHeader, MuiTooltip } from '../components/M-ui'
import { readPosts } from '../../reducks/posts/operations'
import { getUserId } from '../../reducks/users/selectors'
import { getPostLists } from '../../reducks/posts/selectors'

import EditIcon from '@material-ui/icons/Edit'
/* ===================================================================== */

export const Post = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const current_uid = getUserId(selector)
  const posts = getPostLists(selector)

  // 連絡作成ボタンクリック
  const pushHandleClick = () => {
    dispatch(push('/post/edit'))
  }
  // 全投稿を取得
  useEffect(() => {
    dispatch(readPosts())
  }, [])

  return (
    <section className="main">
      <AppBarSubHeader subtitle={'連絡一覧'} />

      <MuiTooltip
        title="連絡作成"
        icon={<EditIcon />}
        onClick={pushHandleClick}
      />

      <div className="contents_style">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostList
              currentUid={current_uid}
              key={post.pid}
              pid={post.pid}
              title={post.title}
              item={post.item}
              file={post.file}
              createrUid={post.creater_uid}
              updateTime={post.update_time}
            />
          ))
        ) : posts.length === 0 ? (
          <div>現在連絡は投稿されていません</div>
        ) : null}
      </div>
    </section>
  )
}
