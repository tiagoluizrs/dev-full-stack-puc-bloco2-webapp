import type { Route } from "./+types/home";
import NotFoundErrorPage from "~/pages/not-found";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Página não encontrada" },
        { name: "description", content: "Página não encontrada" },
    ];
}

export default function NotFound() {
    return <NotFoundErrorPage />;
}
