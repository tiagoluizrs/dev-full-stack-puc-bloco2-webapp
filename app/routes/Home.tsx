import type { Route } from "../+types/root";
import {HomePage} from "~/pages/Home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Home page" },
  ];
}

export default function Home() {
  return <HomePage />;
}
