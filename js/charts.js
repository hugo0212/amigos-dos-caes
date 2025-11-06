// charts.js - exemplo com Chart.js (compatível com SPA)
(function(){
  function renderCharts(root){
    const scope = root || document;
    const pie = scope.querySelector('#chartPie');
    const line = scope.querySelector('#chartLine');
    const bar = scope.querySelector('#chartBar');
    if(pie){
      const pieCtx = pie.getContext('2d');
      new Chart(pieCtx, { type:'pie', data:{ labels:['Resgate','Tratamento','Adoção'], datasets:[{ data:[40,35,25], backgroundColor:['#ff6b6b','#14a44d','#ffb020'] }] } });
    }
    if(line){
      const lineCtx = line.getContext('2d');
      new Chart(lineCtx, { type:'line', data:{ labels:['Jan','Fev','Mar','Abr','Mai','Jun'], datasets:[{ label:'Voluntários', data:[5,8,6,10,15,12], borderColor:'#0b6efd', tension:0.2, fill:false }] } });
    }
    if(bar){
      const barCtx = bar.getContext('2d');
      new Chart(barCtx, { type:'bar', data:{ labels:['Projeto A','Projeto B','Projeto C'], datasets:[{ label:'Recursos (R$)', data:[12000,8000,15000], backgroundColor:['#0b6efd','#14a44d','#ff6b6b'] }] } });
    }
  }

  // manter compatibilidade com páginas estáticas
  document.addEventListener('DOMContentLoaded', function(){ renderCharts(document); });
  // expor para SPA
  window.renderCharts = renderCharts;
})();
