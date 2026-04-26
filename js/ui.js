function renderDashboard(funnel, kpi, mediaKPI, diagnosis) {
    renderPriorityAction(diagnosis.priority);
    renderExecutionPlan(diagnosis.priority);
    renderDiagnosis(diagnosis);
    renderKPI(kpi);
    renderFunnel(funnel);
    renderActions(diagnosis);
    renderNGAnalysis(diagnosis.ngAnalysis);
    renderMedia(diagnosis.mediaEvaluation);
}

function renderPriorityAction(p) {
    const el = document.getElementById("priority-action");
    if (!el) return;

    const urgencyClass = p.urgency === "高" ? "status-bad" : p.urgency === "中" ? "status-warn" : "status-good";

    el.innerHTML = `
    <div class="card" style="border-left: 6px solid var(--bad); background: #fffafb;">
      <div style="display:flex; justify-content:space-between; align-items:start;">
        <div>
          <div class="kpi-label" style="color: var(--bad); font-weight: 800;">最優先課題: ${escapeHtml(p.label)}</div>
          <div style="font-size: 18px; font-weight: 700; margin-top: 8px;">${escapeHtml(p.message)}</div>
        </div>
        <div style="text-align:right;">
          <span class="status-badge ${urgencyClass}" style="margin:0;">緊急度: ${escapeHtml(p.urgency)}</span>
          <div style="margin-top:8px; font-weight:700; color:var(--bad); font-size:13px;">
            機会損失: 約 ${p.loss} 名
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderExecutionPlan(p) {
    const el = document.getElementById("execution-plan");
    if (!el) return;

    el.innerHTML = `
    <div class="card" style="border-top: 4px solid var(--primary);">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <h2 style="margin:0;">実行プラン</h2>
        <span class="status-badge status-good" style="margin:0; background:var(--primary);">期限: ${escapeHtml(p.deadline)}</span>
      </div>
      <div style="background: var(--bg); padding:20px; border-radius:16px; border:1px dashed var(--primary);">
        <div style="font-size:12px; color:var(--primary); font-weight:800; margin-bottom:8px; text-transform:uppercase;">具体的なアクション</div>
        <div style="font-size:16px; font-weight:700; line-height:1.6;">
          ${escapeHtml(p.concreteAction)}
        </div>
      </div>
    </div>
  `;
}

function renderDiagnosis(d) {
    const el = document.getElementById("diagnosis");
    const statusClass =
        d.status === "良好" ? "status-good" :
            d.status === "注意" ? "status-warn" :
                "status-bad";

    el.innerHTML = `
    <div class="card">
      <h2>採用診断</h2>
      <span class="status-badge ${statusClass}">${d.status}</span>
      <div class="kpi-value">${d.score}点</div>
      <p class="kpi-label">採用プロセス全体の健全度スコア</p>

      <h2 style="margin-top:20px;">主な課題</h2>
      <ul class="list">
        ${d.issues.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>

      <h2 style="margin-top:20px;">強み</h2>
      <ul class="list">
        ${d.strengths.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderKPI(k) {
    const el = document.getElementById("kpi");

    const items = [
        ["開封率", k.open_rate],
        ["応募率", k.apply_rate],
        ["書類通過率", k.doc_pass_rate],
        ["面接通過率", k.interview_rate],
        ["内定率", k.offer_rate],
        ["承諾率", k.accept_rate],
        ["入社率", k.join_rate]
    ];

    el.innerHTML = `
    <div class="grid kpi-grid">
      ${items.map(([label, value]) => `
        <div class="card kpi-card">
          <div class="kpi-label">${label}</div>
          <div class="kpi-value">${value}%</div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderFunnel(f) {
    const el = document.getElementById("funnel");

    const stages = [
        ["スカウト", f.scout],
        ["開封", f.opened],
        ["応募", f.applied],
        ["書類通過", f.document_pass],
        ["1次面接", f.interview_1],
        ["最終面接", f.interview_2],
        ["内定", f.offer],
        ["承諾", f.accepted],
        ["入社", f.joined]
    ];

    const max = f.scout || 1;

    el.innerHTML = `
    <div class="card">
      <h2>採用ファネル</h2>
      ${stages.map(([label, value]) => `
        <div class="funnel-row">
          <div>${label}</div>
          <div class="bar">
            <div class="bar-fill" style="width:${Math.min((value / max) * 100, 100)}%"></div>
          </div>
          <strong>${value}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderActions(d) {
    const el = document.getElementById("actions");

    el.innerHTML = `
    <div class="card">
      <h2>推奨アクション</h2>
      <ul class="list">
        ${d.actions.map(item => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderNGAnalysis(ng) {
    const el = document.getElementById("ng-analysis");
    if (!el) return;

    el.innerHTML = `
    <div class="card">
      <h2>NG理由分析</h2>
      <div class="grid two-column" style="margin-top:0; gap:24px;">
        <div>
          <h3 style="font-size:14px; color:var(--muted); margin-bottom:12px;">理由別ランキング</h3>
          <ul class="list">
            ${ng.ranking.map(item => `
              <li style="display:flex; justify-content:space-between; align-items:center;">
                <span>${escapeHtml(item.reason)}</span>
                <strong style="font-size:16px;">${item.count}件</strong>
              </li>
            `).join("")}
          </ul>
        </div>
        <div style="background: var(--primary-light); padding:20px; border-radius:16px;">
          <h3 style="font-size:14px; color:var(--primary); margin-bottom:8px;">最多理由: ${escapeHtml(ng.topReason)}</h3>
          <p style="font-size:15px; font-weight:600; margin:0;">
            ${escapeHtml(ng.comment)}
          </p>
        </div>
      </div>
    </div>
  `;
}

function renderMedia(mediaEval) {
    const el = document.getElementById("media");

    el.innerHTML = `
    <div class="card">
      <h2>媒体別評価</h2>
      <table class="media-table">
        <thead>
          <tr>
            <th>ランク</th>
            <th>媒体</th>
            <th>応募数</th>
            <th>入社率</th>
            <th>評価</th>
          </tr>
        </thead>
        <tbody>
          ${mediaEval.map(m => `
            <tr>
              <td><span style="font-weight:800; color:var(--primary);">#${m.rank}</span></td>
              <td><strong>${escapeHtml(m.name)}</strong></td>
              <td>${m.applied}</td>
              <td>${m.joinRate}%</td>
              <td>
                <span class="status-badge ${m.status === '強み' ? 'status-good' : 'status-warn'}" style="margin:0; font-size:11px;">
                  ${m.status}
                </span>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}