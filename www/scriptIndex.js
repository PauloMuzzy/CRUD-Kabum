$(document).ready(function () {

    //Troca Div ENTRAR/CADASTRAR
    $("#formCadastrese").hide();
    $("#trocaDiv1").click(function () {
        $("#formCadastrese").show(150);
        $("#formLogin").hide(150);
    });

    $("#trocaDiv2").click(function () {
        $("#formLogin").show(150);
        $("#formCadastrese").hide(150);
    });

    /*
        //Mascaras
        $('#cpf').mask('999.999.999-99');
    
        //Mascara RG
        var mascaraRg = {
            'translation': {
                A: {
                    pattern: /[A-Za-z0-9]/
                }
            }
        };
        $('#rg').mask('99.999.999-A' || '99.999.999-99', mascaraRg);
        $('#telefone1').mask('(99)99999-9999');
        $('#telefone2').mask('(99)99999-9999');
    */
    $(".loginCliente").hide();

    var chaveLogado = 0;

    //Submit Login

    $("#formLogin").on("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData)
        localStorage.setItem("login", document.querySelector("#loginLogin").value);
        localStorage.setItem("senha", document.querySelector("#loginSenha").value);
        const pegarLogin = localStorage.getItem("login");
        const pegarSenha = localStorage.getItem("senha");

        if (pegarLogin == "paulo muzzy" && pegarSenha == "123123") {
            console.log("LOGADO");
            var chaveLogado = "1";
            localStorage.setItem("estaLogado", chaveLogado);
            console.log("aqui s");
        } else {
            console.log("DESLOGADO");
            var chaveLogado = "0";
            localStorage.setItem("estaLogado", chaveLogado);
            console.log("aqui n");
        }

        if (chaveLogado != "1") {
            $(".loginCliente").hide();
        } else {
            $(".loginCliente").show();
        }

    });

});

