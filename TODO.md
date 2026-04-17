# Diagnostic: API collègue ne trouve pas le formulaire NDF

## Problème identifié
✅ L'app utilise **JSON** sur `/api/expenses` POST (pas multipart/form-data)
- Upload fichiers séparé → `/api/upload` (multipart ou JSON)
- Soumission finale: `fetch("/api/expenses", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({data: {nom, prenom, ...}, files: [urls], total: 123.45, userId: "token"}) })`

✅ API `/api/expenses/route.ts` attend **JSON** (`req.json()`), **PAS** form-data

**Cause probable**: Collègue appelle `/api/expenses` avec `content-type: multipart/form-data` → `req.json()` échoue → "ne trouve pas le formulaire"

## Plan de résolution (aucune édition requise)
1. **Expliquer au collègue** le format exact attendu:
   ```
   POST /api/expenses
   Content-Type: application/json
   
   {
     "data": {
       "nom": "Doe",
       "prenom": "John",
       "adresse": "123 Rue",
       "telephone": "0123456789",
       "dateDebut": "2024-10-01",
       "dateFin": "2024-10-05",
       "villeDepart": "Paris",
       "villeArrivee": "Lyon",
       "objet": "Mission client"
     },
     "files": ["/uploads/123-file.jpg", "/cam-456.jpg"],
     "total": 125.50,
     "userId": "user-token-or-anonymous"
   }
   ```
   Réponse: `{success: true, expense: {...}}`

2. **Test live**:
   ```
   cd /Users/mikelange/bang
   npm run dev
   ```
   → Ouvrir http://localhost:3000/nouvelle-ndf → remplir form → soumettre → vérifier Network tab

3. **Logs debug** (optionnel, ajouter temporairement dans `/api/expenses/route.ts`):
   ```
   console.log('Content-Type:', req.headers.get('content-type'));
   console.log('Body preview:', await req.text().then(t => t.slice(0, 200)));
   ```

## Statut
✅ Diagnostic complet
✅ Format JSON confirmé (fonctionne)
⏳ À faire: Tester live + informer collègue

**Pas de bug dans le code!** Problème côté client API (content-type). 
