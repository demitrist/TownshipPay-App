# Git workflow

## Branches

| Branch | Owner | Purpose |
| --- | --- | --- |
| `main` | Demitri | Stable demo / presentation |
| `develop` | Demitri | Integration branch — open PRs here |
| `feature/demitri-core` | Demitri | Shell, auth, theme, docs |
| `feature/christopher-payments` | Christopher | Home, send/receive, history |
| `feature/kateho-qr` | Kateho | QR / scan / receipt |
| `feature/sg-inventory` | SG | Inventory / sales |

Never commit straight to `main`.

## Commit messages

```
feat(home): add send-money form
fix(qr): keep ConfirmPayment params
docs(team): clarify addTransaction shape
chore(deps): expo install expo-camera
```

Prefix with `feat|fix|docs|chore|refactor` and the area.

## Daily routine

```bash
git checkout feature/your-name-…
git fetch origin
git pull origin develop        # merge latest shell into your branch often
# …work…
git add src/screens/your-folder
git commit -m "feat(qr): mock scan navigates to confirm"
git push -u origin HEAD
```

Open a pull request **into `develop`**, not `main`.

## How Demitri merges

1. PR targets `develop`.
2. Check that the diff does **not** touch `src/navigation`, `src/theme`, `src/components`, or `AuthContext` unless agreed.
3. Run the [test checklist](./TEST_CHECKLIST.md) on Expo Go.
4. Merge with a merge commit (easier to revert a teammate than rebase fireworks).
5. After all three features land, merge `develop` → `main` for the demo.

## Conflict hotspots (and how we avoid them)

**`package.json` / lockfile**  
Only add packages with `npx expo install <pkg>` so SDK 58 versions stay aligned. If two PRs add deps, Demitri regenerates the lockfile on `develop` after merge.

**Navigation files**  
You should not need them. If you do, ask Demitri to add the route on `feature/demitri-core` first, then rebase.

**Duplicate screen files**  
Do not create `HomeScreen.jsx` next to `HomeScreen.js`. Replace the existing file.

**Shared `index` barrels**  
Don’t add new exports to `src/components/index.js` on a feature branch.

## Merge-day script

1. Everyone push feature branches.
2. Demitri: `git checkout develop && git pull`.
3. Merge Christopher → Kateho → SG (smallest navigation coupling first: Christopher, then Kateho, then SG).
4. `npx expo start` and walk [TEST_CHECKLIST.md](./TEST_CHECKLIST.md).
5. If `package.json` conflicts: keep both dependencies, run `npx expo install --fix`.
6. Tag the demo: `git checkout main && git merge develop`.
