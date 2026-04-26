// app.js (Modules removed for file:// support)

async function init() {
    // デフォルトデータを表示
    switchDemo('A');
}

async function switchDemo(type) {
    try {
        console.log(`Switching demo data to: ${type}`);
        
        // ボタンのハイライト更新
        document.querySelectorAll('.demo-switcher button').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`.demo-switcher button[onclick*="'${type}'"]`);
        if (activeBtn) activeBtn.classList.add('active');

        let csvContent = "";
        if (type === 'A') csvContent = caseA_scoutWeak;
        else if (type === 'B') csvContent = caseB_qualityMismatch;
        else if (type === 'C') csvContent = caseC_closingWeak;

        const data = parseCSV(csvContent);
        
        if (!data || data.length === 0) {
            console.error("No data loaded.");
            document.getElementById("diagnosis").innerHTML = `<div class="card"><h2 style="color:var(--bad);">データ読み込みエラー</h2></div>`;
            return;
        }

        updateDashboard(data);

    } catch (error) {
        console.error("Critical error during demo switch:", error);
        document.getElementById("diagnosis").innerHTML = `<div class="card"><h2 style="color:var(--bad);">システムエラー</h2><p>${error.message}</p></div>`;
    }
}

function updateDashboard(data) {
    console.log("Calculating funnel...");
    const funnel = calculateFunnel(data);
    
    console.log("Calculating KPIs...");
    const kpi = calculateKPI(funnel);
    
    console.log("Calculating Media KPIs...");
    const mediaKPI = calculateMediaKPI(data);
    
    console.log("Diagnosing hiring process...");
    const diagnosis = diagnoseHiring(data, funnel, kpi, mediaKPI);
    
    console.log("Rendering dashboard...");
    renderDashboard(funnel, kpi, mediaKPI, diagnosis);
    console.log("Dashboard rendering complete.");
}

init();