const API_URL = "http://localhost:5244/api/Cliente";
const PEDIDO_URL = "http://localhost:5244/api/Pedido";

async function NovoCliente() {
    const id = document.getElementById('cliente-id').value;
    const dados = { 
        nome: document.getElementById('nome').value, 
        email: document.getElementById('email').value 
    };

    if (id) {
        dados.idC = parseInt(id);
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        alert("Cliente editado!");
    } else {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        alert("Cliente cadastrado!");
    }
    BuscarGeral();
}

async function DeletarCliente() {
    const id = document.getElementById('cliente-id').value;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    alert("Excluído!");
    BuscarGeral();
}

async function SalvarPedido() {
    const id = document.getElementById('pedido-id').value;
    const dados = {
        descricao: document.getElementById('pedido-descricao').value,
        preco: parseFloat(document.getElementById('pedido-preco').value),
        idC: parseInt(document.getElementById('pedido-cliente-id').value)
    };

    if (id) {
        dados.idP = parseInt(id);
        await fetch(`${PEDIDO_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        alert("Pedido editado!");
    } else {
        await fetch(PEDIDO_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        alert("Pedido cadastrado!");
    }
    BuscarPedidos();
}

async function DeletarPedido() {
    const id = document.getElementById('pedido-id').value;
    await fetch(`${PEDIDO_URL}/${id}`, { method: 'DELETE' });
    alert("Excluído!");
    BuscarPedidos();
}

async function BuscarGeral() {
    const lista = document.getElementById("cliente-lista");
    lista.innerHTML = "";
    const res = await fetch(API_URL);
    const clientes = await res.json();
    clientes.forEach(c => {
        const li = document.createElement("li");
        li.innerHTML = `ID: ${c.idC} | ${c.nome} - ${c.email}`;
        lista.appendChild(li);
    });
}

async function BuscarPedidos() {
    const lista = document.getElementById("pedido-lista");
    lista.innerHTML = "";
    const res = await fetch(PEDIDO_URL);
    const pedidos = await res.json();
    pedidos.forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = `ID: ${p.idP} | ${p.descricao} - R$ ${p.preco} (Cliente: ${p.idC})`;
        lista.appendChild(li);
    });
}

BuscarGeral();
BuscarPedidos();