/*function accesLogin(event) {
    event.preventDefault();
    const login = $('#login').val().trim();
    const mdp = $('#mdp').val().trim();
    console.log("ici");
    const $errorMessageLog = $('#error-messageLog');
    if (login === 'admin') {
        console.log("admin");
        if (mdp === 'admin972') {
            console.log("mdp ok");
            window.location.href = 'ajout_question.html';
        } else {
            console.log("mdp pas ok");
            $errorMessageLog.text("Accès refusé : identifiants administrateur incorrects.");
        }
    } else {
        window.location.href = 'vueregister.html';
    }
}*/

function verifierAuthentification(event)
{
    event.preventDefault();
    var login = $("#logReg").val();
    var mdp = $("#mdpReg").val();
    var mdp2 = $("#confirm_mdp").val();
    var $errorMessageReg = $('#error-messageReg');
    if (mdp === mdp2) {
        console.log("here2");
        // appel du script verifLogin.php via ajax
        $.ajax({
            url: '../Controleurs/controleur.php',
            data: {
                "commande": 'verifLogMdp',
                "pseudo": login,
                "mdp": mdp
            },
            type: 'POST',
            dataType: 'json',
            success:
                    function (donnees, status, xhr) {
                        switch (donnees)
                        {
                            case "user":
                                window.location = "vueacceuil.html";
                                break;
                            case "admin":
                            window.location = "ajout_question.html";
                            break;
                            case "existe":
                                 $errorMessageReg.text("Le compte existe déjà..");
                                
                            
                        }
                        
                        
                    },
                    
            error:
                    function (xhr, status, error) {
                        console.log("param : " + JSON.stringify(xhr));
                        console.log("status : " + status);
                        console.log("error : " + error);
                    }
        });
    } else {
        console.log("here3");
        $errorMessageReg.text("Les mots de passe ne correspondent pas. Veuillez réessayer.");

    }
}

function verifierCompte(event)
{
    event.preventDefault();
    var login2 = $("#loginForm").val();
    var mdp2 = $("#mdpForm").val();
    var $errorMessageLog = $('#error-messageLog');
    // appel du script verifLogin.php via ajax
    $.ajax({
        url: '/../Controleurs/controleur.php',
        data: {
            "commande2": 'verifierLogin2',
            "pseudo2": login2,
            "mdp2": mdp2
        },
        type: 'POST',
        dataType: 'json',
        success: // si la requete fonctionne, mise à jour de la couleur de pastille
                function (donnees, status, xhr) {
                   if (donnees==="ok"){
                       window.location = "vueregister.php";
                   }else{
                       $errorMessageLog.text("Identifiants incorrects.");
                   }
                },
        error:
                function (xhr, status, error) {
                    console.log("param : " + JSON.stringify(xhr));
                    console.log("status : " + status);
                    console.log("error : " + error);

                }
    }
    );
}




$(document).ready(function () {
    // Formulaire d'enregistrement
    $("#loginFormReg").submit(verifierAuthentification);

    // Formulaire de connexion
    $("#loginFormLog").submit(verifierCompte);

    // Gestion affichage formulaire
    $("#Formregister").hide();
    $("#Formconnexion").show();

    $("#swapRegister").click(function () {
        $("#Formregister").show();
        $("#Formconnexion").hide();
    });

    $("#swapLogin").click(function () {
        $("#Formconnexion").show();
        $("#Formregister").hide();
    });
});