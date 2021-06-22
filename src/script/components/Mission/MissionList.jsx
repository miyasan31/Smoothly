import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

import { MuiCard } from "../M-ui";
import { db } from "../../../firebase/firebase";

/* ===================================================================== */

export const MissionList = (props) => {
  const [userName, setUserName] = useState("");
  const [className, setClassName] = useState("");
  const [userIcon, setUserIcon] = useState("");
  const [submitCheck, setSubmitCheck] = useState(false);

  // 時間を正規表現
  const updateTime = props.updateTime.toDate();
  const updateDateTime = format(updateTime, "yyyy年M月dd日 H:mm", {
    locale: ja,
  });
  const limitTime = props.limitTime.toDate();
  const limitDateTime = format(limitTime, "yyyy年M月dd日 H:mm", { locale: ja });

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
    db.collection("missions")
      .doc(props.mid)
      .collection("submits")
      .doc(props.currentUid)
      .get()
      .then((snapshots) => {
        const userData = snapshots.data();
        if (userData) {
          setSubmitCheck(true);
        }
      });
  }, [props.createrUid, props.currentUid, props.mid]);

  return (
    <div className="mg_btm_20px">
      <MuiCard
        {...props}
        userName={userName}
        userIcon={userIcon}
        className={className}
        editPath={"/mission/edit/" + props.mid}
        updateDateTime={updateDateTime}
        limitDateTime={limitDateTime}
        submitCheck={submitCheck}
      />
    </div>
  );
};
