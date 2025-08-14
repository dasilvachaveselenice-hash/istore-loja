'use client'

import { useEffect, useState } from 'react'
import { Package, Plus, Edit, Trash2, AlertTriangle, Search, ArrowLeft } from 'lucide-react'

interface Product {
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

export default function GerenciarProdutos() {
  const [produtos, setProdutos] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas')

  useEffect(() => {
    setTimeout(() => {
      setProdutos([
        // iPhone 16 (Nova Linha)
        { id: 1, nome: 'iPhone 16 Pro Max 256GB', categoria: 'iPhone', preco: 6999.00, preco_original: 8499.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop', descricao: 'iPhone 16 Pro Max com chip A18 Pro', rating: 4.9, reviews: 1247 },
        { id: 2, nome: 'iPhone 16 Pro 128GB', categoria: 'iPhone', preco: 5999.00, preco_original: 7499.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop', descricao: 'iPhone 16 Pro com chip A18 Pro', rating: 4.9, reviews: 987 },
        { id: 3, nome: 'iPhone 16 Plus 128GB', categoria: 'iPhone', preco: 4999.00, preco_original: 6299.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop', descricao: 'iPhone 16 Plus com chip A18', rating: 4.8, reviews: 756 },
        { id: 4, nome: 'iPhone 16 128GB', categoria: 'iPhone', preco: 4299.00, preco_original: 5499.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop', descricao: 'iPhone 16 com chip A18', rating: 4.8, reviews: 634 },
        
        // iPhone 15
        { id: 5, nome: 'iPhone 15 Pro Max 256GB', categoria: 'iPhone', preco: 5999.00, preco_original: 7299.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop', descricao: 'iPhone 15 Pro Max com chip A17 Pro', rating: 4.9, reviews: 2847 },
        { id: 6, nome: 'iPhone 15 Pro 128GB', categoria: 'iPhone', preco: 5299.00, preco_original: 6499.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop', descricao: 'iPhone 15 Pro com chip A17 Pro', rating: 4.9, reviews: 1847 },
        { id: 7, nome: 'iPhone 15 Plus 128GB', categoria: 'iPhone', preco: 4199.00, preco_original: 5299.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop', descricao: 'iPhone 15 Plus com chip A16 Bionic', rating: 4.8, reviews: 1234 },
        { id: 8, nome: 'iPhone 15 128GB', categoria: 'iPhone', preco: 3699.00, preco_original: 4699.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop', descricao: 'iPhone 15 com chip A16 Bionic', rating: 4.8, reviews: 1567 },
        
        // iPads
        { id: 9, nome: 'iPad Pro 12.9" M2 128GB', categoria: 'iPad', preco: 5499.00, preco_original: 6799.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop', descricao: 'iPad Pro 12.9" com chip M2', rating: 4.9, reviews: 1456 },
        { id: 10, nome: 'iPad Pro 11" M2 128GB', categoria: 'iPad', preco: 4299.00, preco_original: 5399.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop', descricao: 'iPad Pro 11" com chip M2', rating: 4.9, reviews: 1234 },
        { id: 11, nome: 'iPad Air 5ª geração 64GB', categoria: 'iPad', preco: 2999.00, preco_original: 3799.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop', descricao: 'iPad Air com chip M1', rating: 4.8, reviews: 892 },
        { id: 12, nome: 'iPad 10ª geração 64GB', categoria: 'iPad', preco: 2199.00, preco_original: 2799.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop', descricao: 'iPad 10ª geração com chip A14', rating: 4.7, reviews: 567 },
        
        // MacBooks
        { id: 13, nome: 'MacBook Pro 16" M3 Pro 512GB', categoria: 'MacBook', preco: 14999.00, preco_original: 18999.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop', descricao: 'MacBook Pro 16" com chip M3 Pro', rating: 4.9, reviews: 567 },
        { id: 14, nome: 'MacBook Pro 14" M3 512GB', categoria: 'MacBook', preco: 12999.00, preco_original: 15999.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop', descricao: 'MacBook Pro 14" com chip M3', rating: 4.9, reviews: 456 },
        { id: 15, nome: 'MacBook Air 15" M2 256GB', categoria: 'MacBook', preco: 8999.00, preco_original: 11499.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop', descricao: 'MacBook Air 15" com chip M2', rating: 4.8, reviews: 789 },
        { id: 16, nome: 'MacBook Air 13" M2 256GB', categoria: 'MacBook', preco: 7999.00, preco_original: 9999.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop', descricao: 'MacBook Air 13" com chip M2', rating: 4.8, reviews: 1234 },
        
        // Apple Watch
        { id: 17, nome: 'Apple Watch Ultra 2 49mm', categoria: 'Apple Watch', preco: 4299.00, preco_original: 5399.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=100&h=100&fit=crop', descricao: 'Apple Watch Ultra 2', rating: 4.9, reviews: 456 },
        { id: 18, nome: 'Apple Watch Series 9 45mm GPS', categoria: 'Apple Watch', preco: 2299.00, preco_original: 2899.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=100&h=100&fit=crop', descricao: 'Apple Watch Series 9 com GPS', rating: 4.8, reviews: 743 },
        { id: 19, nome: 'Apple Watch SE 2ª geração 44mm', categoria: 'Apple Watch', preco: 1599.00, preco_original: 1999.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=100&h=100&fit=crop', descricao: 'Apple Watch SE 2ª geração', rating: 4.6, reviews: 892 },
        
        // AirPods
        { id: 20, nome: 'AirPods Pro 2ª geração USB-C', categoria: 'AirPods', preco: 1399.00, preco_original: 1799.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=100&h=100&fit=crop', descricao: 'AirPods Pro com cancelamento ativo de ruído', rating: 4.9, reviews: 2156 },
        { id: 21, nome: 'AirPods 3ª geração', categoria: 'AirPods', preco: 999.00, preco_original: 1299.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=100&h=100&fit=crop', descricao: 'AirPods 3ª geração com áudio espacial', rating: 4.7, reviews: 1456 },
        { id: 22, nome: 'AirPods 2ª geração', categoria: 'AirPods', preco: 699.00, preco_original: 899.00, estoque: 6, ativo: true, imagem: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=100&h=100&fit=crop', descricao: 'AirPods 2ª geração clássicos', rating: 4.5, reviews: 3456 }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const formatarPreco = (preco: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco)
  }

  const calcularDesconto = (original: number, atual: number): number => {
    return Math.round(((original - atual) / original) * 100)
  }

  const getEstoqueStatus = (estoque: number) => {
    if (estoque === 0) {
      return { texto: 'Esgotado', cor: 'text-red-600 bg-red-50' }
    } else if (estoque <= 2) {
      return { texto: 'Crítico', cor: 'text-orange-600 bg-orange-50' }
    } else if (estoque <= 5) {
      return { texto: 'Baixo', cor: 'text-yellow-600 bg-yellow-50' }
    } else {
      return { texto: 'Normal', cor: 'text-green-600 bg-green-50' }
    }
  }

  const atualizarEstoque = (id: number, novoEstoque: number) => {
    setProdutos(prev => prev.map(produto => 
      produto.id === id ? { ...produto, estoque: novoEstoque } : produto
    ))
    alert(`Estoque do produto #${id} atualizado para ${novoEstoque} unidades`)
  }

  const toggleAtivo = (id: number) => {
    setProdutos(prev => prev.map(produto => 
      produto.id === id ? { ...produto, ativo: !produto.ativo } : produto
    ))
  }

  const produtosFiltrados = produtos.filter(produto => {
    const matchFiltro = produto.nome.toLowerCase().includes(filtro.toLowerCase()) ||
                       produto.categoria.toLowerCase().includes(filtro.toLowerCase()) ||
                       produto.id.toString().includes(filtro)
    
    const matchCategoria = categoriaFiltro === 'todas' || produto.categoria === categoriaFiltro
    
    return matchFiltro && matchCategoria
  })

  const categorias = ['todas', ...Array.from(new Set(produtos.map(p => p.categoria)))]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => window.location.href = '/admin'}
                className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestão de Produtos</h1>
                <p className="text-gray-600">{produtos.length} produtos • iPhone 16 + linha completa Apple</p>
              </div>
            </div>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center transition-colors">
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total de Produtos</p>
                <p className="text-2xl font-bold text-gray-900">{produtos.length}</p>
                <p className="text-xs text-blue-600">produtos cadastrados</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Estoque Baixo</p>
                <p className="text-2xl font-bold text-gray-900">
                  {produtos.filter(p => p.estoque <= 5 && p.estoque > 0).length}
                </p>
                <p className="text-xs text-orange-600">requer atenção</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Esgotados</p>
                <p className="text-2xl font-bold text-gray-900">
                  {produtos.filter(p => p.estoque === 0).length}
                </p>
                <p className="text-xs text-red-600">sem estoque</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Produtos Ativos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {produtos.filter(p => p.ativo).length}
                </p>
                <p className="text-xs text-green-600">disponíveis na loja</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar produtos por nome, categoria ou ID..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>
                  {categoria === 'todas' ? 'Todas as Categorias' : categoria}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Produtos ({produtosFiltrados.length})</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preços
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avaliação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {produtosFiltrados.map((produto) => {
                  const estoqueStatus = getEstoqueStatus(produto.estoque)
                  const desconto = calcularDesconto(produto.preco_original, produto.preco)
                  
                  return (
                    <tr key={produto.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img 
                            src={produto.imagem} 
                            alt={produto.nome}
                            className="w-12 h-12 object-cover rounded-lg mr-4"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {produto.nome}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {produto.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {produto.categoria}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-bold text-gray-900">
                            {formatarPreco(produto.preco)}
                          </div>
                          {produto.preco_original > produto.preco && (
                            <div className="text-xs text-gray-500">
                              <span className="line-through">{formatarPreco(produto.preco_original)}</span>
                              <span className="ml-1 text-red-600 font-medium">-{desconto}%</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={produto.estoque}
                            onChange={(e) => atualizarEstoque(produto.id, parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                            min="0"
                          />
                          <span className="text-xs text-gray-500">unid.</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${estoqueStatus.cor}`}>
                            {produto.estoque <= 2 && produto.estoque > 0 && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {estoqueStatus.texto}
                          </span>
                          <div>
                            <button
                              onClick={() => toggleAtivo(produto.id)}
                              className={`text-xs px-2 py-1 rounded ${
                                produto.ativo 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {produto.ativo ? 'Ativo' : 'Inativo'}
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="flex items-center">
                            <span className="text-yellow-400">★</span>
                            <span className="ml-1 font-medium">{produto.rating}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {produto.reviews} avaliações
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-700 p-1 hover:bg-blue-50 rounded transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
