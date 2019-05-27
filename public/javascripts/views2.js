import TableComponent from '/javascripts/pagination_components/components/TableComponent.js';
import  TableColumn  from '/javascripts/pagination_components/components/TableColumn.js';
Vue.use(TableComponent);
Vue.use(TableColumn);
var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
})




var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Hello Vue!'
    }
})



// Object.freeze(app6)
Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            { id: 0, text: 'Vegetables' },
            { id: 1, text: 'Cheese' },
            { id: 2, text: 'Whatever else humans are supposed to eat' }
        ]
    }
})

var example1 = new Vue({
    el: '#example-1',
    data: {
        items: [
            { message: 'Foo' },
            { message: 'Bar' }
        ]
    }
})

Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        }
    },
    template:
    '<button v-on:click="count++">You clicked me {{ count }} times.'
  + '</button>'
})

Vue.component('blog-post', {
    // Props are custom attributes you can register on a component.
    props: ['xpost'],
    template: `
    <div class="blog-post">
      <h3>{{ xpost.title }}</h3>
      <button v-on:click="$emit('enlarge-text', 0.1)">
     Enlarge text
        </button>
      <div v-html="xpost.content"></div>
    </div>
  `
})

new Vue({
    el: '#components-demo',
    data: {
        posts: [
            { id: 1, title: 'My journey with Vue', content:'...test...' },
            { id: 2, title: 'Blogging with Vue', content:'...test...' },
            { id: 3, title: 'Why Vue is so fun', content:'...test...' },
        ],
        postFontSize: 1
    },
    methods: {
        onEnlargeText: function (enlargeAmount) {
            this.postFontSize += enlargeAmount
        }
    }
})

Vue.component('custom-input', {
    props: ['value'],
    template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})

var testable = new Vue({
    el: '#app-9',
    data: {
        columns: [
            'Topic',
            'Group',
            'Group_No',
            'Management',
            'Management_No',
            // '__actions'
        ],
        // itemActions: [
        //     { name: 'view-item', label: '', icon: 'zoom icon', class: 'ui teal button' },
        //     { name: 'edit-item', label: '', icon: 'edit icon', class: 'ui orange button'},
        //     { name: 'delete-item', label: '', icon: 'delete icon', class: 'ui red button' }
        // ]
    },
    methods: {
        viewProfile: function(id) {
            console.log('view profile with id:', id)
        }
    },
    events: {
        'vuetable:action': function(action, data) {
            console.log('vuetable:action', action, data)
            if (action == 'view-item') {
                this.viewProfile(data.id)
            }
        },
        'vuetable:load-error': function(response) {
            console.log('Load Error: ', response)
        }
    }
})

var vmn = new Vue({

    name : 'vm',
        el: '#example',
        data: {
            message: 'Hello'
        },
        computed: {
            // a computed getter
            reversedMessage: function () {
                // `this` points to the vm instance
                return this.message.split('').reverse().join('')
            },

            now: function () {
                return Date.now()
            }
        }

})

export {
    vmn,
    example1,
    app7,
    testable
}

new Vue({ el: '#components-demo' })
// new Vue({ el: '#blog-post-event-demo' })


