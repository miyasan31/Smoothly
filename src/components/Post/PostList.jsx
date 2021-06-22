import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

import { MuiCard } from "src/components/M-ui";
import { db } from "src/firebase/firebase";
/* ===================================================================== */

export const PostList = (props) => {
  const [userName, setUserName] = useState("");
  const [className, setClassName] = useState("");
  const [userIcon, setUserIcon] = useState("");

  // 時間を正規表現
  const updateTime = props.updateTime.toDate();
  const updateDateTime = format(updateTime, "yyyy年M月dd日 H:mm", {
    locale: ja,
  });

  // 投稿者の情報を取得
  useEffect(() => {
    if (props.createrUid) {
      db.collection("users")
        .doc(props.createrUid)
        .get()
        .then((snapshots) => {
          const userData = snapshots.data();
          if (userData) {
            setUserName(userData.user_name);
            setClassName(userData.class_name);
            setUserIcon(userData.icon.path);
          } else {
            setUserName("退会済みのユーザー");
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mg_btm_20px">
      <MuiCard
        {...props}
        userName={userName}
        userIcon={userIcon}
        className={className}
        editPath={"/post/edit/" + props.pid}
        updateDateTime={updateDateTime}
      />
    </div>
  );
};
