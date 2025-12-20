export const week1Tasks = [
  { id: 'w1t1', day: 'DAY 1', task: '上傳 ch03-07 講義，建立知識庫', where: 'NotebookLM', link: 'https://notebooklm.google.com', emoji: '📤', reward: '解鎖 AI 問答功能' },
  { id: 'w1t2', day: 'DAY 2', task: '選定報告主題，蒐集新聞與數據', where: 'Gemini', link: 'https://gemini.google.com', emoji: '🔍', reward: '獲得背景資料' },
  { id: 'w1t3', day: 'DAY 3', task: '向 AI 提問，確認經濟概念理解', where: 'NotebookLM', link: 'https://notebooklm.google.com', emoji: '❓', reward: '釐清觀念' },
  { id: 'w1t4', day: 'DAY 4', task: '整理分析筆記，規劃報告架構', where: 'Google Docs', link: 'https://docs.google.com', emoji: '📝', reward: '完成大綱' },
  { id: 'w1t5', day: 'DAY 5', task: '🚩 繳交報告大綱', where: 'Tronclass 創課', link: 'https://tronclass.dyu.edu.tw/course/8030/content#/', emoji: '✅', reward: '+10% 成績', isCheckpoint: true },
];

export const week2Tasks = [
  { id: 'w2t1', day: 'DAY 6', task: '撰寫「議題背景」與「經濟概念」', where: 'Google Docs', link: 'https://docs.google.com', emoji: '✍️', reward: '完成 60% 內容' },
  { id: 'w2t2', day: 'DAY 7', task: '用 Gemini 潤稿，修正文句', where: 'Gemini', link: 'https://gemini.google.com', emoji: '💬', reward: '提升文章品質' },
  { id: 'w2t3', day: 'DAY 8', task: '製作供需曲線圖表', where: 'Google 試算表', link: 'https://sheets.google.com', emoji: '📊', reward: '獲得圖表素材' },
  { id: 'w2t4', day: 'DAY 9', task: '完成結論 + AI 使用反思 + 截圖', where: 'Google Docs', link: 'https://docs.google.com', emoji: '🎨', reward: '報告完成' },
  { id: 'w2t5', day: 'DAY 10', task: '🏆 匯出 PDF，繳交最終報告', where: 'Tronclass 創課', link: 'https://tronclass.dyu.edu.tw/course/8030/content#/', emoji: '🎉', reward: '任務完成！', isCheckpoint: true },
];

export const reportStructure = [
  { section: '一、議題背景', desc: '這議題是什麼？為何重要？最近有什麼新聞？', weight: '15%', words: '300-400字' },
  { section: '二、經濟概念應用', desc: '用課程概念（至少2章）分析議題', weight: '35%', words: '800-1000字' },
  { section: '三、圖表分析', desc: '畫供需曲線，解釋圖的意義', weight: '15%', words: '1-2張圖+說明' },
  { section: '四、結論與建議', desc: '你的觀點？對政策的建議？', weight: '15%', words: '300-400字' },
  { section: '五、AI 使用反思', desc: '用了什麼工具？怎麼用？有修正錯誤嗎？', weight: '20%', words: '300-400字+截圖' },
];

export const faqs = [
  { q: '可以直接複製 AI 的回答嗎？', a: '🚫 不行！那是抄襲。你要用自己的話改寫，並在「AI 使用反思」說明哪些地方有 AI 協助、你做了什麼修改。' },
  { q: '報告要寫多長？', a: '📝 正文約 2000-2500 字（不含圖表）。分五段：背景、概念應用、圖表、結論、AI 反思。' },
  { q: '第一週的「大綱」要交什麼？', a: '📋 一頁 Google Docs：(1) 你選的主題 (2) 為什麼選 (3) 要用哪幾章概念 (4) 報告架構。佔 10% 成績！' },
  { q: 'AI 說「找不到資訊」怎麼辦？', a: '🔄 換個問法，或確認問題在 ch03-07 範圍內。也可以改用 Gemini 搜尋網路資料。' },
  { q: '發現 AI 回答錯誤怎麼辦？', a: '🎯 太棒了！記錄下來寫在「AI 反思」，說明 AI 錯什麼、正確答案是什麼。能抓出錯誤會加分！' },
  { q: '一定要用 Google 的工具嗎？', a: '✅ 這次作業主要練習 Google AI 生態系。想額外比較 ChatGPT 可以，但報告以 Google 工具為主。' },
];
