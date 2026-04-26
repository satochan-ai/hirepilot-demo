// KPI計算ロジック

function calculateKPI(funnel) {
    return {
        open_rate: rate(funnel.opened, funnel.scout),
        apply_rate: rate(funnel.applied, funnel.opened),
        doc_pass_rate: rate(funnel.document_pass, funnel.applied),
        interview_rate: rate(funnel.interview_2, funnel.interview_1),
        offer_rate: rate(funnel.offer, funnel.interview_2),
        accept_rate: rate(funnel.accepted, funnel.offer),
        join_rate: rate(funnel.joined, funnel.applied)
    };
}

function rate(num, den) {
    if (!den || den === 0) return 0;
    return (num / den * 100).toFixed(1);
}