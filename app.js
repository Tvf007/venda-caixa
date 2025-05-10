let nota = [];
let total = 0;

function addItem(nome, preco) {
  nota.push({ nome, preco });
  atualizarNota();
}

function addOutro() {
  const valor = parseFloat(document.getElementById('outrosInput').value);
  if (!isNaN(valor)) {
    nota.push({ nome: 'Outro', preco: valor });
    document.getElementById('outrosInput').value = '';
    atualizarNota();
  }
}

function atualizarNota() {
  const notaAtual = document.getElementById('notaAtual');
  notaAtual.innerHTML = '';
  total = 0;
  nota.forEach((item, i) => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} = R$ ${item.preco.toFixed(2)}`;
    notaAtual.appendChild(li);
    total += item.preco;
  });
  document.getElementById('total').textContent = total.toFixed(2);
  calcularTroco();
}

function calcularTroco() {
  const recebido = parseFloat(document.getElementById('valorRecebido').value) || 0;
  const troco = recebido - total;
  const trocoEl = document.getElementById('troco');
  trocoEl.textContent = 'R$ ' + troco.toFixed(2);
  trocoEl.className = troco >= 0 ? 'text-green-600' : 'text-red-600';
}

function finalizarVenda() {
  if (nota.length === 0) return;
  const dataHora = new Date().toLocaleString();
  const historico = JSON.parse(localStorage.getItem('vendas') || '[]');
  historico.unshift({ nota, total, dataHora });
  localStorage.setItem('vendas', JSON.stringify(historico));

  nota = [];
  total = 0;
  document.getElementById('notaAtual').innerHTML = '';
  document.getElementById('total').textContent = '0.00';
  document.getElementById('valorRecebido').value = '';
  document.getElementById('troco').textContent = 'R$ 0.00';

  carregarHistorico();
}

function carregarHistorico() {
  const historicoEl = document.getElementById('historico');
  historicoEl.innerHTML = '';
  const historico = JSON.parse(localStorage.getItem('vendas') || '[]');
  historico.forEach((venda, i) => {
    const li = document.createElement('li');
    li.className = 'bg-white p-2 rounded shadow text-sm';
    const itens = venda.nota.map(item => item.nome + ': R$ ' + item.preco.toFixed(2)).join(', ');
    li.textContent = `${i + 1}. ${venda.dataHora} - Total: R$ ${venda.total.toFixed(2)} | ${itens}`;
    historicoEl.appendChild(li);
  });
}

window.onload = carregarHistorico;