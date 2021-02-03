<template>
  <div>
    <section>
      <h2>Horizontal</h2>
      <p><span>data</span> {{ simple }}</p>
      <VueTwigTreeH :data="simple" />
    </section>
    <section>
      <h2>Vertical</h2>
      <p><span>data</span> {{ simple }}</p>
      <VueTwigTreeV :data="simple" />
    </section>
    <section>
      <h2>Use Slot</h2>
      <p><span>data</span> {{ simple }}</p>
      <VueTwigTreeV :data="simple">
        <span class="slot-node" slot-scope="{ node }">
          {{ node.name }}
        </span>
      </VueTwigTreeV>
    </section>
    <section>
      <h2>Customize Data Use Parser</h2>
      <p><span>data</span> {{ custom }}</p>
      <VueTwigTreeV :data="custom.root" :parser="parser" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Node, NodeParser } from "@/components/Twig";
import VueTwigTreeH from "@/components/VueTwigTreeH.vue";
import VueTwigTreeV from "@/components/VueTwigTreeV.vue";
import simple from "./mock/simple";
import custom from "./mock/custom";
@Component({
  components: {
    VueTwigTreeH,
    VueTwigTreeV,
  },
})
export default class Example extends Vue {
  simple = simple;
  custom = custom;
  parser(data: any, labelName: string): Node {
    const node = new Node();
    const name = data[labelName];
    if (name) {
      node.name = name;
    }
    const id: string = data.id;
    const children = (this.custom.children as any)[id];
    if (children && children instanceof Array) {
      node.children = children;
      node.hasChild = children.length > 0;
    }
    return node;
  }
}
</script>
<style scoped>
section {
  border-top: 1px solid #999;
}
p {
  font-size: 12px;
  line-height: 28px;
}
span {
  padding: 5px;
  border-radius: 3px;
  background: #0ed149;
}
.slot-node {
  background: #0e9ad1;
  color: azure;
  cursor: pointer;
}
</style>
