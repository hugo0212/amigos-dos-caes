Amigos dos Cães — Entrega Final (SPA + Acessibilidade + Deploy)

Projeto web estático (HTML/CSS/JS puros) para uma ONG fictícia focada no resgate, cuidado e adoção de cães em situação de rua. A entrega implementa SPA básica com templates em JavaScript, acessibilidade conforme WCAG 2.1 e publicação via GitHub Pages, com otimizações para produção e estratégia de versionamento.

## Links

- Produção (GitHub Pages): https://hugo0212.github.io/amigos-dos-caes/
- Release: https://github.com/hugo0212/amigos-dos-caes/releases/tag/v1.0.0
- Repositório: https://github.com/hugo0212/amigos-dos-caes

## Como executar localmente

1) Abra `index.html` no navegador. Como é uma SPA por hash, funciona sem servidor.
2) Navegue pelos links: `#/`, `#/sobre`, `#/projetos`, `#/voluntariado`, `#/doacoes`, `#/transparencia`, `#/contato`, `#/blog`, `#/graficos`.

Observação: Em produção a página referencia arquivos minificados em `dist/`. Em desenvolvimento, opcionalmente altere para os arquivos de `css/` e `js/` (não minificados) se desejar depurar.

## Estrutura

```
atividade {1}/
	index.html             # SPA (hash-router) + metatags
	css/styles.css         # estilos fonte (tema claro/escuro, foco visível)
	dist/                  # ativos minificados para produção
		css/styles.min.css
		js/*.min.js
	js/
		spa.js               # roteamento por hash
		templates.js         # HTML das views (templates JS)
		main.js              # utilidades (cards, menu, tema)
		forms.js             # máscaras, ViaCEP e validação com mensagens
		charts.js            # integração Chart.js
	assets/
		images/              # ícones + imagens (inclui favicon.svg)
		video/               # placeholder.mp4 (leve para web)
	robots.txt             # SEO
	sitemap.xml            # SEO
```

## Funcionalidades

- SPA básica:
	- Roteamento por hash (sem frameworks) e render em `#app`.
	- Templates JS por página: Home, Sobre, Projetos, Voluntariado, Doações, Transparência, Contato, Blog e Gráficos.
	- Auto-save de formulários em `localStorage`.

- Formulários com consistência de dados:
	- Máscaras de Telefone/CPF/CEP.
	- ViaCEP no blur do CEP com preenchimento automático.
	- Validação com mensagens por campo; bloqueio de envio quando inválido.

- Gráficos: Chart.js via CDN na rota `#/graficos`.

- Acessibilidade (WCAG 2.1 AA):
	- Navegação por teclado: foco visível (`:focus-visible`), ordem lógica e skip-link para `#app`.
	- Semântica: landmarks (header/nav/main/footer) e atributos ARIA no menu (`aria-controls`, `aria-expanded`, `aria-hidden`).
	- Contraste: texto principal ≥ 4.5:1; botões e links com cores revisadas; herói com overlay.
	- Leitores de tela: erros associados via `aria-describedby`; `aria-invalid` nos campos com erro; `aria-live` no container de conteúdo.
	- Tema escuro acessível: toggle com persistência em `localStorage` e variação por `prefers-color-scheme`.

- Otimização para produção:
	- Minificação de CSS/JS (pasta `dist/` referenciada no `index.html`).
	- Imagens com `loading="lazy"` e `object-fit` para consistência visual.
	- Assets grandes (vídeo completo) mantidos fora do Git para respeitar limite do GitHub.

## Versionamento e Deploy

- Estratégia: GitFlow simplificado
	- Branch principal: `main` (produção) e `develop` (integração contínua).
	- Commits seguindo Conventional Commits (feat, fix, chore, build, docs...).

- Releases
	- v1.0.0 criada no GitHub Releases (SemVer) com changelog da entrega.

- Deploy
	- GitHub Pages (branch `main`, pasta raiz). O build é acionado a cada push.

## Critérios de aceitação (mapeamento)

- Manipulação do DOM: cards dinâmicos, menu mobile, exibição de erros, render dos gráficos.
- SPA + templates JS: `js/spa.js` e `js/templates.js` renderizando em `#app`.
- Consistência de formulários: máscaras, ViaCEP, validação e mensagens por campo.
- Acessibilidade: checklist acima (WCAG 2.1 AA) implementado.
- Otimização de produção: uso de `dist/` com `*.min.css` e `*.min.js`.
- Repositório público com histórico organizado, release e documentação.

## Desenvolvimento

- Requisitos: apenas um navegador moderno.
- Dica: para depurar, troque no `index.html` as referências de `dist/` para `css/styles.css` e arquivos de `js/` não minificados.

## Créditos e Licenças

- Imagens de cães: Unsplash (uso livre). Ver créditos nos metadados das imagens quando aplicável.
- Biblioteca de gráficos: Chart.js (MIT).


