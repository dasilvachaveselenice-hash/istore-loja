'use client'

import { useEffect, useState } from 'react'
import { Package, Eye, Truck, CheckCircle, Clock, X, Search } from 'lucide-react'

interface Pedido {
  id: number
  cliente: string
  email: string
  total: number
  status: 'pendente' | 'processando' | 'enviado' | 'entregue' | 'cancelado'
  data: string
  itens: number
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('')
  const [statusFiltro, setStatusFiltro] = useState('todos')

  useEffect(() => {
    // Simular carregamento de pedidos
    setTimeout(() => {
      setPedidos([
        {
          id: 1001,
          cliente: 'João Silva',
          email: 'joao@email.com',
          total: 7999.00,
          status: 'pendente',
          data: '2024-01-15',
          itens: 1
        },
        {
          id: 1002,
          cliente: 'Maria Santos',
          email: 'maria@email.com',
          total: 4299.00,
          status: 'processando',
          data: '2024-01-14',
          itens: 1
        },
        {
          id: 1003,
          cliente: 'Pedro Costa',
          email: 'pedro@email.com',
          total: 13298.00,
          status: 'enviado',
          data: '2024-01-13',
          itens: 2
        },
        {
          id: 1004,
          cliente: 'Ana Oliveira',
          email: 'ana@email.com',
          total: 3299.00,
          status: 'entregue',
          data: '2024-01-12',
          itens: 1
        }
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

  const formatarData = (data: string): string => {
    return new Date(data).toLocaleDateString('pt-BR')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendente': return <Clock className="h-4 w-4" />
      case 'processando': return <Package className="h-4 w-4" />
      case 'enviado': return <Truck className="h-4 w-4" />
      case 'entregue': return <CheckCircle className="h-4 w-4" />
      case 'cancelado': return <X className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'text-yellow-600 bg-yellow-50'
      case 'processando': return 'text-blue-600 bg-blue-50'
      case 'enviado': return 'text-purple-600 bg-purple-50'
      case 'entregue': return 'text-green-600 bg-green-50'
      case 'cancelado': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pendente': return 'Pendente'
      case 'processando': return 'Processando'
      case 'enviado': return 'Enviado'
      case 'entregue': return 'Entregue'
      case 'cancelado': return 'Cancelado'
      default: return 'Desconhecido'
    }
  }

  const atualizarStatus = (id: number, novoStatus: string) => {
    setPedidos(prev => prev.map(pedido => 
      pedido.id === id ? { ...pedido, status: novoStatus as any } : pedido
    ))
    alert(`Pedido #${id} atualizado para: ${getStatusText(novoStatus)}`)
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gerenciar Pedidos</h1>
              <p className="text-gray-600">Acompanhe e gerencie todos os pedidos</p>
            </div>
            
            <button 
              onClick={() => window.location.href = '/admin'}
              className="text-gray-600 hover:text-gray-900"
            >
              Voltar ao Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
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
              <option value="pendente">Pendente</option>
              <option value="processando">Processando</option>
              <option value="enviado">Enviado</option>
              <option value="entregue">Entregue</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        {/* Lista de Pedidos */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Pedidos ({pedidosFiltrados.length})</h2>
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
                {pedidosFiltrados.map((pedido) => (
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
                        <button className="text-blue-600 hover:text-blue-700">
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        <select
                          value={pedido.status}
                          onChange={(e) => atualizarStatus(pedido.id, e.target.value)}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="pendente">Pendente</option>
                          <option value="processando">Processando</option>
                          <option value="enviado">Enviado</option>
                          <option value="entregue">Entregue</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
