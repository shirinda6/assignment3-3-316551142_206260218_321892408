import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
//import About from "./pages/About";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/MyFavorites",
    name: "MyFavorites",
    component: () => import("./pages/MyFavorites"),
  },
  {
    path: "/MyPrivate",
    name: "MyPrivate",
    component: () => import("./pages/MyPrivate"),
  },
  {
    path: "/MyFamily",
    name: "MyFamily",
    component: () => import("./pages/MyFamily"),
  },
  {
    path: "/RecipePage",
    name: "RecipePage",
    component: () => import("./pages/RecipePage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
 {
    path: "/About",
    name: "About",
    component: () => import("./pages/About"),
  },
];

export default routes;
