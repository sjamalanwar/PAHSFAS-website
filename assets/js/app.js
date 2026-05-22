const data = window.AcademyData || {};
const $ = (id) => document.getElementById(id);
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

$("menuBtn")?.addEventListener("click", () => $("nav").classList.toggle("open"));

function render(){
  $("year").textContent = new Date().getFullYear();
  $("brandLogo").src = data.academy?.logo || "assets/images/logo.png";
  $("brandName").textContent = data.academy?.fullName || "";
  $("academyName").textContent = data.academy?.fullName || "Academy";
  $("tagline").textContent = data.academy?.tagline || "";
  $("chiefPhoto").src = data.academy?.chiefPhoto || "";
  $("chiefLeaderPhoto").src = data.academy?.chiefPhoto || "";
  $("chiefName").textContent = data.academy?.chiefName || "";
  $("chiefTitle").textContent = data.academy?.chiefTitle || "";
  if ($("chiefBio")) $("chiefBio").textContent = data.academy?.chiefBio || "";
  $("chairmanPhoto").src = data.academy?.chairmanPhoto || "";
  $("chairmanName").textContent = data.academy?.chairmanName || "";
  $("chairmanTitle").textContent = data.academy?.chairmanTitle || "";
  $("chairmanMessage").textContent = data.academy?.chairmanMessage || "";
  $("vision").textContent = data.academy?.vision || "";
  $("mission").textContent = data.academy?.mission || "";
  $("admissionStatus").textContent = data.admission?.status || "Open";
  $("quickPhone").textContent = (data.contact?.phone || []).join(" / ");
  $("quickEmail").textContent = data.contact?.email || "";
  $("noticeList").innerHTML = (data.notices || []).map(n => `<article class="card"><p class="meta">${esc(n.date)}</p><h3>${esc(n.title)}</h3><p>${esc(n.body)}</p></article>`).join("");
  $("infraList").innerHTML = (data.infrastructure || []).map(x => `<li>${esc(x)}</li>`).join("");

  function renderCourses(filter=""){
    filter = filter.toLowerCase();
    $("courseList").innerHTML = (data.courses || []).filter(c => JSON.stringify(c).toLowerCase().includes(filter)).map(c => `
      <article class="card"><p class="meta">${esc(c.level)}</p><h3>${esc(c.title)}</h3><p>${(c.subjects||[]).map(esc).join(", ")}</p></article>`).join("");
  }
  renderCourses(); $("courseSearch")?.addEventListener("input", e => renderCourses(e.target.value));

  function renderFaculty(filter=""){
    filter = filter.toLowerCase();
    $("facultyList").innerHTML = (data.faculty || []).filter(f => JSON.stringify(f).toLowerCase().includes(filter)).map(f => `
      <article class="faculty-card">
        <img src="${esc(f.photo)}" alt="${esc(f.name)}">
        <div><h3>${esc(f.name)}</h3><p class="subject">${esc(f.subject)}</p><p class="role">${esc(f.role)}</p><p>${esc(f.details)}</p></div>
      </article>`).join("");
  }
  renderFaculty(); $("facultySearch")?.addEventListener("input", e => renderFaculty(e.target.value));

  $("posterList").innerHTML = (data.facultyPosters || []).map(p => `
    <article class="poster-card"><img src="${esc(p.image)}" alt="${esc(p.title)}"><h3>${esc(p.title)}</h3><p>${esc(p.subject)}</p></article>`).join("");

  $("feeList").innerHTML = (data.fees || []).map(f => `<article class="card"><p class="meta">${esc(f.details)}</p><h3>${esc(f.package)}</h3><p><strong>${esc(f.fee)}</strong></p>${f.link ? `<p><a class="btn" href="${esc(f.link)}" target="_blank" rel="noopener">Open PDF</a></p>` : ""}</article>`).join("");
  $("processList").innerHTML = (data.admission?.process || []).map(x => `<li>${esc(x)}</li>`).join("");
  $("reqList").innerHTML = (data.admission?.requirements || []).map(x => `<li>${esc(x)}</li>`).join("");
  if ($("faqList")) {
    $("faqList").innerHTML = (data.faqs || []).map(f => `
      <details class="faq-item">
        <summary>${esc(f.q)}</summary>
        <p>${esc(f.a)}</p>
      </details>`).join("");
  }
  if ($("officeHours")) {
    $("officeHours").innerHTML = (data.officeHours || []).map(x => `<li>${esc(x)}</li>`).join("");
  }
  $("galleryList").innerHTML = (data.gallery || []).map(g => `<figure><img src="${esc(g.image)}" alt="${esc(g.title)}"><figcaption>${esc(g.title)}</figcaption></figure>`).join("");

  if ($("facebookName")) $("facebookName").textContent = data.social?.facebookPage?.name || "Facebook Page";
  if ($("facebookNote")) $("facebookNote").textContent = data.social?.facebookPage?.note || "Follow our Facebook page for updates.";
  if ($("facebookBtn")) $("facebookBtn").href = data.social?.facebookPage?.url || "#";

  $("address").textContent = data.contact?.address || "";
  $("phones").textContent = (data.contact?.phone || []).join(", ");
  $("email").textContent = data.contact?.email || "";
  const firstPhone = (data.contact?.phone || [""])[0].replace(/\D/g,"");
  $("callBtn").href = firstPhone ? `tel:${firstPhone}` : "#";
  const whatsappHref = data.contact?.whatsapp ? `https://wa.me/92${data.contact.whatsapp.replace(/\D/g,"").replace(/^0/,"")}` : "#";
  $("whatsappLink").href = whatsappHref;
  if ($("fabWhatsApp")) $("fabWhatsApp").href = whatsappHref;
  $("mapBtn").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.contact?.mapQuery || data.contact?.address || "")}`;

  if ($("backToTop")) {
    const onScroll = () => {
      $("backToTop").style.display = window.scrollY > 300 ? "flex" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    $("backToTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
}
render();
