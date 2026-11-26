# MEKANO® Maroc — Boutique automobile

Boutique web statique et installable (PWA), avec trois espaces catalogue : pièces auto, pneus et accessoires. Interface français/arabe (RTL), recherche par véhicule/référence/dimension, filtres, favoris/comparateur, panier, commande via Supabase, suivi des commandes et mode hors connexion pour les pages et médias préchargés.

## Structure

- `index.html` — pièces détachées et catalogue principal
- `pneus.html` — recherche et catalogue de pneus
- `accessoires.html` — accessoires auto
- `assets/webp/` — images WebP locales
- `assets/` — icônes PWA
- `mekano-config.js` — coordonnées téléphoniques, WhatsApp, e-mail et réseaux sociaux (à confirmer avant lancement)
- `mekano-pro.js` / `mekano-pro.css` — accessibilité, état réseau, raccourcis clavier et améliorations d'interface
- `sw.js` — cache PWA et fonctionnement hors الاتصال

## Lancer en local

Python 3 :

```bash
python server.py
```

Sous Windows, double-cliquer sur `start-mekano.bat` lance le serveur et ouvre le navigateur. Puis ouvrir `http://localhost:8080` si nécessaire.

Aucune commande npm ou compilation n'est nécessaire.

## Publier sur GitHub Pages

1. Décompresser le ZIP et téléverser **le contenu complet** à la racine du dépôt `ayouboumessa8-sudo/mekano` (y compris `assets/`, les fichiers `mekano-*`, `sw.js`, `manifest.webmanifest`, `robots.txt` et `sitemap.xml`).
2. Dans `Settings → Pages`, choisir la branche `main` et le dossier `/(root)`.
3. Attendre le déploiement, puis vérifier les pages principale, pneus et accessoires.

URL cible : https://ayouboumessa8-sudo.github.io/mekano/

## Configuration obligatoire avant lancement commercial

Ouvrir `mekano-config.js` et renseigner les coordonnées **officielles et vérifiées**. Les valeurs de contact et les réseaux sociaux sont volontairement vides pour ne pas envoyer les clients vers un faux numéro, une adresse e-mail ou un profil social non confirmé.

Le catalogue, les commandes, les comptes et l'administration s'appuient sur le projet Supabase configuré dans le code d'origine. Garder uniquement une clé publique `anon`/publishable côté navigateur ; ne jamais y placer une `service_role` key ou un mot de passe administrateur. Les règles RLS et les fonctions RPC côté Supabase doivent protéger chaque opération sensible.

## Contrôles de mise en ligne

- Vérifier que `place_mekano_order` et `admin_dashboard_data` existent et appliquent les contrôles d'accès côté serveur.
- Configurer les coordonnées, retours, délais, coûts et moyens de paiement réels avant d'afficher des engagements définitifs.
- Tester une commande complète en environnement de test, puis vérifier son apparition dans le tableau d'administration.
- Tester l'installation PWA et le mode avion après la première visite en ligne.
