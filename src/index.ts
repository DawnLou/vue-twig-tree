import Vue from 'vue';
import VueTwigTreeH from "./components/VueTwigTreeH.vue"
import VueTwigTreeV from "./components/VueTwigTreeV.vue"

const VueTwigTree = {
    install(vue: typeof Vue): void {
        vue.component(VueTwigTreeH.name, VueTwigTreeH);
        vue.component(VueTwigTreeV.name, VueTwigTreeV);
    }
}

export { VueTwigTree, VueTwigTreeH, VueTwigTreeV }