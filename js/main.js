// main.js - utilidades de UI e conteúdo dinâmico (compatível com SPA)
(function(){
  function populateDynamic(root){
    const scope = root || document;
    const featured = scope.querySelector('#featured');
    const projectsList = scope.querySelector('#projects-list');
    if(featured && !featured.dataset.filled){
      featured.dataset.filled = 'true';
      for(let i=1;i<=6;i++){
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<img loading="lazy" class="responsive" src="assets/images/img${i}.svg" alt="Imagem ${i}"><h3>Projeto ${i}</h3><p>Descrição curta do projeto.</p>`;
        featured.appendChild(div);
      }
    }
    if(projectsList && !projectsList.dataset.filled){
      projectsList.dataset.filled = 'true';
      for(let i=1;i<=8;i++){
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `<img loading=\"lazy\" class=\"responsive\" src=\"assets/images/img${i}.svg\" alt=\"Projeto ${i}\"><h3>Projeto ${i}</h3><p>Resumo do projeto ${i}.</p>`;
        projectsList.appendChild(div);
      }
    }

    // fallback de formulários sem validação customizada (ex.: páginas estáticas)
    scope.querySelectorAll('form[data-simulate-submit]')
      .forEach(f=>{
        if(f.dataset.bound) return; f.dataset.bound = '1';
        f.addEventListener('submit', function(e){ e.preventDefault(); alert('Formulário enviado (simulado). Obrigado!'); });
      });
  }

  function setupMobileMenu(){
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    if(toggle && nav){
      toggle.addEventListener('click', function(){
        const open = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(open));
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function(){
    setupMobileMenu();
    populateDynamic(document);
  });

  // expor para uso pela SPA após render
  window.AppUtils = { populateDynamic, setupMobileMenu };
})();
