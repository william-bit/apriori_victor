import { PropsWithChildren } from 'react'
import { twMerge } from "tailwind-merge"

export default function Island(props: PropsWithChildren<{
    className?: string
}>) {
    return (
        <div className={twMerge("overflow-hidden bg-white shadow-sm sm:rounded-lg", props.className)}>
            {props.children}
        </div>
    )
}
