'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Shield } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = () => {
    // Verificar se está logado
    const isLoggedIn = localStorage.getItem('admin_logged_in')
    const adminEmail = localStorage.getItem('admin_email')
    const loginTime = localStorage.getItem('admin_login_time')
    
    // Verificar se o login não expirou (24 horas)
    const now = new Date().getTime()
    const loginTimestamp = loginTime ? parseInt(loginTime) : 0
    const twentyFourHours = 24 * 60 * 60 * 1000
    
    if (isLoggedIn === 'true' && adminEmail && (now - loginTimestamp) < twentyFourHours) {
      setIsAuthenticated(true)
      setUserEmail(adminEmail)
    } else {
      // Limpar dados expirados
      localStorage.removeItem('admin_logged_in')
      localStorage.removeItem('admin_email')
      localStorage.removeItem('admin_login_time')
      
      // Redirecionar para login
      router.push('/login')
    }
    
    setLoading(false)
  }

  const handleLogout = () => {
    // Limpar dados de autenticação
    localStorage.removeItem('admin_logged_in')
    localStorage.removeItem('admin_email')
    localStorage.removeItem('admin_login_time')
    
    // Redirecionar para home
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acesso Negado</h2>
          <p className="text-gray-600 mb-4">Você precisa fazer login como administrador</p>
          <button 
            onClick={() => router.push('/login')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Fazer Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header Admin Global com Logout */}
      <div className="bg-red-600 text-white px-4 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            <span className="font-medium">🔧 Modo Administrador</span>
            <span className="ml-4 text-red-200">Logado como: {userEmail}</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-red-200 text-sm">
              Sessão expira em 24h
            </span>
            <button 
              onClick={handleLogout}
              className="flex items-center bg-red-700 hover:bg-red-800 px-3 py-1 rounded transition-colors"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Sair
            </button>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}
