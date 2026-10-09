# API do diagnóstico (Spring Boot + MySQL)

Recebe o `POST /diagnostico` enviado ao final do Diagnóstico Benê (`app/HomeClient.tsx`)
e grava o contato, as respostas e o resultado no MySQL.

## Endpoint

`POST /diagnostico` — `Content-Type: application/json`

```json
{
  "contact": { "type": "phone", "value": "5511932147954" },
  "answers": [
    { "id": "porte", "question": "Quantas pessoas trabalham na empresa?", "answer": "1 a 7", "value": 2 }
  ],
  "score": 25,
  "route": "Diagnóstico + Estruturação",
  "consent": true,
  "source": "site-diagnostico",
  "locale": "pt",
  "page": "https://benerh.com.br/#diagnostico",
  "submittedAt": "2026-10-09T12:00:00.000Z",
  "utm": { "utm_source": "instagram" }
}
```

- `contact.type` é `email` ou `phone`. Telefone: `55` + DDD + número (o site já normaliza assim). E-mail é gravado em minúsculas.
- `consent` precisa ser `true`.
- Respostas: `201 {"ok":true,"id":123}`. Erros de validação: `400 {"message":"..."}`.

## Banco

Migrations com Flyway em `src/main/resources/db/migration`:

- `diagnosticos`: contato, score, rota, consentimento, origem, UTMs e datas.
- `diagnostico_respostas`: uma linha por pergunta (`ordem`, `question_id`, `question`, `answer`, `answer_value`), ligada ao diagnóstico.

Consulta de exemplo:

```sql
SELECT d.id, d.contact_value, d.route, d.created_at, r.question, r.answer
FROM diagnosticos d JOIN diagnostico_respostas r ON r.diagnostico_id = d.id
ORDER BY d.created_at DESC, r.ordem;
```

## Rodar

Requer Java 21 e Maven.

```bash
# testes (usam H2 em modo MySQL, não precisam de banco)
mvn test

# local, com um MySQL em localhost:3306 (banco/usuário/senha "benerh")
mvn spring-boot:run
```

Variáveis: `DB_URL`, `DB_USER`, `DB_PASSWORD`, `PORT` (padrão 8080) e `CORS_ALLOWED_ORIGINS`.

## Produção (Docker + Traefik)

O MySQL já existe, então o `docker-compose.yml` sobe **só a API**.

1. No MySQL, crie o banco e um usuário para a API (uma vez). Ele precisa poder criar tabelas, porque o Flyway roda as migrations ao iniciar:

```sql
CREATE DATABASE benerh CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'benerh'@'%' IDENTIFIED BY 'uma-senha-forte';
GRANT ALL PRIVILEGES ON benerh.* TO 'benerh'@'%';
```

2. Configure a conexão e suba:

```bash
cp .env.example .env   # ajuste DB_URL, DB_USER e DB_PASSWORD
docker compose up -d --build
```

- `DB_URL` com `host.docker.internal` serve para o MySQL rodando no próprio servidor. Se o MySQL for outro container, use o nome dele no `DB_URL` e coloque a API na mesma rede Docker (veja o comentário no compose).
- O compose registra no Traefik a rota `benerh.com.br/diagnostico` (prioridade maior que a do site), então o site chama o endpoint na mesma origem e o CORS nem entra em jogo. Requer a rede externa `traefik-public`, a mesma do serviço do site.
