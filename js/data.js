var caseA_scoutWeak = `candidate_name,media,scout_sent_date,opened,applied,document_pass,interview_1,interview_2,offer,accepted,joined,ng_reason
山田太郎,Green,2026-04-01,×,×,×,×,×,×,×,×,
佐藤花子,Green,2026-04-02,×,×,×,×,×,×,×,×,
鈴木一郎,BizReach,2026-04-03,○,×,×,×,×,×,×,×,応募なし
田中美咲,Wantedly,2026-04-04,×,×,×,×,×,×,×,×,
高橋健太,エージェント,2026-04-05,○,○,○,○,○,○,×,×,内定辞退
伊藤さくら,Green,2026-04-06,×,×,×,×,×,×,×,×,
渡辺直人,BizReach,2026-04-07,○,×,×,×,×,×,×,×,応募なし
小林優奈,Wantedly,2026-04-08,×,×,×,×,×,×,×,×,
加藤大輔,リクナビ,2026-04-09,○,×,×,×,×,×,×,×,書類NG
吉田彩,マイナビ,2026-04-10,×,×,×,×,×,×,×,×,
中村亮,エージェント,2026-04-11,○,○,○,○,○,○,○,○,
松本愛,Green,2026-04-12,×,×,×,×,×,×,×,×,
井上翔,BizReach,2026-04-13,○,×,×,×,×,×,×,×,
木村美穂,Wantedly,2026-04-14,×,×,×,×,×,×,×,×,
山口航,エージェント,2026-04-15,○,○,○,○,○,○,×,×,
石井遥,Green,2026-04-16,×,×,×,×,×,×,×,×,
橋本健,BizReach,2026-04-17,○,×,×,×,×,×,×,×,
阿部真央,リクナビ,2026-04-18,×,×,×,×,×,×,×,×,
森田亮,Wantedly,2026-04-19,○,×,×,×,×,×,×,×,
岡田美咲,Green,2026-04-20,×,×,×,×,×,×,×,×,`;

var caseB_qualityMismatch = `candidate_name,media,scout_sent_date,opened,applied,document_pass,interview_1,interview_2,offer,accepted,joined,ng_reason
山田太郎,Green,2026-04-01,○,○,×,×,×,×,×,×,スキル不足
佐藤花子,Green,2026-04-02,○,○,×,×,×,×,×,×,スキル不足
鈴木一郎,BizReach,2026-04-03,○,○,×,×,×,×,×,×,書類NG
田中美咲,Wantedly,2026-04-04,○,○,×,×,×,×,×,×,スキル不足
高橋健太,エージェント,2026-04-05,○,○,○,○,○,○,×,×,内定辞退
伊藤さくら,Green,2026-04-06,○,○,×,×,×,×,×,×,スキル不足
渡辺直人,BizReach,2026-04-07,○,○,×,×,×,×,×,×,書類NG
小林優奈,Wantedly,2026-04-08,○,○,×,×,×,×,×,×,スキル不足
加藤大輔,リクナビ,2026-04-09,○,○,×,×,×,×,×,×,書類NG
吉田彩,マイナビ,2026-04-10,○,○,×,×,×,×,×,×,書類NG
中村亮,エージェント,2026-04-11,○,○,○,○,○,○,○,○,
松本愛,Green,2026-04-12,○,○,×,×,×,×,×,×,スキル不足
井上翔,BizReach,2026-04-13,○,○,×,×,×,×,×,×,書類NG
木村美穂,Wantedly,2026-04-14,○,○,×,×,×,×,×,×,スキル不足
山口航,エージェント,2026-04-15,○,○,○,○,○,○,×,×,条件不一致
石井遥,Green,2026-04-16,○,○,×,×,×,×,×,×,スキル不足
橋本健,BizReach,2026-04-17,○,○,×,×,×,×,×,×,書類NG
阿部真央,リクナビ,2026-04-18,○,○,○,○,○,○,○,○,
森田亮,Wantedly,2026-04-19,○,○,×,×,×,×,×,×,書類NG
岡田美咲,Green,2026-04-20,○,○,×,×,×,×,×,×,スキル不足`;

var caseC_closingWeak = `candidate_name,media,scout_sent_date,opened,applied,document_pass,interview_1,interview_2,offer,accepted,joined,ng_reason
山田太郎,Green,2026-04-01,○,○,○,○,○,○,×,×,内定辞退
佐藤花子,Green,2026-04-02,○,○,○,○,○,○,×,×,内定辞退
鈴木一郎,BizReach,2026-04-03,○,○,○,○,○,○,×,×,条件不一致
田中美咲,Wantedly,2026-04-04,○,○,○,○,○,○,×,×,内定辞退
高橋健太,エージェント,2026-04-05,○,○,○,○,○,○,×,×,内定辞退
伊藤さくら,Green,2026-04-06,○,○,○,○,○,○,×,×,条件不一致
渡辺直人,BizReach,2026-04-07,○,○,○,○,○,○,×,×,内定辞退
小林優奈,Wantedly,2026-04-08,○,○,○,○,○,○,×,×,内定辞退
加藤大輔,リクナビ,2026-04-09,○,○,○,○,○,○,×,×,内定辞退
吉田彩,マイナビ,2026-04-10,○,○,○,○,○,○,×,×,内定辞退
中村亮,エージェント,2026-04-11,○,○,○,○,○,○,○,○,
松本愛,Green,2026-04-12,○,○,○,○,○,○,×,×,内定辞退
井上翔,BizReach,2026-04-13,○,○,○,○,○,○,○,○,
木村美穂,Wantedly,2026-04-14,○,○,○,○,○,○,×,×,内定辞退
山口航,エージェント,2026-04-15,○,○,○,○,○,○,×,×,条件不一致
石井遥,Green,2026-04-16,○,○,○,○,○,○,○,○,
橋本健,BizReach,2026-04-17,○,○,○,○,○,○,×,×,内定辞退
阿部真央,リクナビ,2026-04-18,○,○,○,○,○,○,○,○,
森田亮,Wantedly,2026-04-19,○,○,○,○,○,○,×,×,内定辞退
岡田美咲,Green,2026-04-20,○,○,○,○,○,○,○,○,`;

async function loadCSV(path) {
    try {
        console.log(`Loading CSV from: ${path}`);
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const buffer = await response.arrayBuffer();
        const decoder = new TextDecoder('shift-jis');
        const text = decoder.decode(buffer);
        console.log("CSV text length:", text.length);
        const data = parseCSV(text);
        console.log("First row example:", data[0]);
        return data;
    } catch (error) {
        console.warn("Fetch failed, using caseA as default fallback:", error.message);
        return parseCSV(caseA_scoutWeak);
    }
}

function parseCSV(text) {
    const lines = text.trim().split(/\r?\n/);
    if (lines.length === 0) return [];
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i];
        if (!currentLine.trim()) continue;
        const values = splitCSVLine(currentLine);
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index] || "";
        });
        data.push(obj);
    }
    return data;
}

function splitCSVLine(line) {
    const result = [];
    let start = 0;
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        if (line[i] === '"') inQuotes = !inQuotes;
        else if (line[i] === ',' && !inQuotes) {
            result.push(cleanValue(line.substring(start, i)));
            start = i + 1;
        }
    }
    result.push(cleanValue(line.substring(start)));
    return result;
}

function cleanValue(val) {
    return val.trim().replace(/^"|"$/g, '').replace(/""/g, '"');
}
