import test from 'node:test'
import assert from 'node:assert/strict'

import { calcularTotal } from './carrinho.js'

test('calcularTotal soma preços em string sem concatenar', () => {
    const total = calcularTotal([
        { price: '299.90' },
        { price: 150.5 },
        { price: '49,90' },
    ])

    assert.equal(Number(total.toFixed(2)), 500.3)
})
