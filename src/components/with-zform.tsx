import {
    useZForm,
    type DynamicState,
    type FormAction,
    type FormState,
} from '@/hooks/use-zform'

export function withZForm<State>(
    action: FormAction<State>,
    initialState: DynamicState<State>,
) {
    return (
        Component: React.ComponentType<Omit<FormState<State>, 'formProps'>>,
    ) => {
        return (props: Omit<FormState<State>, 'formProps'>) => {
            const { formProps, ...formState } = useZForm(action, initialState)
            return (
                <form {...formProps}>
                    <Component {...formState} {...props} />
                </form>
            )
        }
    }
}
