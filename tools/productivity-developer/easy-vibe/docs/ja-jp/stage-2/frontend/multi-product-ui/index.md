# UIデザインガイドラインを参考にページとボタンを設計

多くの人が「ページをもっとAppleらしくしたい」「ボタンをもっと高級にしたい」と言いますが、実際に作り始めると、一つの問題で行き詰まることが多いです：

**一体何を参考にすべきなのか？**

スクリーンショットを見て模倣するだけでは、「似ているかどうか」しか学べません。しかし、Apple、Google、Microsoft、Atlassianのデザインガイドラインを開いてみると、彼らが本当にすごいのは視覚スタイルではなく、**デザインの問題を明確に説明していること**だと気づくでしょう：ページで何を先に目立たせるか、ボタンをどうランク付けするか、操作をどう強調するか——これらの判断基準こそが核心です。

> デザインガイドラインを参考にするのは、「誰かに似せる」ためではなく、他人がどう判断しているかを学ぶためです。

:::: info なぜ今でもこれらを学ぶ必要があるのか
デザインルールはすでにモデルに学習され、デザインツールにデフォルトで取り込まれ、数枚のスクリーンショットを貼るだけでAIも学習できます。しかし、これらのルールがどこから来て、なぜこのように定められているのかを知る必要は依然としてあります。
::::

## まず公式原文を読んで、差を感じてみましょう

「デザインガイドラインってスタイルについて語っているだけじゃないの？」と思っているなら、まず公式原文をいくつか見てみましょう。

普段チーム内でよくこんな言い方をしています：

- ドロップダウンを作って
- ここにメニューを置いて
- メニューバーに機能をいくつか追加して
- ここにボタンを2つ、確認とキャンセル

問題なさそうに聞こえますが、大手テック企業のガイドラインでは、これらの言葉は曖昧な概念ではなく、非常に細かく分解されています。

| 普段何気なく言っている言葉 | 公式原文 | 簡単に言うと |
| :--- | :--- | :--- |
| 「メニューを作って」 | Apple: ["A menu reveals its options..."](https://developer.apple.com/design/human-interface-guidelines/menus) | `Menu`は操作に使うもの |
| 「メニューバーに機能を入れて」 | Apple: ["menu bar menus contain all the commands..."](https://developer.apple.com/design/human-interface-guidelines/menus) | これはアプリ顶部のコマンドメニュー |
| 「ドロップダウンを作って」 | Apple: ["A pop-up list lets the user choose one option among several."](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pop-up`はリストから1つ選ぶ |
| 「ドロップダウンも作って」 | Apple: ["A pull-down list is generally used for selecting commands in a specific context."](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pull-down`は開いて現在の操作を行う |
| 「メニューで絞り込みもできるよね」 | Fluent: ["If you need to collect information from people, try a select, dropdown, or combobox instead."](https://fluent2.microsoft.design/components/web/react/core/menu/usage) | `Menu`は値を選ぶためのものではない |
| 「メニューをナビゲーションにも使えるよね」 | Material: ["Menus should not be used as a primary method for navigation within an app."](https://m1.material.io/components/menus.html) | `Menu`はメインナビゲーションではない |
| 「ボタンは適当にOK / Cancelでいいよね」 | Apple: ["Always use 'Cancel' to title a button that cancels the alert's action."](https://developer.apple.com/design/human-interface-guidelines/alerts) | ボタンテキストは適当に書いてはいけない |

> 表の引用はクリックして直接対応する公式ページにジャンプできます。

これが、デザインガイドラインを初めて本格的に読んだ時に最も衝撃を受けるポイントです：

> 私たちは普段UIについて議論しているつもりでも、実際には多くの場合、曖昧な言葉の羅列でコミュニケーションしているに過ぎません。

Appleは単に「メニューを作って」とは言いません。さらに細分化します：

- `menu`
- `menu bar menu`
- `pop-up button`
- `pull-down button`
- `context menu`

Fluentは単に「ドロップダウン」とは言いません。さらに細分化します：

- `menu`
- `dropdown`
- `select`
- `combobox`

これこそがデザインガイドラインの必要性です。

それはページをプロフェッショナルに見せるためではなく、チームがUIについて議論する際、全員が脳内に異なるものを思い浮かべている状態を避けるためです。

## 学べること

1. なぜページとボタンを設計する際にデザインガイドラインを先に見るべきなのか
2. Apple、Material、Fluent、Atlassianのガイドラインの中で、どの内容が最も参考になるか
3. 「ページ階層」と「ボタン階層」をどう明確に設計するか
4. AIに他人のガイドラインを参考にしてページやボタンを生成させる方法

## 1. デザインガイドラインがなぜページを明確にするのに役立つのか

上記の公式原文を読んでみて、一つの重要なポイントに気づくでしょう：

**デザインガイドラインは锦上添花ではなく、まず言葉を正確にすることです。**

多くのページが美しくないのは、カラーリングが高度でないからではなく、情報階層が混乱しているからです。

多くのボタンが使いにくいのも、角丸が間違っているからではなく：

- メインボタンが多すぎて、ユーザーがどれをクリックすべきかわからない
- 危険なボタンと普通のボタンが同じように見える
- ページ内のすべてのボタンが注目を争っている
- 異なるページ間でボタンのスタイルとセマンティクスが一貫していない

成熟したデザインガイドラインは、まさにこれらの問題を解決しています。通常、以下のことを定義します：

| ガイドラインの内容 | 何を解決するか |
| :--- | :--- |
| **ページ階層** | どこを先に見るか、どこを後で見るか、情報をどう整理するか |
| **視覚的基礎** | 色、間隔、フォント、角丸、シャドウをどう統一するか |
| **ボタン階層** | メインボタン、セカンダリボタン、テキストボタン、危険ボタンをどう区別するか |
| **状態ルール** | hover、focus、disabled、loadingをどう表現するか |
| **インタラクションセマンティクス** | どのボタンが「確認」で、どれが「キャンセル」で、どれが「その他の操作」か |

つまり、デザインガイドラインが真に提供するのは「スキン」ではなく、**判断基準**です。

## 2. 大手テック企業のガイドラインを参考にする際、何に注目すべきか

### 2.1 Appleを参考に：「十分に細かく定義する」ということを学ぶ

Appleで最も学ぶべきことは、視覚的な抑制感だけでなく、概念を非常に細かく定義する点です。

多くのチームが口にする「メニュー」や「ドロップダウン」について、Appleはさらに細分化します：

- `menu`：一連のコマンド、オプション、または状態
- `menu bar menu`：アプリレベルのコマンド集合
- `pop-up button`：1つの値を選択
- `pull-down button`：現在のコンテキストでコマンドをトリガー
- `context menu`：現在のオブジェクトやタスクに関連するよく使うアクション

この区分は非常に重要です。なぜなら、以下に直接影響するからです：

- このコンポーネントは値を選ぶためのものか、アクションを実行するためのものか
- ページの一部に属するのか、アプリレベルに属するのか
- 現在選択されている値を常に表示すべきか、コマンドを一時的に展開するだけか

この粒度で考え始めると、設計するページが一気に明確になります。

### 2.2 Appleを参考に：ページ階層と抑制感を学ぶ

Apple Human Interface Guidelinesは特に2つのことを学ぶのに適しています：

- ページで明確な階層をどう構築するか
- コントロールが主張しすぎず明確さを保つにはどうするか

Appleは`Hierarchy`、`Harmony`、`Consistency`を強調しています。これはページ設計時に以下の問いに答えることを意味します：

- 現在のページで最も重要な情報は何か
- ユーザーのメインタスクは何か
- どの操作を最も目立たせるべきで、どの操作を後退させるべきか

Appleを参考にページを設計する場合、以下を重点的に参考にできます：

- ファーストビューの情報は細かすぎないように、コアコンテンツにまず焦点を当てる
- 余白、フォントサイズ、グループ化で秩序を築き、多くのボーダーを重ねて築かない
- ボタンはすべて高強調にせず、重要なアクションだけを最も目立たせる

### 2.3 Materialを参考に：明確なページ構造を学ぶ

Material Designは「ページがどうタスクフローを組織しているか」を学ぶのに非常に適しています。

多くのコンポーネントとレイアウトの仕様は、核心的に以下を明確にするのに役立ちます：

- ページは閲覧型か、タスク実行型か
- 現在のページはユーザーに読ませる、選ばせる、それとも提出させるものか
- 1つのページでどの要素が安定して繰り返されるべきで、どの要素がコンテキストに応じて変化するべきか

Materialを参考にページを設計する場合、以下を重点的に参考にできます：

- ページのブロックが明確で、モジュールの役割が明確
- ナビゲーション、コンテンツエリア、操作エリアの分担が明確
- 異なるボタンスタイルが異なる操作優先度に対応

### 2.4 Fluentを参考に：コンポーネントの境界とボタン階層を学ぶ

Fluent 2はバックエンド、ツール型プロダクト、複雑なフォームシステムに非常に適しています。最も学ぶ価値があるのは、「概念を混用しない」と直接教えてくれる点です。

例えば、「collect information」が必要な場合、`menu`を使い続けるのではなく、`select`、`dropdown`、`combobox`を検討すべきであると明確に書かれています。

この一文は非常に重要です。なぜなら、多くの人が頭の中で「だいたい同じ」だと思っている概念を打ち砕くからです。

Fluent 2は以下も重視しています：

- 操作階層
- コンポーネントのセマンティック境界
- 密集した情報シーンでの明確さ

Fluentを参考にボタンを設計する場合、以下を重点的に参考にできます：

- `Primary button`は現在の最も重要なアクションを受け持つ
- `Secondary button`はサポート的なアクションを受け持つ
- `Subtle`、`Transparent`のような弱い強調のボタンは、メインフローを邪魔すべきでない操作に使用
- ページ内のボタン数が多くなるほど、視覚的優先度をコントロールする必要がある

### 2.5 Atlassianを参考に：体系的にページとボタンを管理する

Atlassian Design Systemは「1つのチームが多くのページを作る」場合に特に適しています。以下を強調しています：

- foundationsは共有の基盤
- tokensは視覚的決定を統一する方法
- componentsは繰り返し再利用されるインタラクション構成要素

Atlassianを参考にページやボタンを作る場合、最も価値があるのは：

- ボタンのサイズ、色、角丸、間隔を統一ルールにする
- ページレイアウトのリズムを固定する
- 異なるページは内容が異なっても、構造言語を一貫させる

## 3. ページを設計する際、ガイドラインのどのポイントを参考にすべきか

デザインシステムを見る際、「このページは美しいかどうか」を先に問うのではなく、まず以下の問いを立てましょう。

### 3.1 ページの第一印象、主従は明確か

1つのページは通常、少なくとも3つの層を持つべきです：

- **メイン情報**：現在のページで最も重要なコンテンツ
- **補助情報**：理解を助ける、または補足するコンテンツ
- **サブ操作**：メインタスクを邪魔すべきでないアクション

3つの層が分かれていないと、ページは「すべてが重要」になり、「何も重要でない」のと同じになります。

### 3.2 ページレイアウトはモジュールを積み上げるのではなく、タスクに奉仕しているか

ガイドラインを参考にする際、特に注目できます：

- タイトルエリアがページの目標を明確にしているか
- メインコンテンツエリアがタスクを中心に組織されているか
- 操作ボタンが関連コンテンツの近くにあるか
- 補助情報が適切に弱められているか

### 3.3 ページ内の操作に優先度はあるか

多くのページを見るとボタンが6個あり、どれもCTAのように見えます。これは典型的な階層のコントロール不足です。

より合理的な方法は：

- 1つのエリアには通常1つのメインアクションのみ
- セカンダリアクションはアウトライン、テキストボタン、またはより弱いスタイルを使用
- リスクのあるアクションはメインアクションと同じ見た目にしない

## 4. ボタンを設計する際、ガイドラインのどのポイントを参考にすべきか

ボタンは「適当に設計」されがちな部分ですが、システムの成熟度を最もよく表す部分でもあります。

### 4.1 ボタンはまず「セマンティクス」で分け、次に「スタイル」で分ける

「青いボタンか黒いボタンか」を先に考えるのではなく、このボタンがどのような役割かを先に考えましょう。

よくあるボタンの役割は次のように分けられます：

| ボタンタイプ | 役割 | よくあるスタイル戦略 |
| :--- | :--- | :--- |
| **Primary** | 現在のエリアで最も重要なアクション | 塗りつぶし、高コントラスト、最も目立つ |
| **Secondary** | サポート的なアクション | アウトラインまたは一段低い強調 |
| **Tertiary / Text** | 弱い操作 | テキストまたは低い視覚的比率 |
| **Destructive** | 削除、無効化、クリアなどのリスク操作 | 警告色または明確なリスクスタイル |
| **Icon button** | 局所的なツール操作 | シンプル、コンテキストに近い |

### 4.2 1つのページにPrimary Buttonを多く置かない

これは多くの初心者が最も陥りやすい落とし穴です。

ページに4つのメインボタンがある場合、それはメインボタンがないのと同じです。メインボタンの意義は本来「ユーザーに今何をすべきかを伝える」ことです。

多くのデザインシステムの共通するアプローチを参考にできます：

- 1つの主要エリアには通常1つのメインボタンのみ残す
- キャンセル、戻る、閉じるは通常、確認ボタンと同じレベルを争わない
- その他の操作はセカンダリボタンやメニューに配置する

### 4.3 ボタンは状態変化を表現できなければならない

デザインガイドラインは通常、ボタンの状態について詳細に記述しています：

- デフォルト状態
- ホバー状態
- フォーカス状態
- 無効状態
- ローディング状態
- 危険状態

これは重要です。なぜならボタンは静的な画像ではなく、ユーザーの操作過程で最も頻繁にトリガーされるコントロールの一つだからです。

### 4.4 ボタンテキストもデザインの一部

ボタンテキストは単なる「テキストの問題」ではなく、ユーザーの理解に直接影響します。

例えば：

- `保存`
- `変更を保存`
- `今すぐ公開`
- `プロジェクトを削除`
- `ゴミ箱に移動`

これらのテキストが伝える心理的期待は全く異なります。成熟したガイドラインは通常、ボタンラベルが明確にアクションを表現することを求め、曖昧な言葉の使用を避けます。

## 5. 非常に実用的なページとボタンの設計チェックリスト

自分でページを設計する際、まずこのチェックリストをざっと見てみましょう：

### ページチェックリスト

- ページタイトルが現在のタスクを明確に説明しているか
- ファーストビューの最も重要な情報が一目で見えるか
- ページがタスクフローに沿って組織されており、思いついたものを配置しただけではないか
- 同じエリアにメインアクションが1つだけか
- 補助情報が適切に弱められているか

### ボタンチェックリスト

- このボタンはメインアクションかセカンダリアクションか
- なぜ他のボタンより目立つ価値があるのか
- ページ内にメインボタンが多すぎないか
- 危険な操作が明確にマークされているか
- ボタンテキストは十分に具体的か

## 6. AIに他人のガイドラインを参考にページを設計させる方法

このセクションが最も実用的です。

多くの人がAIにページを設計させる際、こう言うだけです：

```md
設定ページを作って、もう少し高級に、Apple風でお願いします
```

この種のプロンプトは曖昧すぎて、AIは結局「白い背景、角丸、シャドウ」を模倣するしかありません。

初心者にとってより実用的な方法は、自分で長い文章をまとめるのではなく、**ガイドライン原文の重要な一文**を直接AIに貼り付けることです。

これには2つの利点があります：

- 自分で先にデザイン思想を「翻訳」する必要がない
- AIが公式定義に沿ってページやボタンを理解しやすくなる

### 6.1 例1：AIにAppleを参考に設定ページを設計させる

まずAppleの原文を見つけます：

> ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)

AIに次のように直接貼り付けます：

```md
Apple Human Interface Guidelinesのこの一文を参考に：
"Establish a clear visual hierarchy..."

アカウントセキュリティ設定ページを設計してください。
ページ階層を明確にし、重要な情報を前に配置し、グループを整然とさせてください。
```

この書き方のポイントは、自分で説明しすぎず、Appleの原文を直接貼り付けることです。

### 6.2 例2：AIにFluentを参考にバックエンドページのボタンを設計させる

まずFluentの原文を見つけます：

> ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

AIに次のように直接貼り付けます：

```md
Fluent 2のこの一文を参考に：
"Only use one primary button in a layout..."

チーム管理バックエンドのボタンを設計してください。
メンバー追加ボタンを最も目立たせ、エクスポート、フィルター、その他の操作は弱め、削除ボタンは単独で目立たせてください。
```

この一文は初心者に非常に適しています。なぜなら、AIに1つのエリアにメインボタンを多く置かないよう直接伝えるからです。

### 6.3 例3：AIにページガイドラインとボタンガイドラインを同時に参考にさせる

原文を2つ同時に貼り付け、AIにページとボタンの両方を参考にさせることもできます：

> Apple: ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)
>
> Fluent: ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

次のように直接書きます：

```md
以下の2つのデザインガイドライン原文を参考に：
Apple: "Establish a clear visual hierarchy..."
Fluent: "Only use one primary button in a layout..."

プロジェクト詳細ページを設計してください。
ページにはプロジェクト紹介、メンバー、最近のアクティビティ、設定への入り口を含めます。
ページ階層を明確にし、メインボタンは1つだけ残し、他のボタンは弱めてください。
```

この方法は初心者に特に適しています。原文をコピーして、自分の要件を2文追加するだけで十分だからです。

## 7. AIにボタンガイドラインを参考に直接ボタンデザインを生成させる方法

まずボタンだけを作りたい場合は、ボタンガイドラインの原文を直接貼り付けることもできます。

例えば、Atlassianのボタンの定義は非常に短いです：

> ["A button triggers an event or action."](https://atlassian.design/components/button/)

AIに次のように問いかけます：

```md
Atlassianのこの一文を参考に：
"A button triggers an event or action."

バックエンドページのボタンスタイルセットを設計してください。
メインボタン、セカンダリボタン、削除ボタンが必要で、それぞれどこで使うかも教えてください。
```

この種のプロンプトは特に初心者に適しており、基本的に「原文を貼る + 要件を言う」だけです。

## 8. まとめ

UIデザインガイドラインを参考にページやボタンを設計する際、最も重要なのは「誰かに似せる」ことではなく、以下のことを学ぶことです：

1. 階層でページを組織し、コンテンツを積み上げない
2. ボタンのランク付けで操作の優先度を表現し、すべてのボタンを同じように目立たせない
3. デザインガイドラインの定義、境界、判断基準で設計をガイドする
4. AIに他人のガイドラインを参考にさせる際、「原則と構造」を参考にし、スキンだけを参考にしない

このようにガイドラインを使うことで、参考にするのは単なるスタイルではなく、成熟したデザイン思考の方法論になります。

---

## 参考文献

以下のリンクはすべて公式デザインシステムまたは公式ドキュメントからのものです：

- Apple Human Interface Guidelines: [Overview](https://developer.apple.com/design/human-interface-guidelines/)
- Apple Human Interface Guidelines: [Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- Apple Human Interface Guidelines: [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- Apple Human Interface Guidelines: [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- Apple Archive: [How Menus Work](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/HowMenusWork.html)
- Apple Archive: [Managing Pop-Up Buttons and Pull-Down Lists](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html)
- Material Design: [Buttons overview](https://m3.material.io/components/buttons/overview)
- Material Design: [Menus](https://m1.material.io/components/menus.html)
- Microsoft Fluent 2: [Start designing](https://fluent2.microsoft.design/get-started/design)
- Microsoft Fluent 2: [Menu usage](https://fluent2.microsoft.design/components/web/react/core/menu/usage)
- Microsoft Fluent 2: [Button usage](https://fluent2.microsoft.design/components/web/react/core/button/usage)
- Atlassian Design System: [Foundations](https://atlassian.design/foundations/)
- Atlassian Design System: [Button](https://atlassian.design/components/button/)
