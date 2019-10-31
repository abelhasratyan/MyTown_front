import Vue from 'vue'
import Router from 'vue-router'
const Token = require('./Auth').Token

const Login = () => import('@/views/Login')
const Register = () => import('@/views/Register')

//Users

const Dashboard = () => import('@/views/Home')
const User = () => import('@/views/Users/User')

const Profile = () => import('@/views/Profile/Profile')

// Photos
const Photos = () => import('@/views/Photo/Photo')

const Favorite = () => import('@/views/Photo/PhotoComponents/Favorite')
const ProfilePhoto = () => import('@/views/Photo/PhotoComponents/ProfilePhoto')
const CoverPhoto = () => import('@/views/Photo/PhotoComponents/CoverPhotos')
const Albums = () => import('@/views/Photo/PhotoComponents/Albums')
const Album = () => import('@/views/Photo/PhotoComponents/Album')

// Friends

const Friends = () => import('@/views/Friends/Friends')

Vue.use(Router)

const router = new Router({
    mode: '',
    linkActiveClass: 'open active!',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            name: 'Dashboard',
            component: Dashboard,
            children: [
                {
                    path: '',
                    name: 'User',
                    component: User,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'profile',
                    name: 'Profile',
                    component: Profile,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'photos',
                    name: 'Photos',
                    component: Photos,
                    children: [
                        {
                            path: '',
                            name: 'Favorite',
                            component: Favorite,
                            meta: {
                                requiresAuth: true
                            }
                        },
                        {
                            path: 'profilePhotos',
                            name: 'ProfilePhoto',
                            component: ProfilePhoto,
                            meta: {
                                requiresAuth: true
                            }
                        },
                        {
                            path: 'coverPhotos',
                            name: 'CoverPhotos',
                            component: CoverPhoto,
                            meta: {
                                requiresAuth: true
                            }
                        },
                        {
                            path: 'albums',
                            name: 'Albums',
                            component: Albums,
                            meta: {
                                requiresAuth: true
                            }
                        }
                    ]
                },
                {
                    path: 'albums/:id',
                    name: 'Album',
                    component: Album,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'friends',
                    name: 'Friends',
                    component: Friends
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Registration',
            component: Register
        }
    ]
})

router.beforeEach((to, from, next) => {
    // console.log(to.meta.requiresAuth);
    if (to.matched.some(record => to.meta.requiresAuth)) {
      if (Token.get.user()) {
        console.log('authorized')
        return next()
      }
      console.log('not authorized')
      return next({ name: 'Login' })
    }
    next()
})

export default router