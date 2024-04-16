import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (

        <section className="h-screen p-32">
            {children}
        </section>


    );
}
