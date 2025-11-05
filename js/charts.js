// charts.js - exemplo com Chart.js
document.addEventListener('DOMContentLoaded', function(){
  const pieCtx = document.getElementById('chartPie').getContext('2d');
  new Chart(pieCtx, { type:'pie', data:{ labels:['Educação','Saúde','Comunidade'], datasets:[{ data:[45,25,30], backgroundColor:['#0b6efd','#14a44d','#ffb020'] }] } });

  const lineCtx = document.getElementById('chartLine').getContext('2d');
  new Chart(lineCtx, { type:'line', data:{ labels:['Jan','Fev','Mar','Abr','Mai','Jun'], datasets:[{ label:'Voluntários', data:[5,8,6,10,15,12], borderColor:'#0b6efd', tension:0.2, fill:false }] } });

  const barCtx = document.getElementById('chartBar').getContext('2d');
  new Chart(barCtx, { type:'bar', data:{ labels:['Projeto A','Projeto B','Projeto C'], datasets:[{ label:'Recursos (R$)', data:[12000,8000,15000], backgroundColor:['#0b6efd','#14a44d','#ff6b6b'] }] } });
});
