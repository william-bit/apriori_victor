import { PropsWithChildren } from 'react'
import { twMerge } from "tailwind-merge"

export default function Island(props: PropsWithChildren<{
    className?: string
}>) {
    return (
        <div className={twMerge("overflow-hidden bg-[#f8f4f3] border border-gray-300 shadow-sm ", props.className)}>
            {props.children}
        </div>
    )
}
