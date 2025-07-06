import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/Home.tsx"),
    route("my-list", "routes/MyList.tsx"),
    route("item/:type/:id", "routes/Item.tsx"),
    route("*", "routes/NotFound.tsx")
] satisfies RouteConfig;