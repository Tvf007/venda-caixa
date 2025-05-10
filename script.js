
let itens = [];
let total = 0;

function addItem(nome, preco) {
  const item = itens.find(i => i.nome === nome);
  if (item) {
    item.qtd += 1;
    item.total = item.qtd * item.preco;
  } else {
    itens.push({ nome, preco, qtd: 1, total: preco });
  }
  atualizarNota();
}

function adicionarOutro() {
  const valor = parseFloat(document.getElementById("outroValor").value);
  if (!isNaN(valor)) {
    itens.push({ nome: "Outro", preco: valor, qtd: 1, total: valor });
    atualizarNota();
    document.getElementById("outroValor").value = "";
  }
}

function atualizarNota() {
  const nota = document.getElementById("notaItens");
  nota.innerHTML = "";
  total = 0;
  itens.forEach(item => {
    const linha = document.createElement("p");
    linha.textContent = `${item.nome} x${item.qtd} = R$ ${item.total.toFixed(2)}`;
    nota.appendChild(linha);
    total += item.total;
  });
  document.getElementById("total").textContent = total.toFixed(2);
  calcularTroco();
}

function calcularTroco() {
  const recebido = parseFloat(document.getElementById("valorRecebido").value);
  if (!isNaN(recebido) && recebido >= total) {
    document.getElementById("troco").textContent = `R$ ${(recebido - total).toFixed(2)}`;
  } else {
    document.getElementById("troco").textContent = "Aguardando pagamento";
  }
}

function finalizarVenda() {
  const historico = document.getElementById("historico");
  const data = new Date().toLocaleString();
  const div = document.createElement("div");
  div.innerHTML = `<strong>Venda - ${data}</strong><br>${itens.map(i => `${i.nome} x${i.qtd} = R$ ${i.total.toFixed(2)}`).join("<br>")}<br><strong>Total: R$ ${total.toFixed(2)}</strong><hr>`;
  historico.prepend(div);
  limparVenda();
}

function limparVenda() {
  itens = [];
  total = 0;
  document.getElementById("notaItens").innerHTML = "";
  document.getElementById("total").textContent = "0.00";
  document.getElementById("valorRecebido").value = "";
  document.getElementById("troco").textContent = "Aguardando pagamento";
}
