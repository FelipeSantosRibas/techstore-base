// O carrinho guarda uma entrada por unidade adicionada.
// Ex.: duas camisetas iguais = o mesmo produto duas vezes no array.

export function parsePreco(valor) {
  if (valor === null || valor === undefined || valor === '') return 0

  if (typeof valor === 'number' && Number.isFinite(valor)) {
    return valor
  }

  let texto = String(valor).trim().replace(/R\$\s*/gi, '').replace(/\s+/g, '')

  if (!texto) return 0

  if (texto.includes(',') && texto.includes('.')) {
    texto = texto.replace(/\./g, '').replace(',', '.')
  } else if (texto.includes(',')) {
    texto = texto.replace(',', '.')
  } else if (texto.includes('.')) {
    const partes = texto.split('.')
    const ultimoBloco = partes[partes.length - 1]
    const temSeparadorMilhar = partes.length > 2 || (partes.length === 2 && ultimoBloco.length === 3)

    if (temSeparadorMilhar) {
      texto = texto.replace(/\./g, '')
    }
  }

  const numero = Number(texto.replace(/[^0-9.-]/g, ''))

  return Number.isFinite(numero) ? numero : 0
}

export function normalizarProduto(produto) {
  if (!produto || typeof produto !== 'object') return produto

  return {
    ...produto,
    price: parsePreco(produto.price),
    ...(produto.precoOriginal !== undefined && {
      precoOriginal: parsePreco(produto.precoOriginal),
    }),
  }
}

export function calcularTotal(carrinho) {
  return carrinho.reduce((total, produto) => total + parsePreco(produto?.price), 0)
}

export function agruparItens(carrinho) {
  const itens = []
  carrinho.forEach((produto) => {
    const existente = itens.find((item) => item.produto.id === produto.id)
    if (existente) {
      existente.quantidade += 1
    } else {
      itens.push({ produto, quantidade: 1 })
    }
  })
  return itens
}
