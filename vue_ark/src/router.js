import { createRouter,createWebHashHistory} from 'vue-router';

const routes=[
        { path: '/',  name: 'StarIndex', component: () => import("./StarIndex.vue")},
        { path: '/character_index',  name: 'CharacterIndex', component: ()=> import("./views/character/CharacterIndex")},
        { path: '/activity_index',  name: 'ActivityIndex', component: () => import("./views/activity/ActivityIndex.vue")},
        { path: '/open_index',  name: 'OpenIndex', component: () => import("./views/open-recruitment/OpenIndex")},
        { path: '/drama_index',  name: 'DramaIndex', component: ()=> import("./views/drama/DramaIndex.vue")},
        { path: '/self_index',  name: 'SelfIndex', component: ()=> import("./views/self/SelfIndex.vue")},
        { path: '/add_index',  name: 'AddIndex', component: ()=> import("./views/add/AddIndex.vue")},
        { path: '/look/:id', name: 'look', component: () => import("./views/character/LookCha.vue")},
        { path: '/edit/:id', name: 'edit', component: () => import("./views/character/EditCha.vue")},
    
        /*{ path: '/regist', component: () => import('./views/Regist.vue') },
        {
            path: '/home', component: () => import('./views/Home.vue'), children: [
                { path: 'chat', name: 'chat', component: () => import('./views/chat/Chat.vue') },
                {
                    path: 'list', name: 'list', component: () => import('./views/chat/List.vue'),
                    children: [{ path: 'friend', name: 'friend', component: () => import('./views/chat/newFriend/Friend.vue') }]
                },
                { path: 'files', name: "files", component: () => import('./views/chat/Files.vue') },
                { path: 'wechat', name: "wechat", component: () => import('./views/chat/Wechat.vue') },
                { path: 'setting', name: "setting", component: () => import('./views/chat/Setting.vue') },
            ]
        }*/
    ]

const router = createRouter({
    routes,
    history:createWebHashHistory()
})

export default router