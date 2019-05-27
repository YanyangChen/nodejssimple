import TableCell from './TableCell.js';

export default {
    props: ['columns', 'row'],

    components: {
        'table-cell': TableCell,
    },

    computed: {
        visibleColumns() {
            return this.columns.filter(column => ! column.hidden);
        },
    },
    template:`
    <tr @click="$emit('rowClick', row)">
        <table-cell
            v-for="column in visibleColumns"
            :row="row"
            :column="column"
            :key="column.id"
        ></table-cell>
    </tr>
    `
};

