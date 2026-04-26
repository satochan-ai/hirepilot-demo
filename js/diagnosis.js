// 採用ボトルネック診断ロジック

function diagnoseHiring(data, funnel, kpi, mediaKPI) {
    const issues = [];
    const actions = [];
    const strengths = [];

    // KPI診断
    if (Number(kpi.open_rate) < 40) {
        issues.push("スカウト開封率が低く、件名・冒頭文・ターゲット設定に課題があります。");
        actions.push("媒体別に件名と1文目を見直し、職種・年収・働き方の訴求を明確にしてください。");
    } else {
        strengths.push("スカウト開封率は一定水準を超えており、初期接触は機能しています。");
    }

    if (Number(kpi.apply_rate) < 10) {
        issues.push("開封後の応募率が低く、求人訴求が候補者に刺さっていません。");
        actions.push("仕事内容・魅力・選考メリットを具体化し、候補者目線の訴求に変更してください。");
    }

    if (Number(kpi.doc_pass_rate) < 30) {
        issues.push("書類通過率が低く、応募者の質または募集要件とのズレが発生しています。");
        actions.push("媒体別に応募者属性を確認し、ターゲット条件・求人文・スカウト条件を修正してください。");
    }

    if (Number(kpi.interview_rate) < 40) {
        issues.push("面接通過率が低く、面接評価基準・候補者理解・事前説明に課題があります。");
        actions.push("面接前に候補者の志向性・経験・懸念点を整理し、面接官へ共有してください。");
    }

    if (Number(kpi.accept_rate) < 50) {
        issues.push("内定承諾率が低く、条件・魅力付け・クロージングに課題があります。");
        actions.push("内定前から希望条件・競合状況・入社意思を確認し、承諾前提のクロージングを行ってください。");
    }

    // 媒体評価
    const mediaEvaluation = evaluateMedia(mediaKPI);
    const bestMedia = mediaEvaluation.find(m => m.rank === 1);
    const worstMedia = [...mediaEvaluation].reverse().find(m => m.joinRate > 0);

    if (bestMedia) {
        strengths.push(`${bestMedia.name} は入社率 ${bestMedia.joinRate}% と成果が高く、重点投資候補です。`);
    }
    if (worstMedia && worstMedia !== bestMedia) {
        issues.push(`${worstMedia.name} は入社率 ${worstMedia.joinRate}% と低く、運用見直し対象です。`);
    }

    // 最優先課題の特定と実行プランの生成
    const priority = getPriorityAction(funnel, kpi);

    // NG理由分析
    const ngAnalysis = analyzeNGReasons(data);

    return {
        score: calculateHealthScore(kpi),
        status: getStatus(calculateHealthScore(kpi)),
        issues,
        strengths,
        actions,
        priority,
        ngAnalysis,
        mediaEvaluation
    };
}

function calculateHealthScore(kpi) {
    let score = 100;
    if (Number(kpi.open_rate) < 40) score -= 15;
    if (Number(kpi.apply_rate) < 10) score -= 20;
    if (Number(kpi.doc_pass_rate) < 30) score -= 20;
    if (Number(kpi.interview_rate) < 40) score -= 20;
    if (Number(kpi.accept_rate) < 50) score -= 15;
    if (Number(kpi.join_rate) < 10) score -= 10;
    return Math.max(score, 0);
}

function getStatus(score) {
    if (score >= 80) return "良好";
    if (score >= 60) return "注意";
    return "要改善";
}

function getPriorityAction(funnel, kpi) {
    const thresholds = [
        { key: 'open_rate', val: 40, label: 'スカウト開封', den: funnel.scout },
        { key: 'apply_rate', val: 10, label: '応募', den: funnel.opened },
        { key: 'doc_pass_rate', val: 30, label: '書類通過', den: funnel.applied },
        { key: 'interview_rate', val: 40, label: '面接通過', den: funnel.interview_1 },
        { key: 'accept_rate', val: 50, label: '内定承諾', den: funnel.offer }
    ];

    let worst = null;
    let maxDiff = -Infinity;

    thresholds.forEach(t => {
        const diff = t.val - Number(kpi[t.key]);
        if (diff > maxDiff) {
            maxDiff = diff;
            worst = t;
        }
    });

    if (maxDiff <= 0) {
        return { 
            label: "安定運用", 
            message: "各KPIは基準をクリアしています。現在の運用を継続しつつ、母集団の最大化を検討してください。",
            urgency: "低",
            loss: 0,
            deadline: "今月",
            concreteAction: "主要媒体の週次モニタリングを継続する。"
        };
    }

    // 機会損失の推定（人数の算出）
    // そのフェーズの母数(den)に対して、基準値に達していれば増えていたはずの人数を算出
    const lossCount = Math.round(worst.den * (worst.val / 100) - (worst.den * (Number(kpi[worst.key]) / 100)));

    // 実行詳細マッピング
    const executionDetails = {
        'open_rate': {
            urgency: "高",
            deadline: "即対応",
            concreteAction: "現在送信中のスカウト件名TOP3を書き換え、A/Bテストを開始する。1文目に『年収提示額』または『フルリモート可否』を明記する。",
            message: "スカウトの開封率向上が最優先です。ターゲット設定と件名を見直しましょう。"
        },
        'apply_rate': {
            urgency: "高",
            deadline: "今週",
            concreteAction: "求人票の『仕事の面白さ』セクションに具体的なプロジェクト事例を3件追加する。カジュアル面談への導線をバナー化して強調する。",
            message: "求人の魅力付けが不足しています。募集要項やスカウト文面の訴求を強化してください。"
        },
        'doc_pass_rate': {
            urgency: "中",
            deadline: "今週",
            concreteAction: "現場面接官と『絶対にNGな条件』を3つ再定義し、媒体の検索フィルタに反映する。媒体を変えるか、エージェントへの推薦依頼文を修正する。",
            message: "ターゲットのミスマッチが発生しています。選考基準のすり合わせが必要です。"
        },
        'interview_1_rate': { // key mismatch fixed below
            urgency: "中",
            deadline: "今月",
            concreteAction: "1次面接の評価項目に『志向性の合致』を追加し、現場担当者へ30分のレクチャーを実施する。面接冒頭10分で会社のビジョンを詳しく説明する時間を設ける。",
            message: "面接での見極めまたは魅力付けに課題があります。面接プロセスの改善が必要です。"
        },
        'accept_rate': {
            urgency: "高",
            deadline: "即対応",
            concreteAction: "内定通知から24時間以内に、配属先上長とのフォロー会食または面談をセットする。オファーレターに『なぜあなたが必要なのか』という手紙を添える。",
            message: "内定承諾率がボトルネックです。クロージングフェーズのフォローを強化しましょう。"
        }
    };

    // key mapping check
    const key = worst.key === 'interview_rate' ? 'interview_1_rate' : worst.key;
    const detail = executionDetails[worst.key] || executionDetails[key] || {};

    return {
        label: worst.label,
        message: detail.message,
        urgency: detail.urgency,
        loss: lossCount,
        deadline: detail.deadline,
        concreteAction: detail.concreteAction
    };
}

function analyzeNGReasons(data) {
    const counts = {};
    data.forEach(row => {
        const reason = row.ng_reason;
        if (reason && reason.trim()) {
            counts[reason] = (counts[reason] || 0) + 1;
        }
    });

    const sorted = Object.entries(counts)
        .map(([reason, count]) => ({ reason, count }))
        .sort((a, b) => b.count - a.count);

    const topReason = sorted[0]?.reason || "なし";
    
    const comments = {
        "スキル不足": "ターゲット条件の緩和、またはスカウト対象のスキルの再定義が必要です。",
        "条件不一致": "年収や働き方など、募集条件が市場相場と乖離している可能性があります。",
        "書類NG": "スクリーニング基準が厳しすぎるか、応募経路のターゲットがズレています。",
        "1次面接NG": "面接評価基準が不明確か、現場との目線合わせが不足しています。",
        "最終面接NG": "カルチャーマッチの見極めに課題があるか、事前の魅力付けが不足しています。",
        "内定辞退": "競合他社との魅力付け負け、または選考スピードに課題があります。"
    };

    return {
        ranking: sorted.slice(0, 5),
        topReason,
        comment: comments[topReason] || "NG理由の傾向を分析し、選考プロセスの最適化を行ってください。"
    };
}

function evaluateMedia(mediaKPI) {
    return Object.entries(mediaKPI)
        .map(([name, data]) => ({
            name,
            joinRate: Number(data.join_rate),
            applied: data.applied,
            status: Number(data.join_rate) > 10 ? "強み" : "改善/停止検討"
        }))
        .sort((a, b) => b.joinRate - a.joinRate)
        .map((m, i) => ({ ...m, rank: i + 1 }));
}