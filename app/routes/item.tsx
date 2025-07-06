import type { Route } from "./+types/home";
import ItemPage from "~/pages/item";

export function meta({ params }: Route.MetaArgs) {
    return [
        // @ts-ignore
        { title: `Item #${params.id}` },
        {
            name: 'description',
            // @ts-ignore
            content: `Visualizando o item: ${params.id}`,
        },
    ];
}


export default function Item() {
    return <ItemPage />;
}
