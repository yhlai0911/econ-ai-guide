export const tools = {
  notebooklm: {
    name: 'NotebookLM',
    icon: '📘',
    color: 'from-blue-500 to-cyan-400',
    desc: '上傳講義 → AI 幫你整理重點、回答問題',
    url: 'https://notebooklm.google.com',
    steps: [
      { title: '1. 建立筆記本', content: '點「New Notebook」→ 取名「經濟學報告」' },
      { title: '2. 上傳講義', content: '點「Add Source」→ 上傳 ch03-07 的 PDF' },
      { title: '3. 開始提問', content: '在對話框問問題，AI 會根據講義回答' },
      { title: '4. 生成摘要', content: '點右側「Notebook Guide」自動產生重點' },
    ],
    prompts: [
      '「供給彈性和需求彈性有什麼差別？請舉例」',
      '「政府設定價格上限會造成什麼影響？」',
      '「請用簡單的話解釋消費者剩餘」',
    ],
  },
  gemini: {
    name: 'Gemini',
    icon: '✨',
    color: 'from-purple-500 to-pink-400',
    desc: '搜尋時事資料 → 分析議題 → 潤飾文句',
    url: 'https://gemini.google.com',
    steps: [
      { title: '1. 登入', content: '用學校 Google 帳號登入' },
      { title: '2. 蒐集資料', content: '問「台灣 2024 蛋價波動原因」取得背景' },
      { title: '3. 請 AI 分析', content: '問「用供需理論分析蛋價上漲」' },
      { title: '4. 潤飾文章', content: '貼草稿，請「修正通順度，保持學術風格」' },
    ],
    prompts: [
      '「請整理台灣近一年蛋價波動的新聞和數據」',
      '「請用大一經濟學的角度分析電價上漲的影響」',
      '「請幫我潤飾這段文字，讓它更通順：[貼上草稿]」',
    ],
  },
  sheets: {
    name: 'Google 試算表',
    icon: '📊',
    color: 'from-emerald-500 to-teal-400',
    desc: '輸入數據 → 製作供需曲線圖',
    url: 'https://sheets.google.com',
    steps: [
      { title: '1. 輸入數據', content: 'A欄=價格, B欄=需求量, C欄=供給量' },
      { title: '2. 選取資料', content: '框選所有數據（含標題）' },
      { title: '3. 插入圖表', content: '「插入」→「圖表」→ 選「散佈圖」' },
      { title: '4. 美化圖表', content: '加標題、軸標籤、調整顏色' },
    ],
    prompts: [],
  },
  docs: {
    name: 'Google Docs',
    icon: '📄',
    color: 'from-sky-500 to-blue-400',
    desc: '撰寫報告 → 插入圖表 → 匯出 PDF',
    url: 'https://docs.google.com',
    steps: [
      { title: '1. 新增文件', content: '點「空白」→ 命名「經濟學報告_姓名」' },
      { title: '2. 套用格式', content: '標題用「標題1」，小標用「標題2」' },
      { title: '3. 插入圖表', content: '「插入」→「圖表」→「從試算表」' },
      { title: '4. 匯出 PDF', content: '「檔案」→「下載」→「PDF」' },
    ],
    prompts: [],
  },
};

export const navTabs = [
  { id: 'quest', label: '📜 主線任務', subtitle: '作業說明' },
  { id: 'map', label: '🗺️ 冒險地圖', subtitle: '每日進度' },
  { id: 'gear', label: '⚔️ 裝備指南', subtitle: '工具教學' },
  { id: 'boss', label: '🏆 通關條件', subtitle: '評分標準' },
  { id: 'sample', label: '📖 攻略範本', subtitle: '報告範例' },
  { id: 'npc', label: '💬 NPC 問答', subtitle: '常見問題' },
];
