<?php
session_start();

if (isset($_SESSION['user']))
{
    if ($_SESSION['user']=="admin")
    {
        header("Location: ajout_question.html");
    }
    else
    {
        header("Location: vueacceuil.html");
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Register - Question pour un gros con</title>
        <link href="libs/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <script src="libs/bootstrap/js/bootstrap.min.js"></script>
        <script src="libs/jquery/jquery.min.js"></script>

        <script src="register.js" defer></script>


    </head>
    <body style="background-color: #9C27B0;" class="text-white">
        <div class="container">
            <!-- Titre -->
            <div class="text-center bg-white bg-opacity-25 rounded-3 py-3 shadow-lg mx-auto mt-2" style="width: 48%;">
                <h1 class="fw-bold m-0">Question pour un gros con</h1>
            </div>
            <div class="container-fluid d-flex flew-row justify-content-center" >

                <section id="Formregister">


                    <!-- Formulaire -->
                    <div class="bg-white bg-opacity-25 p-4 rounded-3 shadow-lg w-auto mt-5" style="max-width: 400px;">
                        <h2 class="mb-4 text-center">Register</h2>
                        <form id="loginFormReg" method="post">
                            <div class="mb-3">
                                <input type="text" name="logReg" id="logReg" class="form-control form-control-lg" placeholder="Nom d'utilisateur" required>
                            </div>
                            <div class="mb-3">
                                <input type="password" name="mdpreg" id="mdpReg" class="form-control form-control-lg" placeholder="Mot de passe" required>
                            </div>
                            <div class="mb-3">
                                <input type="password" name="confirm_mdp" id="confirm_mdp" class="form-control form-control-lg" placeholder="Confirmer le mot de passe" required>
                            </div>
                            <input type="submit" class="btn btn-warning w-100 py-2" value="Se connecter" />
                        </form>

                        <div id="error-messageReg" class="text-danger text-center mt-3"></div>

                        <!-- Lien pour les comptes existants -->
                        <p class="text-center mt-3">
                            Pas de compte ?
                            <!--<a href="vuelogin.html" class="text-warning fw-bold text-decoration-underline">Se connecter ici</a>-->
                             <span id="swapLogin" class="text-warning fw-bold text-decoration-underline">Se connecter ici</span>
                        </p>
                    </div>
                </section>

                <section id="Formconnexion">


                    <!-- Formulaire -->
                    <div class="bg-white bg-opacity-25 p-4 rounded-3 shadow-lg w-auto mt-5" style="max-width: 400px;">
                        <h2 class="mb-4 text-center">Connexion</h2>
                        <form id="loginFormLog" method="post">
                            <div class="mb-3">
                                <input type="text" name="login" id="loginForm" class="form-control form-control-lg" placeholder="Nom d'utilisateur" required>
                            </div>
                            <div class="mb-3">
                                <input type="password" name="mdp" id="mdpForm" class="form-control form-control-lg" placeholder="Mot de passe" required>
                            </div>
                            <input type="submit" class="btn btn-warning w-100 py-2" value="Se connecter"/>
                        </form>
                        <div id="error-messageLog" class="text-danger text-center mt-3"></div>
                        <p class="text-center mt-3">
                            Déjà un compte ?
                            <span id="swapRegister" class="text-warning fw-bold text-decoration-underline">Créer un compte ici</span>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </body>
</html>