import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useZForm, type DynamicState } from '@/hooks/use-zform'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import { Toaster } from 'sonner'

type LoginFormData = {
    email: string
    password: string
}

type SubmitLogin = (
    state: DynamicState<LoginFormData>,
    formData: FormData,
) => Promise<DynamicState<LoginFormData>>

const submitLogin: SubmitLogin = async (_, formData) => {
    // Simulate a login request
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return {
            data: { email, password },
            toast: {
                message: 'Please fill in all fields',
                type: 'error',
            },
            errors: {
                fields: {
                    email: !email ? ['Email is required'] : [],
                    password: !password ? ['Password is required'] : [],
                },
            },
        }
    }

    // Simulate successful login
    return {
        data: { email, password },
        toast: {
            message: 'Login successful',
            type: 'success',
        },
        errors: {},
    }
}

export const SampleForm = () => {
    const { data, pending, formProps, errors } = useZForm<LoginFormData>(
        submitLogin,
        {},
    )
    useEffect(() => {
        console.log('data', data)
    }, [data])

    return (
        <>
            <Toaster />
            <form className="space-y-4" {...formProps}>
                <div className="space-y-2">
                    <Input
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        defaultValue={data?.email || ''}
                        disabled={pending}
                        className={cn(
                            errors?.fields?.email?.length &&
                                'border-destructive',
                        )}
                    />
                    {errors?.fields?.email?.map((error, i) => {
                        return (
                            <p key={i} className="text-destructive text-sm">
                                {error || 'Invalid input'}
                            </p>
                        )
                    })}
                </div>
                <div className="space-y-2">
                    <Input
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Contraseña"
                        defaultValue={data?.password || ''}
                        disabled={pending}
                        className={cn(
                            errors?.fields?.password?.length &&
                                'border-destructive',
                        )}
                    />

                    {errors?.fields?.password?.map((error, i) => {
                        return (
                            <p key={i} className="text-destructive text-sm">
                                {error || 'Invalid input'}
                            </p>
                        )
                    })}
                </div>

                <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={pending}
                >
                    {pending ? 'Cargando' : 'Iniciar sesión'}
                </Button>
            </form>
        </>
    )
}
