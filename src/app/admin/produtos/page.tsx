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
  const [supabaseConnected, setSupabaseConnected] = useState(false)

  // Produtos padrão para fallback
  const produtosPadrao: Product[] = [
    {
      id: 1,
      nome: 'iPhone 16 Pro Max 256GB',
      categoria: 'iPhone',
      preco: 6999.00,
      preco_original: 8499.00,
      estoque: 6,
      ativo: true,
      imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop',
      descricao: 'iPhone 16 Pro Max com chip A18 Pro',
      rating: 4.9,
      reviews: 1247
    },
    {
      id: 2,
      nome: 'iPhone 16 Pro 128GB',
      categoria: 'iPhone',
      preco: 5999.00,
      preco_original: 7499.00,
      estoque: 4,
      ativo: true,
      imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop',
      descricao: 'iPhone 16 Pro com chip A18 Pro',
      rating: 4.9,
      reviews: 987
    },
    {
      id: 3,
      nome: 'iPad Pro 12.9" M2 128GB',
      categoria: 'iPad',
      preco: 5499.00,
      preco_original: 6799.00,
      estoque: 3,
      ativo: true,
      imagem: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop',
      descricao: 'iPad Pro com chip M2',
      rating: 4.8,
      reviews: 892
    },
    {
      id: 4,
      nome: 'MacBook Air M2 256GB',
      categoria: 'MacBook',
      preco: 7999.00,
      preco_original: 9999.00,
      estoque: 2,
      ativo: true,
      imagem: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop',
      descricao: 'MacBook Air com chip M2',
      rating: 4.9,
      reviews: 567
    },
    {
      id: 5,
      nome: 'Apple Watch Series 9 45mm',
      categoria: 'Apple Watch',
      preco: 2299.00,
      preco_original: 2899.00,
      estoque: 5,
      ativo: true,
      imagem: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=100&h=100&fit=crop',
      descricao: 'Apple Watch Series 9 com GPS',
      rating: 4.8,
      reviews: 743
    }
  ]

  // Carregar produtos
  useEffect(() => {
    loadProdutos()
  }, [])

  const loadProdutos = async () => {
    console.log('🔍 Carregando produtos...')
    setLoading(true)
    
    try {
      // Tentar carregar do Supabase
      const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .order('categoria', { ascending: true })

      if (error) {
        console.error('❌ Erro Supabase:', error)
        console.log('📦 Usando produtos padrão')
        setProdutos(produtosPadrao)
        setSupabaseConnected(false)
      } else {
        console.log('✅ Produtos carregados do Supabase:', data?.length || 0)
        setProdutos(data || produtosPadrao)
        setSupabaseConnected(true)
      }
    } catch (error) {
      console.error('❌ Erro geral:', error)
      console.log('📦 Usando produtos padrão')
      setProdutos(produtosPadrao)
      setSupabaseConnected(false)
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

  // FUNÇÃO REAL: Atualizar estoque
  const atualizarEstoque = async (id: number, novoEstoque: number) => {
    console.log(`🔄 Atualizando estoque do produto ${id} para ${novoEstoque}`)
    
    if (novoEstoque < 0) {
      alert('❌ Estoque não pode ser negativo')
      return
    }

    setSaving(id)
    
    try {
      if (supabaseConnected) {
        // Tentar salvar no Supabase
        const { error } = await supabase
          .from('produtos')
          .update({ estoque: novoEstoque })
          .eq('id', id)

        if (error) {
          console.error('❌ Erro ao salvar no Supabase:', error)
          throw error
        }
        console.log('✅ Estoque salvo no Supabase')
      }

      // Atualizar estado local
      setProdutos(prev => prev.map(produto => 
        produto.id === id ? { ...produto, estoque: novoEstoque } : produto
      ))

      alert(`✅ Estoque atualizado: ${novoEstoque} unidades`)
    } catch (error) {
      console.error('❌ Erro ao atualizar estoque:', error)
      
      // Fallback: atualizar apenas localmente
      setProdutos(prev => prev.map(produto => 
        produto.id === id ? { ...produto, estoque: novoEstoque } : produto
      ))
      alert(`⚠️ Estoque atualizado localmente: ${novoEstoque} unidades`)
    } finally {
      setSaving(null)
    }
  }

  // FUNÇÃO REAL: Atualizar preço
  const atualizarPreco = async (id: number, novoPreco: number) => {
    console.log(`💰 Atualizando preço do produto ${id} para ${novoPreco}`)
    
    if (novoPreco <= 0) {
      alert('❌ Preço deve ser maior que zero')
      return
    }

    setSaving(id)
    
    try {
      if (supabaseConnected) {
        // Tentar salvar no Supabase
        const { error } = await supabase
          .from('produtos')
          .update({ preco: novoPreco })
          .eq('id', id)

        if (error) {
          console.error('❌ Erro ao salvar preço no Supabase:', error)
          throw error
        }
        console.log('✅ Preço salvo no Supabase')
      }

      // Atualizar estado local
      setProdutos(prev => prev.map(produto => 
        produto.id === id ? { ...produto, preco: novoPreco } : produto
      ))

      alert(`✅ Preço atualizado: ${formatarPreco(novoPreco)}`)
    } catch (error) {
      console.error('❌ Erro ao atualizar preço:', error)
      
      // Fallback: atualizar apenas localmente
      setProdutos(prev => prev.map(produto => 
        produto.id === id ? { ...produto, preco: novoPreco } : produto
      ))
      alert(`⚠️ Preço atualizado localmente: ${formatarPreco(novoPreco)}`)
    } finally {
      setSaving(null)
    }
  }

  // FUNÇÃO REAL: Toggle ativo
  const toggleAtivo = async (id: number) => {
    console.log(`🔄 Alterando status do produto ${id}`)
    
    const produto = produtos.find(p => p.id === id)
    if (!produto) return

    const novoStatus = !produto.ativo
    setSaving(id)
    
    try {
      if (supabaseConnected) {
        // Tentar salvar no Supabase
        const { error } = await supabase
          .from('produtos')
          .update({ ativo: novoStatus })
          .eq('id', id)

        if (error) {
          console.error('❌ Erro ao salvar status no Supabase:', error)
          throw error
        }
        console.log('✅ Status salvo no Supabase')
      }

      // Atualizar estado local
      setProdutos(prev => prev.map(p => 
        p.id === id ? { ...p, ativo: novoStatus } : p
      ))

      alert(`✅ Produto ${novoStatus ? 'ativado' : 'desativado'} com sucesso`)
    } catch (error) {
      console.error('❌ Erro ao alterar status:', error)
      
      // Fallback: atualizar apenas localmente
      setProdutos(prev => prev.map(p => 
        p.id === id ? { ...p, ativo: novoStatus } : p
      ))
      alert(`⚠️ Status alterado localmente: ${novoStatus ? 'ativado' : 'desativado'}`)
    } finally {
      setSaving(null)
    }
  }

  // FUNÇÃO REAL: Deletar produto
  const deletarProduto = async (id: number) => {
    console.log(`🗑️ Deletando produto ${id}`)
    
    const produto = produtos.find(p => p.id === id)
    if (!produto) return

    if (!confirm(`❓ Tem certeza que deseja deletar "${produto.nome}"?`)) {
      return
    }

    setSaving(id)
    
    try {
      if (supabaseConnected) {
        // Tentar deletar no Supabase
        const { error } = await supabase
          .from('produtos')
          .delete()
          .eq('id', id)

        if (error) {
          console.error('❌ Erro ao deletar no Supabase:', error)
          throw error
        }
        console.log('✅ Produto deletado no Supabase')
      }

      // Remover do estado local
      setProdutos(prev => prev.filter(p => p.id !== id))
      alert('✅ Produto deletado com sucesso')
    } catch (error) {
      console.error('❌ Erro ao deletar produto:', error)
      
      // Fallback: remover apenas localmente
      setProdutos(prev => prev.filter(p => p.id !== id))
      alert('⚠️ Produto removido localmente')
    } finally {
      setSaving(null)
    }
  }

  // Filtrar produtos
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
                <p className="text-gray-600">
                  {produtos.length} produtos • 
                  {supabaseConnected ? ' Conectado ao Supabase' : ' Modo Local'}
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => alert('🚧 Função em desenvolvimento')}
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
                              defaultValue={produto.preco}
                              onBlur={(e) => {
                                const novoPreco = parseFloat(e.target.value) || 0
                                if (novoPreco !== produto.preco && novoPreco > 0) {
                                  atualizarPreco(produto.id, novoPreco)
                                }
                              }}
                              className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
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
                            defaultValue={produto.estoque}
                            onBlur={(e) => {
                              const novoEstoque = parseInt(e.target.value) || 0
                              if (novoEstoque !== produto.estoque) {
                                atualizarEstoque(produto.id, novoEstoque)
                              }
                            }}
                            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            min="0"
                            disabled={isSaving}
                          />
                          <span className="text-xs text-gray-500">unid.</span>
                          {isSaving && <Loader2 className="h-4 w-4 animate-spin text-blue-600" />}
                        </div>
                        <div className="mt-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${estoqueStatus.cor}`}>
                            {produto.estoque <= 2 && produto.estoque > 0 && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {estoqueStatus.texto}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleAtivo(produto.id)}
                          disabled={isSaving}
                          className={`text-xs px-3 py-1 rounded-full flex items-center space-x-1 transition-colors ${
                            produto.ativo 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          } ${isSaving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          {isSaving && <Loader2 className="h-3 w-3 animate-spin" />}
                          <span>{produto.ativo ? '✅ Ativo' : '❌ Inativo'}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => alert(`🔧 Editar produto: ${produto.nome}`)}
                            disabled={isSaving}
                            className="text-blue-600 hover:text-blue-700 p-1 hover:bg-blue-50 rounded transition-colors disabled:opacity-50"
                            title="Editar produto"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => deletarProduto(produto.id)}
                            disabled={isSaving}
                            className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                            title="Deletar produto"
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
        <div className={`mt-8 border rounded-lg p-4 ${
          supabaseConnected 
            ? 'bg-green-50 border-green-200' 
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-3 ${
              supabaseConnected ? 'bg-green-500' : 'bg-yellow-500'
            }`}></div>
            <span className={`font-medium ${
              supabaseConnected ? 'text-green-800' : 'text-yellow-800'
            }`}>
              {supabaseConnected ? 'Conectado ao Supabase' : 'Modo Local Ativo'}
            </span>
            <span className={`ml-2 ${
              supabaseConnected ? 'text-green-600' : 'text-yellow-600'
            }`}>
              • {supabaseConnected 
                ? 'Alterações são salvas no banco de dados' 
                : 'Alterações são salvas apenas na sessão atual'
              }
            </span>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-bold text-gray-900 mb-2">🔧 Debug Info:</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>📊 Produtos carregados: {produtos.length}</p>
            <p>🔌 Supabase conectado: {supabaseConnected ? 'Sim' : 'Não'}</p>
            <p>🔍 Filtro ativo: "{filtro || 'nenhum'}"</p>
            <p>📂 Categoria filtrada: {categoriaFiltro}</p>
            <p>💾 Salvando produto: {saving || 'nenhum'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
