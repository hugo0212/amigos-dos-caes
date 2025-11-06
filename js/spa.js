// spa.js - roteamento simples por hash + templates JS
(function(){
  const app = document.getElementById('app');
  const routes = {
    '/': T.home,
    '/sobre': T.sobre,
    '/projetos': T.projetos,
    '/voluntariado': T.voluntariado,
    '/doacoes': T.doacoes,
    '/transparencia': T.transparencia,
    '/contato': T.contato,
    '/blog': T.blog,
    '/graficos': T.graficos
  };

  const meta = {
    '/': { title: 'Amigos dos Cães — Início', desc: 'Resgate, cuidado e adoção de cães em situação de rua.' },
    '/sobre': { title: 'Sobre | Amigos dos Cães', desc: 'Quem somos e como atuamos na proteção animal.' },
    '/projetos': { title: 'Projetos | Amigos dos Cães', desc: 'Iniciativas de resgate, tratamento e adoção.' },
    '/voluntariado': { title: 'Voluntariado | Amigos dos Cães', desc: 'Participe das ações e faça a diferença.' },
    '/doacoes': { title: 'Doações | Amigos dos Cães', desc: 'Apoie com recursos para resgates e tratamentos.' },
    '/transparencia': { title: 'Transparência | Amigos dos Cães', desc: 'Prestação de contas e relatórios.' },
    '/contato': { title: 'Contato | Amigos dos Cães', desc: 'Fale conosco.' },
    '/blog': { title: 'Blog | Amigos dos Cães', desc: 'Histórias e dicas de adoção responsável.' },
    '/graficos': { title: 'Gráficos | Amigos dos Cães', desc: 'Indicadores e dados de impacto.' }
  };

  function setActiveLink(path){
    document.querySelectorAll('.nav-links a').forEach(a=>{
      const href = a.getAttribute('href') || '';
      const clean = href.replace('#','');
      a.classList.toggle('active', clean === path || (path==='/' && href==='#/'));
    });
  }

  function autosaveHook(root){
    root.querySelectorAll('form[data-autosave="true"]').forEach(form=>{
      const key = 'autosave:'+ (form.id || 'form');
      // restore
      const raw = localStorage.getItem(key);
      if(raw){
        try{ const data = JSON.parse(raw); Object.keys(data).forEach(k=>{ const el = form.querySelector(`[name="${k}"]`); if(el) el.value = data[k]; }); }catch{}
      }
      // save
      form.addEventListener('input', function(){
        const data = {};
        Array.from(form.elements).forEach(el=>{ if(el.name) data[el.name] = el.value; });
        localStorage.setItem(key, JSON.stringify(data));
      });
      form.addEventListener('submit', function(){ localStorage.removeItem(key); });
    });
  }

  function setSEO(path){
    const m = meta[path] || meta['/'];
    document.title = m.title;
    const d = document.querySelector('meta[name="description"]');
    if(d) d.setAttribute('content', m.desc);
    const ogt = document.querySelector('meta[property="og:title"]');
    if(ogt) ogt.setAttribute('content', m.title);
    const ogd = document.querySelector('meta[property="og:description"]');
    if(ogd) ogd.setAttribute('content', m.desc);
  }

  async function render(path){
    const view = routes[path] || routes['/'];
    app.setAttribute('aria-busy','true');
    app.innerHTML = view();
    app.setAttribute('aria-busy','false');

    // pós-render: popular cards, formularios e gráficos
    if(window.AppUtils) window.AppUtils.populateDynamic(app);
    autosaveHook(app);
    if(path === '/graficos' && typeof window.renderCharts === 'function'){
      window.renderCharts(app);
    }

    // salvar rota visitada
    localStorage.setItem('lastRoute', path);
    setActiveLink(path);
    setSEO(path);
    // evento customizado (útil para testes)
    document.dispatchEvent(new CustomEvent('spa:navigated', { detail:{ path } }));
  }

  function currentPath(){
    const hash = location.hash || '#/';
    const path = hash.replace(/^#/, '');
    return path;
  }

  window.addEventListener('hashchange', function(){ render(currentPath()); });

  document.addEventListener('DOMContentLoaded', function(){
    // restaurar última rota se aplicável
    const initial = location.hash ? currentPath() : (localStorage.getItem('lastRoute') || '/');
    if(!location.hash) location.hash = '#'+initial;
    render(currentPath());
  });
})();
