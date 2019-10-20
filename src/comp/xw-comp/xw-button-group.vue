<template>
    <div
        class="xw-button-group"
    >
        <slot />
    </div>
</template>
<script>
export default {
};
</script>
<style lang="stylus">
.xw-button-group {
    .xw-button {
        border-radius 0;
        margin-left -1px;
    }
    :first-child.xw-button {
        border-radius 0.3em 0 0 0.3em;
        margin-left 0;
    }
    :last-child.xw-button {
        border-radius 0 0.3em 0.3em 0;
    }
}
</style>
