import { Toaster as Sonner, toast, type ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme="light"
            className="toaster group"
            style={
                {
                    '--normal-bg': 'var(--color-popover)',
                    '--normal-text': 'var(--color-neutral-950)',
                    '--normal-border': 'var(--color-border)',
                } as React.CSSProperties
            }
            {...props}
        />
    )
}

export { Toaster, toast }
