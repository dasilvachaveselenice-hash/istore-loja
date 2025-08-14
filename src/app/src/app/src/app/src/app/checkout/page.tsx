'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Smartphone, FileText, User, MapPin, ArrowLeft } from 'lucide-react'

interface Product {
  id: number
  nome: string
  preco: number
  imagem: string
  categoria: string
}

interface CarrinhoItem {
  produto: Product
  quantidade: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const [itensCarrinho, setItensCarrinho] = useState<CarrinhoItem[]>([])
  const [loading, setLoading] = useState(false)
  const [metodoPagamento, setMetodoPagamento] = useState<'pix' | 'credit_card' | 'boleto'>('pix')
  
  // Dados do cliente
  const [dadosCliente, setDadosCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    documento: ''
  })
  
  // Dados do endereço
  const [endereco, setEndereco] = useState({
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  })

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho')
    if (carrinhoSalvo) {
      setItensCarrinho(JSON.parse(carrinhoSalvo))
    } else {
      router.push('/')
    }
  }, [router])

  const formatarPreco = (preco: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco)
  }

  const calcularSubtotal = () => {
    return itensCarrinho.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0)
  }

  const frete = 15.90
  const total = calcularSubtotal() + frete

  const finalizarPedido = async () => {
    setLoading(true)
    
    if (!dadosCliente.nome || !dadosCliente.email || !endereco.cep) {
      alert('Por favor, preencha todos os campos obrigatórios')
      setLoading(false)
      return
    }

    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Salvar dados do pagamento
      localStorage.setItem('ultimo_pagamento', JSON.stringify({
        id: `hc_${metodoPagamento}_${Date.now()}`,
        status: 'pending',
        method: metodoPagamento,
        amount: total,
        pix_code: metodoPagamento === 'pix' ? `00020126580014br.gov.bcb.pix0136${Date.now()}-e12b-12d1-a456-426614174000520400005303986540${total.toFixed(2).replace('.', '')}5802BR59${dadosCliente.nome.length.toString().padStart(2, '0')}${dadosCliente.nome.toUpperCase()}6008BRASILIA62070503***6304${Date.now().toString().slice(-4)}` : undefined,
        boleto_url: metodoPagamento === 'boleto' ? `https://boleto-exemplo.com/boleto_${Date.now()}.pdf` : undefined
      }))

      localStorage.removeItem('carrinho')
      router.push('/checkout/sucesso')
      
    } catch (error) {
      console.error('Erro no checkout:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (itensCarrinho.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando checkout...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center text-blue-600 hover:text-blue-700 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Voltar à loja
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
          <div className="ml-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            🔒 HyperCash - Pagamento Seguro
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Dados Pessoais */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <User className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-bold">Dados Pessoais</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={dadosCliente.nome}
                    onChange={(e) => setDadosCliente(prev => ({ ...prev, nome: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={dadosCliente.email}
                    onChange={(e) => setDadosCliente(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={dadosCliente.telefone}
                    onChange={(e) => setDadosCliente(prev => ({ ...prev, telefone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CPF *
                  </label>
                  <input
                    type="text"
                    value={dadosCliente.documento}
                    onChange={(e) => setDadosCliente(prev => ({ ...prev, documento: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="000.000.000-00"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-bold">Endereço de Entrega</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CEP *
                  </label>
                  <input
                    type="text"
                    value={endereco.cep}
                    onChange={(e) => setEndereco(prev => ({ ...prev, cep: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="00000-000"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número *
                  </label>
                  <input
                    type="text"
                    value={endereco.numero}
                    onChange={(e) => setEndereco(prev => ({ ...prev, numero: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rua *
                  </label>
                  <input
                    type="text"
                    value={endereco.rua}
                    onChange={(e) => setEndereco(prev => ({ ...prev, rua: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    value={endereco.bairro}
                    onChange={(e) => setEndereco(prev => ({ ...prev, bairro: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    value={endereco.cidade}
                    onChange={(e) => setEndereco(prev => ({ ...prev, cidade: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Forma de Pagamento */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <CreditCard className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-bold">Forma de Pagamento</h2>
                <div className="ml-auto bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                  Powered by HyperCash
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setMetodoPagamento('pix')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center ${
                    metodoPagamento === 'pix' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <Smartphone className="h-8 w-8 mb-2" />
                  <span className="font-medium">PIX</span>
                  <span className="text-sm text-gray-500">Aprovação imediata</span>
                </button>
                
                <button
                  onClick={() => setMetodoPagamento('credit_card')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center ${
                    metodoPagamento === 'credit_card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <CreditCard className="h-8 w-8 mb-2" />
                  <span className="font-medium">Cartão</span>
                  <span className="text-sm text-gray-500">Até 12x sem juros</span>
                </button>
                
                <button
                  onClick={() => setMetodoPagamento('boleto')}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center ${
                    metodoPagamento === 'boleto' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <FileText className="h-8 w-8 mb-2" />
                  <span className="font-medium">Boleto</span>
                  <span className="text-sm text-gray-500">Vence em 3 dias</span>
                </button>
              </div>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
            <h3 className="text-lg font-bold mb-4">Resumo do Pedido</h3>
            
            <div className="space-y-3 mb-4">
              {itensCarrinho.map((item) => (
                <div key={item.produto.id} className="flex items-center space-x-3">
                  <img
                    src={item.produto.imagem}
                    alt={item.produto.nome}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.produto.nome}</p>
                    <p className="text-xs text-gray-500">Qtd: {item.quantidade}</p>
                  </div>
                  <span className="text-sm font-bold">
                    {formatarPreco(item.produto.preco * item.quantidade)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatarPreco(calcularSubtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete:</span>
                <span>{formatarPreco(frete)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span className="text-green-600">{formatarPreco(total)}</span>
              </div>
            </div>

            <button
              onClick={finalizarPedido}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Processando com HyperCash...' : `Pagar ${formatarPreco(total)} via HyperCash`}
            </button>

            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-800 text-center font-medium">
                🔒 Pagamento 100% seguro via HyperCash
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
