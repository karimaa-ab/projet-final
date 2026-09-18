
// ========================================================
// PROJET FINAL : SAS PROGRESS CONSOLE
// ========================================================


// ========================================================
// PARTIE 1 : DONNÉES DES APPRENANTS
// ========================================================

const apprenants = [
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
            },
            {
                jour: 2,
                exercicesTermines: 14,
                totalExercices: 20,
                challengeTermine: false
            }
        ]
    },

    {
        id: 2,
        nomComplet: "Yassine Code",
        ville: "Oujda",
        resultats: [
            {
                jour: 1,
                exercicesTermines: 12,
                totalExercices: 20,
                challengeTermine: false
            }
        ]
    }
];


// ========================================================
// PARTIE 2 : NETTOYAGE ET VALIDATION
// ========================================================

function normaliserNom(nom) {

    return nom.trim().replace(/\s+/g, " ").toLowerCase();

    // trim () : supprimer les espaces inutiles au début et à la fin d'une chaîne

    // replace(/\s+/g, " ") : Recherche tous les groupes d'un ou plusieurs espaces blancs et les remplace par un seul espace.

    // toLowerCase() : convertir toutes les lettres en minuscules.

}

function validerResultat(resultat) {

    if (resultat.jour < 1 || resultat.jour > 7) {

        return "invalide";
    }

    if (resultat.exercicesTermines > resultat.totalExercices) {

        return "invalide";
    }

    if (typeof (resultat.challengeTermine) !== "boolean") {

        return "invalide"
    }

    return "valide";
}

// ========================================================
// PARTIE 3 : GESTION DES APPRENANTS
// ========================================================

function ajouterApprenant(apprenant) {

    for (let i = 0; i < apprenants.length; i++) {

        // Comparer l'ID de l'apprenant existant avec l'ID du nouvel apprenant

        if (apprenants[i].id === apprenant.id) {

            return "ID déjà existant";
        }
    }

    apprenants.push(apprenant);

    return "apprenant ajoute";
}

// Cette fonction permet de rechercher un apprenant à partir de son ID
function rechercherApprenant(id) {

    for (let i = 0; i < apprenants.length; i++) {

        if (apprenants[i].id === id) {

            return apprenants[i];
        }
    }
}

// Cette fonction recherche l'apprenant, valide son résultat,
// puis l'ajoute ou le modifie dans ses résultats.

function enregistrerResultat(id, resultat) {

    let apprenant = rechercherApprenant(id);

    let validation = validerResultat(resultat);

    if (!apprenant) {

        return "apprenant introuvable";

    }

    if (validation === "invalide") {

        return "resultat invalide";
    }

    for (let i = 0; i < apprenant.resultats.length; i++) {

        if (apprenant.resultats[i].jour === resultat.jour) {

            apprenant.resultats[i] = resultat;

            return "resultat modifié";
        }
    }

    apprenant.resultats.push(resultat);

    return "resultat ajouté";
}

// ========================================================
// PARTIE 4 : CALCUL DE PROGRESSION
// ========================================================

// Cette fonction recherche un apprenant à partir de son ID,
// calcule sa progression totale en pourcentage,
// puis détermine son niveau : solide, en progression ou À renforcer.
// Elle retourne la progression en pourcentage et le niveau de l'apprenant.

function calculerProgression(id) {

    let totalTermines = 0;

    let totalExercices = 0;

    let apprenant = rechercherApprenant(id);

    if (!apprenant) {

        return "apprenant introuvable";

    }

    for (let i = 0; i < apprenant.resultats.length; i++) {

        totalTermines = totalTermines + apprenant.resultats[i].exercicesTermines;

        totalExercices = totalExercices + apprenant.resultats[i].totalExercices;

    }

    let pourcentage = (totalTermines / totalExercices) * 100;

    if (pourcentage >= 80) {

        return {

            pourcentage : pourcentage ,
            niveau : "solide"

               };

    } else if (pourcentage >= 50) {

        return { 

            pourcentage: pourcentage ,
            niveau : "en progression"

               };

    } else {

        return {
            
            pourcentage : pourcentage,
            niveau : "À renforcer"

               }; 
    }
}

// ========================================================
// PARTIE 5 : RECHERCHE / FILTRE / TRI
// ========================================================

// Cette fonction filtre les apprenants selon leur niveau.
// Elle vérifie le niveau de chaque apprenant
// et retourne uniquement ceux qui correspondent au niveau demandé.

function filtrerParNiveau(niveau) {

    let resultat = [];

    for (let i = 0; i < apprenants.length; i++) {

        // Calculer le niveau de l'apprenant actuel puis le comparer avec le niveau demandé

        if (calculerProgression(apprenants[i].id).niveau === niveau) {

            resultat.push(apprenants[i]);

        }
    }

    return resultat;
}

// Cette fonction trie les apprenants par ordre décroissant de progression.
// Elle calcule le pourcentage de chaque apprenant,
// puis compare les pourcentages pour les classer du plus élevé au plus faible.
// Elle retourne ensuite la liste des apprenants triée.

function trierParProgression(){

    apprenants.sort(function ( apprenant1 , apprenant2){

       let pourcentage1 = calculerProgression(apprenant1.id).pourcentage ;

       let pourcentage2 = calculerProgression(apprenant2.id).pourcentage ;

       return pourcentage2 - pourcentage1 ;
    });

    return apprenants ;
}

// ========================================================
// PARTIE 6 : DASHBOARD
// ========================================================

// Cette fonction affiche un résumé des informations des apprenants.
// Elle affiche le nombre total des apprenants,
// la moyenne de progression,
// le nombre d'apprenants par niveau,
// la liste des apprenants triée par progression,
// et les jours ou challenges manquants.

function afficherTableauDeBord(){

    let totalApprenants = apprenants.length ;

    console.log("Total apprenants :", totalApprenants);

    let totalProgression = 0 ;
    
    for (let i = 0 ; i < totalApprenants ; i++){

    totalProgression = totalProgression + calculerProgression(apprenants[i].id).pourcentage;
    }
    let moyenneProgression = totalProgression / totalApprenants ;

    console.log("Moyenne progression :", moyenneProgression);

    let nombreSolide = 0;
    let nombreEnProgression = 0;
    let nombreARenforcer = 0;

    console.log("Solide :", nombreSolide);
    console.log("En progression :", nombreEnProgression);
    console.log("À renforcer :", nombreARenforcer);

    for ( let i = 0 ; i < totalApprenants ; i++){

        let progression = calculerProgression(apprenants[i].id);

        if (progression.niveau === "solide"){
            nombreSolide++ ;

        }else if ( progression.niveau === "en progression"){
            nombreEnProgression++ ;

        }else{
            nombreARenforcer++
        }
    }
    let listeTriee = trierParProgression();

    for (let i = 0 ; i < listeTriee.length ; i++){

        let progress = calculerProgression(listeTriee[i].id) ; 

        console.log( listeTriee[i].nomComplet, progress.pourcentage, progress.niveau );
    }

    for (let i = 0 ; i < totalApprenants ; i++){

        let apprenant = apprenants[i] ;

        let joursManquants = [];

        let challengesManquants = [];

        for (let jour = 1; jour <= 7; jour++) {

            let jourExiste = false;

            for (let j = 0 ; j < apprenant.resultats.length ; j++){

                
                let jourResultat = apprenant.resultats[j].jour;
                
                if(jour === jourResultat){
                    
                    jourExiste = true ;
                }
            }
            
            if (jourExiste === false) {

                joursManquants.push(jour);

            }
        }

        for (let j = 0; j < apprenant.resultats.length; j++) {

            if (apprenant.resultats[j].challengeTermine === false) {

                challengesManquants.push(apprenant.resultats[j].jour);
            }
        }

        console.log(apprenant.nomComplet, joursManquants, challengesManquants);
    }
}


// ========================================================
// PARTIE 7 : MENU
// ========================================================

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function afficherMenu() {

    console.log("\n================================");
    console.log("      SAS PROGRESS CONSOLE");
    console.log("================================");

    console.log("1. Afficher le tableau de bord");
    console.log("2. Afficher la liste des apprenants");
    console.log("3. Ajouter un apprenant");
    console.log("4. Consulter un apprenant par identifiant");
    console.log("5. Ajouter ou modifier le résultat d'une journée");
    console.log("6. Rechercher un apprenant par nom");
    console.log("7. Filtrer les apprenants par niveau");
    console.log("8. Trier les apprenants par progression décroissante");
    console.log("9. Trier les apprenants par ordre alphabétique");
    console.log("0. Quitter");

    rl.question("Votre choix : ", function (choix) {

        switch (choix) {

            case "1":
                afficherTableauDeBord();
                afficherMenu();
                break;
            case "2":

                for (let i = 0; i < apprenants.length; i++) {

                    console.log(
                        apprenants[i].id,
                        apprenants[i].nomComplet,
                        apprenants[i].ville
                    );
                }

                afficherMenu();
                break;
            case "3":

                rl.question("Identifiant : ", function (id) {

                    rl.question("Nom complet : ", function (nomComplet) {

                        rl.question("Ville : ", function (ville) {

                            let nouvelApprenant = {
                                id: Number(id),
                                nomComplet: nomComplet,
                                ville: ville,
                                resultats: []
                            };

                            let message = ajouterApprenant(nouvelApprenant);

                            console.log(message);

                            afficherMenu();
                        });
                    });
                });

                break;
            case "4":

                rl.question("Identifiant de l'apprenant : ", function (id) {

                    let apprenant = rechercherApprenant(Number(id));

                    if (apprenant) {

                        console.log("Apprenant trouvé :", apprenant);

                    } else {

                        console.log("Apprenant introuvable");
                    }

                    afficherMenu();
                });

                break;
            case "5":

                rl.question("Identifiant de l'apprenant : ", function (id) {

                    let apprenant = rechercherApprenant(Number(id));

                    if (!apprenant) {

                        console.log("Apprenant introuvable");
                        afficherMenu();
                        return;
                    }

                    console.log("Apprenant trouvé :", apprenant.nomComplet);

                    rl.question("Jour (1 à 7) : ", function (jour) {

                        rl.question("Exercices terminés : ", function (exercicesTermines) {

                            rl.question("Total d'exercices proposés : ", function (totalExercices) {

                                rl.question(
                                    "Challenge terminé (oui/non) : ",
                                    function (challenge) {

                                        let resultat = {

                                            jour: Number(jour),

                                            exercicesTermines:
                                                Number(exercicesTermines),

                                            totalExercices:
                                                Number(totalExercices),

                                            challengeTermine:
                                                challenge.toLowerCase() === "oui"
                                        };

                                        let message =
                                            enregistrerResultat(
                                                Number(id),
                                                resultat
                                            );

                                        console.log(message);

                                        if (
                                            message === "resultat ajouté" ||
                                            message === "resultat modifié"
                                        ) {

                                            let progression =
                                                calculerProgression(Number(id));

                                            console.log(
                                                apprenant.nomComplet,
                                                ": progression",
                                                progression.pourcentage,
                                                "%"
                                            );
                                        }

                                        afficherMenu();
                                    }
                                );
                            });
                        });
                    });
                });

                break;
            case "6":

                rl.question("Nom à rechercher : ", function (nomRecherche) {

                    let recherche =
                        normaliserNom(nomRecherche);

                    let trouve = false;

                    for (let i = 0; i < apprenants.length; i++) {

                        let nom =
                            normaliserNom(apprenants[i].nomComplet);

                        if (nom.includes(recherche)) {

                            console.log(
                                apprenants[i].id,
                                apprenants[i].nomComplet,
                                apprenants[i].ville
                            );

                            trouve = true;
                        }
                    }

                    if (!trouve) {

                        console.log("Aucun apprenant trouvé");
                    }

                    afficherMenu();
                });

                break;
            case "7":

                rl.question(
                    "Niveau (solide / en progression / À renforcer) : ",
                    function (niveau) {

                        let resultat =
                            filtrerParNiveau(niveau);

                        if (resultat.length === 0) {

                            console.log("Aucun apprenant trouvé");

                        } else {

                            for (let i = 0; i < resultat.length; i++) {

                                console.log(
                                    resultat[i].nomComplet
                                );
                            }
                        }

                        afficherMenu();
                    }
                );

                break;
            case "8":

                let listeTriee =
                    trierParProgression();

                for (let i = 0; i < listeTriee.length; i++) {

                    let progression =
                        calculerProgression(listeTriee[i].id);

                    console.log(
                        listeTriee[i].nomComplet,
                        progression.pourcentage + "%"
                    );
                }

                afficherMenu();
                break;
            case "9":

                apprenants.sort(function (a, b) {

                    return normaliserNom(a.nomComplet)
                        .localeCompare(
                            normaliserNom(b.nomComplet)
                        );
                });

                for (let i = 0; i < apprenants.length; i++) {

                    console.log(
                        apprenants[i].nomComplet
                    );
                }

                afficherMenu();
                break;
            case "0":

                console.log("Merci d'avoir utilisé SAS Progress Console.");
                rl.close();
                break;
            default:

                console.log("Choix invalide. Veuillez choisir entre 0 et 9.");
                afficherMenu();
        }
    });
}

//afficherMenu();

// afficherMenu();

console.log(enregistrerResultat(1, {
    jour: 3,
    exercicesTermines: 16,
    totalExercices: 20,
    challengeTermine: true
}));

console.log(rechercherApprenant(1));
