Especificação dos formulários

1) Formulário de Voluntariado (`voluntariado.html`)
- Campos obrigatórios: nome, email
- Campos com máscara: telefone (data-mask="telefone"), CPF (data-mask="cpf"), CEP (data-mask="cep")
- Autocomplete via ViaCEP preenche: endereco, bairro, cidade, uf

2) Formulário de Contato (`contato.html`)
- Campos obrigatórios: nome, email, mensagem
- CEP pode ser informado para autocomplete

3) Formulário de Doação (`doacoes.html`)
- Campos obrigatórios: nome, email, valor
- Telefone com máscara

Validação: combinação de required HTML e checagem JS simples em `js/forms.js`.
