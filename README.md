# HALポータルサイト 改善版

## 使用技術
- React(Hooks, Redux)
- Firebase(Firesore, Storage, Authentication, Hosting)
- MaterialUI

## 要件定義

HAL ポータルサイトを SNS 風にした改善版です。  
現状のサイトは多機能ではあるものの、ページや機能が分散してして使いづらく  
周囲の人も積極的に使っているのを見たことがなかったので、UI をモダンな設計して 1 ページで機能が簡潔できるようにしました。

## 工夫した点
- アンケート機能を実装
- チャットのルーム作成機能を実装  
- ユーザー属性に関係する課題やアンケート、個人のタスクが追加された際に自動的にスケジュールに同期されること

## 苦労した点
- 最初 Redux の flux フローの流れを掴むのが難しかった
- Scheduler のドキュメントを翻訳しながら実装したこと

## 今後やりたいこと
- リファクタリングしたらバグを生んでしまったので修正する
- 学習用リポジトリ化しているのでいろんな技術を取り入れていきたい
  - Nextjs
  - TypeScript
  - GraphQL
  - SWR
  - Express
  - TailwindCSS
- Nextjsへ移行してSSG/ISRとかやってみたい
- useRouter, useCallback,useMemoを使う

## 機能
### ログイン
  <img width="1440" alt="スクリーンショット 2021-05-31 11 46 05" src="https://user-images.githubusercontent.com/71614432/120132726-d50dab80-c205-11eb-862b-a8b9c27e32b8.png">
  
### サインイン
  <img width="1440" alt="スクリーンショット 2021-05-31 11 46 13" src="https://user-images.githubusercontent.com/71614432/120132746-d939c900-c205-11eb-813f-8ad2ba5bfd77.png">  
  
### パスワード再発行
  <img width="1440" alt="スクリーンショット 2021-05-31 11 46 55" src="https://user-images.githubusercontent.com/71614432/120132798-eeaef300-c205-11eb-9ef1-366332cf6bb0.png">  
  
### 連絡掲示板
  <img width="1440" alt="スクリーンショット 2021-05-31 11 28 02" src="https://user-images.githubusercontent.com/71614432/120132388-3f721c00-c205-11eb-9ece-eceed832586e.png">  
  
### 課題
  <img width="1440" alt="スクリーンショット 2021-05-31 11 32 39" src="https://user-images.githubusercontent.com/71614432/120132406-4731c080-c205-11eb-9680-03c77fb7cb36.png">  
  
### グループチャット
  <img width="1440" alt="スクリーンショット 2021-05-31 11 33 22" src="https://user-images.githubusercontent.com/71614432/120132421-4bf67480-c205-11eb-9b50-dbc38e2c15f4.png">  
  
### タスク管理
  <img width="1440" alt="スクリーンショット 2021-05-31 11 33 39" src="https://user-images.githubusercontent.com/71614432/120132430-50229200-c205-11eb-8a4a-28f8eef9d6b7.png">  
  
### アンケート
  <img width="1440" alt="スクリーンショット 2021-05-31 11 44 06" src="https://user-images.githubusercontent.com/71614432/120132589-8f50e300-c205-11eb-90ff-57b1e0a604ca.png">  
  
### カレンダー
  <img width="1440" alt="スクリーンショット 2021-05-31 11 43 43" src="https://user-images.githubusercontent.com/71614432/120132600-94159700-c205-11eb-8f17-0ca9e5e3af0e.png">  
  
### 設定
  <img width="1440" alt="スクリーンショット 2021-05-31 11 32 10" src="https://user-images.githubusercontent.com/71614432/120132471-5e70ae00-c205-11eb-8a4c-be3a71cd6521.png">  
  
### レスポンシブ対応
### ダークモード対応

