import { AlertTriangleIcon } from 'lucide-react'
import { cn } from 'zerel-ui/lib/utils'

type ErrorLineProps = {
    message: string
    className?: string
}
export const ErrorLine = ({ message, className = '' }: ErrorLineProps) => {
    return (
        <div
            className={cn(
                'text-destructive paragraph-sm flex items-center gap-2',
                className,
            )}
        >
            <AlertTriangleIcon className="h-4 w-4" />
            <span>{message}</span>
        </div>
    )
}
