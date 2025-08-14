'use client'

import { useEffect, useState } from 'react'
import { Package, Plus, Edit, Trash2, AlertTriangle, Search, ArrowLeft, Save, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

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
  const [saving, setSaving] = useState<number | null>(null)
  const [filtro, setFiltro] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Carregar produtos do Supabase
  useEffect(() => {
    loadProdutos()
  }, [])

  const loadProdutos = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .order('categoria', { ascending: true })
        .order('nome', { ascending: true })

      if (error) {
        console.error('Erro ao carregar produtos:', error)
        alert('Erro ao carregar produtos do banco de dados')
        return
      }

      setProdutos(data || [])
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro inesperado ao carregar produtos')
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

  // FUNÇÃO REAL: Atualizar estoque no Supabase
  const atualizarEstoque = async (id: number, novoEstoque: number) => {
    if (novoEstoque < 0) {
      alert('Estoque não pode ser negativo')
      return
    }

    try {
      setSaving(id)
      
      const { error } = await supabase
        .from('produtos')
        .update({ estoque: novoEstoque })
        .eq('id', id)

      if (error) {
        console.error('Erro ao atualizar estoque:', error)
        alert('Erro ao salvar estoque no banco de dados')
        return
      }

      // Atualizar estado local
      setProdutos(prev => prev.map(produto => 
        produto.id === id ? { ...produto, estoque: novoEstoque } : produto
      ))

      alert(`✅ Estoque atualizado: ${novoEstoque} unidades`)
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro inesperado ao atualizar estoque')
    } finally {
      setSaving(null)
    }
  }

  // FUNÇÃO REAL: Toggle ativo no Supabase
  const toggleAtivo = async (id: number) => {
    const produto = produtos.find(p => p.id === id)
    if (!produto) return

    try {
      setSaving(id)
      
      const novoStatus = !produto.ativo
      
      const { error } = await supabase
        .from('produtos')
        .update({ ativo: novoStatus })
        .eq('id', id)

      if (error) {
        console.error('Erro ao atualizar status:', error)
        alert('Erro ao salvar status no banco de dados')
        return
      }

      // Atualizar estado local
      setProdutos(prev => prev.map(p => 
        p.id === id ? { ...p, ativo: novoStatus } : p
      ))

      alert(`✅ Produto ${novoStatus ? 'ativado' : 'desativado'} com sucesso`)
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro inesperado ao atualizar status')
    } finally {
      setSaving(null)
    }
  }

  // FUNÇÃO REAL: Atualizar preço no Supabase
  const atualizarPreco = async (id: number, novoPreco: number) => {
    if (novoPreco <= 0) {
      alert('Preço deve ser maior que zero')
      return
    }

    try {
      setSaving(id)
      
      const { error } = await supabase
        .from('produtos')
        .update({ preco: novoPreco })
        .eq('id', id)

      if (error) {
        console.error('Erro ao atualizar preço:', error)
        alert('Erro ao salvar preço no banco de dados')
        return
      }

      // Atualizar estado local
      setProdutos(prev => prev.map(produto => 
        produto.id === id ? { ...produto, preco: novoPreco } : produto
      ))

      alert(`✅ Preço atualizado: ${formatarPreco(novoPreco)}`)
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro inesperado ao atualizar preço')
    } finally {
      setSaving(null)
    }
  }

  // FUNÇÃO REAL: Deletar produto
  const deletarProduto = async (id: number) => {
    const produto = produtos.find(p => p.id === id)
    if (!produto) return

    if (!confirm(`Tem certeza que deseja deletar "${produto.nome}"?`)) {
      return
    }

    try {
      setSaving(id)
      
      const { error } = await supabase
        .from('produtos')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Erro ao deletar produto:', error)
        alert('Erro ao deletar produto do banco de dados')
        return
      }

      // Remover do estado local
      setProdutos(prev => prev.filter(p => p.id !== id))
      alert('✅ Produto deletado com sucesso')
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro inesperado ao deletar produto')
    } finally {
      setSaving(null)
    }
  }

  // FUNÇÃO REAL: Adicionar novo produto
  const adicionarProduto = async (novoProduto: Omit<Product, 'id'>) => {
    try {
      setSaving(-1) // ID especial para novo produto
      
      const { data, error } = await supabase
        .from('produtos')
        .insert([novoProduto])
        .select()
        .single()

      if (error) {
        console.error('Erro ao adicionar produto:', error)
        alert('Erro ao salvar produto no banco de dados')
        return
      }

      // Adicionar ao estado local
      setProdutos(prev => [...prev, data])
      setShowAddModal(false)
      alert('✅ Produto adicionado com sucesso')
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro inesperado ao adicionar produto')
    } finally {
      setSaving(null)
    }
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
          <p className="text-gray-600">Carregando produtos do banco...</p>
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
                <p className="text-gray-600">{produtos.length} produtos • Conectado ao Supabase</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center transition-colors"
            >
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
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={produto.preco}
                              onChange={(e) => {
                                const novoPreco = parseFloat(e.target.value) || 0
                                setProdutos(prev => prev.map(p => 
                                  p.id === produto.id ? { ...p, preco: novoPreco } : p
                                ))
                              }}
                              onBlur={(e) => {
                                const novoPreco = parseFloat(e.target.value) || 0
                                if (novoPreco !== produto.preco) {
                                  atualizarPreco(produto.id, novoPreco)
                                }
                              }}
                              className="w-24 px-2 py-1 text-sm border border-gray-300 rounded"
                              step="0.01"
                              min="0"
                              disabled={isSaving}
                            />
                            {isSaving && <Loader2 className="h-4 w-4 animate-spin text-blue-600" />}
                          </div>
                          {produto.preco_original > produto.preco && (
                            <div className="text-xs text-gray-500 mt-1">
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
                            onChange={(e) => {
                              const novoEstoque = parseInt(e.target.value) || 0
                              setProdutos(prev => prev.map(p => 
                                p.id === produto.id ? { ...p, estoque: novoEstoque } : p
                              ))
                            }}
                            onBlur={(e) => {
                              const novoEstoque = parseInt(e.target.value) || 0
                              if (novoEstoque !== produto.estoque) {
                                atualizarEstoque(produto.id, novoEstoque)
                              }
                            }}
                            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                            min="0"
                            disabled={isSaving}
                          />
                          <span className="text-xs text-gray-500">unid.</span>
                          {isSaving && <Loader2 className="h-4 w-4 animate-spin text-blue-600" />}
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
                              disabled={isSaving}
                              className={`text-xs px-2 py-1 rounded flex items-center space-x-1 ${
                                produto.ativo 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              } ${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
                            >
                              {isSaving && <Loader2 className="h-3 w-3 animate-spin" />}
                              <span>{produto.ativo ? 'Ativo' : 'Inativo'}</span>
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
                          <button 
                            onClick={() => setEditingProduct(produto)}
                            disabled={isSaving}
                            className="text-blue-600 hover:text-blue-700 p-1 hover:bg-blue-50 rounded transition-colors disabled:opacity-50"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => deletarProduto(produto.id)}
                            disabled={isSaving}
                            className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                          >
                            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
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

        {/* Status de Conexão */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span className="text-green-800 font-medium">Conectado ao Supabase</span>
            <span className="text-green-600 ml-2">• Todas as alterações são salvas automaticamente</span>
          </div>
        </div>
      </div>
    </div>
  )
}
