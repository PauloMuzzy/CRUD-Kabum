$(function () {

    const statusLogged = () => {
        $("#statusLogin").show()
    }

    // ------------------------------------- OK -----------------------------
    //VERIFICAR LOCALSTORAGE
    const verificaLogin = () => {

        const logadoLocalstorage = localStorage.getItem("logado")

        if (logadoLocalstorage == "1") {

            const loginLocalstorage = localStorage.getItem("login")
            const urlLoginLocalstorage = "/api/usuarios.php?acao=loginLocalstorage&login=" + loginLocalstorage

            statusLogged()

            $.ajax({
                method: "GET",
                url: urlLoginLocalstorage,
                success: function (res) {
                    idUsuario = res.id_usuario

                    const salutation = "Olá, " + res.nome + "."
                    $("#salutation").html(salutation)
                    $("#btnShowCustomers").show()

                    if (res.usuario_tipo == "MASTER") {
                        $("#btnShowUsers").show()
                    }
                }
            })
        } else {
            window.location.href = "../index.html"
        }
    }
    verificaLogin()


    // ------------------------------------- OK -----------------------------
    //ADICIONA ENDEREÇO
    var clicks = 0;
    $("#btnAddAddress").click(function (e) {
        e.preventDefault()
        clicks += 1;

        var tagForm = document.createElement("form")
        $("#addresses").append(tagForm)
        tagForm.setAttribute("id", 'formAddress' + clicks)
        tagForm.setAttribute("method", 'POST')
        tagForm.setAttribute("class", 'formAddress')

        var tagH3 = document.createElement("h3")
        tagH3.setAttribute("id", 'h3Address' + clicks)
        tagForm.appendChild(tagH3)

        if (clicks == "1") {
            tagH3.textContent = "ENDEREÇO " + clicks + " - (PRINCIPAL)"
        } else {
            tagH3.textContent = "ENDEREÇO " + clicks

        }

        // ----------- RUA -----------

        var tagLabel = document.createElement("label")
        tagLabel.setAttribute("for", 'streetAddres' + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = "Rua/Avenida"

        var tagInput = document.createElement("input")
        tagInput.setAttribute("class", 'addressCustomer')
        tagInput.setAttribute("name", 'streetAddres')
        tagInput.setAttribute("id", "streetAddress" + clicks)
        tagForm.appendChild(tagInput)

        // ----------- NÚMERO -----------

        var tagLabel = document.createElement("label")
        tagLabel.setAttribute("for", 'numberAddres' + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = "Número"

        var tagInput = document.createElement("input")
        tagInput.setAttribute("class", 'addressCustomer')
        tagInput.setAttribute("name", 'numberAddress')
        tagInput.setAttribute("id", 'numberAddress' + clicks)
        tagForm.appendChild(tagInput)

        // ----------- BAIRRO -----------

        var tagLabel = document.createElement("label")
        tagLabel.setAttribute("for", 'districtAddres' + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = "Bairro"

        var tagInput = document.createElement("input")
        tagInput.setAttribute("class", 'addressCustomer')
        tagInput.setAttribute("name", 'districtAddres')
        tagInput.setAttribute("id", 'districtAddres' + clicks)
        tagForm.appendChild(tagInput)

        // ----------- CEP -----------

        var tagLabel = document.createElement("label")
        tagLabel.setAttribute("for", 'cepAddres' + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = "CEP"

        var tagInput = document.createElement("input")
        tagInput.setAttribute("class", 'addressCustomer')
        tagInput.setAttribute("name", 'cepAddres')
        tagInput.setAttribute("id", 'cepAddres' + clicks)
        tagForm.appendChild(tagInput)

        // ----------- CIDADE -----------

        var tagLabel = document.createElement("label")
        tagLabel.setAttribute("for", 'cityAddres' + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = "Cidade"

        var tagInput = document.createElement("input")
        tagInput.setAttribute("class", 'addressCustomer')
        tagInput.setAttribute("name", 'cityAddres')
        tagInput.setAttribute("id", 'cityAddres' + clicks)
        tagForm.appendChild(tagInput)

        // ----------- ESTADO -----------

        var tagLabel = document.createElement("label")
        tagLabel.setAttribute("for", 'stateAddres' + clicks)
        tagForm.appendChild(tagLabel)
        tagLabel.textContent = "Estado"

        var tagInput = document.createElement("input")
        tagInput.setAttribute("class", 'addressCustomer')
        tagInput.setAttribute("name", 'stateAddres')
        tagInput.setAttribute("id", 'stateAddres' + clicks)
        tagInput.setAttribute("name", 'stateAddres')
        tagForm.appendChild(tagInput)

    })


    // ------------------------------------- OK -----------------------------
    //CADASTRA CLIENTE E ENDREÇO(S)
    $("#teste").click(function (e) {
        e.preventDefault()

        const nameRegisterCustomer = document.getElementById("nameRegisterCustomer").value
        const cpfRegisterCustomer = document.getElementById("cpfRegisterCustomer").value
        const rgRegisterCustomer = document.getElementById("rgRegisterCustomer").value
        const emailRegisterCustomer = document.getElementById("emailRegisterCustomer").value
        const tel1RegisterCustomer = document.getElementById("tel01RegisterCustomer").value
        const tel2RegisterCustomer = document.getElementById("tel02RegisterCustomer").value
        const dataNascRegisterCustomer = document.getElementById("dataNascRegisterCustomer").value

        const objRegisterCustomer = {
            acao: "cadastraCliente",
            nome: nameRegisterCustomer,
            cpf: cpfRegisterCustomer,
            rg: rgRegisterCustomer,
            email: emailRegisterCustomer,
            tel1: tel1RegisterCustomer,
            tel2: tel2RegisterCustomer,
            dataNasc: dataNascRegisterCustomer,
            idUsuario: idUsuario
        }

        $.ajax({
            method: "POST",
            url: "/api/clientes.php",
            data: objRegisterCustomer,
            success: function (res) {
                console.log(res)
            }
        })

        for (var i = 1; i <= clicks; i++) {
            const streetAddres = document.getElementById("streetAddress" + i).value
            const numberAddress = document.getElementById("numberAddress" + i).value
            const districtAddres = document.getElementById("districtAddres" + i).value
            const cepAddres = document.getElementById("cepAddres" + i).value
            const cityAddres = document.getElementById("cityAddres" + i).value
            const stateAddres = document.getElementById("stateAddres" + i).value

            const objFirstAddress = {
                acao: "cadastraEndereco",
                cpf: cpfRegisterCustomer,
                rua: streetAddres,
                numero: numberAddress,
                bairro: districtAddres,
                cep: cepAddres,
                cidade: cityAddres,
                estado: stateAddres,
                principal: i,
                ativo: "1",
                idUsuario: idUsuario
            }

            // $query->bindParam(1, $cpf_cliente);
            // $query->bindParam(2, $rua);
            // $query->bindParam(3, $numero);
            // $query->bindParam(4, $bairro);
            // $query->bindParam(5, $cep);
            // $query->bindParam(6, $cidade);
            // $query->bindParam(7, $estado);
            // $query->bindParam(8, $principal);
            // $query->bindParam(9, $ativo);
            // $query->bindParam(10, $id_usuario);

            $.ajax({
                method: "POST",
                url: "/api/clientes.php",
                data: objFirstAddress,
                success: function (res) {
                    console.log(res)
                }
            })
        }

    })
})