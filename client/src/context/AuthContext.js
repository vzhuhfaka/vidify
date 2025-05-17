import { createContext, useState, useEffect, useCallback } from 'react'

// Создаем контекст с правильными типами
export const AuthContext = createContext({
  token: null,
  userId: null,
  login: (token, userId) => {},
  logout: () => {},
  isAuthenticated: false,
  ready: false // Флаг инициализации
})

// Создаем провайдер с логикой
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [ready, setReady] = useState(false) // Для отслеживания инициализации

  // Функция входа
  const login = useCallback((newToken, newUserId, newUsername) => {
    setToken(newToken)
    setUserId(newUserId)
    localStorage.setItem('authToken', newToken)
    localStorage.setItem('userId', newUserId)
    localStorage.setItem('isAuth', true)
  }, [])

  // Функция выхода
  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
  }, [])

  // Проверка авторизации при загрузке
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    const storedUserId = localStorage.getItem('userId')
    
    if (storedToken && storedUserId) {
      login(storedToken, storedUserId)
    }
    
    setReady(true) // Помечаем инициализацию как завершенную
  }, [login])

  // Значение контекста
  const value = {
    token,
    userId,
    login,
    logout,
    isAuthenticated: !!token,
    ready
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}