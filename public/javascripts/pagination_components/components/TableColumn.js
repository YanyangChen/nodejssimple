import settings from '../settings.js';
export default {
    props: {
        show: { required: false, type: String },
        label: { default: null, type: String },
        dataType: { default: 'string', type: String },
        sortable: { default: true, type: Boolean },
        sortBy: { default: null },
        filterable: { default: true, type: Boolean },
        filterOn: { default: null },
        formatter: { default: v => v, type: Function },
        hidden: { default: false, type: Boolean },
        cellClass: { default: settings.cellClass },
        headerClass: { default: settings.headerClass },
    },
    template:`
     <!-- Never render the contents -->
    <!-- The scoped slot won't have the required data -->
    <div v-if="false">
        <slot></slot>
    </div>
    `
};