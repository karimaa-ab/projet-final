# SAS Progress Console

## Description

SAS Progress Console est une application JavaScript exécutée dans la console avec Node.js.

Elle permet de gérer les apprenants, leurs résultats par journée et leur progression pendant les 7 jours de la SAS.

L'application permet également de rechercher, filtrer et trier les apprenants, ainsi que d'afficher un tableau de bord récapitulatif.

---

## Fonctionnalités

* Ajouter un apprenant
* Consulter un apprenant par identifiant
* Ajouter ou modifier le résultat d'une journée
* Calculer la progression d'un apprenant
* Déterminer le niveau de progression
* Rechercher un apprenant par nom
* Filtrer les apprenants par niveau
* Trier les apprenants par progression décroissante
* Trier les apprenants par ordre alphabétique
* Afficher un tableau de bord
* Afficher les journées manquantes
* Afficher les challenges non terminés
* Valider les résultats saisis
* Gérer les erreurs et les données invalides
* Utiliser un menu interactif dans la console

---

## Technologies

* JavaScript
* Node.js
* Module `readline` de Node.js pour les entrées utilisateur dans la console

Aucune bibliothèque externe n'est nécessaire.

---

## Structure du projet

```text
projet-final/
├── index.js
└── README.md
```

### `index.js`

Contient l'ensemble de la logique de l'application :

* Données des apprenants
* Nettoyage et validation
* Gestion des apprenants
* Enregistrement des résultats
* Calcul de progression
* Recherche, filtrage et tri
* Tableau de bord
* Menu interactif
* Tests

### `README.md`

Contient la documentation du projet et explique son fonctionnement.

---

## Structure des données

Chaque apprenant contient :

* un identifiant
* un nom complet
* une ville
* une liste de résultats journaliers

Chaque résultat contient :

* le numéro du jour
* le nombre d'exercices terminés
* le nombre total d'exercices proposés
* l'état du challenge

Exemple :

```js
{
    id: 1,
    nomComplet: "Sara Dev",
    ville: "Nador",
    resultats: [
        {
            jour: 1,
            exercicesTermines: 18,
            totalExercices: 20,
            challengeTermine: true
        }
    ]
}
```

---

## Calcul de la progression

La progression est calculée à partir du nombre total d'exercices terminés par rapport au nombre total d'exercices proposés.

La formule utilisée est :

```text
Progression = (Total exercices terminés / Total exercices proposés) × 100
```

Les résultats de plusieurs journées sont cumulés pour obtenir la progression globale de l'apprenant.

---

## Niveaux de progression

L'application attribue un niveau selon le pourcentage obtenu :

| Pourcentage   | Niveau         |
| ------------- | -------------- |
| 80 % ou plus  | Solide         |
| 50 % à 79 %   | En progression |
| Moins de 50 % | À renforcer    |

---

## Validation des résultats

Avant d'enregistrer un résultat, l'application vérifie notamment :

* que le jour est compris entre 1 et 7
* que le nombre d'exercices terminés ne dépasse pas le nombre total d'exercices
* que `challengeTermine` est une valeur booléenne

Un résultat invalide n'est pas enregistré.

---

## Recherche, filtrage et tri

L'application propose plusieurs opérations sur les apprenants.

### Recherche

La recherche par nom utilise une normalisation du texte afin de faciliter la recherche même lorsque le nom contient des espaces supplémentaires ou des différences de majuscules/minuscules.

### Filtrage

Les apprenants peuvent être filtrés selon leur niveau :

* Solide
* En progression
* À renforcer

### Tri par progression

Les apprenants peuvent être classés par progression décroissante.

### Tri alphabétique

Les apprenants peuvent également être classés par ordre alphabétique de leur nom.

---

## Tableau de bord

Le tableau de bord affiche plusieurs informations :

* nombre total d'apprenants
* moyenne de progression
* nombre d'apprenants de niveau `Solide`
* nombre d'apprenants de niveau `En progression`
* nombre d'apprenants de niveau `À renforcer`
* liste des apprenants triés par progression
* journées non renseignées
* challenges non terminés

---

## Menu interactif

Au lancement du programme, un menu permet d'accéder aux différentes fonctionnalités :

```text
SAS PROGRESS CONSOLE

1. Afficher le tableau de bord
2. Afficher la liste des apprenants
3. Ajouter un apprenant
4. Consulter un apprenant par identifiant
5. Ajouter ou modifier le résultat d'une journée
6. Rechercher un apprenant par nom
7. Filtrer les apprenants par niveau
8. Trier les apprenants par progression décroissante
9. Trier les apprenants par ordre alphabétique
0. Quitter
```

Le choix de l'utilisateur est saisi directement dans la console.

---

## Lancement

### Prérequis

Node.js doit être installé sur la machine.

Pour vérifier l'installation :

```bash
node --version
```

### Exécution

Depuis le dossier `projet-final`, lancer :

```bash
node index.js
```

Le menu interactif s'affiche ensuite dans la console.

---

## Tests

Le projet contient une partie dédiée aux tests afin de vérifier le bon fonctionnement des principales fonctions.

Les tests couvrent notamment :

* la normalisation des noms
* la validation d'un résultat valide
* la validation d'un résultat invalide
* l'ajout d'un apprenant
* la recherche d'un apprenant
* l'enregistrement d'un résultat
* le calcul de progression
* le filtrage et le tri

Des cas invalides et des cas limites sont également testés.

---

## Objectif pédagogique

Ce projet permet de mettre en pratique les notions JavaScript étudiées pendant la SAS, notamment :

* variables et types
* opérateurs
* conditions
* boucles
* fonctions
* paramètres et valeurs de retour
* chaînes de caractères
* tableaux
* objets
* recherche
* filtrage
* tri
* validation des données
* interaction avec l'utilisateur
* organisation d'un programme en plusieurs parties

Le projet regroupe ces différentes notions dans une application complète exécutée dans la console.
.
