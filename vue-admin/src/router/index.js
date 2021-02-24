import Vue from "vue";
import Router from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "Login"
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/About.vue")
    }
  ]
});
