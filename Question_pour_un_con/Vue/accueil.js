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

function getPseudo()
{
     $.getJSON('../Controleurs/controleur.php', {
        'commande': 'getPseudo'
    })
            .done(function (donnees, stat, xhr) {
                $("#pseudo").text(donnees);
            })
            .fail(function (xhr, text, error) {
                console.log("param : " + JSON.stringify(xhr));
                console.log("status : " + text);
                console.log("error : " + error);
            });
}

function chargerQuiz(e)
{
    e.preventDefault();
    var idCat=$("#categories option:selected").val();
    window.location.href="vuequestions.html?idCat="+idCat;
}

$(document).ready(function () {
    genererListeCategories();
    
    $("#commencer").click(chargerQuiz);
  getPseudo(); 
});


