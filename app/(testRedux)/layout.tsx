import { ReactNode } from "react";

// counter/layout.tsx
export default function SetAuthLayout({ children }: { children: ReactNode }) {
    return (
        <section >

                {children}

        </section>
    )
}