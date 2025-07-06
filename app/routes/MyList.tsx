import type { Route } from "./+types/home";
import MyListPage from "~/pages/MyList";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Meus filmes e séries" },
        { name: "description", content: "Minha lista de filmes e séries" },
    ];
}

export default function MyList() {
    return <MyListPage />;
}
