<template>
    <div class="tag" :style="{'background-color': color, 'color': textColor}">
        {{ tag }}
    </div>
</template>

<script>
export default {
    name: 'tag',
    props: {
        tag: String,
        color: String,
    },
    computed: {
        textColor() {
            // asssume this.color comes in the form #rrggbb
            // sRGB luma method
            let red = parseInt(this.color.substr(1,2), 16) * 0.2126;
            let green = parseInt(this.color.substr(3,2), 16) * 0.7152;
            let blue = parseInt(this.color.substr(5,2), 16) * 0.0722;
            let lightness = (red + green + blue) / 255;
            let threshold = 0.6;
            return lightness > threshold ? 'var(--gray)' : 'var(--white)'
        }
    }
}
</script>

<style lang="scss" scoped>
.tag {
    border-radius: $border-radius * 3;
    padding: 0.5em 1em;
    margin: 0.1em 0.25em;
}
</style>
