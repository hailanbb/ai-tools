# 初中級開発

**初中級開発**ステージへようこそ！ここでは、フルスタック開発を深く掘り下げ、フロントエンドのコンポーネント化、データベース設計、バックエンドAPI開発、そしてデプロイメントまでをマスターします。

## 学べること

### フロントエンド開発

モダンなフロントエンド開発をマスターし、コンポーネントライブラリとデザインツールの使い方を学びます。

<NavGrid>
  <NavCard
    href="/ja-jp/stage-2/frontend/lovart-assets/"
    title="Lovartから始めよう：自分だけの素材生成Agentを構築"
    description="NanobananaとLovartを活用して高品質なデザイン素材を一括生成し、意図理解のできる描画Agentを構築します"
  />
  <NavCard
    href="/ja-jp/stage-2/frontend/figma-mastergo/"
    title="FigmaとMasterGo入門"
    description="プロのUIデザインツールの基本操作をマスターし、デザインからコードへの協業フローを学びます"
  />
  <NavCard
    href="/ja-jp/stage-2/frontend/ui-design/"
    title="初めてのモダンアプリケーション - UIデザイン"
    description="モダンアプリケーションのUIデザイン基礎を学びます"
  />
  <NavCard
    href="/ja-jp/stage-2/frontend/multi-product-ui/"
    title="UIデザインガイドラインを参考にページとボタンを設計"
    description="主要なUIデザインガイドラインを学び、より明確なページ階層とボタン階層を設計します"
  />
  <NavCard
    href="/ja-jp/stage-2/frontend/llm-skills-beautiful/"
    title="LLMとSkillsで美しいインターフェースを実現"
    description="プロンプトとプラグインの実践を通じて、AIが美しくユニークなインターフェースを生成する方法を学びます"
  />
  <NavCard
    href="/ja-jp/stage-2/frontend/hogwarts-portraits/"
    title="ホグワーツ肖像画を作ろう"
    description="実践プロジェクト：AI生成画像を組み合わせて、インタラクティブなホグワーツ肖像画アプリを構築します"
  />
  <NavCard
    href="/ja-jp/stage-2/frontend/design-to-code/"
    title="デザインプロトタイプからプロジェクトコードへ"
    description="デザインツールのプロトタイプをブラウザで動くフロントエンドコードに変換する方法を学びます"
  />
  <NavCard
    href="/ja-jp/stage-2/frontend/modern-component-library/"
    title="モダンコンポーネントライブラリでUIをアップデート"
    description="コンポーネントライブラリを使ってプロフェッショナルなインターフェースを素早く構築する方法を学びます"
  />
</NavGrid>

### バックエンド開発

API設計、データベース管理、アプリケーションのデプロイ戦略を学びます。

<NavGrid>
  <NavCard
    href="/ja-jp/stage-2/backend/git-workflow/"
    title="GitとGitHubを使いこなそう"
    description="Gitバージョン管理システムの核心的な操作と協業フローをマスターします"
  />
  <NavCard
    href="/ja-jp/stage-2/backend/database-supabase/"
    title="データベースからSupabaseへ"
    description="リレーショナルデータベースの基礎をマスターし、モダンなBaaSプラットフォームであるSupabaseの使い方を学びます"
  />
  <NavCard
    href="/ja-jp/stage-2/backend/ai-interface-code/"
    title="バックエンドAPIの設計と開発"
    description="AIを活用してバックエンドAPIコードと標準的なAPIドキュメントを自動生成し、開発効率を向上させます"
  />
  <NavCard
    href="/ja-jp/stage-2/backend/zeabur-deployment/"
    title="プロダクトプロトタイプを公開しよう"
    description="Zeaburを使ってフルスタックアプリをクラウドに素早くデプロイする方法を学びます"
  />
  <NavCard
    href="/ja-jp/stage-2/backend/modern-cli/"
    title="IDEからCLI AIプログラミングツールへ"
    description="モダンなCLIツールを探索し、コマンドライン環境での開発体験を向上させます"
  />
  <NavCard
    href="/ja-jp/stage-2/backend/stripe-payment/"
    title="Stripeなどの決済システムを統合するには"
    description="実践：アプリケーションにStripe決済機能を統合し、ビジネス化・マネタイズを実現します"
  />
</NavGrid>

### 大規模課題

これまでの章では「パーツ」を学んできましたが、大規模課題では「パーツを組み立てて、動く・デモできる・公開できるプロダクトにする方法」を学びます。

**大規模課題 1 → 大規模課題 2** の順序で進めることをお勧めします。

- **大規模課題 1** では、モダンSaaSで最も一般的なメインフローを一通り体験します：ログイン、生成、データベース、決済、管理画面。
- **大規模課題 2** では、より業務システムに近いシナリオに進みます：ロール権限、問題バンク、試験、提出記録、管理コンソール。

```mermaid
flowchart LR
  A["フロントエンドページとコンポーネント"] --> B["データベースとAPI"]
  B --> C["大規模課題 1<br/>コピー生成 SaaS"]
  C --> D["決済 / デプロイ / 管理画面"]
  D --> E["大規模課題 2<br/>オンライン試験システム"]
  E --> F["完全なフルスタックポートフォリオ"]
```

どちらから始めるべきか迷った場合は、以下の比較表を参考にしてください。

| プロジェクト | 重点的に練習できる内容 | 最も適している人 | 最終成果物 |
|------|------|------|------|
| 大規模課題 1：コピー生成サイト | SaaSページ構造、ユーザーログイン、AI生成、Stripe決済、管理画面 | 初めて完全なビジネス向けサイトを作る人 | 登録・生成・決済・管理ができるSaaSのプロトタイプ |
| 大規模課題 2：オンライン試験・管理システム | ロール権限、問題バンクのモデリング、試験フロー、提出記録、採点と統計 | 「業務システム」を本当に完成させたい人 | 学生用と管理用の両方がある試験プラットフォーム |

どちらの課題を選ぶ場合でも、大規模課題では少なくとも以下の3つの成果物を用意することをお勧めします。

- 実行可能なプロジェクトリポジトリ
- アクセス可能なデモリンク
- READMEとデモ動画

<NavGrid>
  <NavCard
    href="/ja-jp/stage-2/assignments/copywriting-platform-supabase/"
    title="大規模課題 1：初めてのSaaSフルスタックアプリ——コピー生成サイト"
    description="ゼロからAIマーケティングコピー生成ワークベンチを構築。ログイン、生成、決済、管理画面を網羅します"
  />
  <NavCard
    href="/ja-jp/stage-2/assignments/exam-management-express/"
    title="大規模課題 2：オンライン試験・管理システム"
    description="オンライン試験システムを構築。自動出題、解答、管理画面をサポートします"
  />
</NavGrid>

上記2つのメインプロジェクトを完了した後、または自分の技術分野に合わせてポートフォリオを作りたい場合は、以下の拡張課題から1つを選んで深く取り組むことができます。

<NavGrid>
  <NavCard
    href="/ja-jp/stage-2/assignments/modern-landing-page/"
    title="拡張課題：モダンWebランディングページエンジニアリング"
    description="価値表現、コンバージョンパス、CTA設計と基本的なトラッキングを実践し、本当にトラフィックを獲得できるページを作ります"
  />
  <NavCard
    href="/ja-jp/stage-2/assignments/custom-dify-agent-platform/"
    title="拡張課題：Dify風AIエージェントオーケストレーションプラットフォーム"
    description="エージェント管理、対話、ログと権限制御を実装し、最小限で使えるAIプラットフォームを作ります"
  />
  <NavCard
    href="/ja-jp/stage-2/assignments/travel-planning-agent-platform/"
    title="拡張課題：スマート旅行計画Agentオーケストレーションプラットフォーム"
    description="構造化入力、Agentオーケストレーション、過去の計画管理を中心に、実行可能なAI旅行計画プロダクトを作ります"
  />
  <NavCard
    href="/ja-jp/stage-2/assignments/movie-recommendation-springboot/"
    title="拡張課題：Spring Boot映画推薦システム"
    description="Spring Boot、レーティング・お気に入り、説明可能な推薦を組み合わせて、完全な推薦システムのプロトタイプを完成させます"
  />
  <NavCard
    href="/ja-jp/stage-2/assignments/simple-grocery-microservices/"
    title="拡張課題：生鮮ECマイクロサービスシステム"
    description="サービス分割、ゲートウェイ転送、在庫と注文の連携を練習し、モノリスからマイクロサービスへのエンジニアリング思考を体験します"
  />
  <NavCard
    href="/ja-jp/stage-2/assignments/traffic-data-visualization-go/"
    title="拡張課題：Go交通データ分析・可視化プラットフォーム"
    description="データ収集、ウィンドウ集計からトレンドダッシュボードとアラートまで、完全なデータプロダクトのプロトタイプを作ります"
  />
</NavGrid>

### AI機能拡張

<NavGrid>
  <NavCard
    href="/ja-jp/stage-2/ai-capabilities/dify-knowledge-base/"
    title="Dify入門とナレッジベース統合"
    description="Difyを使ってAIアプリケーションを構築し、プライベートナレッジベースを統合する方法を学びます"
  />
</NavGrid>

## 対象者

- プログラミングの基礎があり、体系的にフルスタック開発を学びたい開発者
- プロダクトマネージャーからフルスタックエンジニアへ転向したい学習者
- モダンな開発ツールとワークフローをマスターしたい初中級開発者
- 完全なプロダクトを独立して開発したい起業家

## 前提条件

- 「初心者とプロトタイプ」ステージを完了している、または同等の基礎知識を持っていること
- 基本的なHTML/CSS/JavaScriptの概念を理解していること
- AIプログラミングツールについて予備的な知識があること

フルスタック開発に深く掘り下げる準備はできましたか？左のナビゲーションをクリックして学習を始めましょう！
