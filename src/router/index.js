import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)


const routes = [
    {
        path: "/",
        component: () => import('@/views/home/home.vue')
    },
    {
        path: "/articles/:articleId",
        component: resolve => require(["../views/article/article.vue"], resolve)
    },
    {
        path: "/user",
        component: resolve => require(["../views/user/user.vue"], resolve),
        meta: { title: "个人中心" }
    },
    {
        path: '/wallpaper',
        name: "wallpaper",
        component: () => import('@/views/wallpaper/album.vue'),
        meta: {title: "壁纸集"},

    },
    {
        path: '/wallpaper/:id',
        name: "photo",
        component: () => import('@/views/wallpaper/photo.vue'),
        meta: {title: "壁纸"},

    },
    {
        path: '/category',
        name: "分类",
        component: () => import('@/views/category/category.vue'),
        meta: {title: "分类"},
    },
    {
        path: '/category/:categoryId',
        name: "分类下的文章列表",
        component: () => import('@/views/article/ArticleList.vue'),
        meta: {title: "文章列表"},
    },
    {
        path: '/tag',
        name: "标签列表",
        component: () => import('@/views/tag/tag.vue'),
        meta: {title: "标签"},
    },
    {
        path: '/tag/:tagId',
        name: "标签下的文章列表",
        component: () => import('@/views/article/ArticleList.vue'),
        meta: {title: "文章列表"},
    }


]


const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

export default router
