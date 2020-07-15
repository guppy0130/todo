<template>
    <div id="app" ref="app" v-on:fullscreen="fullScreen = true" :class="{'fullScreen-app': fullScreen, darkMode}">
        <div class="header">
            <p>It's {{ dayOfWeek }}, <span style="font-weight: bold">{{ this.$store.state.username }}</span></p>
        </div>
        <div class="columns">
            <column v-for="(board, index) in this.$store.state.boards"
                    :key="index"
                    v-bind.sync="board">
            </column>
        </div>
    </div>
</template>

<script>
import column from './components/column.vue';

export default {
    name: 'App',
    components: {
        column,
    },
    data: () => {
        return {
            fullScreen: false,
            darkMode: false
        }
    },
    computed: {
        dayOfWeek() {
            return Intl.DateTimeFormat('default', {weekday: 'long'}).format(new Date());
        }
    }
}
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    letter-spacing: 0.02em;

    --gray: #{$gray};
    --white: #{$white};
    --background-color: #{$white};
    background-color: var(--background-color);
    --color: #{$gray};
    color: var(--color);
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    font-size: $font-size;

    .header {
        text-align: center;
        font-size: 2em;
    }

    .columns {
        display: flex;

        @media screen and (max-width: $screen-medium) {
            flex-direction: column;
        }
    }

    .fullScreen-app {
        filter: blur(8px);
    }
}

.darkMode {
    --background-color: #{$gray} !important;
    background-color: var(--background-color);
    --color: #{$white} !important;
    color: var(--color);
    border-color: #{$white};
}
</style>
