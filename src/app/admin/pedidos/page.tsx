'use client'

import { useEffect, useState } from 'react'
import { Package, Eye, Truck, CheckCircle, Clock, X, Search, Loader2, ArrowLeft, Save, RefreshCw } from 'lucide-react'
import { getPedidos, salvarPedidos, atualizarPedido, resetarDados, type Pedido } from '@/lib/storage'

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(true)
  
  const [saving, setSaving] = useState<number | null>(null)
  const [filtro, setFiltro] = useState('')
  const [statusFiltro, setStatusFiltro] = useState('todos')

  useEffect(() => {
    carregarPedidos()
  }, [])

  const carregarPedidos = () => {
    setLoading(true)
    try {
      const pedidosCarregados = getPedidos()
      setPedidos(pedidosCarregados)
      console.log('📦 Pedidos carregados:', pedidosCarregados.length)
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error)
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

  const formatarData = (data: string): string => {
    return new Date(data).toLocaleDateString('pt-BR')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'processing': return <Package className="h-4 w-4" />
      case 'shipped': return <Truck className="h-4 w-4" />
      case 'delivered': return <CheckCircle className="h-4 w-4" />
      case 'cancelled': return <X className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'processing': return 'text-blue-600 bg-blue-50'
      case 'shipped': return 'text-purple-600 bg-purple-50'
      case 'delivered': return 'text-green-600 bg-green-50'
      case 'cancelled': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente'
      case 'processing': return 'Processando'
      case 'shipped': return 'Enviado'
      case 'delivered': return 'Entregue'
      case 'cancelled': return 'Cancelado'
      default: return 'Desconhecido'
    }
  }

  // Atualizar status do pedido
  const atualizarStatus = async (id: number, novoStatus: string) => {
    setSaving(id)
    console.log('🔄 Atualizando status do pedido:', id, novoStatus)
    
    try {
      const sucesso = atualizarPedido(id, { status: novoStatus as any })
      
      if (sucesso) {
        // Atualizar estado local
        setPedidos(prev => prev.map(pedido => 
          pedido.id === id ? { ...pedido, status: novoStatus as any } : pedido
        ))
        alert(`✅ Status atualizado para "${getStatusText(novoStatus)}" e SALVO permanentemente!`)
      } else {
        alert('❌ Erro ao salvar status')
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      alert('❌ Erro ao atualizar status')
    } finally {
      setSaving(null)
    }
  }

  const resetarTodosDados = () => {
    if (!confirm('⚠️ ATENÇÃO!\n\nIsto vai RESETAR todos os pedidos para os valores originais.\n\nTodas as alterações serão PERDIDAS!\n\nTem certeza?')) {
      return
    }

    try {
      resetarDados()
      carregarPedidos()
      alert('🔄 Dados resetados com sucesso!')
    } catch (error) {
      console.error('Erro ao resetar dados:', error)
      alert('❌ Erro ao resetar dados')
    }
  }

  const pedidosFiltrados = pedidos.filter(pedido => {
    const matchFiltro = pedido.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
                       pedido.email.toLowerCase().includes(filtro.toLowerCase()) ||
                       pedido.id.toString().includes(filtro)
    
    const matchStatus = statusFiltro === 'todos' || pedido.status === statusFiltro
    
    return matchFiltro && matchStatus
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando pedidos...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Gerenciar Pedidos</h1>
                <p className="text-gray-600">{pedidos.length} pedidos • Sistema de Persistência ATIVO</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={carregarPedidos}
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
                Todas as alterações de status são salvas automaticamente e persistem entre sessões!
              </p>
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
                placeholder="Buscar por cliente, email ou ID..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={statusFiltro}
              onChange={(e) => setStatusFiltro(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="todos">Todos os Status</option>
              <option value="pending">Pendente</option>
              <option value="processing">Processando</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregue</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </div>

        {/* Lista de Pedidos */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Pedidos ({pedidosFiltrados.length}) - Alterações Salvas Automaticamente</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pedido
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pedidosFiltrados.map((pedido) => {
                  const isSaving = saving === pedido.id
                  
                  return (
                    <tr key={pedido.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            #{pedido.id}
                          </div>
                          <div className="text-sm text-gray-500">
                            {pedido.itens} {pedido.itens === 1 ? 'item' : 'itens'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {pedido.cliente}
                          </div>
                          <div className="text-sm text-gray-500">
                            {pedido.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatarPreco(pedido.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(pedido.status)}`}>
                          {getStatusIcon(pedido.status)}
                          <span className="ml-1">{getStatusText(pedido.status)}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatarData(pedido.data)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            className="text-blue-600 hover:text-blue-700"
                            onClick={() => alert(`👁️ Visualizar Pedido #${pedido.id}\n\n🚧 Função em desenvolvimento`)}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          
                          <div className="flex items-center space-x-1">
                            <select
                              value={pedido.status}
                              onChange={(e) => atualizarStatus(pedido.id, e.target.value)}
                              disabled={isSaving}
                              className="text-xs border border-gray-300 rounded px-2 py-1 disabled:opacity-50"
                            >
                              <option value="pending">Pendente</option>
                              <option value="processing">Processando</option>
                              <option value="shipped">Enviado</option>
                              <option value="delivered">Entregue</option>
                              <option value="cancelled">Cancelado</option>
                            </select>
                            {isSaving && <Loader2 className="h-4 w-4 animate-spin text-blue-600" />}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Instruções */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-4">📋 Sistema de Persistência ATIVO:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800 text-sm">
            <div>
              <h4 className="font-semibold mb-2">💾 Como Funciona:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Alterações de status são salvas automaticamente</li>
                <li>Dados persistem entre sessões</li>
                <li>Backup automático criado</li>
                <li>Funciona offline</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🔧 Operações Disponíveis:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Alterar status do pedido (salva automaticamente)</li>
                <li>Filtrar por cliente, email ou ID</li>
                <li>Filtrar por status</li>
                <li>Visualizar detalhes (em desenvolvimento)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
