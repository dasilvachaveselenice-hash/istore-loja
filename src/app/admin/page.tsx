'use client'

import { useEffect, useState } from 'react'
import { Package, ShoppingCart, TrendingUp, Users, AlertTriangle, Eye } from 'lucide-react'

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalProdutos: 39,
    produtosAtivos: 39,
    produtosEsgotados: 0,
    estoqueBaixo: 2,
    vendasHoje: 15420.00,
    vendasMes: 89750.00,
    pedidosPendentes: 3,
    totalClientes: 127
  })

  const formatarPreco = (preco: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🔧 Dashboard Admin - iStore</h1>
          <p className="text-gray-600">Painel administrativo da loja Apple</p>
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
            <p className="mb-4 opacity-90">Gerenciar 39+ produtos Apple</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Gerenciar Produtos
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-xl text-white">
            <h2 className="text-xl font-bold mb-4">🛒 Pedidos</h2>
            <p className="mb-4 opacity-90">Acompanhar pedidos dos clientes</p>
            <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Ver Pedidos
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-xl text-white">
            <h2 className="text-xl font-bold mb-4">📊 Relatórios</h2>
            <p className="mb-4 opacity-90">Analytics e vendas</p>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Ver Relatórios
            </button>
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

        {/* Botão Voltar */}
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
