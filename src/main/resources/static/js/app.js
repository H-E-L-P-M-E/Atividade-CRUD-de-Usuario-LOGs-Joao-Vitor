async function listarCarros() {
    try {
        const resposta = await fetch("/carro/listar");

        if (!resposta.ok) {
            throw new Error("Erro ao listar carros.");
        }

        const carros = await resposta.json();

        const tabela = document.getElementById("tabelaCarros");

        tabela.innerHTML = "";

        carros.forEach(carro => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${carro.id}</td>
                <td>${carro.modelo}</td>
                <td>${carro.ano}</td>
                <td>R$ ${Number(carro.preco).toFixed(2)}</td>
                <td>
                    <button type="button" onclick="editarCarro(${carro.id})">
                        Editar
                    </button>

                    <button type="button" onclick="excluirCarro(${carro.id})">
                        Excluir
                    </button>
                </td>
            `;

            tabela.appendChild(linha);
        });

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar os carros.");
    }
}


async function consultarCarro() {
    const id = prompt("Digite o ID do carro:");

    if (!id) {
        return;
    }

    try {
        const resposta = await fetch(`/carro/${id}`);

        if (resposta.status === 404) {
            alert("Carro não encontrado.");
            return;
        }

        if (!resposta.ok) {
            throw new Error("Erro ao consultar carro.");
        }

        const carro = await resposta.json();

        alert(
            `ID: ${carro.id}\n` +
            `Modelo: ${carro.modelo}\n` +
            `Ano: ${carro.ano}\n` +
            `Preço: R$ ${Number(carro.preco).toFixed(2)}`
        );

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível consultar o carro.");
    }
}


async function editarCarro(id) {
    try {
        const resposta = await fetch(`/carro/${id}`);

        if (!resposta.ok) {
            throw new Error("Carro não encontrado.");
        }

        const carro = await resposta.json();

        document.getElementById("carroId").value = carro.id;
        document.getElementById("modelo").value = carro.modelo;
        document.getElementById("ano").value = carro.ano;
        document.getElementById("preco").value = carro.preco;

        document.getElementById("modelo").focus();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar o carro para edição.");
    }
}


async function salvarCarro(evento) {
    evento.preventDefault();

    const id = document.getElementById("carroId").value;

    const carro = {
        modelo: document.getElementById("modelo").value,
        ano: Number(document.getElementById("ano").value),
        preco: Number(document.getElementById("preco").value)
    };

    try {
        let resposta;

        if (id) {
            resposta = await fetch(`/carro/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(carro)
            });
        } else {
            resposta = await fetch("/carro/salvar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(carro)
            });
        }

        if (!resposta.ok) {
            throw new Error("Erro ao salvar carro.");
        }

        alert(id ? "Carro atualizado com sucesso!" : "Carro cadastrado com sucesso!");

        limparFormularioCarro();
        await listarCarros();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível salvar o carro.");
    }
}


async function excluirCarro(id) {
    const confirmar = confirm(
        `Deseja realmente excluir o carro de ID ${id}?`
    );

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`/carro/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao excluir carro.");
        }

        alert("Carro excluído com sucesso!");

        await listarCarros();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível excluir o carro.");
    }
}


function limparFormularioCarro() {
    document.getElementById("carroId").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("ano").value = "";
    document.getElementById("preco").value = "";
}


async function listarPessoas() {
    try {
        const resposta = await fetch("/pessoa");

        if (!resposta.ok) {
            throw new Error("Erro ao listar pessoas.");
        }

        const pessoas = await resposta.json();

        const tabela = document.getElementById("tabelaPessoas");

        tabela.innerHTML = "";

        pessoas.forEach(pessoa => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${pessoa.id}</td>
                <td>${pessoa.nome}</td>
                <td>
                    <button type="button" onclick="editarPessoa(${pessoa.id})">
                        Editar
                    </button>

                    <button type="button" onclick="excluirPessoa(${pessoa.id})">
                        Excluir
                    </button>
                </td>
            `;

            tabela.appendChild(linha);
        });

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar as pessoas.");
    }
}


async function consultarPessoa() {
    const id = prompt("Digite o ID da pessoa:");

    if (!id) {
        return;
    }

    try {
        const resposta = await fetch(`/pessoa/${id}`);

        if (resposta.status === 404) {
            alert("Pessoa não encontrada.");
            return;
        }

        if (!resposta.ok) {
            throw new Error("Erro ao consultar pessoa.");
        }

        const pessoa = await resposta.json();

        alert(
            `ID: ${pessoa.id}\n` +
            `Nome: ${pessoa.nome}`
        );

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível consultar a pessoa.");
    }
}


async function editarPessoa(id) {
    try {
        const resposta = await fetch(`/pessoa/${id}`);

        if (!resposta.ok) {
            throw new Error("Pessoa não encontrada.");
        }

        const pessoa = await resposta.json();

        document.getElementById("pessoaId").value = pessoa.id;
        document.getElementById("nome").value = pessoa.nome;

        document.getElementById("nome").focus();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar a pessoa para edição.");
    }
}


async function salvarPessoa(evento) {
    evento.preventDefault();

    const id = document.getElementById("pessoaId").value;

    const pessoa = {
        nome: document.getElementById("nome").value
    };

    try {
        let resposta;

        if (id) {
            resposta = await fetch(`/pessoa/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pessoa)
            });
        } else {
            resposta = await fetch("/pessoa/salvar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pessoa)
            });
        }

        if (!resposta.ok) {
            throw new Error("Erro ao salvar pessoa.");
        }

        alert(id ? "Pessoa atualizada com sucesso!" : "Pessoa cadastrada com sucesso!");

        limparFormularioPessoa();
        await listarPessoas();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível salvar a pessoa.");
    }
}


async function excluirPessoa(id) {
    const confirmar = confirm(
        `Deseja realmente excluir a pessoa de ID ${id}?`
    );

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`/pessoa/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao excluir pessoa.");
        }

        alert("Pessoa excluída com sucesso!");

        await listarPessoas();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível excluir a pessoa.");
    }
}


function limparFormularioPessoa() {
    document.getElementById("pessoaId").value = "";
    document.getElementById("nome").value = "";
}

async function listarUsuarios() {
    try {
        const resposta = await fetch("/usuario");

        if (!resposta.ok) {
            throw new Error("Erro ao listar usuários.");
        }

        const usuarios = await resposta.json();

        const tabela = document.getElementById("tabelaUsuarios");

        tabela.innerHTML = "";

        usuarios.forEach(usuario => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nome}</td>
                <td>
                    <button type="button" onclick="editarUsuario(${usuario.id})">
                        Editar
                    </button>

                    <button type="button" onclick="excluirUsuario(${usuario.id})">
                        Excluir
                    </button>
                </td>
            `;

            tabela.appendChild(linha);
        });

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar os usuários.");
    }
}


async function consultarUsuario() {
    const id = prompt("Digite o ID do usuário:");

    if (!id) {
        return;
    }

    try {
        const resposta = await fetch(`/usuario/${id}`);

        if (resposta.status === 404) {
            alert("Usuário não encontrado.");
            return;
        }

        if (!resposta.ok) {
            throw new Error("Erro ao consultar usuário.");
        }

        const usuario = await resposta.json();

        alert(
            `ID: ${usuario.id}\n` +
            `Nome: ${usuario.nome}`
        );

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível consultar o usuário.");
    }
}


async function editarUsuario(id) {
    try {
        const resposta = await fetch(`/usuario/${id}`);

        if (!resposta.ok) {
            throw new Error("Usuário não encontrado.");
        }

        const usuario = await resposta.json();

        document.getElementById("usuarioId").value = usuario.id;
        document.getElementById("nomeUsuario").value = usuario.nome;

        document.getElementById("nomeUsuario").focus();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar o usuário para edição.");
    }
}


async function salvarUsuario(evento) {
    evento.preventDefault();

    const id = document.getElementById("usuarioId").value;

    const usuario = {
        nome: document.getElementById("nomeUsuario").value
    };

    try {
        let resposta;

        if (id) {
            resposta = await fetch(`/usuario/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });
        } else {
            resposta = await fetch("/usuario/salvar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            });
        }

        if (!resposta.ok) {
            throw new Error("Erro ao salvar usuário.");
        }

        alert(
            id
                ? "Usuário atualizado com sucesso!"
                : "Usuário cadastrado com sucesso!"
        );

        limparFormularioUsuario();
        await listarUsuarios();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível salvar o usuário.");
    }
}


async function excluirUsuario(id) {
    const confirmar = confirm(
        `Deseja realmente excluir o usuário de ID ${id}?`
    );

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`/usuario/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao excluir usuário.");
        }

        alert("Usuário excluído com sucesso!");

        await listarUsuarios();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível excluir o usuário.");
    }
}


function limparFormularioUsuario() {
    document.getElementById("usuarioId").value = "";
    document.getElementById("nomeUsuario").value = "";
}

async function listarLogs() {
    try {
        const resposta = await fetch("/log");

        if (!resposta.ok) {
            throw new Error("Erro ao listar LOGs.");
        }

        const logs = await resposta.json();

        const tabela = document.getElementById("tabelaLogs");

        tabela.innerHTML = "";

        logs.forEach(log => {
            const linha = document.createElement("tr");

            linha.innerHTML = `
                <td>${log.id}</td>
                <td>${log.acao}</td>
                <td>${log.descricao}</td>
                <td>${formatarDataHora(log.dataHora)}</td>
                <td>
                    <button type="button" onclick="excluirLog(${log.id})">
                        Excluir
                    </button>
                </td>
            `;

            tabela.appendChild(linha);
        });

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível carregar os LOGs.");
    }
}


async function consultarLog() {
    const id = prompt("Digite o ID do LOG:");

    if (!id) {
        return;
    }

    try {
        const resposta = await fetch(`/log/${id}`);

        if (resposta.status === 404) {
            alert("LOG não encontrado.");
            return;
        }

        if (!resposta.ok) {
            throw new Error("Erro ao consultar LOG.");
        }

        const log = await resposta.json();

        alert(
            `ID: ${log.id}\n` +
            `Ação: ${log.acao}\n` +
            `Descrição: ${log.descricao}\n` +
            `Data e hora: ${formatarDataHora(log.dataHora)}`
        );

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível consultar o LOG.");
    }
}


async function excluirLog(id) {
    const confirmar = confirm(
        `Deseja realmente excluir o LOG de ID ${id}?`
    );

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(`/log/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao excluir LOG.");
        }

        alert("LOG excluído com sucesso!");

        await listarLogs();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível excluir o LOG.");
    }
}


function formatarDataHora(dataHora) {
    if (!dataHora) {
        return "";
    }

    const data = new Date(dataHora);

    return data.toLocaleString("pt-BR");
}

document.getElementById("formCarro").addEventListener(
    "submit",
    salvarCarro
);

document.getElementById("cancelarEdicao").addEventListener(
    "click",
    limparFormularioCarro
);


document.getElementById("formPessoa").addEventListener(
    "submit",
    salvarPessoa
);

document.getElementById("cancelarEdicaoPessoa").addEventListener(
    "click",
    limparFormularioPessoa
);


document.getElementById("formUsuario").addEventListener(
    "submit",
    salvarUsuario
);

document.getElementById("cancelarEdicaoUsuario").addEventListener(
    "click",
    limparFormularioUsuario
);

listarCarros();
listarPessoas();
listarUsuarios();
listarLogs();