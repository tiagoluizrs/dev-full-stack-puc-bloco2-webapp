import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("my-list", "routes/my-list.tsx"),
    route("item/:type/:id", "routes/item.tsx"),
    route("*", "routes/not-found.tsx")
] satisfies RouteConfig;