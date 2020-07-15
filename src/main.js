import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        username: 'Richard',
        boards: [
            {
                name: 'todo',
                display: 'Todo 😭'
            },
            {
                name: 'in progress',
                display: 'In Progress 🛠'
            },
            {
                name: 'done',
                display: 'Done 🎉'
            },
        ],
        tags: [
            {
                tag: 'hello',
                color: '#f1ffc4'
            },
            {
                tag: 'world',
                color: '#ffcaaf'
            },
            {
                tag: 'there',
                color: '#a7bed3'
            },
        ],
        tasks: [
            {
                title: 'Title',
                description: 'Description',
                state: 'todo',
                dueDate: new Date('7/19/2020'),
                pinned: true,
                tags: ['hello', 'world']
            },
            {
                title: 'Title 2',
                description: 'Description 2',
                state: 'done',
                dueDate: new Date('7/20/2020'),
                pinned: false,
                tags: ['hello', 'there']
            },
            {
                title: 'Title 3',
                description: 'Description 3',
                state: 'done',
                dueDate: new Date('7/21/2020'),
                pinned: false,
                tags: ['there', 'world']
            },
            {
                title: 'Title 3',
                description: 'Lorem ipsum dolor sit amet, malis vulputate at sed. Alia voluptaria at mea. Mel cu intellegam constituam, usu magna malis eu. Veniam temporibus scribentur in vix, melius prompta omnesque mea et. Laudem noster comprehensam no vim, idque epicurei volutpat vim ad.',
                state: 'done',
                dueDate: new Date('7/23/2020'),
                pinned: true,
                tags: ['there', 'world']
            },
        ]
    },
    mutations: {
        move_task(state, payload) {
            let {name, value} = payload;
            for (let task of value) {
                // update entry in tasks[]
                let correspond = state.tasks.find(elem => Object.is(elem, task));
                if (correspond) {
                    correspond.state = name;
                }
            }
        }
    }
});

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
