import { parsePreco } from './carrinho'

export function formatarPreco(valor) {
  return parsePreco(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
