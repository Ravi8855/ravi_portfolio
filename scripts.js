(function(){
  const listEl = document.getElementById('certList');
  const modal = document.getElementById('certModal');
  const certImg = document.getElementById('certImage');
  const certTitle = document.getElementById('certTitle');
  const certClose = document.getElementById('certClose');
  const certDownload = document.getElementById('certDownload');

  function uid(){ return 'c'+Math.random().toString(36).slice(2,9); }

  function getCerts(){
    try{ return JSON.parse(localStorage.getItem('ravi_certs') || '[]') }
    catch(e){ return [] }
  }

  function setCerts(v){ localStorage.setItem('ravi_certs', JSON.stringify(v)) }

  function render(){
    const certs = getCerts();
    listEl.innerHTML = '';

    if(!certs.length){
      listEl.innerHTML = '<div style="color:var(--muted)">No certificates added.</div>';
      return;
    }

    certs.forEach(c=>{
      const card = document.createElement('div');
      card.className='cert-card';

      const thumb = document.createElement('div');
      thumb.className='cert-thumb';

      if (c.src) {
        if (c.src.startsWith("data:application/pdf")) {
          const pdfIcon = document.createElement("div");
          pdfIcon.style.width = "100%";
          pdfIcon.style.height = "150px";
          pdfIcon.style.display = "flex";
          pdfIcon.style.alignItems = "center";
          pdfIcon.style.justifyContent = "center";
          pdfIcon.style.fontSize = "60px";
          pdfIcon.style.color = "#0af";
          pdfIcon.textContent = "📄";
          thumb.appendChild(pdfIcon);
        } else {
          const img = document.createElement("img");
          img.src = c.src;
          img.alt = c.title || "Certificate";
          thumb.appendChild(img);
        }
      } else {
        thumb.textContent = c.title || "Certificate";
      }

      const meta = document.createElement('div');
      meta.className='cert-meta';
      meta.innerHTML = `
        <div style="font-weight:700">${c.title || 'Untitled'}</div>
        <div style="color:var(--muted);font-size:0.95rem">${c.issuer || 'Unknown'}</div>
      `;

      const actions = document.createElement('div');
      actions.className='cert-actions';

      const view = document.createElement('button');
      view.className='cert-btn edit';
      view.textContent='View';
      view.addEventListener('click', ()=>openCert(c.id));

      const download = document.createElement('button');
      download.className='cert-btn download';
      download.textContent='Download';
      download.addEventListener('click', ()=>downloadCert(c));

      actions.appendChild(view);
      actions.appendChild(download);

      card.appendChild(thumb);
      card.appendChild(meta);
      card.appendChild(actions);
      listEl.appendChild(card);
    });
  }

  function openCert(id){
    const certs = getCerts();
    const c = certs.find(x=>x.id===id);
    if(!c) return;

    certTitle.textContent = c.title || "Certificate";

    const oldPDF = document.getElementById("certPDF");
    if(oldPDF) oldPDF.remove();

    if(c.src && c.src.startsWith("data:application/pdf")){
      certImg.style.display = "none";

      const iframe = document.createElement("iframe");
      iframe.id = "certPDF";
      iframe.style.width = "100%";
      iframe.style.height = "60vh";
      iframe.style.border = "none";
      iframe.src = c.src;

      document.querySelector(".cert-panel").appendChild(iframe);

    } else {
      certImg.style.display = "block";
      certImg.src = c.src || "";
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    modal.dataset.current = id;
  }

  function closeModal(){
    const oldPDF = document.getElementById("certPDF");
    if(oldPDF) oldPDF.remove();

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    delete modal.dataset.current;
  }

  certClose.addEventListener('click', closeModal);

  certDownload.addEventListener('click', ()=>{
    const id = modal.dataset.current;
    const certs = getCerts();
    const c = certs.find(x=>x.id===id);
    if(!c) return;
    downloadCert(c);
  });

  function downloadCert(c){
    if(!c.src){
      alert("No certificate available.");
      return;
    }

    const a = document.createElement("a");
    a.href = c.src;
    const ext = c.src.startsWith("data:application/pdf") ? ".pdf" : ".png";
    a.download = (c.title || "certificate") + ext;

    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  const addBtn = document.getElementById('addCertBtn');
  const fileInput = document.getElementById('certFileInput');

  if(addBtn){
    addBtn.addEventListener('click', ()=> fileInput.click());
  }

  if(fileInput){
    fileInput.addEventListener('change', ()=>{
      const file = fileInput.files[0];
      if(!file) return;

      const reader = new FileReader();
      reader.onload = e=>{
        addCertificate({
          title: file.name,
          issuer: "Uploaded",
          src: e.target.result
        });
        alert("Certificate added!");
      };
      reader.readAsDataURL(file);
    });
  }

  function addCertificate(obj){
    const certs = getCerts();
    certs.push({
      id: uid(),
      title: obj.title || "Untitled",
      issuer: obj.issuer || "Unknown",
      src: obj.src || ""
    });
    setCerts(certs);
    render();
  }

  window.addCertificate = addCertificate;

  if(!getCerts().length){
    setCerts([
      {id:uid(), title:'Oracle Cloud Foundations', issuer:'Oracle', src:''},
      {id:uid(), title:'Infosys Generative AI', issuer:'Infosys', src:''},
      {id:uid(), title:'Infosys Generative AI', issuer:'Infosys', src:'prompt infosys_page-0001.jpg'},
    ]);
  }

  render();
})();

// Certificate modal logic
const certModal = document.getElementById('certificateModal');
const certModalBody = document.getElementById('certificateModalBody');
const certModalClose = document.getElementById('certificateModalClose');

function openCertificateModal(certFile) {
  certModalBody.innerHTML = '';
  if (!certFile) {
    certModalBody.innerHTML = '<div style="color:var(--muted);font-size:1.1rem">Certificate not found.</div>';
    certModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    return;
  }

  const src = encodeURI(certFile);

  const toolbar = document.createElement('div');
  toolbar.style.display = 'flex';
  toolbar.style.width = '100%';
  toolbar.style.justifyContent = 'flex-end';
  toolbar.style.marginBottom = '12px';

  const openLink = document.createElement('a');
  openLink.href = src;
  openLink.target = '_blank';
  openLink.rel = 'noopener noreferrer';
  openLink.textContent = 'Open in new tab';
  openLink.style.padding = '8px 12px';
  openLink.style.borderRadius = '10px';
  openLink.style.background = 'rgba(255,255,255,0.03)';
  openLink.style.color = 'var(--text)';
  openLink.style.fontWeight = '600';
  openLink.style.textDecoration = 'none';
  openLink.style.border = '1px solid rgba(255,255,255,0.06)';
  toolbar.appendChild(openLink);
  certModalBody.appendChild(toolbar);

  if (certFile.match(/\.(jpg|jpeg|png|gif)$/i)) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Certificate';
    img.style.maxWidth = '90vw';
    img.style.maxHeight = '80vh';
    img.style.borderRadius = '12px';
    img.style.boxShadow = '0 4px 32px rgba(0,0,0,0.3)';
    img.addEventListener('error', () => {
      const msg = document.createElement('div');
      msg.style.color = 'var(--muted)';
      msg.style.fontSize = '1.05rem';
      msg.style.marginTop = '8px';
      msg.textContent = 'Unable to preview image — use \"Open in new tab\".';
      certModalBody.appendChild(msg);
    });
    certModalBody.appendChild(img);
  } else if (certFile.match(/\.(pdf)$/i)) {
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.style.width = '90vw';
    iframe.style.height = '80vh';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '12px';
    iframe.style.boxShadow = '0 4px 32px rgba(0,0,0,0.3)';
    iframe.addEventListener('error', () => {
      const msg = document.createElement('div');
      msg.style.color = 'var(--muted)';
      msg.style.fontSize = '1.05rem';
      msg.style.marginTop = '8px';
      msg.textContent = 'Unable to preview PDF — use \"Open in new tab\".';
      certModalBody.appendChild(msg);
    });
    certModalBody.appendChild(iframe);
  } else {
    certModalBody.innerHTML = '<div style="color:var(--muted);font-size:1.1rem">Unsupported certificate format.</div>';
  }

  certModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
  certModal.style.display = 'none';
  document.body.style.overflow = '';
}

if (certModalClose) certModalClose.addEventListener('click', closeCertificateModal);
if (certModal) {
  certModal.addEventListener('click', (e) => { if (e.target === certModal) closeCertificateModal(); });
}
document.addEventListener('keydown', (e) => { if (certModal.style.display === 'flex' && e.key === 'Escape') closeCertificateModal(); });

document.querySelectorAll('.ach-card[data-certificate]').forEach(card => {
  card.style.cursor = 'pointer';
  card.setAttribute('tabindex', '0');
  function handleOpen() {
    const src = card.getAttribute('data-certificate');
    if (!src) return;
    if (/^https?:\/\//i.test(src)) {
      window.open(src, '_blank', 'noopener');
    } else {
      openCertificateModal(src);
    }
  }
  card.addEventListener('click', handleOpen);
  card.addEventListener('keypress', (e) => { if (e.key === 'Enter' || e.key === ' ') handleOpen(); });
});

const PROJECTS = [
  {
    id: 'signfusion',
    title: 'ISL Translator — Sign Fusion',
    desc: 'Real-time ISL translator combining ML with a 3D avatar interface.',
    live: 'https://sign-fusion.vercel.app',
    repo: 'mdismail25/Sign-Fusion',
    thumbnails: [
      'https://images.unsplash.com/photo-1526378722051-8f1b7b8b4ca3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1200&auto=format&fit=crop'
    ],
    video: ''
  },
  {
    id: 'learnsign',
    title: 'LearnSign — 3D Avatar Learning',
    desc: 'Interactive 3D avatar animating letters and words for ISL learning.',
    live: 'https://learnsign-demo.vercel.app',
    repo: 'Ravi8855/LearnSign-3D-Avatar',
    thumbnails: [
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop'
    ],
    video: ''
  },
  {
    id: 'unitconverter',
    title: 'Unit Converter — Android App',
    desc: 'Lightweight Android unit converter app.',
    repo: 'Ravi8855/Unit-Converter-App',
    thumbnails: [],
    video: ''
  }
];

function createProjectCard(p) {
  const article = document.createElement('article');
  article.className = 'proj-card';
  article.tabIndex = 0;
  article.setAttribute('data-id', p.id);

  const thumb = document.createElement('div');
  thumb.className = 'proj-thumb';
  if (p.thumbnails && p.thumbnails.length) {
    thumb.dataset.src = p.thumbnails[0];
    thumb.style.backgroundSize = 'cover';
    thumb.style.backgroundPosition = 'center';
  } else {
    thumb.textContent = p.title.split(' ')[0];
  }

  const content = document.createElement('div');

  const title = document.createElement('div');
  title.className = 'proj-title';
  title.textContent = p.title;

  const desc = document.createElement('div');
  desc.className = 'proj-desc';
  desc.textContent = p.desc;

  const meta = document.createElement('div');
  meta.className = 'proj-meta';

  const tags = document.createElement('div');
  tags.className = 'tech-tags';
  const t1 = document.createElement('span'); t1.className='tag'; t1.textContent = 'Web';
  tags.appendChild(t1);

  const links = document.createElement('div');
  links.className = 'project-links';
  if (p.live) {
    const aLive = document.createElement('a'); aLive.className='btn-live'; aLive.href=p.live; aLive.target='_blank'; aLive.rel='noopener noreferrer'; aLive.textContent='Live';
    links.appendChild(aLive);
  }
  if (p.repo) {
    const aCode = document.createElement('a'); aCode.className='btn-code'; aCode.href=`https://github.com/${p.repo}`; aCode.target='_blank'; aCode.rel='noopener noreferrer'; aCode.textContent='Code';
    links.appendChild(aCode);
  }

  const gh = document.createElement('div');
  gh.className = 'gh-stats';
  gh.innerHTML = '<span data-stars>—</span> ★ &nbsp; <span data-forks>—</span> ⎇';

  meta.appendChild(tags);
  meta.appendChild(links);

  content.appendChild(title);
  content.appendChild(desc);
  content.appendChild(meta);
  content.appendChild(gh);

  article.appendChild(thumb);
  article.appendChild(content);

  article.addEventListener('click', () => openModal(p.id));
  article.addEventListener('keypress', (e) => { if (e.key === 'Enter') openModal(p.id); });

  return article;
}

const projectsGrid = document.getElementById('projectsGrid');
if (projectsGrid) {
  PROJECTS.forEach(p => {
    const card = createProjectCard(p);
    projectsGrid.appendChild(card);
  });
}

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const thumb = entry.target.querySelector('.proj-thumb');
      if (thumb && thumb.dataset.src) {
        thumb.style.backgroundImage = `url('${thumb.dataset.src}')`;
        thumb.removeAttribute('data-src');
      }
      io.unobserve(entry.target);
    }
  });
}, { rootMargin: '200px' });

document.querySelectorAll('.proj-card').forEach(card => io.observe(card));

async function fetchRepoStats(repo) {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`);
    if (!res.ok) throw new Error('GitHub API error');
    return await res.json();
  } catch (e) {
    return null;
  }
}

async function populateGitStats() {
  const cards = document.querySelectorAll('.proj-card');
  for (const card of cards) {
    const repoLink = card.querySelector('.btn-code');
    const ghStats = card.querySelector('.gh-stats');
    if (!repoLink || !ghStats) continue;
    const href = repoLink.href;
    const m = href.match(/github\.com\/([^/]+\/[^/]+)/i);
    if (!m) continue;
    const repo = m[1];
    const data = await fetchRepoStats(repo);
    if (!data) { ghStats.innerHTML = '<span>—</span> ★'; continue; }
    const stars = data.stargazers_count || 0;
    const forks = data.forks_count || 0;
    const updated = data.updated_at ? new Date(data.updated_at).toLocaleDateString() : '';
    ghStats.innerHTML = `<span title="Stars">${stars}</span> ★ &nbsp; <span title="Forks">${forks}</span> ⎇ &nbsp; <small style="color:var(--muted);margin-left:8px">${updated}</small>`;
  }
}

populateGitStats();

const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  document.body.style.overflow = 'hidden';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');

  modalBody.innerHTML = '';
  const title = document.createElement('h3'); title.textContent = p.title; title.style.marginTop='0';
  const desc = document.createElement('p'); desc.textContent = p.desc; desc.style.color='var(--muted)';

  const carousel = document.createElement('div'); carousel.className='modal-carousel';
  const thumbs = p.thumbnails && p.thumbnails.length ? p.thumbnails : [];
  let idx = 0;

  const thumbPanel = document.createElement('div'); thumbPanel.className = 'modal-thumb';
  if (thumbs.length) {
    thumbPanel.style.backgroundImage = `url('${thumbs[0]}')`;
    thumbPanel.style.backgroundSize='cover';
    thumbPanel.style.backgroundPosition='center';
  } else {
    thumbPanel.textContent = p.title;
  }

  carousel.appendChild(thumbPanel);

  let videoEl = null;
  if (p.video) {
    let vidUrl = p.video;
    if (!vidUrl.includes('youtube') && vidUrl.length < 40) vidUrl = `https://www.youtube.com/embed/${vidUrl}`;
    videoEl = document.createElement('div');
    videoEl.style.marginTop = '12px';
    videoEl.innerHTML = `<iframe width="100%" height="360" src="${vidUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }

  const controls = document.createElement('div'); controls.className='carousel-controls';
  const prevBtn = document.createElement('button'); prevBtn.className='carousel-btn'; prevBtn.textContent='Prev';
  const nextBtn = document.createElement('button'); nextBtn.className='carousel-btn'; nextBtn.textContent='Next';

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!thumbs.length) return;
    idx = (idx - 1 + thumbs.length) % thumbs.length;
    thumbPanel.style.backgroundImage = `url('${thumbs[idx]}')`;
  });
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!thumbs.length) return;
    idx = (idx + 1) % thumbs.length;
    thumbPanel.style.backgroundImage = `url('${thumbs[idx]}')`;
  });

  const linkRow = document.createElement('div'); linkRow.style.display='flex'; linkRow.style.gap='10px'; linkRow.style.alignItems='center'; linkRow.style.marginTop='12px';
  if (p.live) {
    const aLive = document.createElement('a'); aLive.href = p.live; aLive.target='_blank'; aLive.rel='noopener noreferrer'; aLive.className='btn-live'; aLive.textContent='Open Live';
    linkRow.appendChild(aLive);
  }
  if (p.repo) {
    const aRepo = document.createElement('a'); aRepo.href = `https://github.com/${p.repo}`; aRepo.target='_blank'; aRepo.rel='noopener noreferrer'; aRepo.className='btn-code'; aRepo.textContent='View Code';
    linkRow.appendChild(aRepo);
  }

  const statsHolder = document.createElement('div'); statsHolder.style.marginLeft='auto'; statsHolder.style.color='var(--muted)'; statsHolder.textContent='Loading stats...';

  if (p.repo) {
    fetch(`https://api.github.com/repos/${p.repo}`).then(r => r.ok ? r.json() : null).then(data => {
      if (!data) { statsHolder.textContent='Stats unavailable'; return; }
      statsHolder.innerHTML = `★ ${data.stargazers_count || 0} &nbsp; ⎇ ${data.forks_count || 0} &nbsp; ${new Date(data.updated_at).toLocaleDateString()}`;
    }).catch(()=> statsHolder.textContent='Stats error');
  } else statsHolder.textContent='';

  linkRow.appendChild(statsHolder);

  controls.appendChild(prevBtn); controls.appendChild(nextBtn);

  modalBody.appendChild(title);
  modalBody.appendChild(desc);
  modalBody.appendChild(carousel);
  if (thumbs.length) modalBody.appendChild(controls);
  if (videoEl) modalBody.appendChild(videoEl);
  modalBody.appendChild(linkRow);

  function onKey(e) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  }
  document.addEventListener('keydown', onKey);
  modal.dataset.onKey = onKey;
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  const onKey = modal.dataset.onKey;
  if (onKey) {
    document.removeEventListener('keydown', onKey);
    delete modal.dataset.onKey;
  }
}
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

AOS.init({ duration:650, once:true, easing:'cubic-bezier(.2,.8,.2,1)' });
gsap.registerPlugin(ScrollTrigger);
gsap.from('h1',{y:18,opacity:0,duration:0.8,ease:'power3.out'});
gsap.from('.lead',{y:12,opacity:0,duration:0.8,delay:0.12});

const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections = ['about','skills','projects','achievements','internship','contact'].map(id => document.getElementById(id));
const sectionNames = ['About', 'Skills', 'Projects', 'Achievements', 'Internship', 'Contact'];
const pageTitle = document.getElementById('pageTitle');
const currentPageName = document.getElementById('currentPageName');

function onScroll(){
  const y = window.scrollY + 120;
  let activeSectionIndex = -1;

  sections.forEach((sec, i) => {
    if(!sec) return;
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    if(y >= top && y < bottom) {
      navLinks.forEach(l=>l.classList.remove('active'));
      if(navLinks[i]) navLinks[i].classList.add('active');
      activeSectionIndex = i;
    }
  });

  if(activeSectionIndex >= 0 && window.scrollY > 100) {
    currentPageName.textContent = sectionNames[activeSectionIndex];
    pageTitle.classList.add('visible');
  } else if(window.scrollY < 100) {
    currentPageName.textContent = 'Home';
    pageTitle.classList.remove('visible');
  } else if(activeSectionIndex < 0 && window.scrollY > 100) {
    pageTitle.classList.add('visible');
  }

  const nav = document.getElementById('mainNav') || document.querySelector('nav');
  if(window.scrollY > 48) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
}
window.addEventListener('scroll', onScroll);
onScroll();

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = isOpen ? 'none' : 'flex';
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    mobileMenu.setAttribute('aria-hidden', String(isOpen));
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', ()=>{
    mobileMenu.style.display='none';
    hamburger.setAttribute('aria-expanded','false');
  }));
}

const themeToggleTop = document.getElementById('themeToggleTop');
const themeToggleMobile = document.getElementById('themeToggleMobile');
function toggleTheme(){
  document.body.classList.toggle('light');
  localStorage.setItem('ravi_theme', document.body.classList.contains('light') ? 'light' : 'dark');
}
if(themeToggleTop) themeToggleTop.addEventListener('click', toggleTheme);
if(themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
if(localStorage.getItem('ravi_theme') === 'light') document.body.classList.add('light');

gsap.utils.toArray('.proj-card').forEach((card,i) => {
  gsap.from(card, { y:20, opacity:0, duration:0.6, delay:0.1 + i*0.05, scrollTrigger:{trigger:card, start:'top 90%'} });
});

const sectionHeadings = gsap.utils.toArray('section h2');
sectionHeadings.forEach((heading) => {
  gsap.to(heading, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: heading,
      start: 'top 85%',
      toggleActions: 'play none none none',
      once: true
    }
  });
});

const skillCards = gsap.utils.toArray('.skill-card');
if(skillCards.length > 0) {
  const skillsSection = document.getElementById('skills');
  if(skillsSection) {
    skillCards.forEach((card, i) => {
      const isEven = i % 2 === 0;
      const delay = i * 0.15;

      gsap.fromTo(card,
        {
          opacity: 0,
          x: isEven ? -150 : 150,
          y: 0,
          rotationY: isEven ? -25 : 25,
          filter: 'blur(8px)',
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotationY: 0,
          filter: 'blur(0px)',
          scale: 1,
          duration: 1.0,
          delay: delay,
          ease: "elastic.out(1, 0.75)",
          scrollTrigger: {
            trigger: skillsSection,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );

      gsap.to(card, {
        y: -10,
        duration: 0.6,
        delay: delay + 0.5,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: skillsSection,
          start: 'top 80%',
          once: true
        }
      });
    });

    skillCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          x: 0,
          y: -8,
          rotationY: 0,
          scale: 1.03,
          filter: 'blur(0px)',
          duration: 0.5,
          ease: "back.out(2)"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          x: 0,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.in"
        });
      });
    });

    skillCards.forEach((card, cardIndex) => {
      const tags = card.querySelectorAll('.tag');
      tags.forEach((tag, tagIndex) => {
        gsap.from(tag, {
          opacity: 0,
          scale: 0,
          rotation: -180,
          duration: 0.6,
          delay: 0.8 + cardIndex * 0.15 + tagIndex * 0.08,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: skillsSection,
            start: 'top 80%',
            once: true
          }
        });
      });
    });
  }
}

const achCards = gsap.utils.toArray('.ach-card');
if(achCards.length > 0) {
  const achievementsSection = document.getElementById('achievements');
  if(achievementsSection) {
    achCards.forEach((card, i) => {
      const delay = i * 0.2;
      const angle = (i * 360) / achCards.length;

      gsap.fromTo(card,
        {
          opacity: 0,
          scale: 0.2,
          rotationZ: angle + 180,
          filter: 'blur(15px)',
          x: Math.cos(angle * Math.PI / 180) * 200,
          y: Math.sin(angle * Math.PI / 180) * 200
        },
        {
          opacity: 1,
          scale: 1,
          rotationZ: 0,
          filter: 'blur(0px)',
          x: 0,
          y: 0,
          duration: 1.2,
          delay: delay,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: achievementsSection,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );

      gsap.to(card, {
        scale: 1.05,
        duration: 0.4,
        delay: delay + 0.8,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: achievementsSection,
          start: 'top 80%',
          once: true
        }
      });
    });

    achCards.forEach((card, i) => {
      const title = card.querySelector('div:first-child');
      const desc = card.querySelector('div:last-child');
      const delay = i * 0.2 + 0.3;

      if(title) {
        gsap.from(title, {
          opacity: 0,
          scale: 0.5,
          rotation: -10,
          duration: 0.8,
          delay: delay,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: achievementsSection,
            start: 'top 80%',
            once: true
          }
        });
      }

      if(desc) {
        gsap.from(desc, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: delay + 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: achievementsSection,
            start: 'top 80%',
            once: true
          }
        });
      }
    });

    achCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.08,
          rotationZ: 2,
          duration: 0.6,
          ease: "back.out(2)"
        });

        const title = card.querySelector('div:first-child');
        const desc = card.querySelector('div:last-child');

        if(title) {
          gsap.to(title, {
            scale: 1.1,
            rotationZ: 2,
            duration: 0.4,
            ease: "back.out(2)"
          });
        }

        if(desc) {
          gsap.to(desc, {
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotationZ: 0,
          duration: 0.5,
          ease: "power2.in"
        });

        const title = card.querySelector('div:first-child');
        const desc = card.querySelector('div:last-child');

        if(title) {
          gsap.to(title, {
            scale: 1,
            rotationZ: 0,
            duration: 0.4,
            ease: "power2.in"
          });
        }

        if(desc) {
          gsap.to(desc, {
            scale: 1,
            duration: 0.4,
            ease: "power2.in"
          });
        }
      });
    });
  }
}

document.addEventListener('keyup', (e) => { if (e.key === 'Tab') document.documentElement.classList.add('show-focus'); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

function nextPage(){ alert('Pagination placeholder — all projects currently shown.'); }
function prevPage(){ alert('Pagination placeholder — all projects currently shown.'); }

populateGitStats();

