export default {
    name: 'my-table',
    template: `
        <vuetable ref="vuetable"
            api-url="https://vuetable.ratiw.net/api/users"
            :fields="['name', 'email', 'birthdate']"
        ></vuetable>
    `
}