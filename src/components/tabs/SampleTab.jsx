import { memo } from 'react';

const SampleTab = memo(function SampleTab() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">📖</span> 報告範例：演唱會黃牛票現象分析
          </h2>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
            ⭐ 優良範例
          </span>
        </div>

        {/* Sample Report Header */}
        <div className="bg-white/10 rounded-2xl p-6 mb-6 text-center">
          <h3 className="text-xl font-bold mb-2">演唱會黃牛票現象之經濟分析</h3>
          <p className="text-white/60">王小明｜企管系一年級｜學號：41012345</p>
          <p className="text-white/40 text-sm mt-1">大一經濟學期末報告｜2024 年 1 月</p>
        </div>

        {/* Section 1 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-cyan-400">
            <span className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-sm">1</span>
            議題背景說明
            <span className="text-xs font-normal text-white/40 ml-2">佔 15%</span>
          </h3>
          <div className="bg-white/5 rounded-xl p-5 text-white/80 leading-relaxed space-y-3">
            <p>近年來，熱門演唱會「秒殺」現象頻繁發生。2023 年五月天、周杰倫等巨星演唱會開賣後數分鐘內售罄，但隨即在網路上出現大量高價轉售票，俗稱「黃牛票」，價格往往是原價的 3-10 倍。</p>
            <p>許多歌迷抱怨買不到票，卻看到黃牛大量囤票轉售獲利。政府雖然立法禁止黃牛行為，但黃牛現象依然存在。這個現象背後其實反映了經濟學中<strong>價格管制</strong>造成的市場失衡問題。</p>
            <p>本報告將運用<strong>供需理論</strong>與<strong>價格上限</strong>的概念，分析黃牛票現象的成因及可能的解決方案。</p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-purple-400">
            <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-sm">2</span>
            經濟學概念應用
            <span className="text-xs font-normal text-white/40 ml-2">佔 35%｜重點段落</span>
          </h3>
          <div className="bg-white/5 rounded-xl p-5 text-white/80 leading-relaxed space-y-4">
            <div>
              <h4 className="font-bold text-purple-300 mb-2">【供需分析 - ch04】</h4>
              <p className="mb-2">從<strong>供給面</strong>來看，演唱會場地座位數固定（如小巨蛋約 15,000 席），供給曲線為垂直線，屬於<strong>完全無彈性的供給</strong>。無論票價如何變動，座位數都無法增加。</p>
              <p className="mb-2">從<strong>需求面</strong>來看，熱門歌手的演唱會需求極高。當偶像宣布開唱，粉絲對該演唱會的需求大增，需求曲線向右移動。這使得<strong>均衡價格</strong>遠高於主辦單位設定的票價。</p>
              <p>例如：假設市場均衡價格為 8,000 元，但主辦單位定價為 2,000 元，這就形成了<strong>價格上限</strong>的效果。</p>
            </div>
            <div>
              <h4 className="font-bold text-purple-300 mb-2">【價格上限的效果 - ch07】</h4>
              <p className="mb-2">當票價（2,000 元）低於均衡價格（8,000 元）時，會造成<strong>短缺</strong>：</p>
              <p className="mb-2">• <strong>需求量 &gt; 供給量</strong>：想買票的人遠多於座位數</p>
              <p className="mb-2">• <strong>短缺 = 需求量 - 供給量</strong>：可能有數萬人搶 1.5 萬個座位</p>
              <p className="mb-2">根據 ch07 所學，價格上限造成的短缺會導致兩種現象：</p>
              <p className="mb-2"><strong>1. 黑市交易：</strong>黃牛以原價購得門票，再以接近均衡價格（或更高）的價格轉售。黑市價格反映了真實的市場供需狀況。</p>
              <p><strong>2. 尋找成本增加：</strong>消費者必須花費大量時間排隊、搶票，這些「非價格成本」也是一種資源浪費。</p>
            </div>
            <div>
              <h4 className="font-bold text-purple-300 mb-2">【需求彈性分析 - ch05】</h4>
              <p className="mb-2">熱門演唱會的<strong>需求價格彈性很低</strong>（無彈性），原因包括：</p>
              <p className="mb-2">• <strong>缺乏替代品</strong>：周杰倫的演唱會無法被其他歌手取代</p>
              <p className="mb-2">• <strong>占所得比例低</strong>：對忠實粉絲而言，即使票價翻倍也願意購買</p>
              <p>需求無彈性代表：即使黃牛抬高價格，仍有消費者願意購買，這就是黃牛有利可圖的原因。</p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-pink-400">
            <span className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center text-sm">3</span>
            圖表分析
            <span className="text-xs font-normal text-white/40 ml-2">佔 15%</span>
          </h3>
          <div className="bg-white/5 rounded-xl p-5">
            <div className="bg-white/10 rounded-xl p-8 mb-4 text-center">
              <div className="text-6xl mb-4">📈</div>
              <p className="text-white/60">[此處插入供需曲線圖]</p>
              <p className="text-sm text-white/40 mt-2">使用 Google 試算表製作</p>
            </div>
            <div className="text-white/80 leading-relaxed">
              <p className="mb-2"><strong>圖一說明：</strong>供給曲線 S 為垂直線（座位數固定為 Q*）。需求曲線 D 與供給曲線交於均衡點 E，均衡價格為 P*（約 8,000 元）。</p>
              <p className="mb-2">當主辦單位設定票價為 Pc（2,000 元），低於均衡價格 P*，造成<strong>短缺</strong>（圖中 Qd - Q* 的距離）。</p>
              <p>黃牛票的價格（Pb）會趨近於均衡價格 P*，因為這是消費者實際願意支付的價格。</p>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-amber-400">
            <span className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-sm">4</span>
            結論與建議
            <span className="text-xs font-normal text-white/40 ml-2">佔 15%</span>
          </h3>
          <div className="bg-white/5 rounded-xl p-5 text-white/80 leading-relaxed space-y-3">
            <p>黃牛票現象本質上是<strong>價格上限造成短缺</strong>的結果。當票價被設定在均衡價格以下，短缺必然發生，黑市就會出現來填補這個缺口。</p>
            <p><strong>可能的解決方案：</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>市場機制：</strong>採用浮動票價或拍賣制，讓價格反映真實供需</li>
              <li><strong>實名制：</strong>購票與入場皆須本人證件，降低轉售可能</li>
              <li><strong>增加供給：</strong>加開場次，雖然短期座位固定，但可增加總供給</li>
              <li><strong>抽籤制：</strong>以抽籤取代搶票，降低尋找成本（但仍無法消除短缺）</li>
            </ul>
            <p className="mt-3">從經濟學角度看，黃牛的存在反映市場機制的運作，單純禁止黃牛無法解決根本問題——只要價格低於均衡，短缺和黑市就會持續存在。</p>
          </div>
        </div>

        {/* Section 5 - AI Reflection */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-emerald-400">
            <span className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center text-sm">5</span>
            AI 使用反思
            <span className="text-xs font-normal text-white/40 ml-2">佔 20%｜必寫</span>
          </h3>
          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl p-5 border border-emerald-500/20 text-white/80 leading-relaxed space-y-4">
            <div>
              <h4 className="font-bold text-emerald-300 mb-2">【使用的工具】</h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>NotebookLM：</strong>上傳 ch04、ch05、ch07 講義，確認價格上限、短缺、需求彈性的定義</li>
                <li><strong>Gemini：</strong>搜尋演唱會黃牛票的新聞案例，了解實際票價差距</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-emerald-300 mb-2">【怎麼使用】</h4>
              <p>我先用 Gemini 搜尋「演唱會黃牛票 經濟分析」，發現很多討論都提到供需失衡。接著在 NotebookLM 提問「價格上限會造成什麼影響」，確認課本說的「短缺」和「黑市」概念。</p>
            </div>
            <div>
              <h4 className="font-bold text-emerald-300 mb-2">【發現 AI 的錯誤】⭐ 加分重點</h4>
              <p>Gemini 在分析時提到「政府應該<strong>課稅</strong>來抑制黃牛」，但這學期我們沒有學到課稅的內容，而且根據 ch07，價格管制的問題應該用「調整價格上限」或「增加供給」來解決，而不是課稅。我在報告中沒有採用這個建議。</p>
            </div>
            <div>
              <h4 className="font-bold text-emerald-300 mb-2">【心得】</h4>
              <p>這次作業讓我發現，AI 有時候會給出超出課程範圍的建議。我學到要用課本的內容來檢驗 AI 的回答，而不是照單全收。經濟學的概念真的可以解釋很多生活現象！</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 mt-4">
              <p className="font-bold text-white/60 mb-2">📸 對話截圖（實際報告需附上）</p>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white/5 rounded-lg p-4 text-center text-sm text-white/40">
                  [截圖1]<br />NotebookLM<br />問價格上限
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center text-sm text-white/40">
                  [截圖2]<br />Gemini<br />搜尋黃牛新聞
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center text-sm text-white/40">
                  [截圖3]<br />發現AI建議<br />超出課程範圍
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 p-5 bg-amber-500/20 rounded-2xl border border-amber-500/30">
          <p className="font-bold text-amber-300 flex items-center gap-2">
            <span className="text-xl">💡</span> 範例重點提示
          </p>
          <ul className="text-white/70 mt-2 space-y-1 text-sm">
            <li>• 每段都有清楚標示使用哪一章的概念（ch04、ch05、ch07）</li>
            <li>• 只用<strong>課堂教過的內容</strong>：供需、價格上限、短缺、黑市、需求彈性</li>
            <li>• AI 反思有指出「AI 建議超出課程範圍」，展現批判思考</li>
            <li>• 結論有提出自己的觀點，不只是複述課本</li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default SampleTab;
