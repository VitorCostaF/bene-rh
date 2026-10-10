# Deploy na VPS (GitHub Actions)

O workflow `.github/workflows/deploy.yml` roda a cada commit na `main` (inclui PRs mergeadas; PR fechada sem merge não altera a `main`, então não faz deploy). Também pode ser disparado manualmente em **Actions → Deploy VPS → Run workflow**.

Fluxo: testes (`tsc`, `lint`, `mvn test`) → envia o código por `rsync` para a VPS → `docker compose up -d --build` do site (raiz) e da API (`backend/`, com o serviço `flyway` rodando as migrations antes) → confere se tudo subiu.

## Secrets (Settings → Secrets and variables → Actions)

| Secret | Obrigatório | O que é |
|---|---|---|
| `VPS_HOST` | sim | IP ou domínio da VPS |
| `VPS_USER` | sim | Usuário SSH (precisa rodar `docker`) |
| `VPS_SSH_KEY` | sim | Chave **privada** SSH (conteúdo completo) cuja pública está em `~/.ssh/authorized_keys` da VPS |
| `VPS_APP_PATH` | sim | Pasta do projeto na VPS, por exemplo `/opt/bene-rh` |
| `DB_URL` | sim | URL JDBC do MySQL existente, por exemplo `jdbc:mysql://host.docker.internal:3306/benerh?serverTimezone=UTC` |
| `DB_USER` | sim | Usuário do MySQL (precisa criar tabelas, por causa do Flyway) |
| `DB_PASSWORD` | sim | Senha do MySQL |
| `VPS_PORT` | não | Porta SSH (padrão 22) |
| `VPS_KNOWN_HOSTS` | não | Saída de `ssh-keyscan -H <host>`. Sem ele, o workflow usa `ssh-keyscan` na hora |
| `CORS_ALLOWED_ORIGINS` | não | Origens extras para a API (padrão: `https://benerh.com.br`, `https://www.benerh.com.br`) |

`DB_URL`, `DB_USER` e `DB_PASSWORD` não podem conter aspas simples (`'`). O workflow gera o `backend/.env` na VPS a cada deploy a partir desses secrets.

## Pré-requisitos na VPS (uma vez)

- Docker com Compose v2 e `rsync` instalados.
- Rede Docker externa `traefik-public` e o Traefik rodando (o site e a API usam os labels dele).
- Banco `benerh` criado no MySQL e usuário com permissão (veja `backend/README.md`).
- Se o MySQL já tiver tabelas sem histórico do Flyway, rode um `baseline` uma vez antes do primeiro deploy.
