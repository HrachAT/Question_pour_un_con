<?php
require_once __DIR__ . "/modele.inc.php";

function getQuestions($idCat){
    try {
        $bdd = connexionBdd();

        // Vérification que l'ID de catégorie existe dans la table type_questions
        $questions = $bdd->prepare('SELECT id, intitule, reponse FROM questions WHERE id_type= :id order by rand() limit 5;');
        $questions->bindParam(":id", $idCat);
        $questions->execute();
        $tabquestions = array();
        while ($ligne = $questions->fetch(PDO::FETCH_ASSOC)){
            array_push($tabquestions,$ligne);
        }
        $questions->closeCursor();
        return $tabquestions;
    } catch (PDOException $exc) {
        return json_encode(["error" => "Problème : " . $exc->getMessage()]);
    }
}

//function enregistrerScore($type, $score, $joueur) {
//    try {
//
//        $bdd = connexionBdd();
//        $requete = $bdd->prepare("INSERT INTO `scores` (`id_type`, `id_joueur`, `score`, `horodatage`) VALUES (:id_type, :id_joueur, :score, now())");
//        $succes = $requete->execute([
//            ":id_type" => $type,
//            ":id_joueur" => $joueur,
//            ":score" => $score
//        ]);
//        return json_encode($succes);
//        
//    } catch (Exception $ex) {
//        $message = "Enregistrer Score: " . $ex->getMessage();
//        return json_encode($message);
//    }
//}