'use client'

import { useState, useEffect } from 'react'
import { Trash2, Edit, Package, AlertTriangle, ArrowLeft, Save, RefreshCw } from 'lucide-react'
import { getProdutos, salvarProdutos, atualizarProduto, resetarDados, type Product } from '@/lib/storage'

export default function GerenciarProdutos() {
  const [produtos, setProdutos] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<number | null>(null)

  useEffect(() => {
    carregarProdutos()
  }, [])

  const carregarProdutos = () => {
    setLoading(true)
    try {
      const produtosCarregados = getProdutos()
      setProdutos(produtosCarregados)
      console.log('📦 Produtos carregados:', produtosCarregados.length)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatarPreco = (preco: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco)
  }

  const atualizarPreco = async (id: number, novoPreco: number) => {
    if (novoPreco <= 0) {
      alert('❌ Preço deve ser maior que zero')
      return
    }

    setSaving(id)
    console.log('💰 Atualizando preço:', id, novoPreco)
    
    try {
      const sucesso = atualizarProduto(id, { preco: novoPreco })
      
      if (sucesso) {
        // Atualizar estado local
        setProdutos(prev => prev.map(p => 
          p.id === id ? { ...p, preco: novoPreco } : p
        ))
        alert(`✅ Preço atualizado para ${formatarPreco(novoPreco)} e SALVO permanentemente!`)
      } else {
        alert('❌ Erro ao salvar preço')
      }
    } catch (error) {
      console.error('Erro ao atualizar preço:', error)
      alert('❌ Erro ao atualizar preço')
    } finally {
      setSaving(null)
    }
  }

  const atualizarEstoque = async (id: number, novoEstoque: number) => {
    if (novoEstoque < 0) {
      alert('❌ Estoque não pode ser negativo')
      return
    }

    setSaving(id)
    console.log('📦 Atualizando estoque:', id, novoEstoque)
    
    try {
      const sucesso = atualizarProduto(id, { estoque: novoEstoque })
      
      if (sucesso) {
        // Atualizar estado local
        setProdutos(prev => prev.map(p => 
          p.id === id ? { ...p, estoque: novoEstoque } : p
        ))
        alert(`✅ Estoque atualizado para ${novoEstoque} unidades e SALVO permanentemente!`)
      } else {
        alert('❌ Erro ao salvar estoque')
      }
    } catch (error) {
      console.error('Erro ao atualizar estoque:', error)
      alert('❌ Erro ao atualizar estoque')
    } finally {
      setSaving(null)
    }
  }

  const toggleAtivo = async (id: number) => {
    setSaving(id)
    const produto = produtos.find(p => p.id === id)
    const novoStatus = !produto?.ativo
    
    console.log('🔄 Alterando status:', id, novoStatus)
    
    try {
      const sucesso = atualizarProduto(id, { ativo: novoStatus })
      
      if (sucesso) {
        // Atualizar estado local
        setProdutos(prev => prev.map(p => 
          p.id === id ? { ...p, ativo: novoStatus } : p
        ))
        alert(`✅ Produto ${novoStatus ? 'ATIVADO' : 'DESATIVADO'} e SALVO permanentemente!`)
      } else {
        alert('❌ Erro ao salvar status')
      }
    } catch (error) {
      console.error('Erro ao alterar status:', error)
      alert('❌ Erro ao alterar status')
    } finally {
      setSaving(null)
    }
  }

  const deletarProduto = async (id: number) => {
    const produto = produtos.find(p => p.id === id)
    
    if (!confirm(`❓ Tem certeza que deseja deletar "${produto?.nome}"?\n\nEsta ação é PERMANENTE!`)) {
      return
    }

    setSaving(id)
    console.log('🗑️ Deletando produto:', id, produto?.nome)
    
    try {
      const produtosAtualizados = produtos.filter(p => p.id !== id)
      const sucesso = salvarProdutos(produtosAtualizados)
      
      if (sucesso) {
        setProdutos(produtosAtualizados)
        alert('✅ Produto DELETADO permanentemente!')
      } else {
        alert('❌ Erro ao deletar produto')
      }
    } catch (error) {
      console.error('Erro ao deletar produto:', error)
      alert('❌ Erro ao deletar produto')
    } finally {
      setSaving(null)
    }
  }

  const resetarTodosDados = () => {
    if (!confirm('⚠️ ATENÇÃO!\n\nIsto vai RESETAR todos os produtos para os valores originais.\n\nTodas as alterações serão PERDIDAS!\n\nTem certeza?')) {
      return
    }

    try {
      resetarDados()
      carregarProdutos()
      alert('🔄 Dados resetados com sucesso!')
    } catch (error) {
      console.error('Erro ao resetar dados:', error)
      alert('❌ Erro ao resetar dados')
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
                <p className="text-gray-600">{produtos.length} produtos • Sistema de Persistência ATIVO</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={carregarProdutos}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Recarregar
              </button>
              
              <button
                onClick={resetarTodosDados}
                className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Alerta de Sistema Funcionando */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <Save className="h-5 w-5 text-green-600 mr-2" />
            <div>
              <span className="text-green-800 font-medium">
                ✅ SISTEMA DE PERSISTÊNCIA ATIVO
              </span>
              <p className="text-green-700 text-sm mt-1">
                Todas as alterações são salvas automaticamente no localStorage e persistem entre sessões!
              </p>
            </div>
          </div>
        </div>

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

        {/* Tabela de Produtos */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Lista de Produtos - Alterações Salvas Automaticamente</h2>
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
                  const isSaving = saving === produto.id
                  
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
                          disabled={isSaving}
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
                          disabled={isSaving}
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
                          disabled={isSaving}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                            produto.ativo 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {isSaving ? '⏳' : produto.ativo ? '✅ Ativo' : '❌ Inativo'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => alert(`🔧 Editar: ${produto.nome}\n\n🚧 Função em desenvolvimento`)}
                            className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar produto"
                            disabled={isSaving}
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => deletarProduto(produto.id)}
                            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Deletar produto"
                            disabled={isSaving}
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
          <h3 className="font-bold text-blue-900 mb-4">📋 Sistema de Persistência ATIVO:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800 text-sm">
            <div>
              <h4 className="font-semibold mb-2">💾 Como Funciona:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Alterações são salvas automaticamente</li>
                <li>Dados persistem entre sessões</li>
                <li>Backup automático criado</li>
                <li>Funciona offline</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🔧 Operações Disponíveis:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Alterar preço (clique fora para salvar)</li>
                <li>Alterar estoque (clique fora para salvar)</li>
                <li>Ativar/Desativar produto</li>
                <li>Deletar produto (permanente)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
