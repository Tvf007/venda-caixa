
let vendaAtual = [];

function adicionarProduto(nome, preco) {
    const itemExistente = vendaAtual.find(p => p.nome === nome && p.preco === preco);
    if (itemExistente) {
        itemExistente.qtd++;
    } else {
        vendaAtual.push({ nome, preco, qtd: 1 });
    }
    renderNota();
}

function adicionarOutro() {
    const valor = parseFloat(document.getElementById('outroValor').value);
    if (!isNaN(valor)) {
        vendaAtual.push({ nome: 'Outros', preco: valor, qtd: 1 });
        renderNota();
        document.getElementById('outroValor').value = '';
    }
}

function renderNota() {
    const nota = document.getElementById('notaLista');
    nota.innerHTML = '';
    let total = 0;

    vendaAtual.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = \`\${item.nome} x\${item.qtd} = R$ \${(item.qtd * item.preco).toFixed(2)}\`;
        nota.appendChild(li);
        total += item.qtd * item.preco;
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

function finalizarVenda() {
    const valorRecebido = parseFloat(document.getElementById('valorRecebido').value);
    const total = vendaAtual.reduce((sum, item) => sum + item.qtd * item.preco, 0);
    const troco = valorRecebido - total;
    const trocoEl = document.getElementById('troco');
    trocoEl.textContent = troco >= 0 ? \`Troco: R$ \${troco.toFixed(2)}\` : '';

    if (vendaAtual.length > 0) {
        const historico = document.getElementById('historicoVendas');
        const li = document.createElement('li');
        const data = new Date().toLocaleString();
        li.textContent = \`[\${data}] Total: R$ \${total.toFixed(2)}\`;
        historico.prepend(li);
    }

    vendaAtual = [];
    renderNota();
    document.getElementById('valorRecebido').value = '';
}
