// forms.js - máscaras, validação e ViaCEP (delegado, compatível com SPA)
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

  // Delegação de eventos para máscaras
  document.addEventListener('input', function(e){
    const t = e.target;
    if(!(t instanceof HTMLInputElement)) return;
    const mask = t.getAttribute('data-mask');
    if(mask === 'telefone') t.value = maskTelefone(t.value);
    if(mask === 'cpf') t.value = maskCPF(t.value);
    if(mask === 'cep') t.value = maskCEP(t.value);
  });

  // ViaCEP no blur do campo CEP
  document.addEventListener('blur', function(e){
    const t = e.target;
    if(!(t instanceof HTMLInputElement)) return;
    if(t.getAttribute('data-mask') === 'cep'){
      const val = t.value;
      fetchViaCEP(val, function(data){
        const root = t.closest('form') || document;
        const endereco = root.querySelector('[name="endereco"]');
        const bairro = root.querySelector('[name="bairro"]');
        const cidade = root.querySelector('[name="cidade"]');
        const uf = root.querySelector('[name="uf"]');
        if(endereco) endereco.value = data.logradouro || '';
        if(bairro) bairro.value = data.bairro || '';
        if(cidade) cidade.value = data.localidade || '';
        if(uf) uf.value = data.uf || '';
      }, function(){ /* ignore error */ });
    }
  }, true);

  function clearErrors(form){
    form.querySelectorAll('.field-error').forEach(el=>el.remove());
    form.querySelectorAll('[aria-invalid="true"]').forEach(el=>{
      el.setAttribute('aria-invalid','false');
      el.removeAttribute('aria-describedby');
    });
  }

  function showErrors(form, errors){
    clearErrors(form);
    errors.forEach((err, idx)=>{
      const field = form.querySelector(`[name="${err.name}"]`) || document.getElementById(err.name);
      if(!field) return;
      const id = `${err.name}-error-${idx}`;
      const msg = document.createElement('div');
      msg.id = id;
      msg.className = 'field-error';
      msg.style.color = '#b00020';
      msg.style.fontSize = '.85rem';
      msg.style.marginTop = '.25rem';
      msg.textContent = err.message;
      field.setAttribute('aria-invalid','true');
      field.setAttribute('aria-describedby', id);
      field.insertAdjacentElement('afterend', msg);
    });
  }

  function validateForm(form){
    const errors = [];
    Array.from(form.elements).forEach(el=>{
      if(!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement)) return;
      const name = el.name || el.id;
      if(el.hasAttribute('required') && (!el.value || el.value.trim()==='')){
        errors.push({name, message:'Campo obrigatório.'});
      }
      if(el.type === 'email' && el.value){
        const ok = /.+@.+\..+/.test(el.value);
        if(!ok) errors.push({name, message:'Email inválido.'});
      }
    });
    return errors;
  }

  // Validação por delegação
  document.addEventListener('submit', function(e){
    const form = e.target;
    if(!(form instanceof HTMLFormElement)) return;
    const errors = validateForm(form);
    if(errors.length){
      e.preventDefault();
      showErrors(form, errors);
      form.querySelector('.field-error')?.scrollIntoView({behavior:'smooth', block:'center'});
      alert('Preencha os campos obrigatórios.');
      return false;
    }
    // limpar erros, envio simulado
    clearErrors(form);
    e.preventDefault();
    alert('Formulário válido - envio simulado.');
  }, true);

  // API pública para reuso na SPA
  window.Forms = { validateForm };
})();
