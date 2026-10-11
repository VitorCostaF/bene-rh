# Deploy do front na VPS (GitHub Actions)

O workflow `.github/workflows/deploy.yml` publica **só o front** (o site Next.js, `docker-compose.yml` da raiz). Ele roda a cada commit na `main`, inclusive PRs mergeadas (o merge é um push na `main`). PR fechada sem merge não altera a `main`, então não faz deploy, e commits que mexem apenas em `backend/` também não disparam. Também pode ser disparado manualmente em **Actions → Deploy front (VPS) → Run workflow**.

Fluxo: `tsc` + `lint` → envia o código por `rsync` para a VPS (sem `backend/`) → `docker compose up -d --build` → confere se o site responde em `127.0.0.1:3001`.

## Secrets (Settings → Secrets and variables → Actions)

| Secret | Obrigatório | O que é |
|---|---|---|
| `VPS_HOST` | sim | IP ou domínio da VPS |
| `VPS_USER` | sim | Usuário SSH (precisa rodar `docker`) |
| `VPS_SSH_KEY` | sim | Chave **privada** SSH (conteúdo completo) cuja pública está em `~/.ssh/authorized_keys` da VPS |
| `VPS_APP_PATH` | sim | Pasta do projeto na VPS, por exemplo `/opt/bene-rh` |
| `VPS_PORT` | não | Porta SSH (padrão 22) |
| `VPS_KNOWN_HOSTS` | não | Saída de `ssh-keyscan -H <host>`. Sem ele, o workflow usa `ssh-keyscan` na hora |

## Pré-requisitos na VPS (uma vez)

- Docker com Compose v2 e `rsync` instalados.
- Rede Docker externa `traefik-public` e o Traefik rodando (o site usa os labels dele).
