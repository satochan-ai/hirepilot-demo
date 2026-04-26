// 採用ファネル集計ロジック

function calculateFunnel(data) {
    const stages = {
        scout: 0,
        opened: 0,
        applied: 0,
        document_pass: 0,
        interview_1: 0,
        interview_2: 0,
        offer: 0,
        accepted: 0,
        joined: 0
    };

    data.forEach(row => {
        stages.scout++;

        if (isTrue(row.opened)) stages.opened++;
        if (isTrue(row.applied)) stages.applied++;
        if (isTrue(row.document_pass)) stages.document_pass++;
        if (isTrue(row.interview_1)) stages.interview_1++;
        if (isTrue(row.interview_2)) stages.interview_2++;
        if (isTrue(row.offer)) stages.offer++;
        if (isTrue(row.accepted)) stages.accepted++;
        if (isTrue(row.joined)) stages.joined++;
    });

    return stages;
}

function isTrue(val) {
    if (!val) return false;
    const v = String(val).trim();
    return v === "○" || v === "true" || v === "1";
}