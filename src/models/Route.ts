import { ReactElement, ReactNode } from "react";

export type Route = {
    id: number
    text: string
    icon: string
    path: string
    component: ReactNode
    exact: boolean
}

