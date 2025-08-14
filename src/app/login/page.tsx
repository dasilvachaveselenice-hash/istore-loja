'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Lock, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Verificar se já está logado
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in')
    const loginTime = localStorage.getItem('admin_login_time')
    
    if (isLoggedIn === 'true' && loginTime) {
      const now = new Date().getTime()
      const loginTimestamp = parseInt(loginTime)
      const twentyFourHours = 24 * 60 * 60 * 1000
      
      // Se ainda não expirou, redirecionar para admin
      if ((now - loginTimestamp) < twentyFourHours) {
        router.push('/admin')
      }
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simular delay de autenticação
    setTimeout(() => {
      // Credenciais válidas
      const validCredentials = [
        { email: 'admin@istore.com', password: 'admin123', role: 'admin' },
        { email: 'gerente@istore.com', password: 'gerente123', role: 'manager' },
        { email: 'jcoelho.contatu@gmail.com', password: 'admin123', role: 'admin' }
      ]

      const user = validCredentials.find(
        cred => cred.email === email && cred.password === password
      )

      if (user) {
        // Salvar dados de autenticação
        localStorage.setItem('admin_logged_in', 'true')
        localStorage.setItem('admin_email', email)
        localStorage.setItem('admin_role', user.role)
        localStorage.setItem('admin_login_time', new Date().getTime().toString())
        
        // Redirecionar para admin
        router.push('/admin')
      } else {
        setError('Email ou senha incorretos!')
      }
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-red-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">🔒 Admin Login</h1>
          <p className="text-gray-600">Acesso restrito ao painel administrativo</p>
        </div>

        {/* Alerta de Segurança */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <span className="text-yellow-800 text-sm font-medium">
              Área protegida - Login obrigatório
            </span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Administrativo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="admin@istore.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha Administrativa
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Sua senha administrativa"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Verificando credenciais...
              </>
            ) : (
              <>
                <Shield className="h-5 w-5 mr-2" />
                Entrar no Admin
              </>
            )}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-2">🔑 Credenciais Administrativas:</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Admin Principal:</strong> admin@istore.com / admin123</p>
            <p><strong>Gerente:</strong> gerente@istore.com / gerente123</p>
            <p><strong>Owner:</strong> jcoelho.contatu@gmail.com / admin123</p>
          </div>
          <div className="mt-3 text-xs text-red-600">
            ⚠️ Sessão expira em 24 horas por segurança
          </div>
        </div>

        <div className="text-center mt-6">
          <a 
            href="/"
            className="text-blue-600 hover:text-blue-700 text-sm flex items-center justify-center"
          >
            ← Voltar para a loja
          </a>
        </div>
      </div>
    </div>
  )
}
