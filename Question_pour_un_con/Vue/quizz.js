function genererListeCategories() {
    $("#categories").find('option').not(':first').remove();
    $.getJSON('../Controleurs/controleur.php', {
        'commande': 'getCategories'
    })
            .done(function (donnees, stat, xhr) {
                if (donnees.length === 0) {
                    alert("Aucune catégorie trouvée.");
                } else {
                    $.each(donnees, function (index, ligne) {
                        $("#categories").append($('<option>', {value: ligne.id}).text(ligne.nom_type));
                    });
                }
            })
            .fail(function (xhr, text, error) {
                console.log("param : " + JSON.stringify(xhr));
                console.log("status : " + text);
                console.log("error : " + error);
            });
}



function getQuestions() {
    var idCat = $("#categorie").val();
    $.getJSON('../Controleurs/controleur.php', {
        commande: 'getQuestions',
        idCategorie: idCat
    })
            .done(function (data) {
                $.each(data, function (index, ligne) {
                    $('#quiz-container').append(`
                <div class="card p-3 bg-white text-center bg-opacity-25 shadow-lg">
                    <h4 class="mb-3 text-white">${ligne.intitule}</h4>
                    <input type="text" id="${ligne.id}" class="form-control mb-2 " placeholder="Votre réponse">
                    <input type="hidden" value="${ligne.reponse}" class="form-control mb-2">
                    <button class="btn btn-warning checkResponse" >Vérifier</button>
                </div>
            `);
                });

            })


            .fail(function (xhr, text, error) {
                console.error("XHR:", xhr);
                //  alert("Erreur de chargement des questions.");
            });
}
function verifReponse()
{
    console.log("ici");
    // Récupérer l'élément parent (card) du bouton "Vérifier"
    var card = $(this).closest('.card');

    // Récupérer la réponse de l'utilisateur (valeur du champ texte)
    var userAnswer = card.find('input[type="text"]').val().trim();

    // Récupérer la réponse correcte (valeur du champ caché)
    var correctAnswer = card.find('input[type="hidden"]').val().trim();

    // Vérification de la réponse
    if (userAnswer === correctAnswer) {
        // Si les réponses sont identiques, afficher un check vert
        card.find('.checkResponse').append('<span class="text-success ms-2">✔️</span>');
    } else {
        // Sinon, afficher un check rouge
        card.find('.checkResponse').append('<span class="text-danger ms-2">❌</span>');
    }

    // Désactiver le bouton après vérification
    $(this).prop('disabled', true);
}

function calculerScore() {
    let total = $('.card').length;
    let score = 0;

    $('.card').each(function () {
        let userAnswer = $(this).find('input[type="text"]').val().trim();
        let correctAnswer = $(this).find('input[type="hidden"]').val().trim();

        if (userAnswer !== "" && userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            score++;
        }
    });

    $('#resultatScore').html(`✅ Vous avez ${score} bonnes réponses sur ${total}`);
    
}



//function enregistrerScore() {
//
//var score = 0;
//var id_categorie = 0;
//var id_joueur = 0;
//
//
//    $.get('../Controleurs/controleurs.php',
//            {
//                'commande': 'enregistrerScore',
//                'type': id_categorie,
//                'score': score,
//                'joueur': id_joueur
//            }
//    )
//            .done(function (data, stat, xhr) {
//
//                console.log(data);
//
//
//            })
//            .fail(function (xhr, text, error) {
//                console.log("param : " + JSON.stringify(xhr));
//                console.log("status : " + text);
//                console.log("error : " + error);
//            });
//
//}


$(document).ready(function () {
    // recuperer l'id de la categories et le mettre dans le champs categorie
    const params = new URLSearchParams(window.location.search);
    $("#categorie").val(params.get('idCat'));
    getQuestions();
    $(document).on('click', '.checkResponse', verifReponse);
    $(document).on('click', '#voirScore', calculerScore);



});
