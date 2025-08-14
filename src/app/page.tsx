'use client'

import { useEffect, useState } from 'react'
import { ShoppingCart, Search, User, Heart, Star, Package } from 'lucide-react'

interface Product {
  id: number
  nome: string
  preco: number
  preco_original: number
  imagem: string
  categoria: string
  rating: number
  reviews: number
  descricao: string
  estoque: number
}

interface CarrinhoItem {
  produto: Product
  quantidade: number
}

export default function LojaPublica() {
  const [produtos, setProdutos] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [busca, setBusca] = useState('')
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [itensCarrinho, setItensCarrinho] = useState<CarrinhoItem[]>([])

  // Carregar produtos
  useEffect(() => {
    const timer = setTimeout(() => {
      setProdutos([
        // === iPhone 16 (NOVA LINHA) ===
        {
          id: 1,
          nome: 'iPhone 16 Pro Max 256GB',
          preco: 6999.00,
          preco_original: 8499.00,
          categoria: 'iPhone',
          imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
          rating: 4.9,
          reviews: 1247,
          descricao: 'iPhone 16 Pro Max com chip A18 Pro, câmera de 48MP, tela Super Retina XDR de 6,9 polegadas e Action Button.',
          estoque: 6
        },
        {
          id: 2,
          nome: 'iPhone 16 Pro 128GB',
          preco: 5999.00,
          preco_original: 7499.00,
          categoria: 'iPhone',
          imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
          rating: 4.9,
          reviews: 987,
          descricao: 'iPhone 16 Pro com chip A18 Pro, câmera de 48MP, tela Super Retina XDR de 6,3 polegadas e Action Button.',
          estoque: 6
        },
        {
          id: 3,
          nome: 'iPhone 16 Plus 128GB',
          preco: 4999.00,
          preco_original: 6299.00,
          categoria: 'iPhone',
          imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
          rating: 4.8,
          reviews: 756,
          descricao: 'iPhone 16 Plus com chip A18, câmera dupla de 48MP e tela Super Retina XDR de 6,7 polegadas.',
          estoque: 6
        },
        {
          id: 4,
          nome: 'iPhone 16 128GB',
          preco: 4299.00,
          preco_original: 5499.00,
          categoria: 'iPhone',
          imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
          rating: 4.8,
          reviews: 634,
          descricao: 'iPhone 16 com chip A18, câmera dupla de 48MP e tela Super Retina XDR de 6,1 polegadas.',
          estoque: 6
        },
        // === iPhone 15 ===
        {
          id: 5,
          nome: 'iPhone 15 Pro Max 256GB',
          preco: 5999.00,
          preco_original: 7299.00,
          categoria: 'iPhone',
          imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
          rating: 4.9,
          reviews: 2847,
          descricao: 'iPhone 15 Pro Max com chip A17 Pro, câmera de 48MP, tela Super Retina XDR de 6,7 polegadas.',
          estoque: 6
        },
        {
          id: 6,
          nome: 'iPhone 15 Pro 128GB',
          preco: 5299.00,
          preco_original: 6499.00,
          categoria: 'iPhone',
          imagem: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop',
          rating: 4.9,
          reviews: 1847,
          descricao: 'iPhone 15 Pro com chip A17 Pro, câmera de 48MP, tela Super Retina XDR de 6,1 polegadas.',
          estoque: 6
        },
        // === iPads ===
        {
          id: 13,
          nome: 'iPad Pro 12.9" M2 128GB',
          preco: 5499.00,
          preco_original: 6799.00,
          categoria: 'iPad',
          imagem: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop',
          rating: 4.9,
          reviews: 1456,
          descricao: 'iPad Pro 12.9" com chip M2, tela Liquid Retina XDR e suporte ao Apple Pencil 2ª geração.',
          estoque: 6
        },
        // === MacBooks ===
        {
          id: 18,
          nome: 'MacBook Pro 16" M3 Pro 512GB',
          preco: 14999.00,
          preco_original: 18999.00,
          categoria: 'MacBook',
          imagem: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
          rating: 4.9,
          reviews: 567,
          descricao: 'MacBook Pro 16" com chip M3 Pro, tela Liquid Retina XDR e até 22 horas de bateria.',
          estoque: 6
        },
        // === Apple Watch ===
        {
          id: 23,
          nome: 'Apple Watch Ultra 2 49mm',
          preco: 4299.00,
          preco_original: 5399.00,
          categoria: 'Apple Watch',
          imagem: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop',
          rating: 4.9,
          reviews: 456,
          descricao: 'Apple Watch Ultra 2 com GPS + Cellular, tela Always-On Retina e resistência extrema.',
          estoque: 6
        },
        // === AirPods ===
        {
          id: 28,
          nome: 'AirPods Pro 2ª geração USB-C',
          preco: 1399.00,
          preco_original: 1799.00,
          categoria: 'AirPods',
          imagem: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop',
          rating: 4.9,
          reviews: 2156,
          descricao: 'AirPods Pro com cancelamento ativo de ruído, áudio espacial e estojo MagSafe com USB-C.',
          estoque: 6
        }
      ])
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const formatarPreco = (preco: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco)
  }

  const calcularDesconto = (original: number, atual: number): number => {
    return Math.round(((original - atual) / original) * 100)
  }

  const adicionarAoCarrinho = (produto: Product) => {
    if (produto.estoque > 0) {
      const itemExistente = itensCarrinho.find(item => item.produto.id === produto.id)
      
      if (itemExistente) {
        setItensCarrinho(prev => 
          prev.map(item => 
            item.produto.id === produto.id 
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          )
        )
      } else {
        setItensCarrinho(prev => [...prev, { produto, quantidade: 1 }])
      }
      
      setCarrinhoAberto(true)
    } else {
      alert('Produto esgotado!')
    }
  }

  const atualizarQuantidade = (produtoId: number, novaQuantidade: number) => {
    if (novaQuantidade <= 0) {
      removerItem(produtoId)
    } else {
      setItensCarrinho(prev => 
        prev.map(item => 
          item.produto.id === produtoId 
            ? { ...item, quantidade: novaQuantidade }
            : item
        )
      )
    }
  }

  const removerItem = (produtoId: number) => {
    setItensCarrinho(prev => prev.filter(item => item.produto.id !== produtoId))
  }

  const totalItensCarrinho = itensCarrinho.reduce((total, item) => total + item.quantidade, 0)

  const getEstoqueStatus = (estoque: number) => {
    if (estoque === 0) {
      return { texto: 'Esgotado', cor: 'text-red-600 bg-red-50', disponivel: false }
    } else if (estoque <= 2) {
      return { texto: `Últimas ${estoque} unidades`, cor: 'text-orange-600 bg-orange-50', disponivel: true }
    } else if (estoque <= 5) {
      return { texto: 'Estoque limitado', cor: 'text-yellow-600 bg-yellow-50', disponivel: true }
    } else {
      return { texto: 'Em estoque', cor: 'text-green-600 bg-green-50', disponivel: true }
    }
  }

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(busca.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando iStore...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🍎 iStore
              </h1>
            </div>

            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar produtos Apple..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="h-6 w-6" />
              </button>
              
              <button 
                onClick={() => setCarrinhoAberto(true)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItensCarrinho > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItensCarrinho}
                  </span>
                )}
              </button>

              <a 
                href="/admin"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                🔧 Admin
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">
            Bem-vindo à iStore
          </h2>
          <p className="text-xl mb-8 opacity-90">
            iPhone 16 + Linha completa Apple com os MENORES PREÇOS do Brasil
          </p>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              <span>Frete Grátis</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              <span>Garantia Apple</span>
            </div>
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span>12x sem juros</span>
            </div>
          </div>
          
          <div className="mt-4 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium inline-block">
            🔒 Pagamentos seguros via HyperCash - PIX, Cartão e Boleto
          </div>
        </div>
      </section>

      {/* Produtos */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              iPhone 16 + Linha Completa Apple
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4">
              {produtosFiltrados.length} produtos encontrados • Preços imbatíveis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {produtosFiltrados.map((produto) => {
              const desconto = calcularDesconto(produto.preco_original, produto.preco)
              const estoqueStatus = getEstoqueStatus(produto.estoque)
              
              return (
                <div key={produto.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className="relative overflow-hidden">
                    <img 
                      src={produto.imagem} 
                      alt={produto.nome}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {desconto > 0 && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        -{desconto}%
                      </div>
                    )}
                    
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${estoqueStatus.cor} shadow-lg`}>
                      <div className="flex items-center space-x-1">
                        <Package className="h-3 w-3" />
                        <span>{estoqueStatus.texto}</span>
                      </div>
                    </div>

                    <button className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>

                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                      {produto.categoria}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {produto.nome}
                    </h4>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {produto.descricao}
                    </p>

                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < produto.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">({produto.reviews})</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {formatarPreco(produto.preco)}
                      </span>
                      {produto.preco_original > produto.preco && (
                        <span className="text-gray-500 line-through text-lg">
                          {formatarPreco(produto.preco_original)}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                      ou 12x de {formatarPreco(produto.preco / 12)} sem juros
                    </p>

                    <div className="mb-4">
                      <div className={`text-sm px-3 py-2 rounded-lg ${estoqueStatus.cor}`}>
                        <div className="flex items-center justify-between">
                          <span>{estoqueStatus.texto}</span>
                          <span className="font-medium">{produto.estoque} unid.</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => adicionarAoCarrinho(produto)}
                      disabled={!estoqueStatus.disponivel}
                      className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl ${
                        estoqueStatus.disponivel 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>{estoqueStatus.disponivel ? 'Adicionar ao Carrinho' : 'Produto Esgotado'}</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h4 className="text-2xl font-bold mb-4">🍎 iStore</h4>
          <p className="text-gray-400 mb-4">iPhone 16 + Linha completa Apple com os menores preços do Brasil</p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <span>📞 (11) 99999-9999</span>
            <span>📧 contato@istore.com.br</span>
            <span>📍 São Paulo, SP</span>
          </div>
          <div className="mt-4 text-green-400 text-sm">
            🔒 Pagamentos seguros via HyperCash
          </div>
        </div>
      </footer>

      {/* Carrinho Sidebar */}
      {carrinhoAberto && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setCarrinhoAberto(false)}
          />
          
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  Carrinho ({totalItensCarrinho})
                </h2>
              </div>
              <button
                onClick={() => setCarrinhoAberto(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {itensCarrinho.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Carrinho vazio
                  </h3>
                  <p className="text-gray-500">
                    Adicione produtos para começar suas compras
                  </p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {itensCarrinho.map((item) => (
                    <div key={item.produto.id} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4">
                      <img
                        src={item.produto.imagem}
                        alt={item.produto.nome}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {item.produto.nome}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {formatarPreco(item.produto.preco)}
                        </p>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => atualizarQuantidade(item.produto.id, item.quantidade - 1)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            -
                          </button>
                          
                          <span className="w-8 text-center font-medium">
                            {item.quantidade}
                          </span>
                          
                          <button
                            onClick={() => atualizarQuantidade(item.produto.id, item.quantidade + 1)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          {formatarPreco(item.produto.preco * item.quantidade)}
                        </p>
                        <button
                          onClick={() => removerItem(item.produto.id)}
                          className="text-red-500 hover:text-red-700 mt-1 text-sm"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {itensCarrinho.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">
                    {formatarPreco(itensCarrinho.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0))}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <button 
                    onClick={() => {
                      localStorage.setItem('carrinho', JSON.stringify(itensCarrinho))
                      window.location.href = '/checkout'
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Finalizar Compra
                  </button>
                  
                  <button 
                    onClick={() => setCarrinhoAberto(false)}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Continuar Comprando
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
