// forms.js - máscaras simples e integração ViaCEP (JS puro)
(function(){
  function setInputFilter(textbox, inputFilter) {
    textbox.addEventListener('input', function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty('oldValue')) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = '';
      }
    });
  }

  // máscara de telefone (br)
  function maskTelefone(v){
    v = v.replace(/\D/g,'');
    if(v.length > 10) return v.replace(/(\d{2})(\d{5})(\d{4}).*/,'($1) $2-$3');
    if(v.length > 5) return v.replace(/(\d{2})(\d{4})(\d{0,4}).*/,'($1) $2-$3');
    if(v.length > 2) return v.replace(/(\d{2})(\d{0,5})/,'($1) $2');
    return v;
  }
  // máscara CPF
  function maskCPF(v){ v = v.replace(/\D/g,''); return v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2}).*/,'$1.$2.$3-$4').replace(/\.{2,}/,'.') }
  // máscara CEP
  function maskCEP(v){ v = v.replace(/\D/g,''); return v.replace(/(\d{5})(\d{0,3}).*/,'$1-$2'); }

  function fetchViaCEP(cep, onSuccess, onError){
    cep = cep.replace(/\D/g,'');
    if(cep.length !== 8) return onError && onError();
    fetch('https://viacep.com.br/ws/'+cep+'/json/')
      .then(r=>r.json())
      .then(data=>{ if(data.erro) onError && onError(); else onSuccess && onSuccess(data); })
      .catch(()=>onError && onError());
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('input[data-mask="telefone"]').forEach(inp=>{
      inp.addEventListener('input', e=>{ e.target.value = maskTelefone(e.target.value); });
    });
    document.querySelectorAll('input[data-mask="cpf"]').forEach(inp=>{
      inp.addEventListener('input', e=>{ e.target.value = maskCPF(e.target.value); });
    });
    document.querySelectorAll('input[data-mask="cep"]').forEach(inp=>{
      inp.addEventListener('input', e=>{ e.target.value = maskCEP(e.target.value); });
      inp.addEventListener('blur', function(e){
        const val = e.target.value;
        fetchViaCEP(val, function(data){
          // preencher campos se existirem
          const endereco = document.querySelector('[name="endereco"]');
          const bairro = document.querySelector('[name="bairro"]');
          const cidade = document.querySelector('[name="cidade"]');
          const uf = document.querySelector('[name="uf"]');
          if(endereco) endereco.value = data.logradouro || '';
          if(bairro) bairro.value = data.bairro || '';
          if(cidade) cidade.value = data.localidade || '';
          if(uf) uf.value = data.uf || '';
        }, function(){ /* ignore error */ });
      });
    });

    // validação simples: required e formato email
    document.querySelectorAll('form').forEach(form=>{
      form.addEventListener('submit', function(e){
        const invalid = Array.from(form.elements).some(el=>{
          if(el.hasAttribute('required')){
            return !el.value || el.value.trim() === '';
          }
          return false;
        });
        if(invalid){ e.preventDefault(); alert('Preencha os campos obrigatórios.'); return false; }
        // simular envio
        e.preventDefault(); alert('Formulário válido - envio simulado.');
      })
    });
  });
})();
