# 🚀 GitHub, CI/CD & Vercel Deployment Context

## Vue d'ensemble

Ce document explique comment déployer l'application Goodeez de GitHub Codespaces vers Vercel avec un pipeline CI/CD automatisé.

```
┌─────────────────────────────────────────────────────────────────┐
│ DEVELOPER (GitHub Codespaces)                                   │
│ - Développe localement                                          │
│ - Commit et push vers GitHub                                    │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼ git push
        ┌──────────────────────────────┐
        │ GitHub Repository            │
        │ - Main branch                │
        │ - Feature branches           │
        │ - Pull Requests              │
        └──────────────┬───────────────┘
                       │
                       ▼ Webhook trigger
        ┌──────────────────────────────┐
        │ GitHub Actions (CI/CD)       │
        │ - Run tests                  │
        │ - Build                      │
        │ - Deploy                     │
        └──────────────┬───────────────┘
                       │
                       ▼ if all passes
        ┌──────────────────────────────┐
        │ Vercel                       │
        │ - Deploy app                 │
        │ - Generate preview URL       │
        │ - Monitor                    │
        └──────────────┬───────────────┘
                       │
                       ▼ Live on internet
        ┌──────────────────────────────┐
        │ https://goodeez.vercel.app   │
        │ Accessible worldwide         │
        └──────────────────────────────┘
```

---

## 1️⃣ Configuration GitHub Repository

### Étape 1 : Créer/Configurer le Repo GitHub

Si le repo n'existe pas encore :

```bash
# Dans votre Codespace
cd /workspaces/codespaces-nextjs

# Vérifier que Git est initialisé
git status

# Si pas encore de remote GitHub, ajouter
git remote add origin https://github.com/VotreNom/goodeez.git
git branch -M main
git push -u origin main
```

### Étape 2 : Structure idéale du Repository

```
goodeez/
├── .github/
│   └── workflows/
│       ├── deploy.yml              ← Pipeline CI/CD
│       ├── lint.yml                ← Linting checks
│       └── test.yml                ← Tests automatisés
│
├── .env.example                    ← Template variables env
├── .env.local                      ← Local secrets (ne pas commit)
├── .gitignore                      ← Fichiers à ignorer
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── contexts/
│
├── context/                        ← Documentation
│   ├── dbandstoragecontext.md
│   ├── checkoutcontext.md
│   └── githubcontext.md
│
├── public/
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.js
├── prisma.config.ts
└── README.md
```

### Étape 3 : `.gitignore` (ce qui ne doit pas être commité)

```bash
# Vérifier/mettre à jour .gitignore

cat > .gitignore <<EOF
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
.next/
out/

# Production
/build
dist/

# Misc
.DS_Store
*.pem
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# IDE
.vscode/
.idea/
*.swp
*.swo

# Database
dev.db
dev.db-journal

# Generated
/src/generated/

# OS
.DS_Store
Thumbs.db
EOF

git add .gitignore
git commit -m "chore: update gitignore"
git push
```

---

## 2️⃣ Secrets & Variables d'Environnement

### Étape 1 : Créer `.env.example`

```bash
cat > .env.example <<EOF
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET_NAME=goodeez-prod-bucket
AWS_S3_REGION=eu-west-1
AWS_CLOUDFRONT_URL=https://cdn.goodeez.com

# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Checkout Webhook
CHECKOUT_WEBHOOK_URL=https://hook.eu1.make.com/...
CHECKOUT_WEBHOOK_SECRET=your_webhook_secret

# Clerk (Authentification - optionnel)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Analytics (optionnel)
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X
EOF

git add .env.example
git commit -m "docs: add environment template"
git push
```

### Étape 2 : Configurer les Secrets dans Vercel

Sur Vercel.com :

```
1. Aller sur https://vercel.com/dashboard
2. Sélectionner le projet
3. Settings → Environment Variables
4. Ajouter chaque secret :
   - DATABASE_URL
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
   - AWS_S3_BUCKET_NAME
   - AWS_S3_REGION
   - AWS_CLOUDFRONT_URL
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - CHECKOUT_WEBHOOK_URL
   - CHECKOUT_WEBHOOK_SECRET
```

---

## 3️⃣ GitHub Actions : CI/CD Pipeline

### Pipeline 1 : Deploy automatique sur Vercel

Créer le fichier `.github/workflows/deploy.yml` :

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Lint code
        run: npm run lint --if-present

      - name: Build
        run: npm run build

      - name: Run tests
        run: npm run test --if-present

      - name: Deploy to Vercel (Production)
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}

      - name: Deploy to Vercel (Preview)
        if: github.event_name == 'pull_request'
        run: npx vercel --token ${{ secrets.VERCEL_TOKEN }}

      - name: Comment PR with URL
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '✅ Preview deployment ready! Check the deployment URL above.'
            })
```

### Pipeline 2 : Linting et Format Check

Créer `.github/workflows/lint.yml` :

```yaml
name: Lint and Format

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm install

      - name: Run ESLint
        run: npm run lint --if-present

      - name: Check TypeScript
        run: npx tsc --noEmit
```

### Pipeline 3 : Tests automatisés

Créer `.github/workflows/test.yml` :

```yaml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: testdb
          POSTGRES_USER: testuser
          POSTGRES_PASSWORD: testpass
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm install

      - name: Setup test database
        run: |
          npx prisma migrate deploy --skip-generate
        env:
          DATABASE_URL: postgresql://testuser:testpass@localhost:5432/testdb

      - name: Run tests
        run: npm run test --if-present
```

---

## 4️⃣ Vercel Setup

### Étape 1 : Créer un compte Vercel

1. Aller sur https://vercel.com
2. S'authentifier avec GitHub
3. Sélectionner le repository `goodeez`

### Étape 2 : Configurer le Projet Vercel

```
1. Framework : Next.js
2. Root Directory : ./ (racine)
3. Build Command : npm run build
4. Output Directory : .next
5. Install Command : npm install
6. Environment Variables : Ajouter tous les secrets (voir section 2️⃣)
```

### Étape 3 : Récupérer les IDs Vercel

```bash
# Récupérer VERCEL_ORG_ID et VERCEL_PROJECT_ID
# À ajouter dans les secrets GitHub

# Dans votre .vercelignore (créer s'il n'existe pas)
cat > .vercelignore <<EOF
*.md
.env.example
context/
.git/
.gitignore
EOF
```

### Étape 4 : Ajouter les Secrets GitHub

Sur GitHub.com :

```
1. Aller sur Settings → Secrets and variables → Actions
2. Ajouter les secrets :
   - VERCEL_ORG_ID : [copier de Vercel Project Settings]
   - VERCEL_PROJECT_ID : [copier de Vercel Project Settings]
   - VERCEL_TOKEN : [créer un token sur Vercel Settings → Tokens]
```

---

## 🔄 Workflow Complet (Du développement au déploiement)

### Scénario : Ajouter une nouvelle feature

```bash
# 1️⃣ Dans Codespaces : Créer une branche feature
git checkout -b feature/new-checkout-design

# 2️⃣ Développer et tester localement
npm run dev
# ... développement ...

# 3️⃣ Commit et push
git add .
git commit -m "feat: redesign checkout page"
git push origin feature/new-checkout-design

# 4️⃣ Sur GitHub.com : Créer une Pull Request (PR)
# GitHub Actions se lance automatiquement :
#  ✓ Lint check
#  ✓ TypeScript check
#  ✓ Build test
#  ✓ Deploy preview sur Vercel

# 5️⃣ Regarder les résultats :
# - Tests passent ? ✅
# - Preview URL générée ? ✅
# - Partager le lien avec l'équipe pour feedback

# 6️⃣ Une fois approuvé, merger la PR
# GitHub Actions se lance de nouveau :
#  ✓ Merge dans main
#  ✓ Deploy en PRODUCTION sur Vercel
#  ✓ https://goodeez.vercel.app mis à jour

# 7️⃣ De retour dans Codespaces : récupérer les mises à jour
git checkout main
git pull origin main
```

---

## 📊 Branches Strategy (Git Flow)

```
main (Production)
  ├── auto-deployed par Vercel
  ├── protégé : require PR reviews
  └── tag : v1.0.0, v1.1.0, etc.

develop (Staging)
  ├── branche de pré-production
  ├── merge des features testées
  └── déploiement sur staging.vercel.app (optionnel)

feature/... (Development)
  ├── feature/new-checkout
  ├── feature/logo-overlay
  ├── feature/database-migration
  └── PR → develop ou main
```

### Protéger la branche main

Sur GitHub.com :

```
1. Settings → Branches
2. Add rule for "main"
3. Activer :
   - Require pull request reviews (1 approver)
   - Dismiss stale pull request approvals
   - Require branches to be up to date before merging
   - Require status checks to pass (GitHub Actions)
```

---

## 🛠️ Scripts npm (ajouter à `package.json`)

```json
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,json}\"",
    "test": "jest",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:seed": "ts-node --compiler-options '{\"module\":\"commonjs\"}' prisma/seed.ts"
  }
}
```

---

## 📈 Monitoring & Observabilité

### Vercel Analytics

Activation sur Vercel Dashboard :

```
Analytics → Enable Web Analytics
Permet de tracker :
  - Page views
  - Core Web Vitals
  - Performance
  - Errors
```

### GitHub Actions Logs

```
1. Aller sur repository → Actions
2. Voir l'historique des deploys
3. Cliquer sur un job pour voir les logs détaillés
```

### Erreurs courantes et solutions

| Erreur | Cause | Solution |
| :--- | :--- | :--- |
| Build fails | Variables d'env manquantes | Vérifier Environment Variables dans Vercel |
| Database connection error | DATABASE_URL invalide | Vérifier Supabase URL et credentials |
| Image not found | AWS S3 credentials | Vérifier AWS_ACCESS_KEY_ID et AWS_SECRET_ACCESS_KEY |
| Deployment timeout | Build trop long | Optimiser le build (lazy imports, tree-shaking) |

---

## 🚀 Roadmap Déploiement

### Semaine 1 : Setup Initial
- [ ] Créer GitHub repo
- [ ] Configurer `.gitignore` et `.env.example`
- [ ] Créer Vercel project
- [ ] Ajouter secrets GitHub et Vercel
- [ ] Tester le premier push → déploiement

### Semaine 2 : CI/CD Pipelines
- [ ] Créer workflows GitHub Actions
- [ ] Tester lint, build, tests
- [ ] Protéger branche main
- [ ] Documenter le processus

### Semaine 3 : Monitoring
- [ ] Activer Vercel Analytics
- [ ] Configurer alertes erreurs
- [ ] Logs et debugging
- [ ] Performance monitoring

### Semaine 4 : Production Ready
- [ ] Load testing
- [ ] Security audit
- [ ] Backup strategy
- [ ] Disaster recovery plan

---

## 📝 Commandes Utiles

### Locales (dans Codespaces)

```bash
# Vérifier l'état du git
git status
git log --oneline

# Créer et switcher branche
git checkout -b feature/my-feature

# Commit et push
git add .
git commit -m "feat: description"
git push origin feature/my-feature

# Supprimer une branche locale
git branch -d feature/old-feature

# Mettre à jour depuis main
git pull origin main
git rebase main  # Ou merge
```

### Vercel CLI (optionnel)

```bash
# Installer localement
npm install -g vercel

# Login
vercel login

# Deploy local build
vercel --prod

# Preview deploy
vercel

# Voir logs en direct
vercel logs
```

---

## 🔐 Sécurité

### Bonnes pratiques

1. **Ne jamais commiter de secrets** :
   ```bash
   # ❌ Mauvais
   git add .env
   
   # ✅ Bon
   git add .env.example
   # puis ajouter les vrais secrets dans Vercel UI
   ```

2. **Utiliser les secrets GitHub Actions** :
   ```yaml
   # ✅ Bon
   env:
     DATABASE_URL: ${{ secrets.DATABASE_URL }}
   
   # ❌ Mauvais
   env:
     DATABASE_URL: postgresql://user:password@host...
   ```

3. **Scanner les dépendances** :
   ```bash
   npm audit
   npm audit fix
   ```

4. **Vérifier les logs GitHub Actions** pour les expositions accidentelles

---

## 📚 Résumé

| Étape | Technologie | Action |
| :--- | :--- | :--- |
| **Développement** | GitHub Codespaces | Coder et tester |
| **Versioning** | GitHub | Commit, PR, merge |
| **Testing** | GitHub Actions | Lint, build, tests auto |
| **Build** | Next.js | `npm run build` |
| **Deployment** | Vercel | Auto-deploy sur push |
| **Monitoring** | Vercel Analytics | Tracker performance |
| **Logs** | GitHub Actions + Vercel | Debug les erreurs |

