import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";

import { MissionList } from "src/components/Mission";
import { AppBarSubHeader, MuiTooltip } from "src/components/M-ui";
import { readMissions } from "src/reducks/missions/operations";
import { getUserValue } from "src/reducks/users/selectors";
import { getUserId } from "src/reducks/users/selectors";
import { getMissionLists } from "src/reducks/missions/selectors";

import EditIcon from "@material-ui/icons/Edit";
/* ===================================================================== */

export const Mission = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const current_uid = getUserId(selector);
  const current_value = getUserValue(selector);
  const missions = getMissionLists(selector);

  // 課題作成ボタンクリック
  const pushHandleClick = () => {
    dispatch(push("/mission/edit"));
  };
  // 全投稿を取得
  useEffect(() => {
    dispatch(readMissions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="main">
      <AppBarSubHeader subtitle={"課題一覧"} />

      {current_value === "teacher" && (
        <MuiTooltip
          title="連絡作成"
          icon={<EditIcon />}
          onClick={pushHandleClick}
        />
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
          <div>現在出ている課題はありません</div>
        ) : null}
      </div>
    </section>
  );
};
