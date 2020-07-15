<!--
a column is a collection of cards with a heading.
-->

<template>
    <div class="column">
        <h2>{{ display }}</h2>

        <draggable v-model="tasks"
                   group="cards"
                   sort="true"
                   @start="drag = true"
                   @end="drag = false"
                   class="drag-container"
                   v-bind="dragOptions"
                   draggable=".card">
            <button slot="header" @click="addTask" class="add-task">Add Task</button>
            <card v-for="(task, task_index) in tasks"
                  :key="task_index"
                  v-bind="task">
            </card>
        </draggable>
    </div>
</template>

<script>
import card from './card.vue';
import draggable from 'vuedraggable';

export default {
    name: 'column',
    components: {
        card,
        draggable
    },
    props: {
        name: String,
        display: String,
    },
    methods: {
        addTask: function() {
            console.log('add task');
        },
    },
    computed: {
        tasks: {
            get() {
                // return search/filter
                return this.$store.state.tasks.filter(todo => {
                    return todo.state.match(this.name)
                }).sort((a, b) => a.pinned === b.pinned ? a.date - b.date : b.pinned - a.pinned);
            },
            set(value) {
                console.log('updating tasks');
                this.$store.commit('move_task', {name: this.name, value});
            }
        },
        dragOptions() {
            return {
                animation: 100,
                delay: 100,
                delayOnTouchOnly: true,
                touchStartThreshold: 3
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.column {
    padding: 1em;
    background-color: $highlight;
    margin: 0.5em;
    border-radius: $border-radius;
    box-sizing: border-box;

    @media screen and (min-width: $screen-medium) {
        width: 33%;
    }

    .drag-container {
        height: calc(100% - 3em);
    }

    .sortable-ghost {
        background-color: $light-blue;
        /* opacity: 0; */
    }

    .add-task {
        width: 100%;
        margin-bottom: 1.5em;
        padding: 1em;
        cursor: pointer;
        background: none;
        border: 1px dashed;
        border-color: inherit;
        border-radius: $border-radius;
        color: inherit;
        background-color: inherit;

        &:hover {
            background-color: inherit;
        }
    }
}
</style>
