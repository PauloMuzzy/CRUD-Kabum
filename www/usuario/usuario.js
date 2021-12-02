const verificaLocalstorage = () => {

    const logadoLocalstorage = localStorage.getItem("logado")

    if (logadoLocalstorage == "1") {

        const loginLocalstorage = localStorage.getItem("login")
        const urlLoginLocalstorage = "/api/usuarios.php?acao=loginLocalstorage&login=" + loginLocalstorage
        $.ajax({
            method: "GET",
            url: urlLoginLocalstorage,
            success: function (res) {
                const saudacao = "Olá, " + res.NOME + "."
                $(".saudacao").html(saudacao)
                mostrarLogado()
                if (res.TYPE_USER == "MASTER") {
                    $("#btnFormUpdateUsuario").show()
                }
            }
        })
    }
}
verificaLocalstorage()

// ------------------------------------- OK -----------------------------
//BUSCA USUARIOS
$("#btnTabelaUsuarios").click(() => {

    mostrarTabelaUsuarios()

    $("#tbody tr").remove()

    $.ajax({
        method: "GET",
        url: "/api/usuarios.php?acao=listaUsuarios",
        success: (res) => {

            res.forEach(function (row) {

                var tableBody = document.getElementById("tbody");
                var newRow = document.createElement("tr");
                tableBody.appendChild(newRow);

                Object.values(row).forEach(value => {
                    var newCell = document.createElement("td");
                    newCell.textContent = value;
                    newRow.appendChild(newCell);
                })
                var actionsCell = document.createElement("td");
                var btnActionUpdate = document.createElement("button")
                var btnActionDelete = document.createElement("button")
                btnActionUpdate.setAttribute("data-id", row.ID)
                btnActionDelete.setAttribute("data-id", row.ID)
                btnActionUpdate.setAttribute("class", "btn btn-verde btnTabelaUpdate")
                btnActionDelete.setAttribute("class", "btn btn-vermelho btnTabelaDelete")
                btnActionUpdate.textContent = "UPDATE"
                btnActionDelete.textContent = "DELETE"
                actionsCell.appendChild(btnActionUpdate)
                actionsCell.appendChild(btnActionDelete)
                newRow.appendChild(actionsCell)
            });

            $(".btnTabelaUpdate").click(function () {

                const idBtnUpdate = $(this).attr('data-id')
                const urlIdBtnUpdate = "/api/usuarios.php?acao=updateUsuario&id=" + idBtnUpdate

                $.ajax({
                    method: "GET",
                    url: urlIdBtnUpdate,
                    success: (res) => {

                        const insereDadosInputUpdateUsuario = () => {

                            const idUpdateUsuario = idBtnUpdate
                            $("#idUpdateUsuario").val(idUpdateUsuario);

                            const loginUpdateUsuario = res.LOGIN
                            $("#loginUpdateUsuario").val(loginUpdateUsuario);

                            const createUpdateUsuario = res.ACESSO_CREATE
                            $("#createUpdateUsuario").val(createUpdateUsuario);
                            if (createUpdateUsuario == "HABILITADO") {
                                $("#createUpdateUsuario").attr("class", "btn btn-verde")
                            } else {
                                $("#createUpdateUsuario").attr("class", "btn btn-vermelho")
                            }

                            const readUpdateUsuario = res.ACESSO_READ
                            $("#readUpdateUsuario").val(readUpdateUsuario);
                            if (readUpdateUsuario == "HABILITADO") {
                                $("#readUpdateUsuario").attr("class", "btn btn-verde")
                            } else {
                                $("#readUpdateUsuario").attr("class", "btn btn-vermelho")
                            }

                            const updateUpdateUsuario = res.ACESSO_UPDATE
                            $("#updateUpdateUsuario").val(updateUpdateUsuario);
                            if (readUpdateUsuario == "HABILITADO") {
                                $("#updateUpdateUsuario").attr("class", "btn btn-verde")
                            } else {
                                $("#updateUpdateUsuario").attr("class", "btn btn-vermelho")
                            }

                            const deleteUpdateUsuario = res.ACESSO_DELETE
                            $("#deleteUpdateUsuario").val(deleteUpdateUsuario);
                            if (deleteUpdateUsuario == "HABILITADO") {
                                $("#deleteUpdateUsuario").attr("class", "btn btn-verde")
                            } else {
                                $("#deleteUpdateUsuario").attr("class", "btn btn-vermelho")
                            }
                        }

                        insereDadosInputUpdateUsuario()
                        mostrarFormUpdateUsuario()

                        $("#alertaSucessoUpdate").hide()
                        $("#alertaFalhaUpdate").hide()

                        let valueBtnCreateUpdate = document.querySelector("#createUpdateUsuario").value
                        let valueBtnReadUpdate = document.querySelector("#readUpdateUsuario").value
                        let valueBtnUpdateUpdate = document.querySelector("#updateUpdateUsuario").value
                        let valueBtnDeleteUpdate = document.querySelector("#deleteUpdateUsuario").value

                        // CREATE USUARIO
                        $("#createUpdateUsuario").click(() => {
                            if (valueBtnCreateUpdate == "HABILITADO") {
                                $("#createUpdateUsuario").removeClass()
                                $("#createUpdateUsuario").addClass("btn btn-vermelho-claro")
                                $("#createUpdateUsuario").attr("value", "DESABILITADO")
                            } else if (valueBtnCreateUpdate == "DESABILITADO") {
                                $("#createUpdateUsuario").removeClass()
                                $("#createUpdateUsuario").addClass("btn btn-verde-claro")
                                $("#createUpdateUsuario").attr("value", "HABILITADO")
                            }
                        })

                        // READ USUARIO
                        $("#readUpdateUsuario").click(() => {
                            if (valueBtnReadUpdate == "HABILITADO") {
                                $("#readUpdateUsuario").removeClass()
                                $("#readUpdateUsuario").addClass("btn btn-vermelho-claro")
                                $("#readUpdateUsuario").attr("value", "DESABILITADO")
                            } else if (valueBtnReadUpdate == "DESABILITADO") {
                                $("#readUpdateUsuario").removeClass()
                                $("#readUpdateUsuario").addClass("btn btn-verde-claro")
                                $("#readUpdateUsuario").attr("value", "HABILITADO")
                            }
                        })
                        // UPDATE USUARIO
                        $("#updateUpdateUsuario").click(() => {
                            if (valueBtnUpdateUpdate == "HABILITADO") {
                                $("#updateUpdateUsuario").removeClass()
                                $("#updateUpdateUsuario").addClass("btn btn-vermelho-claro")
                                $("#updateUpdateUsuario").attr("value", "DESABILITADO")
                            } else if (valueBtnUpdateUpdate == "DESABILITADO") {
                                $("#updateUpdateUsuario").removeClass()
                                $("#updateUpdateUsuario").addClass("btn btn-verde-claro")
                                $("#updateUpdateUsuario").attr("value", "HABILITADO")
                            }
                        })

                        // DELETE USUARIO
                        $("#deleteUpdateUsuario").click(() => {
                            if (valueBtnDeleteUpdate == "HABILITADO") {
                                $("#deleteUpdateUsuario").removeClass()
                                $("#deleteUpdateUsuario").addClass("btn btn-vermelho-claro")
                                $("#deleteUpdateUsuario").attr("value", "DESABILITADO")
                            } else if (valueBtnDeleteUpdate == "DESABILITADO") {
                                $("#deleteUpdateUsuario").removeClass()
                                $("#deleteUpdateUsuario").addClass("btn btn-verde-claro")
                                $("#deleteUpdateUsuario").attr("value", "HABILITADO")
                            }
                        })

                        let valueInputCreate = document.getElementById("createUpdateUsuario").value
                        let valueInputRead = document.getElementById("readUpdateUsuario").value
                        let valueInputUpdate = document.getElementById("updateUpdateUsuario").value
                        let valueInputDelete = document.getElementById("deleteUpdateUsuario").value

                        if (valueInputCreate == "HABILITADO") {
                            valueInputCreate = "DESABILITADO"
                        } else {
                            valueInputCreate = "HABILITADO"
                        }

                        if (valueInputRead == "HABILITADO") {
                            valueInputRead = "DESABILITADO"
                        } else {
                            valueInputRead = "HABILITADO"
                        }

                        if (valueInputUpdate == "HABILITADO") {
                            valueInputUpdate = "DESABILITADO"
                        } else {
                            valueInputUpdate = "HABILITADO"
                        }

                        if (valueInputDelete == "HABILITADO") {
                            valueInputDelete = "DESABILITADO"
                        } else {
                            valueInputDelete = "HABILITADO"
                        }

                        const objUpdateUsuario = {
                            create: valueInputCreate,
                            read: valueInputRead,
                            update: valueInputUpdate,
                            delete: valueInputDelete,
                            id: idBtnUpdate
                        }

                        $("#updateUsuario").click(function () {
                            $.ajax({
                                type: "PUT",
                                url: "/api/usuarios.php",
                                data: objUpdateUsuario,
                                success: () => {
                                    location.reload()
                                }
                            })
                        })
                    }
                })
            })
            mostrarTabelaUsuarios()
        }
    })
})