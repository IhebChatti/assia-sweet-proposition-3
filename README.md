# Assia Sweet — Next.js + NestJS

Export de la dernière version « Royaume gourmand », incluant la transition château → nuages → collections, enregistrée après la première publication.

## Démarrage

Prérequis : Node.js 22 ou supérieur et npm.

```bash
npm install
npm run dev
```

- Boutique : http://localhost:3000
- API : http://127.0.0.1:3001/api/health
- Dashboard : http://localhost:3000/#gestion

Les valeurs par défaut permettent de démarrer sans configuration. Si le backend utilise un autre hôte, copier `apps/web/.env.example` vers `apps/web/.env.local` et modifier `API_ORIGIN`. La configuration du proxy est lue au démarrage/à la compilation de Next.js. Pour modifier le port NestJS, définir `PORT` dans l'environnement du processus ; son fichier `.env.example` sert de référence et n'est pas chargé automatiquement.

```bash
npm run typecheck
npm run build
npm start
```

## Organisation

```text
apps/web/app/                 App Router, metadata, composant de montage
apps/web/public/              Styles, images originales, fontes et GSAP locaux
apps/web/public/storefront-runtime.js  Interface interactive et animation château
apps/api/src/                 Module, contrôleur et service NestJS
apps/api/src/data/catalog.json         16 produits et commandes fictives
reference/                    Scripts sources de la maquette avant adaptation
ASSET_SOURCES.md               Provenance des photos et illustrations
```

## Périmètre exact de cet export

Next.js sert l'application avec App Router et un composant client React. Le moteur HTML/JavaScript de la maquette reste conservé dans `storefront-runtime.js` et possède uniquement le contenu du conteneur `#app`. Cette migration de compatibilité préserve les animations et tous les écrans ; ce n'est pas une réécriture complète de chaque écran en JSX. Les routes internes restent des fragments (`#boutique`, `#produit/...`, `#gestion`). Les scripts ne sont pas chargés dans une iframe.

Au démarrage, le frontend charge `/api/bootstrap` via le proxy Next.js vers NestJS. Le catalogue et les données initiales du dashboard proviennent donc du backend. L'API doit fonctionner pour ouvrir la boutique ; une erreur propose de recharger la page si elle est indisponible.

La navigation, les filtres, le panier, les formats, le checkout simulé et les changements de statut de la maquette sont conservés. Le panier et les modifications de commandes restent dans la mémoire du navigateur et sont réinitialisés au rechargement. Les comptes, paiements, inscriptions, livraisons et données de gestion sont fictifs. Aucun compte réel, aucune base de données, aucun e-mail ni prestataire de paiement n'est configuré.

L'endpoint de devis applique côté serveur les mêmes formats et tarifs illustratifs que la maquette. Il est disponible pour la prochaine intégration du checkout ; le checkout actuel continue son calcul local et ne crée pas de commande persistante.

## API

| Méthode | Route | Résultat |
| --- | --- | --- |
| GET | `/api/health` | État du serveur |
| GET | `/api/bootstrap` | Catalogue et commandes fictives |
| GET | `/api/products` | 16 produits |
| GET | `/api/products/:id` | Détail ou 404 |
| POST | `/api/quotes` | Devis calculé côté serveur, montants en centimes |

Exemple de corps JSON pour un devis :

```json
{"items":[{"id":"oursons-fruites","weight":500,"qty":2}]}
```

Les formats autorisés sont 250, 500 et 1000 g. La quantité doit être un entier entre 1 et 99. Le serveur utilise son catalogue pour les prix et rejette les produits inconnus. Les données sont exclusivement fictives ; les endpoints ne nécessitent pas d'identification. Avant d'intégrer des données réelles : ajouter authentification, RBAC, persistance et contrôles d'accès aux commandes.

## Design et ressources

Le château, l'ourson rubis et les nuages sont fournis. Les photos produits, fontes et bibliothèques d'animation sont locales. L'animation du château est réversible avec le scroll, s'efface dans les nuages puis révèle les collections. Les petits écrans et les préférences de mouvement réduit utilisent un parcours sans épinglage. Le bouton de pause existant reste disponible.

Conserver les fichiers de licence des fontes et les en-têtes des bibliothèques. Vérifier les droits d'utilisation commerciale des photos produits avant un lancement réel.

## Suite d'une migration React complète

Remplacer progressivement les fonctions de rendu de `storefront-runtime.js` par des composants React (Header, CastleJourney, ProductCard, Catalog, Cart, Dashboard), puis migrer les fragments vers des routes App Router. Éviter de modifier le même sous-arbre DOM avec React et le moteur historique simultanément. Connecter ensuite les mutations à une base de données, à une authentification et au paiement.

## Références techniques

- https://nextjs.org/docs/app/getting-started/installation
- https://docs.nestjs.com/first-steps

Les dépendances déclarent Next.js 16, React 19 et NestJS 11. Le fichier de verrouillage, lorsqu'il est fourni, fixe les versions effectivement résolues.

## Vérifications de l'export

- Compilation de production Next.js et NestJS réussie.
- Vérification TypeScript réussie dans les deux applications.
- Tests du catalogue, des remises, des frais de livraison et des entrées invalides : `npm test`.
- Vérification HTTP locale du démarrage et du proxy non concluante dans cet environnement : les requêtes locales ne se sont pas terminées. À vérifier après démarrage sur votre machine. La compilation et les tests unitaires ci-dessus sont validés.
- Versions verrouillées : Next.js 16.3.4, React 19.2.8, NestJS 11.2.3. Utiliser `npm ci` pour reproduire l'installation du fichier `package-lock.json` fourni.
- Pas de vérification visuelle dans un navigateur lors de cet export.
