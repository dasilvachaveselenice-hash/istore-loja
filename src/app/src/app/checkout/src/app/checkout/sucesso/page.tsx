'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Package, Home, Phone, Copy, QrCode, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PagamentoInfo {
  id: string
  status: string
  method: string
  amount: number
  pix_code?: string
  boleto_url?: string
}

export default function SucessoPage() {
  const router = useRouter()
  const [pagamento, setPagamento] = useState<PagamentoInfo | null>(null)

  useEffect(() => {
    localStorage.removeItem('carrinho')
    
    const pagamentoSalvo = localStorage.getItem('ultimo_pagamento')
    if (pagamentoSalvo) {
      setPagamento(JSON.parse(pagamentoSalvo))
    }
  }, [])

  const numeroPedido = Math.floor(Math.random() * 10000) + 1000

  const formatarPreco = (preco: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco)
  }

  const copiarCodigoPix = () => {
    if (pagamento?.pix_code) {
      navigator.clipboard.writeText(pagamento.pix_code)
      alert('Código PIX copiado!')
    }
  }

  const getMetodoPagamentoTexto = (method: string) => {
    switch (method) {
      case 'pix': return 'PIX'
      case 'credit_card': return 'Cartão de Crédito'
      case 'boleto': return 'Boleto Bancário'
      default: return 'Pagamento'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Pedido Confirmado!
            </h1>
            <p className="text-gray-600">
              Seu pedido foi recebido e está sendo processado via HyperCash
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Pedido #{numeroPedido}
            </h2>
            {pagamento && (
              <div className="space-y-2">
                <p className="text-gray-600">
                  Pagamento ID: <span className="font-mono text-sm">{pagamento.id}</span>
                </p>
                <p className="text-gray-600">
                  Método: <span className="font-medium">{getMetodoPagamentoTexto(pagamento.method)}</span>
                </p>
                <p className="text-gray-600">
                  Valor: <span className="font-bold text-green-600">{formatarPreco(pagamento.amount)}</span>
                </p>
              </div>
            )}
          </div>

          {/* Instruções PIX */}
          {pagamento?.method === 'pix' && pagamento.pix_code && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center mb-4">
                <QrCode className="h-8 w-8 text-blue-600 mr-2" />
                <h3 className="text-lg font-bold text-blue-900">Pagamento via PIX</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-blue-800 text-sm">
                  Use o código abaixo para pagar via PIX:
                </p>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-xs text-gray-600 mb-2">Código PIX:</p>
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono bg-gray-100 p-2 rounded flex-1 mr-2 break-all">
                      {pagamento.pix_code}
                    </code>
                    <button
                      onClick={copiarCodigoPix}
                      className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copiar
                    </button>
                  </div>
                </div>
                
                <div className="text-sm text-blue-800">
                  <p>📱 <strong>Como pagar:</strong></p>
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Abra o app do seu banco</li>
                    <li>Escolha a opção PIX</li>
                    <li>Cole o código copiado</li>
                    <li>Confirme o pagamento</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* Instruções Boleto */}
          {pagamento?.method === 'boleto' && pagamento.boleto_url && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-yellow-600 mr-2" />
                <h3 className="text-lg font-bold text-yellow-900">Pagamento via Boleto</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-yellow-800 text-sm">
                  Seu boleto foi gerado com sucesso!
                </p>
                
                <a
                  href={pagamento.boleto_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors inline-flex items-center"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Baixar Boleto
                </a>
                
                <div className="text-sm text-yellow-800">
                  <p>📄 <strong>Instruções:</strong></p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Clique no botão acima para baixar o boleto</li>
                    <li>Pague em qualquer banco ou lotérica</li>
                    <li>Vencimento: 3 dias úteis</li>
                    <li>Após o pagamento, aguarde 1-2 dias úteis para confirmação</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Cartão */}
          {pagamento?.method === 'credit_card' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600 mr-2" />
                <h3 className="text-lg font-bold text-green-900">Pagamento Processado</h3>
              </div>
              
              <p className="text-green-800 text-sm">
                Seu cartão de crédito foi processado com sucesso! 
                Você receberá a confirmação por email em instantes.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4">
              <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium">Preparação</h3>
              <p className="text-sm text-gray-500">1-2 dias úteis</p>
            </div>
            <div className="text-center p-4">
              <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium">Envio</h3>
              <p className="text-sm text-gray-500">3-5 dias úteis</p>
            </div>
            <div className="text-center p-4">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium">Entrega</h3>
              <p className="text-sm text-gray-500">Em sua casa</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600">
              Acompanhe o status do seu pedido pelo email cadastrado ou entre em contato conosco.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => router.push('/')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Home className="h-5 w-5 mr-2" />
                Voltar à Loja
              </button>
              
              <a 
                href="tel:+5511999999999"
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <Phone className="h-5 w-5 mr-2" />
                Falar Conosco
              </a>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-blue-900 mb-2">📱 Próximos Passos:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✅ Confirmação por email</li>
              <li>📦 Preparação do pedido</li>
              <li>🚚 Código de rastreamento</li>
              <li>🏠 Entrega no endereço</li>
            </ul>
          </div>

          <div className="mt-6 p-3 bg-gray-100 rounded-lg">
            <p className="text-xs text-gray-600">
              🔒 Pagamento processado com segurança via HyperCash
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
