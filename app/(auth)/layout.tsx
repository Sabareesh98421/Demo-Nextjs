import { ReactNode } from "react";
import "../globals.css";
// signIn/layout.tsx
export default function SetAuthLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className={"h-dvh w-dvw flex justify-center items-center "}>
                {children}
            </body>
        </html>
    )
}