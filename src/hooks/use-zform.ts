import { useActionState, useEffect, useState } from 'react'
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
        type?: 'success' | 'error' | 'info' | 'warning' | undefined
    }
    errors?: {
        fields?: {
            [key in keyof T]?: string[] | undefined
        }
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

function toastMapper<T>(data: FormState<T>['toast']) {
    if (!data || !data.message) return undefined
    switch (data.type) {
        case 'success':
            toast.success(data.message)
            break
        case 'error':
            toast.error(data.message)
            break
        case 'info':
            toast.info(data.message)
            break
        case 'warning':
            toast.warning(data.message)
            break
        default:
            toast(data.message)
            break
    }
}

export function useZForm<State>(
    action: FormAction<State>,
    initialState: DynamicState<State>,
): FormState<State> {
    const [state, setState] = useState<DynamicState<State>>({
        data: initialState.data,
        errors: initialState.errors || {},
    })

    const [payload, formAction, pending] = useActionState<
        DynamicState<State>,
        FormData
    >(action, state)

    useEffect(() => {
        if (payload) {
            setState((prevState) => ({
                ...prevState,
                ...payload,
            }))
            if (payload.toast) {
                toastMapper(payload.toast)
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
