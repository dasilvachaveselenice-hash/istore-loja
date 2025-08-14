'use client'

import { useEffect, useState } from 'react'
import { BarChart3, TrendingUp, Calendar, Download, DollarSign } from 'lucide-react'

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState('mes')
  const [relatorio, setRelatorio] = useState({
    vendas: 89750.00,
    pedidos: 47,
    ticketMedio: 1909.57,
    crescimento: 12.5,
    produtosMaisVendidos: [
      { nome: 'iPhone 15 Pro', vendas: 15, receita: 119985.00 },
      { nome: 'iPad Air', vendas: 12, receita: 51588.00 },
      { nome: 'Apple Watch', vendas: 8, receita: 26392.00 },
      { nome: 'AirPods Pro', vendas: 6, receita: 11394.00 },
      { nome: 'MacBook Air', vendas: 3, receita: 29997.00 }
    ]
  })

  const formatarPreco = (preco: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco)
  }

  const getPeriodoTexto = (periodo: string) => {
    switch (periodo) {
      case 'hoje': return 'Hoje'
      case 'semana': return 'Esta Semana'
      case 'mes': return 'Este Mês'
      case 'ano': return 'Este Ano'
      default: return 'Período'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
              <p className="text-gray-600">Analytics e relatórios de vendas</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/admin'}
                className="text-gray-600 hover:text-gray-900"
              >
                Voltar ao Dashboard
              </button>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Período:</label>
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="hoje">Hoje</option>
              <option value="semana">Esta Semana</option>
              <option value="mes">Este Mês</option>
              <option value="ano">Este Ano</option>
            </select>
          </div>
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total de Vendas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatarPreco(relatorio.vendas)}
                </p>
                <p className="text-xs text-green-600">+{relatorio.crescimento}% vs período anterior</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Quantidade de Pedidos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {relatorio.pedidos}
                </p>
                <p className="text-xs text-blue-600">pedidos no período</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Ticket Médio</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatarPreco(relatorio.ticketMedio)}
                </p>
                <p className="text-xs text-purple-600">por pedido</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Período</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getPeriodoTexto(periodo)}
                </p>
                <p className="text-xs text-orange-600">selecionado</p>
              </div>
            </div>
          </div>
        </div>

        {/* Produtos Mais Vendidos */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Produtos Mais Vendidos</h2>
          
          <div className="space-y-4">
            {relatorio.produtosMaisVendidos.map((produto, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{produto.nome}</h4>
                    <p className="text-sm text-gray-600">{produto.vendas} unidades vendidas</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-gray-900">{formatarPreco(produto.receita)}</p>
                  <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ 
                        width: `${(produto.vendas / relatorio.produtosMaisVendidos[0].vendas) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gráfico Simulado */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Vendas por Dia</h2>
          
          <div className="h-64 flex items-end justify-between space-x-2">
            {[12, 8, 15, 22, 18, 25, 30, 28, 35, 32, 40, 38, 45, 42].map((altura, index) => (
              <div key={index} className="flex-1 bg-blue-600 rounded-t" style={{ height: `${altura * 2}%` }}>
                <div className="text-xs text-center text-white pt-1">{altura}k</div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-4 text-xs text-gray-600">
            <span>1</span>
            <span>7</span>
            <span>14</span>
            <span>21</span>
            <span>28</span>
          </div>
        </div>
      </div>
    </div>
  )
}
