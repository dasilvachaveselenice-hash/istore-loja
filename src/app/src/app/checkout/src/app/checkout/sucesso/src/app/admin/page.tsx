'use client'

import { useEffect, useState } from 'react'
import { Package, ShoppingCart, TrendingUp, Users, AlertTriangle, Eye } from 'lucide-react'

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalProdutos: 0,
    produtosAtivos: 0,
    produtosEsgotados: 0,
    estoqueBaixo: 0,
    vendasHoje: 0,
    vendasMes: 0,
    pedidosPendentes: 0,
    totalClientes: 0
  })

  const [produtosRecentes, setProdutosRecentes] = useState([
    { id: 1, nome: 'iPhone 15 Pro', estoque: 5, status: 'Baixo' },
    { id: 2, nome: 'iPad Air', estoque: 2, status: 'Crítico' },
    { id: 3, nome: 'MacBook Air M2', estoque: 0, status: 'Esgotado' },
    { id: 4, nome: 'Apple Watch', estoque: 8, status: 'Normal' }
  ])

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalProdutos: 39,
        produtosAtivos: 38,
        produtosEsgotados: 1,
        estoqueBaixo: 2,
        vendasHoje: 15420.00,
        vendasMes: 89750.00,
        pedidosPendentes: 3,
        totalClientes: 127
      })
    }, 1000)
  }, [])

  const formatarPreco = (preco: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'text-green-600 bg-green-50'
      case 'Baixo': return 'text-yellow-600 bg-yellow-50'
      case 'Crítico': return 'text-orange-600 bg-orange-50'
      case 'Esgotado': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">Visão geral do sistema iStore</p>
        </div>

        {/* Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total de Produtos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProdutos}</p>
                <p className="text-xs text-green-600">{stats.produtosAtivos} ativos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Vendas Hoje</p>
                <p className="text-2xl font-bold text-gray-900">{formatarPreco(stats.vendasHoje)}</p>
                <p className="text-xs text-green-600">+12% vs ontem</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pedidos Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pedidosPendentes}</p>
                <p className="text-xs text-orange-600">Requer atenção</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Estoque Baixo</p>
                <p className="text-2xl font-bold text-gray-900">{stats.estoqueBaixo}</p>
                <p className="text-xs text-red-600">Produtos críticos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards de Ação */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-xl text-white">
            <h2 className="text-xl font-bold mb-4">📦 Produtos</h2>
            <p className="mb-4 opacity-90">Gerenciar produtos da loja</p>
            <a 
              href="/admin/produtos"
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block transition-colors"
            >
              Gerenciar Produtos
            </a>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-xl text-white">
            <h2 className="text-xl font-bold mb-4">🛒 Pedidos</h2>
            <p className="mb-4 opacity-90">Acompanhar pedidos dos clientes</p>
            <a 
              href="/admin/pedidos"
              className="bg-white text-green-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block transition-colors"
            >
              Ver Pedidos
            </a>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-xl text-white">
            <h2 className="text-xl font-bold mb-4">📊 Relatórios</h2>
            <p className="mb-4 opacity-90">Analytics e vendas</p>
            <a 
              href="/admin/relatorios"
              className="bg-white text-purple-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block transition-colors"
            >
              Ver Relatórios
            </a>
          </div>
        </div>

        {/* Tabela de Produtos com Estoque Baixo */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              Produtos com Estoque Baixo
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {produtosRecentes.map((produto) => (
                  <tr key={produto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {produto.nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {produto.estoque} unidades
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(produto.status)}`}>
                        {produto.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a 
                        href="/admin/produtos"
                        className="text-blue-600 hover:text-blue-700 flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vendas do Mês */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">📈 Resumo de Vendas do Mês</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{formatarPreco(stats.vendasMes)}</p>
              <p className="text-sm text-gray-600">Total do Mês</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.totalClientes}</p>
              <p className="text-sm text-gray-600">Clientes Ativos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">{formatarPreco(stats.vendasMes / 30)}</p>
              <p className="text-sm text-gray-600">Média Diária</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <a 
            href="/"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 inline-block transition-colors"
          >
            ← Voltar para Loja
          </a>
        </div>
      </div>
    </div>
  )
}
