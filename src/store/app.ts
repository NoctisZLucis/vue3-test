import { defineStore } from 'pinia';
import { reactive, toRefs } from 'vue';

export const useAppStore = defineStore('app', () => {
    const state = reactive({
        sidebar: {
            opened: true,
            withoutAnimation: false
        }
    });

    const toggleSidebar = () => {
        state.sidebar.opened = !state.sidebar.opened;
    };

    const closeSidebar = (withoutAnimation: boolean) => {
        state.sidebar.opened = false;
        state.sidebar.withoutAnimation = withoutAnimation;
    };

    return {
        ...toRefs(state),
        toggleSidebar,
        closeSidebar
    };
});
