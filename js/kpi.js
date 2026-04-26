// 媒体別KPI分析

function calculateMediaKPI(data) {
    const result = {};

    data.forEach(row => {
        const media = row.media || "不明";

        if (!result[media]) {
            result[media] = {
                total: 0,
                applied: 0,
                joined: 0
            };
        }

        result[media].total++;
        if (isTrue(row.applied)) result[media].applied++;
        if (isTrue(row.joined)) result[media].joined++;
    });

    // 入社率算出
    Object.keys(result).forEach(media => {
        const m = result[media];
        m.join_rate = rate(m.joined, m.applied);
    });

    return result;
}

function isTrue(val) {
    if (!val) return false;
    const v = String(val).trim();
    return v === "○" || v === "true" || v === "1";
}

function rate(num, den) {
    if (!den || den === 0) return 0;
    return (num / den * 100).toFixed(1);
}