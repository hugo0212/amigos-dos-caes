Atividade {1} - Amigos dos Cães (Entrega I)

Como abrir:
- Abra o arquivo `index.html` no navegador.

O que está implementado (scaffold inicial):
- 8 páginas HTML semânticas: index, sobre, projetos, voluntariado, doacoes, transparencia, contato, blog
- Página extra: graficos.html com 3 gráficos (Chart.js CDN)
- CSS básico em `css/styles.css`
- JS simples em `js/main.js` e `js/charts.js`
- Galeria com 20 imagens placeholder em `assets/images` (img1.svg..img20.svg)
- Formulários simulados (preventDefault) nas páginas relevantes
 
Tema:
- O site está adaptado para a causa de cães abandonados: cabeçalho/hero, ícones (doar/participar/divulgar) e textos atualizados.
 
Notas:
- Para imagens reais dos cães, substitua a imagem do hero em `css/styles.css` (classe `.hero-dog`) por um arquivo local em `assets/images` se preferir.

Publicação no GitHub
- Este projeto é um site estático. Para publicar rapidamente:
	1. Crie um repositório público no GitHub (ex.: `amigos-dos-caes`).
	2. Faça push do conteúdo desta pasta para a branch `main`.
	3. Em Settings > Pages, selecione Deploy from a branch, branch `main` e pasta `/ (root)`.
	4. A URL ficará: `https://SEU_USUARIO.github.io/amigos-dos-caes/`.

Comandos úteis (PowerShell):
```
git init -b main
git add .
git commit -m "Site: Amigos dos Cães"
# depois configure o remoto e faça push
```

Próximos passos recomendados:
- Implementar máscaras e validação avançada nos formulários (CPF/CEP/telefone)
- Adicionar galeria de fotos com lazy-loading e player de vídeo institucional
- Documentação técnica detalhada (wireframes, especificação dos formulários, relatório W3C)

