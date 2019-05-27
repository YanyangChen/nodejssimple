export default {
    name: 'my-table',
    data: {
        columns: [
            // 'name',
            // 'nickname',
            // 'email',
            // 'birthdate',
            // 'gender',
            // '__actions'
            // 'Topic',
            // 'Group'
        ],
        itemActions: [
            { name: 'view-item', label: '', icon: 'zoom icon', class: 'ui teal button' },
            { name: 'edit-item', label: '', icon: 'edit icon', class: 'ui orange button'},
            { name: 'delete-item', label: '', icon: 'delete icon', class: 'ui red button' }
        ]
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
    },
    template: `
        <!--<vuetable ref="vuetable"-->
           <!---->
            <!--api-url="https://vuetable.ratiw.net/api/users"-->
            <!--api-url="http://localhost:3000/pmtopics/pmtopicslist"-->
            <!--:fields="$data.columns"-->
        <!--&gt;</vuetable>-->
        
         <vuetable ref="vuetable"
            api-url="https://vuetable.ratiw.net/api/users"
            :fields="
            ['gender',
            'name',
            'id',
            'email',
            'created_at' 
            ]
            "
        ></vuetable>
    `
}