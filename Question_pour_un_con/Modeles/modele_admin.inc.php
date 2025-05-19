<?php

require_once __DIR__ . "/modele.inc.php";

function showCategories() {
    try {
        $bdd = connexionBdd();
        $requete = $bdd->query('SELECT id, nom_type FROM type_questions;');
        $requete->execute();

        $categories = array();
        while ($reponse = $requete->fetch(PDO::FETCH_ASSOC)) {
            array_push($categories, $reponse);
        }
        $requete->closeCursor();
        return $categories;
    } catch (PDOException $exc) {
        print("Problème :" . $exc->getMessage());
        die();
    }
}

function ajoutQuestions($idType, $question, $answer) {
    try {
        $bdd = connexionBdd();

        // Vérification que l'ID de catégorie existe dans la table type_questions
        $verifCategorie = $bdd->prepare('SELECT COUNT(*) FROM type_questions WHERE id = :id');
        $verifCategorie->bindParam(":id", $idType);
        $verifCategorie->execute();
        $resultat = $verifCategorie->fetchColumn();
        
        if ($resultat == 0) {
            return json_encode(["error" => "La catégorie sélectionnée n'existe pas."]);
        }

        // Insertion de la question si la catégorie existe
        $requete = $bdd->prepare('INSERT INTO questions(id_type, intitule, reponse) '
                . 'VALUES (:id, :question, :answer) ');
        $requete->bindParam(":id", $idType);
        $requete->bindParam(":question", $question);
        $requete->bindParam(":answer", $answer);
        $requete->execute();
        $requete->closeCursor();
        
        return json_encode(["success" => "Question ajoutée avec succès !"]);
    } catch (PDOException $exc) {
        return json_encode(["error" => "Problème : " . $exc->getMessage()]);
    }
}

function creerCompte($pseudo, $mdp) {
    try {
        $bdd = connexionBdd();

        $retour = "user";
        $verif = $bdd->prepare("SELECT COUNT(*) FROM joueurs WHERE pseudo = :pseudo");
        $verif->execute([":pseudo" => $pseudo]);
        if ($pseudo == "admin") {
            $retour = "admin";
        }
        if ($verif->fetchColumn() > 0) {

            $retour = "existe";
        }

        $hash = password_hash($mdp, PASSWORD_DEFAULT);

        $requete = $bdd->prepare("INSERT INTO joueurs (pseudo, mdp) VALUES (:pseudo,  :mdp);");
        $requete->bindParam(":pseudo", $pseudo);
        $requete->bindParam(":mdp", $hash);
        $requete->execute();
        return $retour;
    } catch (Exception $exc) {
        print "Erreur : " . $exc->getMessage() . "<br/>";
        die();
    }
}

function verifierLogin2($pseudo2, $mdp2) {
    try {
        $bdd = connexionBdd();
        $requete = $bdd->prepare("SELECT id, mdp FROM `joueurs` where `pseudo` = :login");
        $requete->execute([":login" => $pseudo2]);
        $resultat = $requete->fetch(PDO::FETCH_OBJ);
        $requete->closeCursor();
        $retour = "nok";
        // Si utilisateur trouvé
        if ($resultat) {

            // Vérifie le mot de passe saisi avec le hash stocké
            if (password_verify($mdp2, $resultat->mdp)) {
                $retour="ok";
                $_SESSION['user']=$pseudo2;
                $_SESSION['idUser']=$resultat->id;
            }
        }
        return $retour;
    } catch (Exception $ex) {
        $message = "Erreur verifierMdp: " . $ex->getMessage();
        return $message;
    }
}