# UI 디자인 가이드라인을 참고하여 페이지와 버튼 디자인하기

많은 사람이 "페이지를 좀 더 Apple 답게 만들고 싶어요""버튼을 좀 더 고급스럽게 만들고 싶어요"라고 말하지만, 막상 시작하면 하나의 문제에 막히곤 합니다:

**도대체 무엇을 참고해야 할까요?**

스크린샷을 보고 모방하면 배우는 것은 "비슷한가 아닌가"뿐입니다. 하지만 Apple, Google, Microsoft, Atlassian의 디자인 가이드라인을 열어보면, 이들이 정말 대단한 것은 시각적 스타일이 아니라 **디자인 문제를 명확하게 설명하는 것**이라는 걸 알 수 있습니다. 페이지에서 먼저 무엇을 강조할지, 버튼을 어떻게 등급별로 나눌지, 조작을 어떻게 강조할지 — 이런 판단 기준이 바로 핵심입니다.

> 디자인 가이드라인을 참고하는 것은 "누구를 닮게 만들기 위한" 것이 아니라, 다른 사람들이 어떻게 판단하는지 배우기 위한 것입니다.

:::: info 왜 지금도 이것을 배워야 할까요
디자인 규칙은 이미 모델에 학습되었고, 디자인 도구에 기본적으로 흡수되었으며, 심지어 스크린샷 몇 장만 붙여넣어도 AI가 학습할 수 있습니다. 하지만 이 규칙들이 어디서 왔는지, 왜 이렇게 정해졌는지 아는 것은 여전히 필요합니다.
::::

## 먼저 몇 가지 원문을 보고 차이를 느껴보세요

"디자인 가이드라인이 그냥 스타일을 이야기하는 거 아닌가요"라고 생각했다면, 먼저 공식 원문 몇 가지를 보세요.

평소에 팀에서 자주 이렇게 말합니다:

- 드롭다운을 하나 만들어 주세요
- 여기에 메뉴를 하나 넣어 주세요
- 메뉴바에 기능을 몇 개 추가해 주세요
- 여기에 버튼 두 개를 넣어 주세요, 하나는 확인 하나는 취소

문제없이 들리지만, 대형 기업의 가이드라인에서는 이 단어들이 모호한 개념이 아니라 매우 세밀하게 나뉘어 있습니다.

| 평소에 무심코 하는 말 | 공식 원문 | 간단히 말하면 |
| :--- | :--- | :--- |
| "메뉴를 하나 만들어요" | Apple: ["A menu reveals its options..."](https://developer.apple.com/design/human-interface-guidelines/menus) | `Menu`는 조작을 위한 것입니다 |
| "메뉴바에 기능을 넣어요" | Apple: ["menu bar menus contain all the commands..."](https://developer.apple.com/design/human-interface-guidelines/menus) | 이것은 앱 상단의 명령 메뉴입니다 |
| "드롭다운을 하나 만들어요" | Apple: ["A pop-up list lets the user choose one option among several."](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pop-up`은 목록에서 하나를 선택하는 것입니다 |
| "드롭다운도 하나 만들어요" | Apple: ["A pull-down list is generally used for selecting commands in a specific context."](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/MenuList/Articles/ManagingPopUpItems.html) | `pull-down`은 클릭해서 현재 조작을 하는 것입니다 |
| "메뉴로 필터링도 할 수 있죠" | Fluent: ["If you need to collect information from people, try a select, dropdown, or combobox instead."](https://fluent2.microsoft.design/components/web/react/core/menu/usage) | `Menu`는 값을 선택하는 데 사용하는 것이 아닙니다 |
| "메뉴로 네비게이션도 할 수 있죠" | Material: ["Menus should not be used as a primary method for navigation within an app."](https://m1.material.io/components/menus.html) | `Menu`는 주 네비게이션이 아닙니다 |
| "버튼에 그냥 OK / Cancel 쓰면 되죠" | Apple: ["Always use 'Cancel' to title a button that cancels the alert's action."](https://developer.apple.com/design/human-interface-guidelines/alerts) | 버튼 텍스트는 아무렇게나 쓸 수 없습니다 |

> 표의 인용문은 클릭하면 해당 공식 페이지로 바로 이동합니다.

이것이 디자인 가이드라인을 처음 제대로 읽었을 때 가장 충격받는 부분입니다:

> 우리는 평소에 UI를 논의하고 있다고 생각하지만, 실제로는 대부분 애매한 단어들로 소통하고 있을 뿐입니다.

Apple은 단순히 "메뉴를 만들어라"라고 하지 않습니다. 다음과 같이 계속 구분합니다:

- `menu`
- `menu bar menu`
- `pop-up button`
- `pull-down button`
- `context menu`

Fluent도 단순히 "드롭다운"이라고 하지 않습니다. 다음과 같이 계속 구분합니다:

- `menu`
- `dropdown`
- `select`
- `combobox`

이것이 디자인 가이드라인의 필요성입니다.

페이지를 더 전문적으로 보이게 하려는 것이 아니라, 팀이 UI를 논의할 때 각자 머릿속에 다른 것을 그리고 있지 않도록 하기 위한 것입니다.

## 학습 내용

1. 페이지와 버튼을 디자인할 때 왜 먼저 디자인 가이드라인을 봐야 하는지
2. Apple, Material, Fluent, Atlassian 가이드라인에서 어떤 내용을 가장 참고할 가치가 있는지
3. "페이지 계층 구조"와 "버튼 계층 구조"를 명확하게 디자인하는 방법
4. AI가 다른 사람들의 가이드라인을 참고하여 페이지와 버튼을 생성하도록 하는 방법

## 1. 디자인 가이드라인이 페이지를 명확하게 만드는 이유

위의 원문을 읽고 나면 핵심을 하나 발견할 수 있습니다:

**디자인 가이드라인은 보탬이 아니라, 먼저 용어를 정확하게 만드는 것입니다.**

많은 페이지가 보기 좋지 않은 것은 색상이 고급스럽지 않아서가 아니라, 정보 계층이 혼란스럽기 때문입니다.

많은 버튼이 사용하기 어려운 것도 모서리 둥글기가 맞지 않아서가 아니라:

- 주요 버튼이 너무 많아, 사용자가 어느 것을 클릭해야 할지 모릅니다
- 위험 버튼과 일반 버튼이 비슷해 보입니다
- 페이지의 모든 버튼이 주의를 끌려고 합니다
- 다른 페이지의 버튼 스타일과 의미가 일관되지 않습니다

성숙한 디자인 가이드라인은 바로 이런 문제를 해결합니다. 보통 다음을 정의합니다:

| 가이드라인 내용 | 해결하는 문제 |
| :--- | :--- |
| **페이지 계층** | 먼저 어디를 볼지, 다음에 어디를 볼지, 정보를 어떻게 구성할지 |
| **시각적 기초** | 색상, 간격, 글꼴, 모서리 둥글기, 그림자를 어떻게 통일할지 |
| **버튼 계층** | 주요 버튼, 보조 버튼, 텍스트 버튼, 위험 버튼을 어떻게 구분할지 |
| **상태 규칙** | hover, focus, disabled, loading을 어떻게 표현할지 |
| **인터랙션 의미** | 어떤 버튼이 "확인"이고, 어떤 것이 "취소"이며, 어떤 것이 "더 보기"인지 |

따라서 디자인 가이드라인이 실제로 제공하는 것은 하나의 "스킨"이 아니라, 하나의 **판단 기준**입니다.

## 2. 대형 기업 가이드라인을 참고할 때, 무엇에 집중해야 할까요

### 2.1 Apple 참고: "충분히 세밀하게 정의하기" 배우기

Apple에서 가장 배울 점은 시각적 절제감이 아니라, 개념을 매우 세밀하게 정의한다는 것입니다.

많은 팀이 "메뉴"나 "드롭다운"이라고 부르는 것을 Apple은 계속 세분화합니다:

- `menu`: 명령, 옵션 또는 상태의 집합
- `menu bar menu`: 앱 수준의 명령 집합
- `pop-up button`: 하나의 값을 선택
- `pull-down button`: 현재 컨텍스트에서 명령 실행
- `context menu`: 현재 객체나 작업과 관련된 일반적인 동작

이 구분은 매우 중요합니다. 왜냐하면 다음에 직접적인 영향을 미치기 때문입니다:

- 이 컴포넌트가 값을 선택하는 것인지, 동작을 하는 것인지
- 페이지의 일부인지, 앱 수준인지
- 현재 선택된 값을 계속 표시해야 하는지, 명령을 임시로만 펼쳐야 하는지

이런 세밀함으로 생각하기 시작하면, 디자인한 페이지가 한결 명확해집니다.

### 2.2 Apple 참고: 페이지 계층과 절제감 배우기

Apple Human Interface Guidelines은 특히 두 가지를 배우기에 적합합니다:

- 페이지가 명확한 계층을 어떻게 구축하는지
- 컨트롤이 주도권을 빼앗지 않으면서도 명확성을 유지하는 방법

Apple은 `Hierarchy`, `Harmony`, `Consistency`를 강조합니다. 이는 페이지 디자인 시 다음에 답해야 한다는 것을 의미합니다:

- 현재 페이지에서 가장 중요한 정보는 무엇인가
- 사용자의 주요 작업은 무엇인가
- 어떤 조작이 가장 눈에 띄어야 하고, 어떤 조작은 뒤로 물러나야 하는가

Apple을 참고하여 페이지를 디자인한다면, 다음을 중점적으로 참고할 수 있습니다:

- 첫 화면의 정보가 너무 조각나지 않게 하고, 핵심 콘텐츠에 먼저 집중하기
- 테두리를 많이 쌓는 대신 여백, 글꼴 크기, 그룹화로 질서 만들기
- 버튼을 모두 높은 강조로 만들지 말고, 핵심 동작만 가장 눈에 띄게 하기

### 2.3 Material 참고: 명확한 페이지 구조 배우기

Material Design은 "페이지가 작업 흐름을 어떻게 구성하는지"를 배우기에 매우 적합합니다.

많은 컴포넌트와 레이아웃 가이드라인의 핵심은 다음을 명확히 하는 데 있습니다:

- 페이지가 탐색형인지, 작업 실행형인지
- 현재 페이지가 사용자에게 읽기, 선택, 제출 중 어느 것을 하게 하는지
- 한 페이지에서 어떤 요소가 안정적으로 반복되고, 어떤 요소가 컨텍스트에 따라 변하는지

Material을 참고하여 페이지를 디자인한다면, 다음을 중점적으로 참고할 수 있습니다:

- 페이지 섹션이 명확하고, 모듈의 역할이 분명함
- 네비게이션, 콘텐츠 영역, 조작 영역의 분업이 명확함
- 다른 버튼 스타일이 다른 조작 우선순위에 대응됨

### 2.4 Fluent 참고: 컴포넌트 경계와 버튼 계층 배우기

Fluent 2는 백오피스, 도구형 제품, 복잡한 폼 시스템에 매우 적합합니다. 가장 배울 점은 "개념을 혼용하지 마라"라고 직접 알려준다는 것입니다.

예를 들어, "collect information"해야 한다면, `menu`를 계속 사용하지 말고 `select`, `dropdown`, `combobox`를 고려해야 한다고 명시하고 있습니다.

이 말은 매우 중요합니다. 왜냐하면 많은 사람이 머릿속에 "다 비슷한 거잖아"라고 생각하는 것을 부숴주기 때문입니다.

Fluent 2는 다음도 중요하게 생각합니다:

- 조작 계층
- 컴포넌트 의미적 경계
- 밀집 정보 시나리오에서의 명확도

Fluent를 참고하여 버튼을 디자인한다면, 다음을 중점적으로 참고할 수 있습니다:

- `Primary button`은 현재 가장 중요한 동작에 사용
- `Secondary button`은 보조적 동작에 사용
- `Subtle`, `Transparent` 같은 약한 강조 버튼은 주요 흐름을 빼앗지 않아야 하는 조작에 사용
- 페이지의 버튼이 많을수록 시각적 우선순위를 더 많이 제어해야 함

### 2.5 Atlassian 참고: 체계적으로 페이지와 버튼 관리하기

Atlassian Design System은 "한 팀이 많은 페이지를 만드는" 상황에 특히 적합합니다. 다음을 강조합니다:

- foundations는 공유 기초입니다
- tokens는 통일된 시각적 결정 방법입니다
- components는 반복적으로 재사용되는 인터랙션 빌딩 블록입니다

Atlassian을 참고하여 페이지와 버튼을 만든다면, 가장 가치 있는 것은:

- 버튼 크기, 색상, 모서리 둥글기, 간격을 통일된 규칙으로 만들기
- 페이지 레이아웃의 리듬을 고정하기
- 다른 페이지가 콘텐츠는 달라도 구조적 언어가 일관되게 하기

## 3. 페이지를 디자인할 때, 가이드라인에서 어떤 점을 참고해야 할까요

디자인 시스템을 볼 때, 먼저 "이 페이지가 예쁜가"를 묻지 말고, 먼저 다음 질문을 하세요.

### 3.1 페이지의 첫인상, 주와 부가 명확한가

페이지는 보통 최소 세 가지 계층이 있어야 합니다:

- **주요 정보**: 현재 페이지에서 가장 중요한 콘텐츠
- **보조 정보**: 이해를 돕거나 보완하는 콘텐츠
- **하위 조작**: 주요 작업을 방해하지 않아야 하는 동작

세 계층이 분리되지 않으면, 페이지가 "모두 중요해"지고, 이는 "모두 중요하지 않아"와 같습니다.

### 3.2 페이지 레이아웃이 모듈을 쌓는 것이 아니라 작업에 초점을 맞추고 있는가

가이드라인을 참고할 때, 다음에 특히 주의하세요:

- 제목 영역이 페이지 목표를 명확히 하고 있는지
- 주요 콘텐츠 영역이 작업 중심으로 구성되어 있는지
- 조작 버튼이 관련 콘텐츠 근처에 있는지
- 하위 정보가 적절히 약화되어 있는지

### 3.3 페이지의 조작에 우선순위가 있는가

많은 페이지를 보면 버튼이 6개 있는데, 각 버튼이 모두 CTA처럼 보입니다. 이것은 전형적인 계층 통제 실패입니다.

더 합리적인 방법은:

- 한 영역에는 보통 하나의 주요 동작만 있습니다
- 하위 동작은 테두리, 텍스트 버튼 또는 더 약한 스타일을 사용할 수 있습니다
- 위험 동작은 주요 동작과 같은 모양이면 안 됩니다

## 4. 버튼을 디자인할 때, 가이드라인에서 어떤 점을 참고해야 할까요

버튼은 "대충 디자인하기" 가장 쉬운 부분이지만, 시스템이 성숙한지 가장 잘 드러내는 부분이기도 합니다.

### 4.1 버튼은 먼저 "의미"로 나누고, 그 다음에 "스타일"로 나누기

먼저 "파란색 버튼인가 검은색 버튼인가"를 생각하지 말고, 이 버튼이 어떤 역할인지 먼저 생각하세요.

일반적인 버튼 역할은 다음과 같이 나눌 수 있습니다:

| 버튼 유형 | 역할 | 일반적인 스타일 전략 |
| :--- | :--- | :--- |
| **Primary** | 현재 영역의 가장 중요한 동작 | 채우기, 높은 대비, 가장 눈에 띔 |
| **Secondary** | 보조적 동작 | 테두리 또는 한 단계 낮은 강조 |
| **Tertiary / Text** | 약한 조작 | 텍스트 또는 낮은 시각적 비율 |
| **Destructive** | 삭제, 비활성화, 초기화 등 위험 조작 | 경고 색상 또는 명확한 위험 스타일 |
| **Icon button** | 국소적 도구 조작 | 간결하고, 컨텍스트 근처에 배치 |

### 4.2 한 페이지에 Primary Button이 너무 많으면 안 됩니다

이것은 초보자가 가장 많이 하는 실수입니다.

페이지에 주요 버튼이 4개 있다면, 주요 버튼이 없는 것과 같습니다. 주요 버튼의 의미는 원래 "사용자에게 지금 가장 해야 할 일을 알려주는 것"입니다.

많은 디자인 시스템의 공통된 관행을 참고할 수 있습니다:

- 한 주요 영역에는 보통 하나의 주요 버튼만 유지
- 취소, 돌아가기, 닫기는 보통 확인 버튼과 같은 수준을 다투지 않음
- 더 많은 조작은 보조 버튼이나 메뉴에 배치

### 4.3 버튼은 상태 변화를 표현할 수 있어야 합니다

디자인 가이드라인은 보통 버튼 상태를 매우 명확하게 설명합니다:

- 기본 상태
- 호버 상태
- 포커스 상태
- 비활성 상태
- 로딩 상태
- 위험 상태

이것은 중요합니다. 왜냐하면 버튼은 정적인 이미지가 아니라, 사용자 조작 과정에서 가장 자주 트리거되는 컨트롤 중 하나이기 때문입니다.

### 4.4 버튼 텍스트도 디자인의 일부입니다

버튼 텍스트는 단순히 "문구 문제"가 아니라, 사용자 이해에 직접적인 영향을 미칩니다.

예를 들어:

- `저장`
- `변경 사항 저장`
- `지금 게시`
- `프로젝트 삭제`
- `휴지통으로 이동`

이 문구들이 전달하는 심리적 기대는 완전히 다릅니다. 성숙한 가이드라인은 보통 버튼 라벨이 동작을 명확하게 표현하도록 요구하며, 애매한 단어를 사용하지 않도록 합니다.

## 5. 매우 실용적인 페이지 및 버튼 디자인 체크리스트

직접 페이지를 디자인할 때, 먼저 이 체크리스트를 빠르게 확인해 보세요:

### 페이지 체크리스트

- 페이지 제목이 현재 작업을 명확하게 설명하고 있는가
- 첫 화면의 가장 중요한 정보가 한눈에 보이는가
- 페이지가 작업 흐름에 따라 구성되어 있는가, 생각나는 대로 배치한 것은 아닌가
- 같은 영역에 주요 동작이 하나뿐인가
- 하위 콘텐츠가 적절히 약화되어 있는가

### 버튼 체크리스트

- 이 버튼이 주요 동작인가, 보조 동작인가
- 왜 다른 버튼보다 더 눈에 띄어야 하는가
- 페이지에 주요 버튼이 너무 많지 않은가
- 위험 조작이 명확하게 표시되어 있는가
- 버튼 텍스트가 충분히 구체적인가

## 6. AI가 다른 사람의 가이드라인을 참고하여 페이지를 디자인하도록 하는 방법

이 섹션이 가장 실용적입니다.

많은 사람이 AI에게 페이지를 디자인하라고 할 때, 다음과 같이만 말합니다:

```md
설정 페이지를 하나 만들어 주세요. 좀 더 고급스럽게, Apple 스타일로 참고해 주세요
```

이런 프롬프트는 너무 모호해서, AI는 결국 "흰 배경, 둥근 모서리, 그림자"만 모방할 수 있습니다.

초보자에게 더 실용적인 방법은 직접 긴 내용을 요약하는 것이 아니라, **가이드라인 원문의 핵심 문장**을 AI에게 직접 붙여넣는 것입니다.

이렇게 하면 두 가지 장점이 있습니다:

- 직접 디자인 사상을 "번역"할 필요가 없습니다
- AI가 공식 정의에 따라 페이지와 버튼을 더 쉽게 이해합니다

### 6.1 예시 1: AI가 Apple을 참고하여 설정 페이지 디자인하기

먼저 Apple 원문의 한 문장을 찾습니다:

> ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)

이렇게 AI에게 직접 붙여넣을 수 있습니다:

```md
Apple Human Interface Guidelines의 이 문장을 참고해 주세요:
"Establish a clear visual hierarchy..."

계정 보안 설정 페이지를 디자인해 주세요.
페이지 계층이 명확하고, 중요한 정보가 앞에 오며, 그룹화가 깔끔해야 합니다.
```

이렇게 쓰는 핵심은: 직접 너무 많이 설명할 필요 없이, Apple의 원문을 그대로 붙여넣는 것입니다.

### 6.2 예시 2: AI가 Fluent를 참고하여 백오피스 버튼 디자인하기

먼저 Fluent 원문의 한 문장을 찾습니다:

> ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

이렇게 AI에게 직접 붙여넣을 수 있습니다:

```md
Fluent 2의 이 문장을 참고해 주세요:
"Only use one primary button in a layout..."

팀 관리 백오피스의 버튼을 디자인해 주세요.
멤버 추가 버튼이 가장 눈에 띄고, 내보내기, 필터링, 더 보기는 약하게, 삭제 버튼은 별도로 강조해 주세요.
```

이 문장은 초보자에게 특히 적합합니다. 왜냐하면 AI에게 한 영역에 주요 버튼을 너무 많이 놓지 말라고 직접 알려주기 때문입니다.

### 6.3 예시 3: AI가 페이지 가이드라인과 버튼 가이드라인을 동시에 참고하기

두 문장의 원문을 한 번에 붙여넣어 AI가 페이지와 버튼을 동시에 참고하게 할 수도 있습니다:

> Apple: ["Establish a clear visual hierarchy..."](https://developer.apple.com/design/human-interface-guidelines/)
>
> Fluent: ["Only use one primary button in a layout..."](https://fluent2.microsoft.design/components/web/react/core/button/usage)

그리고 이렇게 작성합니다:

```md
다음 두 문장의 디자인 가이드라인 원문을 참고해 주세요:
Apple: "Establish a clear visual hierarchy..."
Fluent: "Only use one primary button in a layout..."

프로젝트 상세 페이지를 디자인해 주세요.
페이지에는 프로젝트 소개, 멤버, 최근 활동, 설정 진입이 포함됩니다.
페이지 계층을 명확하게 하고, 주요 버튼은 하나만 유지하며, 다른 버튼은 약하게 해주세요.
```

이 방식은 초보자에게 특히 적합합니다. 원문을 복사할 줄만 알면 되고, 자신의 요구를 두 문장만 추가하면 충분합니다.

## 7. AI가 버튼 가이드라인을 참고하여 직접 버튼 디자인을 생성하도록 하는 방법

먼저 버튼만 만들고 싶다면, 버튼 가이드라인 원문을 직접 붙여넣을 수도 있습니다.

예를 들어 Atlassian의 버튼 정의는 매우 짧습니다:

> ["A button triggers an event or action."](https://atlassian.design/components/button/)

이렇게 AI에게 물어볼 수 있습니다:

```md
Atlassian의 이 문장을 참고해 주세요:
"A button triggers an event or action."

백오피스 페이지용 버튼 스타일 세트를 디자인해 주세요.
주요 버튼, 보조 버튼, 삭제 버튼이 필요하고, 각각 어디에 사용하는지도 알려주세요.
```

이런 프롬프트는 초보자에게 특히 적합하며, 기본적으로 "원문 붙여넣기 + 요구사항 말하기"입니다.

## 8. 요약

UI 디자인 가이드라인을 참고하여 페이지와 버튼을 디자인할 때, 가장 중요한 것은 "누구를 닮게 만들기"가 아니라, 다음 몇 가지를 배우는 것입니다:

1. 계층으로 페이지를 구성하고, 콘텐츠를 쌓지 않기
2. 버튼 등급으로 조작 우선순위를 표현하고, 모든 버튼이 똑같이 눈에 띄게 만들지 않기
3. 디자인 가이드라인의 정의, 경계, 판단 기준으로 디자인을 안내하기
4. AI가 다른 사람의 가이드라인을 참고할 때, "원칙과 구조"를 참고하게 하고, 스킨만 참고하지 않기

이렇게 가이드라인을 사용하면, 참고하는 것은 단순한 스타일이 아니라, 성숙한 디자인 사고방식입니다.

---

## 참고 자료

다음 링크는 모두 공식 디자인 시스템 또는 공식 문서에서 가져왔습니다:

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
