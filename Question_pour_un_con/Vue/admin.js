function genererCategories() {
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

function ajoutQuestions() {
    var idType = $('#categories').val();
    var question = $('#questions').val();
    var reponse = $('#reponses').val();

    // Vérifie si une catégorie est bien sélectionnée
    if (idType === "-1" || question === "" || reponse === "") {
        alert("Tous les champs doivent être remplis et une catégorie valide doit être sélectionnée !");
        return;
    }

    $.getJSON('../Controleurs/controleur.php', {
        'commande': 'ajoutQuestion',
        'id_type': idType,
        'intitule': question,
        'reponse': reponse
    })
            .done(function (donnees, stat, xhr) {
                console.log("Question ajoutée !");
                $('#questions').val('');
                $('#reponses').val('');
                location.reload();
            })
            .fail(function (xhr, text, error) {
                console.log("param : " + JSON.stringify(xhr));
                console.log("status : " + text);
                console.log("error : " + error);
            });


}

function remplirCategories() {
    $.getJSON('../Controleurs/controleur.php',
            {

                commande: 'getCategories'

            })
            .done(function (donnees, stat, xhr) {
                
                $('#cat').DataTable({
                    /* a completer */

                    "data": donnees,

                    "lengthMenu": [[5, 10, 15, 25, 50, 100, -1], [5, 10, 15, 25, 50, 100, "Tous"]],
                    "pageLength": 5,
                    "language": {
                        "lengthMenu": "Afficher _MENU_ lignes par page",
                        "info": "page _PAGE_ sur _PAGES_",
                        "infoEmpty": "pas de résultat",
                        "search": "Recherchez: ",
                        "paginate": {
                            "first": "Premier",
                            "last": "Dernier",
                            "next": "Suivant",
                            "previous": "Précédent"
                        }
                    },
                    "order": [[5, "asc"]]
                });
            }
            )
            .fail(function (xhr, text, error) {
                console.log("param : " + JSON.stringify(xhr));
                console.log("status : " + text);
                console.log("error : " + error);
            });
}





$(document).ready(function () {
    
    genererCategories();
    $('#envoyer').click(ajoutQuestions);
    remplirCategories();
});