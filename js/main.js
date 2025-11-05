// main.js - comportamento simples para scaffold
document.addEventListener('DOMContentLoaded', function(){
  // preencher galeria de imagens com placeholders
  const featured = document.getElementById('featured');
  const projectsList = document.getElementById('projects-list');
  if(featured){
    for(let i=1;i<=6;i++){
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<img loading="lazy" class="responsive" src="assets/images/img${i}.svg" alt="Imagem ${i}"><h3>Projeto ${i}</h3><p>Descri\u00e7\u00e3o curta do projeto.</p>`;
      featured.appendChild(div);
    }
  }
  if(projectsList){
    for(let i=1;i<=8;i++){
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<img loading="lazy" class="responsive" src="assets/images/img${i}.svg" alt="Projeto ${i}"><h3>Projeto ${i}</h3><p>Resumo do projeto ${i}.</p>`;
      projectsList.appendChild(div);
    }
  }

  // formulário simples: prevenir envio real e mostrar alerta
  document.querySelectorAll('form').forEach(f=>{
    f.addEventListener('submit', function(e){
      e.preventDefault();
      alert('Formulário enviado (simulado). Obrigado!');
    })
  })
  
  // toggle do menu em mobile
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    })
  }
});
