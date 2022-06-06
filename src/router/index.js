import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        component: resolve => require(["../views/home/home.vue"], resolve)
    },
    {
        path: "/articles/:articleId",
        component: resolve => require(["../views/article/article.vue"], resolve)
    },
    {
        path: "/user",
        component: resolve => require(["../views/user/User.vue"], resolve),
        meta: {
            title: "个人中心"
        }
    },
]


const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

export default router
