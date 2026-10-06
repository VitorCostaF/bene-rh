# Benê RH — pacote para Hostinger

Este pacote roda como aplicação Node.js e salva inscrições da newsletter em SQLite persistente. Não é um conjunto de arquivos estáticos para `public_html`.

## VPS Hostinger com Docker

1. Envie e extraia o ZIP em uma pasta própria no VPS.
2. Na pasta do projeto, execute `docker compose up -d --build`.
3. O app inicia em `127.0.0.1:3000`. O banco fica no volume Docker `bene-rh-data` e sobrevive a reinícios e rebuilds.
4. Configure o proxy reverso HTTPS do domínio para `127.0.0.1:3000` e aponte o DNS do domínio para o VPS. Não exponha o banco nem a porta da aplicação diretamente sem HTTPS/proxy.
5. Verifique `https://SEU-DOMINIO/` e teste o formulário da newsletter. O serviço pode ser acompanhado com `docker compose logs -f bene-rh`.

O `docker-compose.yml` já habilita indexação no build de produção e usa o link Calendly da Benê. O `Dockerfile` usa Node 24; o projeto requer Node 22.13 ou superior.

## Hospedagem Node.js pelo hPanel

Se o seu plano oferecer aplicações Node.js, envie o conteúdo do ZIP como código-fonte da aplicação (não para `public_html`):

- Versão Node.js: 22.13 ou superior.
- Se o painel não reconhecer vinext automaticamente, selecione o tipo `Other`.
- Instalação: `npm ci` (ou a instalação automática oferecida pelo painel).
- Build: `npm run build`.
- Saída: `dist/standalone`; entrada: `dist/standalone/server.js`.
- Inicialização, se solicitada: `npm start`.
- Variáveis: `HOST=0.0.0.0`, `PORT` conforme o painel, `NEXT_PUBLIC_SITE_INDEXABLE=true`, `NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/parcerias-amandastamboni/30min` e `BENE_DATA_DIR` apontando para uma pasta gravável fora de `public_html` e fora da pasta temporária de cada build (por exemplo, `/home/USUARIO/bene-rh-data`).

O arquivo `.env.example` serve de referência. Não publique `.env` com credenciais no ZIP. Faça cópias de segurança regulares da pasta definida em `BENE_DATA_DIR`.

## O que foi preparado

- Build standalone do vinext para Node.js.
- API de newsletter migrada do binding Cloudflare D1 para SQLite local persistente, mantendo validação do email, consentimento, honeypot e gravação por consulta parametrizada.
- Dockerfile e Compose para VPS.
- Configuração de variáveis para Hostinger e orientação de proxy/DNS.
