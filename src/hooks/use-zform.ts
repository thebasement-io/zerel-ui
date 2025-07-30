import { useActionState, useEffect, useState } from 'react'

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
        message?: string | undefined
        fields?: {
            [key in keyof T]?: string[] | undefined
        }
    }
}

export type FormConfig = {
    toast:
        | boolean
        | {
              loading?: string
          }
}

export type DynamicState<State> = Pick<FormState<State>, 'data' | 'errors'>

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
