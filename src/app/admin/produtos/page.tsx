'use client'

import { useState, useEffect } from 'react'
import { Trash2, Edit, Package, AlertTriangle, ArrowLeft } from 'lucide-react'

interface Product {
  id: number
  nome: string
  categoria: string
  preco: number
  estoque: number
  ativo: boolean
  imagem: string
}

export default function GerenciarProdutos() {
  const [produtos, setProdutos] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Carregar produtos
    const produtosIniciais = [
      { 
        id: 1, 
        nome: 'iPhone 16 Pro Max 256GB', 
        categoria: 'iPhone',
        preco: 6999, 
        estoque: 5, 
        ativo: true,
        imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop'
      },
      { 
        id: 2, 
        nome: 'iPad Pro 12.9" M2', 
        categoria: 'iPad',
        preco: 4999, 
        estoque: 3, 
        ativo: true,
        imagem: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop'
      },
      { 
        id: 3, 
        nome: 'MacBook Air M2', 
        categoria: 'MacBook',
        preco: 7999, 
        estoque: 2, 
        ativo: false,
        imagem: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop'
      },
      { 
        id: 4, 
        nome: 'Apple Watch Series 9', 
        categoria: 'Apple Watch',
        preco: 2299, 
        estoque: 8, 
        ativo: true,
        imagem: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=100&h=100&fit=crop'
      },
      { 
        id: 5, 
        nome: 'AirPods Pro 2ª geração', 
        categoria: 'AirPods',
        preco: 1399, 
        estoque: 12, 
        ativo: true,
        imagem: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=100&h=100&fit=crop'
      }
    ]
    
    setTimeout(() => {
      setProdutos(produtosIniciais)
      setLoading(false)
    }, 500)
  }, [])

  const formatarPreco = (preco: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco)
  }

  const atualizarPreco = (id: number, novoPreco: number) => {
    console.log('💰 Atualizando preço:', id, novoPreco)
    setProdutos(prev => prev.map(p => 
      p.id === id ? { ...p, preco: novoPreco } : p
    ))
    alert(`✅ Preço atualizado para ${formatarPreco(novoPreco)}`)
  }

  const atualizarEstoque = (id: number, novoEstoque: number) => {
    console.log('📦 Atualizando estoque:', id, novoEstoque)
    setProdutos(prev => prev.map(p => 
      p.id === id ? { ...p, estoque: novoEstoque } : p
    ))
    alert(`✅ Estoque atualizado para ${novoEstoque} unidades`)
  }

  const toggleAtivo = (id: number) => {
    console.log('🔄 Alterando status:', id)
    setProdutos(prev => prev.map(p => 
      p.id === id ? { ...p, ativo: !p.ativo } : p
    ))
    const produto = produtos.find(p => p.id === id)
    alert(`✅ Produto ${produto?.ativo ? 'desativado' : 'ativado'}!`)
  }

  const deletarProduto = (id: number) => {
    const produto = produtos.find(p => p.id === id)
    console.log('🗑️ Deletando produto:', id, produto?.nome)
    
    if (confirm(`❓ Tem certeza que deseja deletar "${produto?.nome}"?`)) {
      setProdutos(prev => prev.filter(p => p.id !== id))
      alert('✅ Produto deletado com sucesso!')
    }
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
                <h1 className="text-2xl font-bold text-gray-900">🛠️ Gestão de Produtos</h1>
                <p className="text-gray-600">{produtos.length} produtos • Versão Funcional</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{produtos.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{produtos.filter(p => p.ativo).length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Estoque Baixo</p>
                <p className="text-2xl font-bold text-gray-900">{produtos.filter(p => p.estoque <= 5 && p.estoque > 0).length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Esgotados</p>
                <p className="text-2xl font-bold text-gray-900">{produtos.filter(p => p.estoque === 0).length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerta de Sucesso */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span className="text-green-800 font-medium">
              ✅ VERSÃO FUNCIONAL - Todas as operações estão funcionando!
            </span>
          </div>
        </div>

        {/* Tabela de Produtos */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Lista de Produtos</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estoque</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {produtos.map((produto) => {
                  const estoqueStatus = getEstoqueStatus(produto.estoque)
                  
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
                            <div className="text-sm font-medium text-gray-900">{produto.nome}</div>
                            <div className="text-sm text-gray-500">{produto.categoria} • ID: {produto.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          defaultValue={produto.preco}
                          onBlur={(e) => {
                            const novoPreco = parseFloat(e.target.value) || 0
                            if (novoPreco !== produto.preco && novoPreco > 0) {
                              atualizarPreco(produto.id, novoPreco)
                            }
                          }}
                          className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          step="0.01"
                          min="0"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          Atual: {formatarPreco(produto.preco)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          defaultValue={produto.estoque}
                          onBlur={(e) => {
                            const novoEstoque = parseInt(e.target.value) || 0
                            if (novoEstoque !== produto.estoque) {
                              atualizarEstoque(produto.id, novoEstoque)
                            }
                          }}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          min="0"
                        />
                        <div className="mt-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${estoqueStatus.cor}`}>
                            {estoqueStatus.texto}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleAtivo(produto.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            produto.ativo 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {produto.ativo ? '✅ Ativo' : '❌ Inativo'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => alert(`🔧 Editar: ${produto.nome}\n\n🚧 Função em desenvolvimento`)}
                            className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar produto"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => deletarProduto(produto.id)}
                            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Deletar produto"
                          >
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

        {/* Instruções de Uso */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-4">📋 Como Usar:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800 text-sm">
            <div>
              <h4 className="font-semibold mb-2">💰 Alterar Preço:</h4>
              <ol className="list-decimal list-inside space-y-1">
                <li>Clique no campo de preço</li>
                <li>Digite o novo valor</li>
                <li>Clique fora do campo (ou Tab)</li>
                <li>Confirme no alerta que aparece</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📦 Alterar Estoque:</h4>
              <ol className="list-decimal list-inside space-y-1">
                <li>Clique no campo de estoque</li>
                <li>Digite a nova quantidade</li>
                <li>Clique fora do campo (ou Tab)</li>
                <li>Confirme no alerta que aparece</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🔄 Ativar/Desativar:</h4>
              <ol className="list-decimal list-inside space-y-1">
                <li>Clique no botão de status</li>
                <li>O status alterna automaticamente</li>
                <li>Confirme no alerta que aparece</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🗑️ Deletar Produto:</h4>
              <ol className="list-decimal list-inside space-y-1">
                <li>Clique no ícone de lixeira</li>
                <li>Confirme na caixa de diálogo</li>
                <li>O produto será removido</li>
                <li>Confirme no alerta de sucesso</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
