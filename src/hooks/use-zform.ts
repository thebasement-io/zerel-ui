import { useActionState, useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export type FormState<T> = {
    formProps: {
        action: (payload: FormData) => void
        onChange: (e: React.ChangeEvent<HTMLFormElement>) => void
    }
    data?: T
    pending?: boolean
    toast?: {
        message?: string | undefined
        type?: 'success' | 'error' | undefined
    }
    errors?: {
        fields?: {
            [key in keyof T]?: string[] | undefined
        }
    }
}

export type FormConfig = {
    toast?: {
        loadingMessage?: string
    }
}

export type DynamicState<State> = Pick<
    FormState<State>,
    'data' | 'errors' | 'toast'
>

export type FormAction<State> =
    | PlainFormAction<State>
    | PayloadedFormAction<State>

type PlainFormAction<State> = (
    data: Awaited<DynamicState<State>>,
) => Awaited<DynamicState<State>> | Promise<DynamicState<State>>

type PayloadedFormAction<State> = (
    data: Awaited<DynamicState<State>>,
    payload: FormData,
) => Awaited<DynamicState<State>> | Promise<DynamicState<State>>

export function useZForm<State>(
    action: FormAction<State>,
    initialState: DynamicState<State>,
    config?: FormConfig,
): FormState<State> {
    const [state, setState] = useState<DynamicState<State>>({
        data: initialState.data,
        errors: initialState.errors || {},
    })

    const [payload, formAction, pending] = useActionState<
        DynamicState<State>,
        FormData
    >(action, state)

    const toastResolverRes = useRef<
        ((data: DynamicState<State>) => void) | null
    >(null)
    const toastResolverRej = useRef<
        ((data: DynamicState<State>) => void) | null
    >(null)
    const formSubmitted: () => Promise<DynamicState<State>> =
        useCallback(async () => {
            return new Promise((resolve, reject) => {
                toastResolverRes.current = resolve
                toastResolverRej.current = reject
            })
        }, [])

    useEffect(() => {
        if (pending) {
            toast.promise(formSubmitted, {
                loading: config?.toast?.loadingMessage || 'Submitting form...',
                success: (data) => {
                    if (!data.toast) return 'Form submitted successfully'
                    return data.toast.message
                },
                error: (data) => {
                    if (!data.toast) return 'Form submission failed'
                    return data.toast.message || data
                },
            })
        }
    }, [pending, state.toast, formSubmitted, config])

    useEffect(() => {
        if (payload) {
            setState((prevState) => ({
                ...prevState,
                ...payload,
            }))
            if (payload.toast) {
                if (payload.toast.type === 'error')
                    toastResolverRej.current?.(payload)
                else toastResolverRes.current?.(payload)
                toastResolverRes.current = null
                toastResolverRej.current = null
            }
        }
    }, [payload, setState])

    function handleFormChange(e: React.ChangeEvent<HTMLFormElement>) {
        const { name, value } = e.target
        if (!name || value === undefined) return
        const typedName = name as keyof State
        setState((prevState) => {
            const mergedData = {
                ...(prevState.data || {}),
                [typedName]: value,
            } as State
            return {
                ...prevState,
                data: mergedData,
                errors: {
                    ...prevState.errors,
                    fields: {
                        ...(prevState.errors || {})?.fields,
                        [typedName]: [],
                    },
                },
            }
        })
    }

    return {
        ...state,
        formProps: {
            action: formAction,
            onChange: handleFormChange,
        },
        pending,
    }
}

export { withZForm } from '@/components/with-zform'
