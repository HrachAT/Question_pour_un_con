<?php
session_start();
require_once __DIR__ . '/../Modeles/modele_admin.inc.php';
require_once __DIR__ . '/../Modeles/modele_questions.inc.php';


if (filter_input(INPUT_SERVER, 'REQUEST_METHOD') === 'GET') {
    // récupération de la donnée 'commande'
    $commande = filter_input(INPUT_GET, 'commande');

    // envoi de l'en-tête pour la réponse en json
    header('Content-Type: application/json');

    switch ($commande) {
        case 'getCategories' :
            echo json_encode(showCategories());
            break;

        case 'ajoutQuestion':
            $idType = filter_input(INPUT_GET, 'id_type', FILTER_VALIDATE_INT);
            $question = filter_input(INPUT_GET, 'intitule', FILTER_DEFAULT);
            $answer = filter_input(INPUT_GET, 'reponse', FILTER_DEFAULT);
            echo json_encode(ajoutQuestions($idType, $question, $answer));
            break;
//          case 'enregistrerScore' :
//            $type = filter_input(INPUT_POST, 'type');
//            $score = filter_input(INPUT_POST, 'score');
//            $joueur = filter_input(INPUT_POST, 'joueur');
//            echo enregistrerScore($type, $score, $joueur);
//            break;
        
        case 'getQuestions':
            $idCat = filter_input(INPUT_GET, 'idCategorie', FILTER_VALIDATE_INT);
            echo json_encode(getQuestions($idCat));
            break;
        //Côté Camille
        case 'deconnexion':
            if (isset($_SESSION['user'])) {
                unset($_SESSION['user']);
                unset($_SESSION['idUser']);
            }
            header("Location: ../Vues/vueregister.php");
            break;
        case  'getPseudo':
            echo json_encode($_SESSION['user']);
            break;

        default:
            echo json_encode("commande inconnue");
    }
}

if (filter_input(INPUT_SERVER, 'REQUEST_METHOD') === 'POST') {
    header('Content-Type: application/json');

    // on teste les deux types de commande possibles
    $commande = filter_input(INPUT_POST, 'commande');
    $commande2 = filter_input(INPUT_POST, 'commande2');

    if ($commande === 'verifLogMdp') {
        $pseudo = filter_input(INPUT_POST, 'pseudo');
        $mdp = filter_input(INPUT_POST, 'mdp');
        echo json_encode(creerCompte($pseudo, $mdp));
    } elseif ($commande2 === 'verifierLogin2') {
        $pseudo2 = filter_input(INPUT_POST, 'pseudo2');
        $mdp2 = filter_input(INPUT_POST, 'mdp2');
        echo json_encode(verifierLogin2($pseudo2, $mdp2));
    } else {
        echo json_encode("commande inconnue");
    }
}