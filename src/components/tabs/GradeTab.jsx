import { memo, useState, useCallback, useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Set worker source - use unpkg for reliable CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

// API Key from environment variable
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const GRADING_CRITERIA = [
  { id: 'background', name: '議題背景', weight: 15, description: '議題說明清楚、有時事佐證' },
  { id: 'concepts', name: '經濟概念應用', weight: 35, description: '正確使用至少 2 章概念分析' },
  { id: 'charts', name: '圖表分析', weight: 15, description: '圖表正確、說明清楚' },
  { id: 'conclusion', name: '結論與建議', weight: 15, description: '有自己觀點、邏輯合理' },
  { id: 'reflection', name: 'AI 使用反思', weight: 20, description: '說明工具使用、有批判思考' },
];

const GradeTab = memo(function GradeTab() {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [pdfText, setPdfText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [scores, setScores] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  // Check if student info is filled
  const isStudentInfoComplete = studentId.trim() !== '' && studentName.trim() !== '';

  // Generate grading prompt
  const generatePrompt = useCallback((text) => {
    return `你是一位大學經濟學教授，請根據以下評分標準評閱學生的期末報告。

## 評分標準（滿分 100 分）：
1. 議題背景（15%）：議題說明是否清楚？有無時事新聞佐證？
2. 經濟概念應用（35%）：是否正確使用至少 2 章經濟學概念（ch03-07）分析議題？概念應用是否恰當？
3. 圖表分析（15%）：是否有供需曲線或相關圖表？圖表說明是否清楚？
4. 結論與建議（15%）：是否有自己的觀點？論述是否合理？
5. AI 使用反思（20%）：是否說明使用了哪些 AI 工具？有無批判性思考或發現 AI 錯誤？

## 請以 JSON 格式回覆，包含：
{
  "background": { "score": 0-15, "comment": "評語" },
  "concepts": { "score": 0-35, "comment": "評語" },
  "charts": { "score": 0-15, "comment": "評語" },
  "conclusion": { "score": 0-15, "comment": "評語" },
  "reflection": { "score": 0-20, "comment": "評語" },
  "total": 0-100,
  "overall": "整體評語與改進建議"
}

## 學生報告內容：
${text.substring(0, 15000)}`;
  }, []);

  // Grade with OpenAI GPT-4.1-mini API
  const gradeWithApi = useCallback(async (text) => {
    if (!OPENAI_API_KEY) {
      setError('系統設定錯誤：未設定 API Key，請聯繫管理員');
      return;
    }

    setIsGrading(true);
    setError('');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4.1-mini',
          messages: [
            {
              role: 'system',
              content: '你是一位專業的大學經濟學教授，負責評閱學生的期末報告。請嚴格按照評分標準給分，並提供具體的評語和改進建議。回覆必須是有效的 JSON 格式。'
            },
            {
              role: 'user',
              content: generatePrompt(text)
            }
          ],
          temperature: 0.3,
          max_tokens: 2048,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || 'API 錯誤');
      }

      const content = data.choices?.[0]?.message?.content || '';

      // Extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        setScores(result);
      } else {
        throw new Error('無法解析評分結果');
      }
    } catch (err) {
      setError(`評分失敗：${err.message}`);
      console.error(err);
    } finally {
      setIsGrading(false);
    }
  }, [generatePrompt]);

  // Extract text from PDF and auto-grade
  const extractTextFromPdf = useCallback(async (file) => {
    setIsLoading(true);
    setError('');
    setPdfText('');
    setScores(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n\n';
      }

      const extractedText = fullText.trim();
      setPdfText(extractedText);
      setFileName(file.name);
      setIsLoading(false);

      // Auto-grade after PDF extraction
      if (extractedText) {
        gradeWithApi(extractedText);
      }
    } catch (err) {
      setError('無法讀取 PDF 檔案，請確認檔案格式正確');
      console.error(err);
      setIsLoading(false);
    }
  }, [gradeWithApi]);

  // Handle file upload
  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      extractTextFromPdf(file);
    } else if (file) {
      setError('請上傳 PDF 格式的檔案');
    }
  }, [extractTextFromPdf]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Warning Banner */}
      <div className="bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-2xl p-5 border border-amber-500/50">
        <div className="flex items-start gap-3">
          <span className="text-3xl">⚠️</span>
          <div>
            <h3 className="font-bold text-amber-300 text-lg">重要提醒</h3>
            <p className="text-white/80 mt-1">
              此功能為 <strong>AI 嘗試評分</strong>，僅供參考，<strong>並非最終成績</strong>。
              最終分數以老師批改為準。AI 可能有誤判，請勿過度依賴。
            </p>
            <p className="text-white/80 mt-2 flex items-center gap-2">
              <span className="text-amber-300">📤</span>
              <span>完成報告後，請記得將 PDF 上傳至<strong className="text-amber-300">創課系統</strong>繳交！</span>
            </p>
          </div>
        </div>
      </div>

      {/* Student Info Section */}
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="text-3xl">👤</span> 填寫基本資料
        </h2>
        <p className="text-white/60 text-sm mb-6">
          請先填寫學號與姓名，才能上傳報告進行評分
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/70 text-sm mb-2">學號 *</label>
            <input
              type="text"
              placeholder="例：D1234567"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">姓名 *</label>
            <input
              type="text"
              placeholder="例：王小明"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
        {isStudentInfoComplete && (
          <div className="mt-4 flex items-center gap-2 text-emerald-400">
            <span>✓</span>
            <span className="text-sm">資料填寫完成，可以上傳報告了</span>
          </div>
        )}
      </div>

      {/* Upload Section */}
      <div className={`bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 transition-opacity ${!isStudentInfoComplete ? 'opacity-50 pointer-events-none' : ''}`}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="text-3xl">📄</span> 上傳報告 PDF
          {!isStudentInfoComplete && <span className="text-sm font-normal text-white/50">（請先填寫基本資料）</span>}
        </h2>

        <div
          onClick={() => isStudentInfoComplete && !isLoading && !isGrading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
            isStudentInfoComplete && !isLoading && !isGrading
              ? 'border-white/20 hover:border-purple-500/50 cursor-pointer hover:bg-white/5'
              : 'border-white/10 cursor-not-allowed'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            disabled={!isStudentInfoComplete || isLoading || isGrading}
          />
          {isLoading ? (
            <div className="text-white/60">
              <div className="text-4xl mb-3 animate-spin">⏳</div>
              <p>讀取 PDF 中...</p>
            </div>
          ) : isGrading ? (
            <div className="text-purple-400">
              <div className="text-4xl mb-3 animate-pulse">🤖</div>
              <p className="font-bold">AI 評分中...</p>
              <p className="text-sm text-white/50 mt-1">請稍候，約需 10-20 秒</p>
            </div>
          ) : fileName ? (
            <div className="text-emerald-400">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-bold">{fileName}</p>
              <p className="text-sm text-white/50 mt-1">點擊重新上傳</p>
            </div>
          ) : (
            <div className="text-white/60">
              <div className="text-4xl mb-3">📤</div>
              <p className="font-medium">點擊上傳 PDF 檔案</p>
              <p className="text-sm mt-1">上傳後將自動進行 AI 評分</p>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300">
            {error}
          </div>
        )}
      </div>

      {/* Scores Display */}
      {scores && (
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-3xl">📊</span> AI 評分結果
              </h2>
              <p className="text-white/60 text-sm mt-1">
                學號：{studentId} ｜ 姓名：{studentName}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {scores.total} 分
              </div>
              <p className="text-xs text-white/40">滿分 100 分</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-sm">
            ⚠️ 提醒：此為 AI 預估分數，僅供自我檢視參考，最終成績以老師評分為準。
          </div>

          {/* Individual Scores */}
          <div className="space-y-4">
            {GRADING_CRITERIA.map((criterion) => {
              const result = scores[criterion.id];
              if (!result) return null;
              const percentage = (result.score / criterion.weight) * 100;

              return (
                <div key={criterion.id} className="p-5 bg-white/5 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-bold">{criterion.name}</span>
                      <span className="text-white/40 text-sm ml-2">（{criterion.weight}%）</span>
                    </div>
                    <span className={`text-xl font-bold ${
                      percentage >= 80 ? 'text-emerald-400' :
                      percentage >= 60 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {result.score} / {criterion.weight}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full transition-all ${
                        percentage >= 80 ? 'bg-emerald-500' :
                        percentage >= 60 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-white/60">{result.comment}</p>
                </div>
              );
            })}
          </div>

          {/* Overall Comment */}
          {scores.overall && (
            <div className="mt-6 p-5 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <span>💬</span> 整體評語
              </h3>
              <p className="text-white/80 leading-relaxed">{scores.overall}</p>
            </div>
          )}

          {/* Text Preview */}
          <details className="mt-6">
            <summary className="cursor-pointer text-white/60 hover:text-white transition-colors">
              📖 查看擷取的報告內容（前 2000 字）
            </summary>
            <div className="mt-3 p-4 bg-white/5 rounded-xl text-sm text-white/70 max-h-60 overflow-y-auto">
              {pdfText.substring(0, 2000)}...
            </div>
          </details>

          {/* Final Reminder */}
          <div className="mt-6 text-center">
            <p className="text-white/40 text-sm">
              🎓 記得根據 AI 建議修改後再繳交，並保持自己的觀點！
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

export default GradeTab;
