# 모던 컴포넌트 라이브러리로 인터페이스 업데이트하기

앞선 수업에서 디자인 도구로 인터페이스를 그리는 방법, AI IDE로 디자인 초안을 코드로 변환하는 방법, 그리고 완전한 프론트엔드 프로젝트를 완성하는 방법을 배웠습니다. 하지만 한 가지 문제를 발견하셨을 것입니다: 직접 작성한 버튼, 양식, 팝업창은 작동은 하지만 "전문적인 제품"과는 약간 차이가 있습니다. 스타일 통일성이 부족하고, 상호작용 세부 사항이 매끄럽지 않으며, 다양한 화면 크기에 맞추는 것도 번거롭습니다.

이것이 바로 **컴포넌트 라이브러리**가 해결하려는 문제입니다.

컴포넌트 라이브러리는 미리 디자인되고 개발된 UI 부품 집합입니다. 버튼, 입력 상자, 드롭다운 메뉴, 대화상자, 표... 제품에서 반복적으로 사용하게 되는 이러한 인터페이스 요소들을 컴포넌트 라이브러리가 이미 만들어 두었으며, 수많은 사용자의 검증과 다듬기를 거쳤습니다. 블록을 조립하듯 조합하기만 하면 전문가 수준의 인터페이스를 빠르게 구축할 수 있습니다.

## 배울 내용

1. 프론트엔드 컴포넌트 라이브러리가 무엇인지, 왜 현대 개발에서 거의 필수적으로 사용되는지 이해하기
2. 가장 대표적인 네 가지 컴포넌트 라이브러리를 알아보고 각각에 적합한 시나리오 파악하기
3. 세 가지 실전 시나리오(랜딩 페이지, 제품 페이지, 관리 대시보드)를 통해 AI IDE + 컴포넌트 라이브러리로 Vibe Coding하는 방법 배우기
4. 컴포넌트 라이브러리 문서를 읽고, 요구사항에 맞는 컴포넌트를 찾아 올바르게 사용하는 방법 배우기

## 1. 왜 컴포넌트 라이브러리가 필요한가?

집을 인테리어한다고 상상해 보세요. 나무부터 시작해 의자를 직접 만들 수도 있지만, 더 일반적인 방법은 IKEA에서 의자를 사는 것입니다. 디자인이 예쁘고, 품질이 안정적이며, 설명서가 명확하고, 가져가서 조립만 하면 됩니다.

컴포넌트 라이브러리는 프론트엔드 개발의 "IKEA"입니다. 가구가 아닌 인터페이스 부품을 제공합니다:

| 직접 작성 | 컴포넌트 라이브러리 사용 |
| :--- | :--- |
| 스타일, 상호작용, 애니메이션을 직접 처리해야 함 | 바로 사용 가능, 스타일과 상호작용이 이미 다듬어져 있음 |
| 다른 페이지의 버튼이 다르게 보일 수 있음 | 전역 스타일이 통일되어 자동으로 일관성 유지 |
| 모바일, 태블릿 적응에 추가 작업 필요 | 대부분의 컴포넌트 라이브러리에 반응형 지원 내장 |
| 접근성(Accessibility)을 놓치기 쉬움 | 전문 컴포넌트 라이브러리가 키보드 탐색, 스크린 리더 등을 처리함 |
| 개발 속도가 느림 | 개발 속도가 빠르고, 비즈니스 로직에 집중 가능 |

간단히 말해: **컴포넌트 라이브러리는 "어떻게 그릴 것인가"가 아닌 "무엇을 만들 것인가"에 시간을 쓰게 해줍니다.**

### 눈으로 확인: 같은 요구사항, 컴포넌트 라이브러리 사용 여부의 차이

말만으로는 설득력이 부족합니다. Trae에서 거의 동일한 요구사항으로, 컴포넌트 라이브러리를 지정하지 않은 경우와 지정한 경우의 생성 결과 차이를 살펴보겠습니다.

**프롬프트 1: 컴포넌트 라이브러리 사용하지 않음**

```text
AI 작문 도우미의 데이터 대시보드 페이지를 만들어 주세요. 포함 항목:
- 상단 제목 표시줄과 내보내기 버튼
- 사용자 수, 활성 사용자, 문서 수, 수입을 보여주는 네 장의 통계 카드, 등락 추이도 표시
- 꺾은선 그래프 하나와 원형 차트 하나
- 사용자 목록 테이블, 페이지네이션 기능 포함
- 왼쪽 내비게이션 사이드바
```

Trae에서 직접 실행한 결과:

<!-- TODO: Trae에서 컴포넌트 라이브러리 없이 생성한 대시보드 스크린샷으로 교체 -->
<!-- ![Trae에서 생성한 대시보드 (컴포넌트 라이브러리 사용 안 함)](/zh-cn/stage-2/frontend/modern-component-library/images/compare-without-lib.png) -->

**프롬프트 2: shadcn/ui 컴포넌트 라이브러리 사용**

```text
AI 작문 도우미의 데이터 대시보드 페이지를 shadcn/ui 컴포넌트 라이브러리로 만들어 주세요. 포함 항목:
- 상단 제목 표시줄과 내보내기 버튼
- 사용자 수, 활성 사용자, 문서 수, 수입을 보여주는 네 장의 통계 카드, 등락 추이도 표시
- 꺾은선 그래프 하나와 원형 차트 하나
- 사용자 목록 테이블, 페이지네이션 기능 포함
- 왼쪽 내비게이션 사이드바
```

마찬가지로 Trae에서 직접 실행한 결과:

<!-- TODO: Trae에서 shadcn/ui로 생성한 대시보드 스크린샷으로 교체 -->
<!-- ![Trae에서 생성한 대시보드 (shadcn/ui 사용)](/zh-cn/stage-2/frontend/modern-component-library/images/compare-with-lib.png) -->

동일한 요구사항에서, 유일한 차이는 프롬프트 앞부분에 `shadcn/ui + Tailwind CSS`를 추가한 것뿐인데, Trae가 생성한 결과물의 시각적 일관성, 상호작용 세부 사항, 전체적인 완성도가 완전히 다른 수준이 되었습니다. 이것이 컴포넌트 라이브러리가 가져다주는 "무료 업그레이드"입니다. 프롬프트에 컴포넌트 라이브러리 이름만 하나 더 적으면 됩니다.

## 2. 네 가지 핵심 컴포넌트 라이브러리 알아보기

컴포넌트 라이브러리는 매우 다양하지만([부록](#부록-더-많은-컴포넌트-라이브러리-한눈에-보기)에서 전체 목록 참고), 먼저 가장 대표적인 네 가지만 알면 됩니다:

| 컴포넌트 라이브러리 | 프레임워크 | 한 줄 설명 | 공식 웹사이트 |
| :--- | :--- | :--- | :--- |
| [Ant Design](https://ant.design) | React | Ant Group 제작, 기업급 중백엔드의 사실상 표준, 컴포넌트 커버리지가 매우 넓음 | ant.design |
| [shadcn/ui](https://ui.shadcn.com) | React | npm 패키지로 설치하지 않고, 코드를 프로젝트에 직접 복사, Tailwind CSS 기반, 커스터마이징 자유도 최고 | ui.shadcn.com |
| [HeroUI](https://heroui.com) (구 NextUI) | React | 기본 스타일이 세련되고 애니메이션이 부드러움, 시각적 품질이 중요한 랜딩 페이지와 제품 전시에 적합 | heroui.com |
| [Material UI](https://mui.com) | React | 가장 오래된 React 컴포넌트 라이브러리, Google Material Design 규격 구현, 생태계가 가장 성숙함 | mui.com |

> Vue 사용자에게도 풍부한 선택지가 있습니다: [Element Plus](https://element-plus.org)(국내에서 가장 인기), [Ant Design Vue](https://antdv.com), [Naive UI](https://www.naiveui.com) 등, 자세한 내용은 [부록](#부록-더-많은-컴포넌트-라이브러리-한눈에-보기)을 참고하세요.

컴포넌트 라이브러리마다 잘하는 분야가 다릅니다. 다음으로 세 가지 실제 개발 시나리오를 통해 AI IDE + 컴포넌트 라이브러리로 Vibe Coding하는 방법을 체험해 보겠습니다.

다양한 컴포넌트 라이브러리의 스타일과 특징을 보여주기 위해, 각 시나리오에서 의도적으로 다른 라이브러리를 사용했습니다. 하지만 주의하세요: **이것은 여러 가지 방안을 경험해 보기 위한 것일 뿐입니다**. 실제 개발에서는 가장 익숙한 하나만 사용해도 전혀 문제가 없습니다. 예를 들어 shadcn/ui 스타일이 마음에 든다면, 랜딩 페이지, 제품 페이지, 관리 대시보드 모두 shadcn/ui로 만들어도 됩니다. 예쁘고 사용하기 편한 것을 하나 선택하는 것이 무엇보다 중요합니다.

## 3. 실전 1: HeroUI로 제품 랜딩 페이지 구축

**시나리오**: AI 작문 도우미 제품을 만들었고, 제품 특성을 보여주고 사용자 가입을 유도하는 아름다운 랜딩 페이지가 필요합니다. 랜딩 페이지는 시각적 임팩트가 강하고, 애니메이션이 부드러우며, 모바일에서도 보기 좋아야 합니다.

**HeroUI를 선택한 이유**: HeroUI의 기본 스타일이 매우 세련되어 있고, 부드러운 전환 애니메이션이 내장되어 있어 사용자 대상 전시형 페이지에 매우 적합합니다.

### 3.1 프로젝트 생성

```bash
# HeroUI 공식 CLI로 프로젝트 생성
npx create-heroui-app@latest ai-writer-landing
cd ai-writer-landing
npm install
```

<!-- TODO: HeroUI 공식 웹사이트 홈페이지 또는 컴포넌트 전시 스크린샷으로 교체 -->
<!-- ![HeroUI 컴포넌트 라이브러리 공식 웹사이트](/zh-cn/stage-2/frontend/modern-component-library/images/heroui-homepage.png) -->

### 3.2 AI IDE로 랜딩 페이지 생성

AI IDE(Cursor, Trae 등)를 열고, 대화 상자에 입력합니다:

```text
AI 작문 도우미의 랜딩 페이지를 HeroUI 컴포넌트 라이브러리로 만들어 주세요:

**페이지 구조:**
1. 상단 내비게이션 바: 왼쪽에 로고와 제품명, 오른쪽에 "기능", "가격", "소개" 세 개의 링크, 그리고 "시작하기" 버튼 하나
2. 첫 화면 영역: 큰 제목에 "AI를 당신의 작문 파트너로", 부제목으로 제품 가치 소개, "무료 체험"과 "데모 보기" 두 개의 버튼, 아래에 제품 스크린샷 하나
3. 기능 전시: 3열 카드로 "스마트 자동 완성", "스타일 조정", "다국어 번역" 세 가지 기능 소개, 각 카드에 아이콘, 제목, 설명 포함
4. 가격 영역: 세 개의 가격 카드(무료 버전, 프로 버전, 팀 버전), 프로 버전은 추천으로 강조 표시
5. 하단 행동 유도: 매력적인 카피 한 줄과 가입 버튼
6. 푸터: 저작권 정보와 소셜 미디어 링크

**디자인 요구사항:**
- 모던하고 전문적으로 보이게
- 다크 모드 지원
- 모바일에서도 보기 좋게
```

<!-- TODO: AI IDE가 랜딩 페이지를 생성하는 과정 스크린샷 또는 생성 결과 스크린샷으로 교체 -->
<!-- ![AI가 생성한 HeroUI 랜딩 페이지 효과](/zh-cn/stage-2/frontend/modern-component-library/images/heroui-landing-result.png) -->

### 3.3 AI가 사용하는 핵심 컴포넌트

AI가 생성한 코드에서 다음 HeroUI 컴포넌트를 볼 수 있습니다:

```jsx
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem,
  Button,
  Card, CardHeader, CardBody, CardFooter,
  Divider,
  Link,
  Chip
} from '@heroui/react'
```

각 컴포넌트의 역할:

| 컴포넌트 | 용도 | 랜딩 페이지에서의 위치 |
| :--- | :--- | :--- |
| `Navbar` | 상단 내비게이션 바 | 페이지 최상단, 고정 위치 |
| `Button` | 버튼, 다양한 변형과 색상 지원 | CTA 버튼, 내비게이션 버튼 |
| `Card` | 카드 컨테이너 | 기능 전시, 가격 카드 |
| `Chip` | 작은 태그 | "추천", "가장 인기" 마크 |
| `Divider` | 구분선 | 영역 간의 시각적 분리 |

### 3.4 반복 최적화

초기 버전 코드가 완전히 만족스럽지 않을 수 있습니다. 계속 AI와 대화하며 조정합니다:

```text
랜딩 페이지를 최적화해 주세요:

1. 큰 제목에 그라데이션 색상 추가, 파란색에서 보라색으로 그라데이션
2. 기능 카드에 마우스를 올리면 떠오르는 애니메이션 효과 추가
3. 프로 버전 가격 카드를 강조 표시하고, 테두리와 "가장 인기" 태그 추가
4. 모바일에서 내비게이션을 햄버거 메뉴(三条横线 모양)로 변경
```

<!-- TODO: 반복 최적화 후의 랜딩 페이지 효과 스크린샷으로 교체 -->
<!-- ![반복 최적화 후의 랜딩 페이지](/zh-cn/stage-2/frontend/modern-component-library/images/heroui-landing-iterated.png) -->

> **Vibe Coding의 핵심**: 각 컴포넌트의 API를 외울 필요가 없습니다. 자연어로 원하는 효과를 설명하면, AI가 적절한 컴포넌트와 작성 방법을 찾아줍니다. 불만족스러운 부분이 있으면 계속 대화하며 반복하면 됩니다.

## 4. 실전 2: shadcn/ui로 제품 페이지 구축

**시나리오**: AI 작문 도우미에 사용자 로그인 후의 메인 인터페이스가 필요합니다. 왼쪽에 문서 목록, 오른쪽에 편집기, 상단에 도구 모음이 있습니다. 이것은 기능형 제품 페이지로, 높은 수준의 커스터마이징이 필요한 UI입니다.

**shadcn/ui를 선택한 이유**: shadcn/ui는 컴포넌트 코드를 프로젝트에 직접 넣어주므로, 어떤 세부 사항이든 자유롭게 수정할 수 있습니다. 깊은 커스터마이징이 필요한 제품 인터페이스에는 이런 "코드를 소유하는" 방식이 가장 유연합니다.

<!-- TODO: shadcn/ui 공식 웹사이트 또는 컴포넌트 전시 스크린샷으로 교체 -->
<!-- ![shadcn/ui 컴포넌트 라이브러리 공식 웹사이트](/zh-cn/stage-2/frontend/modern-component-library/images/shadcn-homepage.png) -->

### 4.1 프로젝트 생성

```bash
# Next.js 프로젝트 생성
npx create-next-app@latest ai-writer-app --typescript --tailwind --app
cd ai-writer-app

# shadcn/ui 초기화
npx shadcn@latest init

# 필요한 컴포넌트 추가 (모든 컴포넌트를 한 번에 설치하는 것이 아님)
npx shadcn@latest add button card input sidebar sheet dialog
```

shadcn/ui의 독특한 점: 컴포넌트를 `add`할 때마다, 소스 코드를 프로젝트의 `components/ui/` 디렉토리에 복사합니다. 이 파일들을 직접 열어 스타일과 동작을 수정할 수 있습니다.

### 4.2 AI IDE로 제품 인터페이스 생성

```text
AI 작문 도우미의 메인 인터페이스를 shadcn/ui 컴포넌트 라이브러리로 만들어 주세요:

**전체 레이아웃:**
- 왼쪽은 접을 수 있는 사이드바, 너비 약 280px:
  - 상단에 "새 문서" 버튼
  - 아래에 문서 목록, 각 문서에 제목과 마지막 편집 시간 표시
  - 문서를 우클릭하면 이름 변경 또는 삭제 가능
- 오른쪽은 메인 편집 영역, 위아래 두 부분으로 나뉨:
  - 위쪽은 도구 모음: 문서 제목 편집, 글자 수 통계 표시, "AI 자동 완성" 버튼, "내보내기" 드롭다운 메뉴
  - 아래쪽은 편집 영역: 큰 텍스트 입력 상자, 남은 공간을 모두 차지

**상호작용 세부 사항:**
- "AI 자동 완성" 클릭 후, 버튼에 로딩 상태 표시, 편집기 하단에 AI가 생성한 텍스트가 타자기처럼 글자 단위로 표시
- 모바일에서 사이드바가 서랍 형식으로 왼쪽에서 슬라이드하여 나옴
- 현재 선택된 문서가 강조 표시됨
```

<!-- TODO: AI가 생성한 shadcn/ui 제품 인터페이스 스크린샷으로 교체 -->
<!-- ![AI가 생성한 shadcn/ui 제품 페이지 효과](/zh-cn/stage-2/frontend/modern-component-library/images/shadcn-product-result.png) -->

### 4.3 AI가 사용하는 핵심 컴포넌트

```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from '@/components/ui/sheet'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader
} from '@/components/ui/sidebar'
```

| 컴포넌트 | 용도 | 제품 페이지에서의 위치 |
| :--- | :--- | :--- |
| `Sidebar` | 접을 수 있는 사이드바 | 왼쪽 문서 목록 |
| `Sheet` | 모바일 서랍 | 모바일 사이드바 대체 |
| `DropdownMenu` | 드롭다운 메뉴 | "내보내기" 버튼, 우클릭 메뉴 |
| `Dialog` | 대화상자 | 이름 변경, 삭제 확인 |
| `Button` | 버튼, variant 및 loading 지원 | 다양한 작업 버튼 |
| `Input` | 입력 상자 | 문서 제목 편집 |

### 4.4 컴포넌트 스타일 커스터마이징

shadcn/ui의 장점은 컴포넌트 소스 코드를 직접 수정할 수 있다는 것입니다. 예를 들어 버튼의 둥근 모서리를 더 크게 하고 싶다면:

```text
components/ui/button.tsx를 수정해 주세요.
모든 버튼의 기본 둥근 모서리를 rounded-md에서 rounded-xl로 변경하고,
primary 변형에 미묘한 그림자 효과를 추가해 주세요.
```

AI가 프로젝트의 컴포넌트 파일을 직접 수정합니다. npm 패키지의 스타일을 덮어쓰는 것이 아닙니다. 이것이 shadcn/ui의 "코드 소유"의 장점입니다.

<!-- TODO: shadcn/ui 컴포넌트 소스 코드가 프로젝트에 있는 스크린샷으로 교체, 직접 편집 가능함을 보여줌 -->
<!-- ![shadcn/ui 컴포넌트 코드가 프로젝트에서 직접 편집 가능](/zh-cn/stage-2/frontend/modern-component-library/images/shadcn-code-ownership.png) -->

## 5. 실전 3: Ant Design으로 관리 대시보드 인터페이스 구축

**시나리오**: AI 작문 도우미가 출시된 후, 사용자 데이터 확인, 문서 콘텐츠 관리, 유료 주문 처리를 위한 관리 대시보드가 필요합니다. 관리 대시보드 시스템의 핵심은 데이터 전시와 조작 효율성입니다.

**Ant Design을 선택한 이유**: Ant Design은 중백엔드 분야에서 가장 깊은 축적을 가지고 있습니다. 표, 양식, 차트 등의 비즈니스 컴포넌트를 바로 사용할 수 있으며, 대량의 기업급 상호작용 패턴(일괄 작업, 고급 필터링, 데이터 내보내기 등)이 내장되어 있습니다.

<!-- TODO: Ant Design 공식 웹사이트 또는 Pro Components 전시 스크린샷으로 교체 -->
<!-- ![Ant Design 컴포넌트 라이브러리 공식 웹사이트](/zh-cn/stage-2/frontend/modern-component-library/images/antd-homepage.png) -->

### 5.1 프로젝트 생성

```bash
# Ant Design Pro 스캐폴딩 사용 (레이아웃, 라우팅, 권한 내장)
npx create-umi@latest ai-writer-admin
# Ant Design Pro 템플릿 선택
cd ai-writer-admin
npm install
```

또는 처음부터 시작:

```bash
npx create-react-app ai-writer-admin --template typescript
cd ai-writer-admin
npm install antd @ant-design/icons @ant-design/pro-components
```

### 5.2 AI IDE로 관리 대시보드 생성

```text
AI 작문 도우미의 관리 대시보드를 Ant Design 컴포넌트 라이브러리로 만들어 주세요:

**전체 레이아웃:**
- 왼쪽에 메뉴 바: 대시보드, 사용자 관리, 문서 관리, 주문 관리, 시스템 설정
- 상단에 브레드크럼 내비게이션 표시

**사용자 관리 페이지:**
- 상단에 네 개의 통계 카드: 총 사용자 수, 오늘 신규, 활성 사용자 수, 유료 사용자 수
- 검색 필터 영역: 사용자 이름으로 검색, 가입 시간 범위 선택, 사용자 상태 필터링, 그리고 "검색"과 "초기화" 버튼
- 사용자 테이블:
  - 아바타, 사용자 이름, 이메일, 가입 시간, 구독 플랜(다른 색상 태그로 구분), 상태, 작업 표시
  - 페이지당 20개 표시, 페이지네이션 지원
  - 사용자 일괄 선택, 일괄 비활성화 또는 내보내기 가능
  - 작업 열: 상세 보기, 편집, 비활성화(비활성화 전 2차 확인 필요)
- "상세 보기" 클릭 시 오른쪽에서 서랍이 슬라이드하여 사용자 상세 정보와 최근 문서 목록 표시
```

<!-- TODO: AI가 생성한 Ant Design 관리 대시보드 인터페이스 스크린샷으로 교체 -->
<!-- ![AI가 생성한 Ant Design 관리 대시보드 인터페이스](/zh-cn/stage-2/frontend/modern-component-library/images/antd-admin-result.png) -->

### 5.3 AI가 사용하는 핵심 컴포넌트

```tsx
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { StatisticCard } from '@ant-design/pro-components'
import {
  Button, Tag, Badge, Space, Drawer,
  Popconfirm, message, Modal
} from 'antd'
import {
  UserOutlined, SearchOutlined, ExportOutlined
} from '@ant-design/icons'
```

| 컴포넌트 | 용도 | 관리 대시보드에서의 위치 |
| :--- | :--- | :--- |
| `ProLayout` | 관리 대시보드 전체 레이아웃 프레임워크 | 페이지 골격(메뉴 + 콘텐츠 영역) |
| `ProTable` | 고급 테이블, 검색, 페이지네이션, 열 설정 내장 | 사용자 목록, 문서 목록, 주문 목록 |
| `StatisticCard` | 데이터 통계 카드 | 대시보드, 페이지 상단 개요 |
| `Tag` / `Badge` | 상태 태그 | 구독 플랜, 사용자 상태 |
| `Drawer` | 사이드 서랍 | 사용자 상세, 편집 양식 |
| `Popconfirm` | 팝업 확인 상자 | 삭제, 비활성화 등 위험 작업 |

### 5.4 계속 반복: 대시보드 추가

```text
대시보드 페이지를 만들어 주세요:

1. 상단에 네 개의 통계 카드: 총 사용자 수, 총 문서 수, 오늘의 API 호출 횟수, 월 수입, 각 카드에 수치와 전월 대비 변화(증가인지 감소인지) 표시
2. 중간에 두 개의 차트:
   - 왼쪽: 최근 7일간의 사용자 증가 꺾은선 그래프
   - 오른쪽: 구독 플랜 분포 원형 차트
3. 하단: 최근 작업 로그 테이블, 시간, 사용자, 작업 유형, 상세 내용 표시

Ant Design 컴포넌트로 레이아웃하고, 차트는 Ant Design Charts 사용 가능
```

<!-- TODO: 대시보드 페이지 효과 스크린샷으로 교체 -->
<!-- ![Ant Design 대시보드 페이지 효과](/zh-cn/stage-2/frontend/modern-component-library/images/antd-dashboard-result.png) -->

> **관리 대시보드의 Vibe Coding 팁**: 관리 대시보드 페이지 구조는 비교적 고정되어 있습니다(테이블 + 검색 + 팝업). AI로 일괄 생성하기에 매우 적합합니다. 먼저 AI에게 "사용자 관리" 페이지를 템플릿으로 생성하라고 한 다음, "사용자 관리 페이지의 구조를 참고하여 문서 관리 페이지를 생성해 줘"라고 하면, AI가 동일한 레이아웃 패턴을 재사용합니다.

## 6. 문서 찾는 법 배우기: 컴포넌트 라이브러리의 "설명서"

Vibe Coding에서 AI가 대부분의 코드를 작성해 주지만, AI의 생성 결과가 올바르지 않거나 특정 컴포넌트의 동작을 미세 조정하고 싶을 때, **문서를 확인하는 것**이 가장 빠른 해결 방법입니다.

Ant Design을 예로 들면, 문서 주소는 다음과 같습니다: `https://ant.design/components/overview-cn`

문서를 확인하는 표준 프로세스:

1. **요구사항 명확화**: 예를 들어 "테이블에서 행 선택을 지원해야 함"
2. **문서에서 검색**: "Table"을 검색하여 테이블 컴포넌트 페이지로 이동
3. **예제 확인**: 문서의 각 컴포넌트에는 여러 온라인 예제가 있으며, "선택 가능" 예제를 찾음
4. **코드 복사**: 예제 코드를 프로젝트에 복사
5. **API 테이블 확인**: 페이지 하단에서 `rowSelection` 속성의 전체 설정 항목을 찾음

> 문서 링크를 AI IDE에 직접 전달할 수도 있습니다: "https://ant.design/components/table-cn의 rowSelection API를 참고하여, 사용자 테이블에 일괄 선택 기능을 추가해 줘". AI에게 문서 링크를 제공하면 생성되는 코드가 더 정확해집니다.

각 컴포넌트 라이브러리의 문서 주소 빠른 참조:

| 컴포넌트 라이브러리 | 문서 주소 |
| :--- | :--- |
| Ant Design | `https://ant.design/components/overview-cn` |
| shadcn/ui | `https://ui.shadcn.com/docs/components` |
| HeroUI | `https://heroui.com/docs/components` |
| Material UI | `https://mui.com/material-ui/all-components/` |
| Element Plus | `https://element-plus.org/zh-CN/component/overview.html` |

## 7. 요약

세 가지 실전 시나리오가 가장 일반적인 프론트엔드 개발 요구를 다루었습니다:

| 시나리오 | 추천 컴포넌트 라이브러리 | 핵심 특징 |
| :--- | :--- | :--- |
| 랜딩 페이지 / 전시 페이지 | HeroUI | 기본 스타일이 세련되고, 애니메이션이 부드러우며, 시각적 임팩트가 강함 |
| 제품 기능 페이지 | shadcn/ui | 코드를 완전히 제어 가능, 깊은 커스터마이징이 유연함 |
| 관리 대시보드 시스템 | Ant Design | 비즈니스 컴포넌트가 풍부하고, 테이블과 양식을 바로 사용 가능 |

Vibe Coding 워크플로우 요약:

1. 시나리오에 맞는 컴포넌트 라이브러리 선택
2. AI IDE로 원하는 페이지 구조와 상호작용 설명
3. AI가 초안 코드를 생성하고, 효과를 미리 보기
4. 자연어로 계속 반복하여 조정
5. 세부 사항에 문제가 있을 때 컴포넌트 라이브러리 문서 확인

### 연습 문제

다음 중 하나의 시나리오를 선택하여, AI IDE + 컴포넌트 라이브러리로 처음부터 완성하세요:

1. HeroUI로 이전에 만든 프로젝트(예: 호그와트 초상화)의 전시 랜딩 페이지 만들기
2. shadcn/ui로 노트 앱의 메인 인터페이스 구축(사이드바 + 편집기)
3. Ant Design으로 간단한 콘텐츠 관리 대시보드 구축(기사 목록 + 새 기사 양식)

---

## 부록: 더 많은 컴포넌트 라이브러리 한눈에 보기

본문에서 소개한 네 가지 핵심 라이브러리 외에도, 프론트엔드 생태계에는 훌륭한 컴포넌트 라이브러리가 많이 있습니다. 아래에 프레임워크별로 분류하여 나열했으니, 프로젝트 요구에 따라 선택하세요.

### Vue 생태계

| 컴포넌트 라이브러리 | Stars | 소개 | 적용 시나리오 |
| :--- | :--- | :--- | :--- |
| [Element Plus](https://element-plus.org) | ~27k | Ele.me 팀이 만든 Vue 3 기업급 컴포넌트 라이브러리, 중국 내 사용률 최고, 중국어 생태계 우수 | 중백엔드 관리 시스템 |
| [Vuetify](https://vuetifyjs.com) | ~41k | 가장 인기 있는 Vue Material Design 컴포넌트 라이브러리, 80+ 컴포넌트, 문서 완비 | Google 디자인 스타일 프로젝트 |
| [Ant Design Vue](https://antdv.com) | ~21k | Ant Design 체계를 기반으로 한 Vue 3 컴포넌트 라이브러리, 디자인 규격 통일 | 기업급 중백엔드 |
| [Naive UI](https://www.naiveui.com) | ~18k | TypeScript로 작성, 테마 커스터마이징이 매우 강력, CSS 전처리기에 의존하지 않음 | 디자인에 독특한 요구가 있는 프로젝트 |
| [Quasar](https://quasar.dev) | ~27k | 하나의 코드로 SPA, SSR, PWA, 모바일 및 데스크톱 애플리케이션 구축 | 크로스 플랫폼 프로젝트 |
| [Vant](https://vant-ui.github.io/vant) | ~24k | Youzan 팀이 개발한 경량 모바일 컴포넌트 라이브러리, 전자상거래 일반 요구 커버 | 모바일 H5 페이지 |
| [PrimeVue](https://primevue.org) | ~14k | 90+ 컴포넌트, 다양한 테마 지원(Material, Bootstrap 등) | 풍부한 컴포넌트와 다중 테마가 필요한 경우 |
| [Arco Design Vue](https://arco.design/vue) | ~3k | ByteDance 제작, 컴포넌트 품질이 높고, 다크 모드 내장 | 중백엔드 제품 |
| [TDesign Vue Next](https://tdesign.tencent.com/vue-next) | ~2k | Tencent 제작, 디자인 언어가 통일되고, 데스크톱 일반 시나리오 커버 | Tencent 생태계 또는 기업급 프로젝트 |

### React 생태계

| 컴포넌트 라이브러리 | Stars | 소개 | 적용 시나리오 |
| :--- | :--- | :--- | :--- |
| [Material UI (MUI)](https://mui.com) | ~95k | Google Material Design 규격의 오래된 구현, 컴포넌트가 가장 포괄적, 생태계가 가장 성숙 | 빠른 기업급 애플리케이션 구축 |
| [Ant Design](https://ant.design) | ~94k | Ant Group 제작, 대량의 고품질 비즈니스 컴포넌트 내장, 중국어 개발자 커뮤니티에서 주도적 위치 | 기업급 중백엔드 |
| [shadcn/ui](https://ui.shadcn.com) | ~83k | npm 설치가 아닌 코드를 프로젝트에 복사, Radix UI + Tailwind CSS 기반, 완전히 제어 가능 | 높은 수준의 커스터마이징이 필요한 프로젝트 |
| [Chakra UI](https://chakra-ui.com) | ~39k | 개발 경험을 핵심으로, API가 간결하고, 접근성 지원 내장 | 빠른 프로토타입 개발 |
| [Mantine](https://mantine.dev) | ~28k | 100+ 컴포넌트와 50+ hooks, 날짜 선택기, 리치 텍스트 편집기 등 고급 컴포넌트 포함 | 바로 사용 가능한 올인원 솔루션이 필요한 경우 |
| [Headless UI](https://headlessui.com) | ~27k | Tailwind Labs 공식 제작의 스타일 없는 컴포넌트 라이브러리, React와 Vue 모두 지원 | Tailwind CSS와 함께 사용 |
| [HeroUI](https://heroui.com) | ~24k | Tailwind CSS + React Aria 기반, 기본 스타일이 세련되고, 애니메이션이 부드러움 | 시각적 품질을 추구하는 프로젝트 |
| [Radix UI](https://www.radix-ui.com) | ~17k | 스타일 없는 기본 컴포넌트 원시 라이브러리, 접근성과 컴포넌트 동작에 집중, shadcn/ui의 기반 | 커스텀 디자인 시스템 구축 |

#### shadcn/ui 확장 생태계

위의 범용 컴포넌트 라이브러리 외에도, shadcn/ui 생태계에는 그 철학을 기반으로 한 확장 라이브러리가 대거 등장하여, 특정 시나리오에 차별화된 선택지를 제공합니다. 이러한 확장 라이브러리 역시 "코드를 프로젝트에 복사"하는 모델을 채택하여, 개발자가 완전한 소스 코드 제어권을 가집니다.

| 컴포넌트 라이브러리 | 소개 | 적용 시나리오 |
| :--- | :--- | :--- |
| [Aceternity UI](https://ui.aceternity.com) | 200+ 프로덕션급 컴포넌트, 빛나는 카드, 텍스트 그라데이션, 3D 지구 등 특색 있는 시각 컴포넌트 | 고품질 랜딩 페이지, SaaS 제품 |
| [Tailark UI](https://tailark.com) | 마케팅 웹사이트 컴포넌트 블록 모음, 제품 전시, 고객 후기, CTA 버튼 등 마케팅 고빈도 모듈 | 마케팅 랜딩 페이지, 제품 공식 웹사이트 |
| [UI Tripled](https://ui.tripled.work) | Framer Motion 기반의 동적 상호작용 컴포넌트, 팝업, 내비게이션, 카드 애니메이션 | 크리에이티브 도구, 개인 포트폴리오 |
| [Neobrutalism UI](https://neobrutalism.dev) | 네오 브루탈리즘 스타일, 굵은 선, 높은 대비, 선명한 색상 | 개성 있는 브랜드 공식 웹사이트, 크리에이티브 프로젝트 |
| [REUI](https://reui.io) | 967+ 실제 비즈니스 시나리오의 컴포넌트 조합 패턴 | 기업급 관리 대시보드, 복잡한 양식 |
| [Cult UI](https://cult-ui.com) | 더 세밀한 상호작용/시각 다듬기, 데이터 테이블, 필터 패널 등 복합 컴포넌트 | 고품질 상업 프로젝트 |
| [Kibo UI](https://kibo-ui.com) | 고급 비즈니스 컴포넌트, 색상 선택기, 리치 텍스트 편집기, 파일 업로드 등 | 관리 대시보드, 도구형 제품 |
| [Kokonut UI](https://kokonutui.com) | 100+ 컴포넌트 + 7+ 완전한 템플릿, 깔끔하고 심플한 스타일 | SaaS 공식 웹사이트, 블로그, 전자상거래 |
| [Commerce UI](https://ui.stackzero.co) | 전자상거래 시나리오 전용, 상품 카드, 장바구니, 결제 양식 | 전자상거래 플랫폼 |
| [shadcnblocks](https://shadcnblocks.com) | 1373개 UI 블록 + 13세트 완전한 템플릿, 가장 포괄적인 리소스 | 모든 시나리오 |
| [Shoogle](https://shoogle.dev) | shadcn/ui 생태계 통합 검색 플랫폼 | 빠른 리소스 검색 |
| [Discover All Shadcn](https://allshadcn.com) | 통합형 리소스 내비게이션 | 빠른 리소스 검색 |

> **shadcn/ui 확장을 선택하는 이유?** 이러한 확장은 shadcn/ui의 "코드 소유권" 철학을 계승하면서, 특정 시나리오에 맞게 깊이 있는 커스터마이징을 제공합니다. Vibe Coding 시대에는 디자인 요구에 맞는 컴포넌트를 빠르게 찾을 수 있게 하여, 주류 UI 라이브러리의 동질화에서 벗어나 더 차별화된 제품을 만들 수 있습니다.
