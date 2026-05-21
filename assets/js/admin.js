let originalData = JSON.parse(JSON.stringify(window.AcademyData || {}));
let workingData = JSON.parse(localStorage.getItem("PAHSFAS_WORKING_DATA") || JSON.stringify(originalData));
let sections = Object.keys(workingData);
let current = sections[0];
const tabs = document.getElementById("tabs"), editor = document.getElementById("jsonEditor"), title = document.getElementById("sectionTitle"), msg = document.getElementById("message");
function label(s){ return s.replace(/([A-Z])/g, " $1").replace(/^./, c => c.toUpperCase()); }
function showMessage(text, ok=true){ msg.className = ok ? "ok" : "err"; msg.textContent = text; }
function renderTabs(){ tabs.innerHTML = sections.map(s => `<button data-section="${s}" class="${s===current?'active':''}">${label(s)}</button>`).join(""); tabs.querySelectorAll("button").forEach(b => b.onclick = () => { saveCurrent(false); current = b.dataset.section; render(); }); }
function render(){ renderTabs(); title.textContent = label(current); editor.value = JSON.stringify(workingData[current], null, 2); }
function saveCurrent(show=true){ try{ workingData[current] = JSON.parse(editor.value); workingData.lastUpdated = new Date().toISOString().slice(0,10); localStorage.setItem("PAHSFAS_WORKING_DATA", JSON.stringify(workingData)); if(show) showMessage("Saved in browser. Download site-data.js to update live website."); return true; }catch(e){ if(show) showMessage("JSON error: " + e.message, false); return false; } }
function download(filename, text){ const blob = new Blob([text], {type:"text/plain;charset=utf-8"}); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url); }
document.getElementById("saveLocal").onclick = () => saveCurrent(true);
document.getElementById("downloadJS").onclick = () => { if(!saveCurrent(false)) return; download("site-data.js", "window.AcademyData = " + JSON.stringify(workingData, null, 2) + ";\n"); showMessage("Downloaded. Replace website file: data/site-data.js"); };
document.getElementById("downloadJSON").onclick = () => { if(!saveCurrent(false)) return; download(current + ".json", JSON.stringify(workingData[current], null, 2)); };
document.getElementById("resetBtn").onclick = () => { localStorage.removeItem("PAHSFAS_WORKING_DATA"); workingData = JSON.parse(JSON.stringify(originalData)); render(); showMessage("Reset to original file data."); };
render();
