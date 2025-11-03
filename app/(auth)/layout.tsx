import { ReactNode } from "react";
import "../globals.css";
// signIn/layout.tsx
export default function SetAuthLayout({ children }: { children: ReactNode }) {
    return (
        <section >

                {children}

        </section>
    )
}