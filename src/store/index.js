import Vuex from 'vuex'
import Vue from 'vue'
import users from './modules/users/user'
import photo from './modules/photos/photo'
// import category from './modules/category'
// import story from './modules/story'
// import profession from './modules/profession'
// import notification from './modules/notification'

// Load Vuex
Vue.use(Vuex);

//Create store
export default new Vuex.Store({
    modules: {
        users,
        photo
    }
})
