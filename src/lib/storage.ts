// Sistema de armazenamento local persistente
export interface Product {
  id: number
  nome: string
  categoria: string
  preco: number
  preco_original: number
  estoque: number
  ativo: boolean
  imagem: string
  descricao: string
  rating: number
  reviews: number
}

export interface Pedido {
  id: number
  cliente: string
  email: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  data: string
  itens: number
}

// Dados iniciais dos produtos
const PRODUTOS_INICIAIS: Product[] = [
  {
    id: 1,
    nome: 'iPhone 16 Pro Max 256GB',
    categoria: 'iPhone',
    preco: 6999.00,
    preco_original: 8499.00,
    estoque: 6,
    ativo: true,
    imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
    descricao: 'iPhone 16 Pro Max com chip A18 Pro',
    rating: 4.9,
    reviews: 1247
  },
  {
    id: 2,
    nome: 'iPad Pro 12.9" M2 128GB',
    categoria: 'iPad',
    preco: 5499.00,
    preco_original: 6799.00,
    estoque: 4,
    ativo: true,
    imagem: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop',
    descricao: 'iPad Pro com chip M2',
    rating: 4.9,
    reviews: 1456
  },
  {
    id: 3,
    nome: 'MacBook Air M2',
    categoria: 'MacBook',
    preco: 7999.00,
    preco_original: 9999.00,
    estoque: 2,
    ativo: true,
    imagem: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
    descricao: 'MacBook Air com chip M2',
    rating: 4.9,
    reviews: 567
  },
  {
    id: 4,
    nome: 'Apple Watch Series 9',
    categoria: 'Apple Watch',
    preco: 2299.00,
    preco_original: 2899.00,
    estoque: 8,
    ativo: true,
    imagem: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop',
    descricao: 'Apple Watch Series 9',
    rating: 4.8,
    reviews: 743
  },
  {
    id: 5,
    nome: 'AirPods Pro 2ª geração',
    categoria: 'AirPods',
    preco: 1399.00,
    preco_original: 1799.00,
    estoque: 12,
    ativo: true,
    imagem: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop',
    descricao: 'AirPods Pro com cancelamento ativo de ruído',
    rating: 4.9,
    reviews: 2156
  }
]

// Dados iniciais dos pedidos
const PEDIDOS_INICIAIS: Pedido[] = [
  {
    id: 1001,
    cliente: 'João Silva',
    email: 'joao@email.com',
    total: 7999.00,
    status: 'pending',
    data: new Date().toISOString().split('T')[0],
    itens: 1
  },
  {
    id: 1002,
    cliente: 'Maria Santos',
    email: 'maria@email.com',
    total: 4299.00,
    status: 'processing',
    data: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    itens: 1
  },
  {
    id: 1003,
    cliente: 'Pedro Costa',
    email: 'pedro@email.com',
    total: 13298.00,
    status: 'shipped',
    data: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    itens: 2
  }
]

// Funções para produtos
export function getProdutos(): Product[] {
  if (typeof window === 'undefined') return PRODUTOS_INICIAIS
  
  const saved = localStorage.getItem('istore_produtos')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch (error) {
      console.error('Erro ao carregar produtos salvos:', error)
    }
  }
  
  // Se não tem dados salvos, usar iniciais e salvar
  localStorage.setItem('istore_produtos', JSON.stringify(PRODUTOS_INICIAIS))
  return PRODUTOS_INICIAIS
}

export function salvarProdutos(produtos: Product[]): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    localStorage.setItem('istore_produtos', JSON.stringify(produtos))
    localStorage.setItem('istore_produtos_backup', JSON.stringify({
      data: produtos,
      timestamp: new Date().toISOString()
    }))
    console.log('✅ Produtos salvos com sucesso:', produtos.length)
    return true
  } catch (error) {
    console.error('❌ Erro ao salvar produtos:', error)
    return false
  }
}

export function atualizarProduto(id: number, updates: Partial<Product>): boolean {
  const produtos = getProdutos()
  const index = produtos.findIndex(p => p.id === id)
  
  if (index === -1) {
    console.error('Produto não encontrado:', id)
    return false
  }
  
  produtos[index] = { ...produtos[index], ...updates }
  return salvarProdutos(produtos)
}

// Funções para pedidos
export function getPedidos(): Pedido[] {
  if (typeof window === 'undefined') return PEDIDOS_INICIAIS
  
  const saved = localStorage.getItem('istore_pedidos')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch (error) {
      console.error('Erro ao carregar pedidos salvos:', error)
    }
  }
  
  // Se não tem dados salvos, usar iniciais e salvar
  localStorage.setItem('istore_pedidos', JSON.stringify(PEDIDOS_INICIAIS))
  return PEDIDOS_INICIAIS
}

export function salvarPedidos(pedidos: Pedido[]): boolean {
  if (typeof window === 'undefined') return false
  
  try {
    localStorage.setItem('istore_pedidos', JSON.stringify(pedidos))
    localStorage.setItem('istore_pedidos_backup', JSON.stringify({
      data: pedidos,
      timestamp: new Date().toISOString()
    }))
    console.log('✅ Pedidos salvos com sucesso:', pedidos.length)
    return true
  } catch (error) {
    console.error('❌ Erro ao salvar pedidos:', error)
    return false
  }
}

export function atualizarPedido(id: number, updates: Partial<Pedido>): boolean {
  const pedidos = getPedidos()
  const index = pedidos.findIndex(p => p.id === id)
  
  if (index === -1) {
    console.error('Pedido não encontrado:', id)
    return false
  }
  
  pedidos[index] = { ...pedidos[index], ...updates }
  return salvarPedidos(pedidos)
}

// Função para resetar dados
export function resetarDados(): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('istore_produtos', JSON.stringify(PRODUTOS_INICIAIS))
  localStorage.setItem('istore_pedidos', JSON.stringify(PEDIDOS_INICIAIS))
  console.log('🔄 Dados resetados para valores iniciais')
}

// Função para exportar dados
export function exportarDados(): string {
  const produtos = getProdutos()
  const pedidos = getPedidos()
  
  return JSON.stringify({
    produtos,
    pedidos,
    timestamp: new Date().toISOString(),
    version: '1.0'
  }, null, 2)
}
