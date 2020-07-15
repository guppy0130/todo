<!--
a card should have the following:

* title
* description (short, long)
* due date
* tags
* date
* subtasks
-->

<template>
    <div class="card" :class="{fullScreen}"
         @click="fullScreenFx(true)"
         @keydown.enter="fullScreenFx(true)"
         @keydown.esc="fullScreenFx(false)"
         v-click-outside="()=>{fullScreenFx(false)}"
         tabindex="0">
        <form>
            <div class="top">
                <div class="pin">
                    <svg v-if="pinned" style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
                    </svg>
                </div>
                <div class="date">
                    <input required type="datetime-local" :disabled="!fullScreen" id="date" name="date" :value="dueDate.toISOString().slice(0, -1)">
                </div>
            </div>
            <div class="body">
                <p>
                <input required :disabled="!fullScreen" id="title" name="title" :value="title" class="title">
                </p>
                <p>
                <input required :disabled="!fullScreen" id="description" name="description" :value="description">
                </p>
            </div>
            <div class="tags">
                <tag v-for="tag in lookup_tags" :key="tag.tag" v-bind="tag"></tag>
            </div>
        </form>
    </div>
</template>

<script>
import tag from './tag.vue';
import vClickOutside from 'v-click-outside';

export default {
    name: 'card',
    components: {
        tag
    },
    directives: {
        clickOutside: vClickOutside.directive
    },
    props: {
        title: String,
        description: String,
        dueDate: Date,
        pinned: Boolean,
        tags: Array
    },
    data: () => {
        return {
            fullScreen: false
        }
    },
    methods: {
        fullScreenFx(isFullscreen) {
            if (this.fullScreen !== isFullscreen) {
                this.$emit('fullscreen', isFullscreen ? 'enter' : 'exit')
                this.fullScreen = isFullscreen;
            }
        }
    },
    computed: {
        // lookup tags from app
        lookup_tags: function() {
            return this.$store.state.tags.filter(({tag}) => {
                return this.tags.some(tag_in => {
                    return tag_in.match(tag)
                });
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    padding: 1em;
    border-radius: $border-radius;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: box-shadow 0.3s cubic-bezier(.25,.8,.25,1);
    margin-bottom: 1em;
    background-color: var(--background-color);

    &:hover {
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        cursor: pointer;
    }

    .top {
        display: flex;
        justify-content: space-between;
        height: 1em;

        .pin {
            transform: rotate(45deg);
        }
    }

    .body {
        margin-bottom: 1em;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-height: 15em;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
    }

    input {
        width: 100%;
        box-sizing: border-box;
        border: none;
        padding: 0.1em 0;
        font-size: 1em;
        background-color: inherit;
        color: inherit;

        &[type=datetime-local] {
            text-align: right;
        }
    }

    .title {
        text-align: left;
        font-size: 1.5em;
        font-weight: bold;
    }
}

.fullScreen {
    position: absolute;
    top: 2em;
    left: 3em;
    margin: 0 auto;
    width: calc(100% - 9em);
    z-index: 2;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    padding: 2em;

    &:hover {
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }

    &:focus {
        outline: none;
    }

    input {
        background-color: $highlight;
        padding: 0.5em;
        margin: 0.5em 0;
        border-radius: $border-radius;
    }
}

</style>
