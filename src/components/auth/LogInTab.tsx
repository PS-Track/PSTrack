import { FormEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaGithub, FaGoogle } from 'react-icons/fa6'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { LuLoader } from 'react-icons/lu'

import { useAuthHook } from '@/hooks/auth/useAuthHook'
// import { signInViaGithub } from '@/actions/handle_oauth_action'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

type FormData = {
  email: string
  password: string
}

export default function LogInTab() {
  const toaster = useToast()
  const { handleRegister, isLoading } = useAuthHook()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  /**
   * Handle login via email and password
   **/
  const onLogin = async (data: FormData) => {
    toaster.toast({
      description: (
        <div className="flex items-center gap-3">
          <LuLoader className="animate-spin" />
          <p>Logging in</p>
        </div>
      ),
    })

    try {
      await handleRegister(data.email, data.password)
    } catch (error) {
      toaster.toast({
        variant: 'destructive',
        title: 'Login Error',
        description: (error as Error)?.message || 'An unknown error occurred',
      })
    }
  }

  /**
   * Toggle password visibility
   **/
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  /**
   * Handle sign in via GitHub
   **/
  const handleSignInViaGithub = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // await signInViaGithub()
  }

  return (
    <Card className="border-[#27272a] bg-transparent">
      <form onSubmit={handleSubmit(onLogin)}>
        <CardContent className="space-y-2 pt-6">
          <div className="space-y-1">
            <Label
              htmlFor="name"
              className="text-stone-300"
            >
              Email
            </Label>
            <Input
              id="email"
              className="text-stone-300 border-[#27272a]"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="password"
              className="text-stone-300"
            >
              Password
            </Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="text-stone-300 relative border-[#27272a] pr-10"
                {...register('password', { required: 'Password is required' })}
              />
              <Button
                onClick={togglePasswordVisibility}
                size="sm"
                variant="ghost"
                type="button"
                className="text-stone-300 absolute right-0 top-1/2 flex -translate-y-1/2 transform items-center border-none bg-transparent px-3 hover:bg-transparent"
              >
                {showPassword ? (
                  <HiEyeOff className="text-sm text-white" />
                ) : (
                  <HiEye className="text-sm text-white" />
                )}
              </Button>
            </div>
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="flex justify-end space-y-1">
            <Label
              htmlFor="password"
              className="text-stone-300"
            >
              <a
                href="#"
                className="text-primary-300 text-right text-xs"
              >
                Forgot password?
              </a>
            </Label>
          </div>
        </CardContent>
      </form>

      <CardFooter className="flex flex-col gap-4">
        <Button
          className="w-full"
          variant="default"
          disabled={isLoading}
        >
          Login
        </Button>

        <div className="flex w-full items-center justify-center space-x-2">
          <hr className="border-stone-300 w-full" />
          <span className="text-stone-300 text-nowrap text-xs uppercase">Or continue with</span>
          <hr className="border-stone-300 w-full" />
        </div>

        <form className="w-full">
          <Button
            className="text-stone-300 flex w-full items-center gap-3 bg-transparent"
            variant="outline"
          >
            <FaGoogle />
            Continue with Google
          </Button>
        </form>

        <form
          onSubmit={e => {
            handleSignInViaGithub(e)
          }}
          className="w-full"
        >
          <Button
            className="text-stone-300 flex w-full items-center gap-3 bg-transparent"
            variant="outline"
          >
            <FaGithub />
            <span>Continue with GitHub</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}