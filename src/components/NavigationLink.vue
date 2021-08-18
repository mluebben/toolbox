<template>
    <router-link :to="{name: routeName}" custom v-slot="{ href, navigate, isActive }">
        <li class="nav-item" :class="{active: isActive}">
            <a class="nav-link" :class="{disabled: disabled}" :href="href" @click="navigate"><slot/></a>
        </li>
    </router-link>
</template>

<script>
export default {
    props: {
        routeName: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>
        