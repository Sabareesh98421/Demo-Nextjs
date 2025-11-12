import { ReactNode } from "react";
import "../globals.css";
// signIn/layout.tsx
export default function SetAuthLayout({ children }: { children: ReactNode }) {
    return (
        <section className="flex justify-center items-center h-full w-full">

                {children}

        </section>
    )
}