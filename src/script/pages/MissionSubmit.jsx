import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

import {
  AppBarSubHeader,
  MuiButton,
  FileUpload,
  FileDelete,
} from "../components/M-ui";
import { submitMissions } from "../../reducks/missions/operations";
import { checkExt } from "../../functions/function";
import { db } from "../../firebase/firebase";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
/* ===================================================================== */

export const MissionSubmit = () => {
  const dispatch = useDispatch();
  const [mid, setMid] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    // URLからmidを取得
    const id = window.location.pathname.split("/mission/submit")[1];
    if (id !== "") {
      setMid(id.split("/")[1]);
    }
    // midが存在すれば投稿情報を取得する
    if (mid !== "") {
      db.collection("missions")
        .doc(mid)
        .get()
        .then((snapshot) => {
          const mission = snapshot.data();
          setTitle(mission.title);
          setFileName(mission.file.file_name);
          setPreview(mission.file.path);
        });
    }
  }, [mid]);

  // ファイル選択ボタンクリック
  const inputFile = useCallback(
    (event) => {
      const file = event.target.files;
      setFile(new Blob(file, { type: ".pdf, image/*, .doc/, .xls" }));
      // スラッシュの削除
      const filePath = event.target.value.split(/\\|\\/);
      setFileName(filePath[filePath.length - 1]);
      // プレビュー表示
      const { files } = event.target;
      setPreview(window.URL.createObjectURL(files[0]));
    },
    [setFile]
  );
  // ファイル削除ボタンクリック
  const deleteFile = () => {
    setFile("");
    setFileName("");
    setPreview("");
  };
  // キャンセルボタンクリック
  const backHandleClick = () => {
    dispatch(push("/mission"));
  };
  // 終了ボタンクリック
  const finishHnadleClick = () => {
    dispatch(submitMissions(mid, file, fileName));
  };

  return (
    <section className="main">
      <AppBarSubHeader subtitle={"課題提出"} />
      <div className="contents_style">
        <Paper className="paper">
          <Typography variant="h5">{title}</Typography>
          <div className="space_15px"></div>

          <Typography className="label">添付ファイル</Typography>
          <div className="space_10px"></div>
          {fileName ? (
            <FileDelete onClick={deleteFile} label={"ファイルを削除"} />
          ) : (
            <FileUpload
              file={file}
              setFile={inputFile}
              label={"ファイルを選択"}
            />
          )}

          {fileName && checkExt(fileName) ? (
            <div>
              <div className="pd_20px">{fileName}</div>
              <img src={preview} alt="ファイル" className="full_width" />
            </div>
          ) : (
            <div>
              <div className="pd_20px">{fileName}</div>
            </div>
          )}

          <div className="right mg_top_20px">
            <span>
              <MuiButton
                fullWidth={false}
                variant="text"
                color="blueNomal"
                label="キャンセル"
                onClick={backHandleClick}
              />
              <MuiButton
                fullWidth={false}
                variant="outlined"
                color="blue"
                label="提出"
                onClick={finishHnadleClick}
              />
            </span>
          </div>
        </Paper>
      </div>
    </section>
  );
};
