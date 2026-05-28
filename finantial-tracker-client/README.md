# FinancialTracker — Frontend

Cliente React do FinancialTracker com Vite, TypeScript, Tailwind, shadcn/ui, React Query e React Hook Form.

## Pré-requisitos

- Node.js 20+
- Backend rodando em `http://localhost:3000`

## Configuração

```bash
cp .env.example .env
npm install
npm run dev
```

Variável principal:

- `VITE_API_URL` — URL da API (padrão: `http://localhost:3000`)

## Scripts

| Comando        | Descrição              |
| -------------- | ---------------------- |
| `npm run dev`  | Servidor de desenvolvimento |
| `npm run build`| Build de produção      |
| `npm run preview` | Preview do build    |

## Rotas

| Rota            | Acesso   |
| --------------- | -------- |
| `/login`        | Público  |
| `/register`     | Público  |
| `/dashboard`    | Protegido |
| `/transactions` | Protegido |

## Deploy (Vercel)

1. Importe o repositório na Vercel
2. Defina o **Root Directory** como `finantial-tracker-client`
3. Configure `VITE_API_URL` com a URL do backend em produção
4. O arquivo `vercel.json` já trata o fallback SPA

## Estrutura

```
src/
├── components/   # UI, layout, dashboard, transações
├── pages/
├── layouts/
├── routes/
├── services/
├── hooks/
├── contexts/
├── schemas/
├── types/
├── lib/
├── App.tsx
└── main.tsx
```
