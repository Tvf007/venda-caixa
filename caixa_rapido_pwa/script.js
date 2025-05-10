
const produtos = {
  frances: 1.00,
  comum: 0.80,
  doce: 1.50
};

function atualizarTotais() {
  let qtdFrances = parseInt(document.getElementById("qtd-frances").value) || 0;
  let qtdComum = parseInt(document.getElementById("qtd-comum").value) || 0;
  let qtdDoce = parseInt(document.getElementById("qtd-doce").value) || 0;

  let totalFrances = qtdFrances * produtos.frances;
  let totalComum = qtdComum * produtos.comum;
  let totalDoce = qtdDoce * produtos.doce;

  document.getElementById("total-frances").innerText = `R$ ${totalFrances.toFixed(2)}`;
  document.getElementById("total-comum").innerText = `R$ ${totalComum.toFixed(2)}`;
  document.getElementById("total-doce").innerText = `R$ ${totalDoce.toFixed(2)}`;

  let nomeOutro = document.getElementById("nome-outro").value;
  let valorOutro = parseFloat(document.getElementById("valor-outro").value) || 0;

  let total = totalFrances + totalComum + totalDoce + valorOutro;
  document.getElementById("total").innerText = total.toFixed(2);
  document.getElementById("parcial").innerText = total.toFixed(2);

  let lista = document.getElementById("nota-lista");
  lista.innerHTML = "";
  if (qtdFrances) lista.innerHTML += `<li>Pão Francês x${qtdFrances} - R$ ${totalFrances.toFixed(2)}</li>`;
  if (qtdComum) lista.innerHTML += `<li>Pão Comum x${qtdComum} - R$ ${totalComum.toFixed(2)}</li>`;
  if (qtdDoce) lista.innerHTML += `<li>Pão Doce x${qtdDoce} - R$ ${totalDoce.toFixed(2)}</li>`;
  if (valorOutro && nomeOutro) lista.innerHTML += `<li>${nomeOutro} - R$ ${valorOutro.toFixed(2)}</li>`;
}

document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", atualizarTotais);
});

document.getElementById("finalizar").addEventListener("click", () => {
  document.querySelectorAll("input").forEach(input => input.value = "");
  document.getElementById("nota-lista").innerHTML = "";
  document.getElementById("total").innerText = "0,00";
  document.getElementById("troco").innerText = "0,00";
  document.getElementById("parcial").innerText = "0,00";
});
