export default {
  aiHelp: {
    start: '演示：遇到代码不懂怎么问 AI？',
    replay: '重播',
    codeComments: {
      waitData: '等待数据加载完成',
      waitDom: '等待 DOM 更新后再渲染图表'
    },
    question: '帮我看下这张图，左边红框里那一块是干嘛用的？',
    answer: {
      introPrefix: '这是 VS Code 的',
      menuBar: '顶部菜单栏 (Menu Bar)',
      introSuffix: '，包含了软件的所有功能入口。',
      menuTitle: '常用菜单解释：',
      items: [
        { name: 'File (文件)', desc: '新建、打开、保存文件或项目。' },
        { name: 'Edit (编辑)', desc: '复制粘贴、查找替换、撤销重做。' },
        { name: 'View (视图)', desc: '控制界面显示，比如打开侧边栏、终端等。' },
        { name: 'Terminal (终端)', desc: '打开内置命令行工具。' }
      ],
      tipLabel: '小技巧',
      tipText: '：如果不记得某个功能在哪，可以按',
      tipSuffix: '打开命令面板直接搜索功能名字！'
    }
  },
  architecture: {
    title: 'IDE 核心机制模拟器',
    subtitle: '点击下方标签，体验不同配置下的运行结果，理解为什么缺一不可。',
    runTitle: '点击运行',
    runButton: '▶ 运行',
    layerLabels: {
      shell: '1. 外壳 (VS Code)',
      mediator: '2. 中介 (插件)',
      engine: '3. 引擎 (环境)'
    },
    statuses: {
      editorError: '不懂怎么运行',
      extensionMissing: '未安装插件',
      envMissing: '未安装环境',
      commandGenerated: '生成指令:',
      calculating: '正在计算...',
      done: '计算完成',
      programMissing: '找不到程序',
      terminal: '终端 (Terminal)',
      placeholder: '点击上方“运行”按钮开始...'
    },
    pythonExtension: 'Python 插件',
    pythonInterpreter: 'Python 解释器',
    scenarios: {
      editor: {
        tab: '1. 仅编辑器',
        title: '场景 1: 只有 VS Code (纯文本模式)',
        desc: '就像用 Windows 记事本写代码。虽然能打字，但它根本不懂什么是 Python。',
        result: '失败：VS Code 把代码当成普通文本，不知道该怎么运行。'
      },
      extension: {
        tab: '2. +插件',
        title: '场景 2: 安装了插件 (缺环境)',
        desc: '你安装了 Python 插件。插件知道“运行”意味着要找 Python 程序，但你的电脑里并没有安装 Python。',
        result: '报错：插件生成了指令，但在系统里找不到 "python.exe"。'
      },
      full: {
        tab: '3. +环境 (完整)',
        title: '场景 3: 完整形态 (IDE + 插件 + 环境)',
        desc: '你安装了 Python 解释器。插件生成指令，解释器接收并执行，完美配合。',
        result: '成功：Hello World'
      }
    },
    logs: {
      unknownFile: 'VS Code: "这是什么文件？我不认识。"',
      textEditor: 'VS Code: "我只是个打字机，无法运行。"',
      missingPython: '系统: 找不到 Python 解释器'
    }
  },
  virtual: {
    title: '虚拟 IDE 交互演示',
    startTour: '开始自动导览',
    stopTour: '停止演示',
    infoPlaceholder: '悬停查看功能说明',
    selectFallback: '选择演示模式',
    tourFinished: '演示结束',
    tourOptions: [
      { label: '全功能演示 (Full Tour)', value: 'all' },
      { label: '界面导航 (Interface Navigation)', value: 'navigation' },
      { label: '插件安装 (Extensions)', value: 'extensions' },
      { label: '代码编辑 (Code Editing)', value: 'editor' },
      { label: '调试与终端 (Debug & Terminal)', value: 'debug' }
    ],
    menus: {
      File: [
        { label: 'New File', info: '新建文件：创建空文件' },
        { label: 'Open File...', info: '打开文件：选择文件' },
        { label: 'Save', info: '保存：保存修改' },
        { label: 'Save As...', info: '另存为：保存为新文件' },
        { label: 'Auto Save', info: '自动保存：开启自动保存' },
        { label: 'Preferences', info: '首选项：设置主题等' },
        { label: 'Exit', info: '退出：关闭 VS Code' }
      ],
      Edit: [
        { label: 'Undo', info: '撤销：撤回操作' },
        { label: 'Redo', info: '重做：恢复操作' },
        { label: 'Cut', info: '剪切：剪切选中' },
        { label: 'Copy', info: '复制：复制选中' },
        { label: 'Paste', info: '粘贴：粘贴内容' },
        { label: 'Find', info: '查找：搜索内容' },
        { label: 'Replace', info: '替换：替换内容' }
      ],
      Selection: [
        { label: 'Select All', info: '全选：选中所有' },
        { label: 'Expand Selection', info: '扩展选区：扩大范围' },
        { label: 'Shrink Selection', info: '缩小选区：缩小范围' }
      ],
      View: [
        { label: 'Command Palette...', info: '命令面板：执行命令' },
        { label: 'Open View...', info: '打开视图：显示窗口' },
        { label: 'Appearance', info: '外观：调整显示' },
        { label: 'Editor Layout', info: '布局：调整分屏' }
      ],
      Go: [
        { label: 'Back', info: '后退：上个位置' },
        { label: 'Forward', info: '前进：下个位置' },
        { label: 'Go to File...', info: '转到文件：快速打开' },
        { label: 'Go to Symbol...', info: '转到符号：跳转定义' }
      ],
      Debug: [
        { label: 'Start Debugging', info: '开始调试：运行并调试' },
        { label: 'Run Without Debugging', info: '运行：直接运行' },
        { label: 'Stop Debugging', info: '停止：结束调试' }
      ],
      Terminal: [
        { label: 'New Terminal', info: '新建终端：打开命令行' },
        { label: 'Split Terminal', info: '拆分终端：并排显示' },
        { label: 'Run Task...', info: '运行任务：执行任务' }
      ],
      Help: [
        { label: 'Welcome', info: '欢迎页：入门指南' },
        { label: 'Documentation', info: '文档：查看文档' },
        { label: 'Show Release Notes', info: '发行说明：版本更新' },
        { label: 'About', info: '关于：版本信息' }
      ]
    },
    info: {
      logoMainMenu: 'VS Code 徽标：主菜单',
      menuBar: '菜单栏：所有功能',
      fileMenu: '文件菜单：文件操作',
      newFile: '新建文件：创建空文件',
      navArrows: '导航按钮：后退/前进',
      commandCenter: '命令中心：快速搜索',
      layoutControls: '布局控制：切换视图',
      activityBar: '活动栏：切换视图',
      explorer: '资源管理器：管理文件',
      search: '全局搜索：查找替换',
      sourceControl: '源代码管理：Git',
      runDebug: '运行和调试：调试代码',
      extensions: '扩展商店：安装插件',
      accounts: '账户：同步设置',
      manage: '管理：全局设置',
      sidebar: '侧边栏：详细内容',
      openEditors: '打开的编辑器：编辑中文件',
      fileTree: '项目文件树：项目结构',
      tabs: '标签页：已打开文件',
      breadcrumbs: '路径导航：文件路径',
      editor: '编辑区：编写代码',
      minimap: '缩略图：预览代码',
      bottomPanel: '底部面板：集成工具',
      panelTabs: '面板切换：切换工具',
      terminal: '终端：运行命令',
      statusBar: '状态栏：全局信息',
      statusLeft: '左侧信息：Git/错误',
      statusRight: '右侧信息：环境信息',
      extensionSearch: '搜索插件：输入 python',
      installExtension: '点击安装：一键安装插件',
      backExplorer: '返回资源管理器',
      titleBar: '标题栏：全局控制',
      logo: 'VS Code 徽标',
      menuEntry: '菜单栏：功能入口',
      navigation: '导航：后退/前进',
      searchCenter: '命令中心：搜索',
      layoutSwitch: '布局控制：切换视图',
      windowControls: '窗口控制',
      explorerFiles: '资源管理器：文件管理',
      runDebugShort: '运行和调试：调试',
      extensionShort: '扩展：插件',
      accountsShort: '账户：同步',
      manageShort: '管理：设置',
      sidebarDetails: '侧边栏：详细内容',
      tabSwitch: '标签页：切换文件',
      filePath: '路径导航：文件路径',
      codeEditor: '编辑区：编写代码',
      minimapJump: '缩略图：快速跳转',
      integratedTools: '底部面板：集成工具',
      problems: '问题面板：错误警告',
      output: '输出面板：日志',
      debugConsole: '调试控制台',
      terminalCli: '终端：命令行',
      panelActions: '面板操作',
      statusEnvironment: '状态栏：环境信息'
    }
  }
}
