import { useState } from 'react'
import AuthForm from './AuthForm'
import { supabase } from '@/lib/supabase'

interface LoginValues {
  email: string
  password: string
}

interface SignupValues extends LoginValues {
  name: string
  confirmPassword: string
}

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (data: LoginValues) => {
    setIsLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })
    if (error) setError(error.message)
    setIsLoading(false)
  }

  const handleSignup = async (data: SignupValues) => {
    setIsLoading(true)
    setError(null)
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.name },
      },
    })
    if (error) setError(error.message)
    setIsLoading(false)
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({ provider })
    if (error) setError(error.message)
    setIsLoading(false)
  }

  return (
    <AuthForm
      onLogin={handleLogin}
      onSignup={handleSignup}
      onSocialLogin={handleSocialLogin}
      isLoading={isLoading}
      error={error}
    />
  )
}

export default AuthPage
