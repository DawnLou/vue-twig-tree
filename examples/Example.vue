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
      <VueTwigTreeH :data="simple">
        <span
          class="slot-node info"
          slot-scope="{ node, updateCurrentName }"
          @click="changeNodeName(updateCurrentName)"
        >
          {{ node.name }}
          <span class="hover-prompt"> Click To Change Name </span>
        </span>
      </VueTwigTreeH>
      <VueTwigTreeV :data="simple">
        <span
          class="slot-node danger"
          slot-scope="{ node, removeCurrent }"
          @click="removeNode(removeCurrent)"
        >
          {{ node.name }}
          <span class="hover-prompt"> Click To Remove Node Without Root </span>
        </span>
      </VueTwigTreeV>
    </section>
    <section>
      <h2>Customize Data Use Parser</h2>
      <p><span>data</span> {{ custom }}</p>
      <VueTwigTreeV :data="custom.root" :parser="parser" />
    </section>
    <section>
      <h2>Remote Load</h2>
      <p><span>data</span> {{ remote }}</p>
      <VueTwigTreeV
        :data="remote"
        :parser="remoteLoadParser"
        :load-children="loadChildren"
      />
      <p><span>Reload On Extend</span></p>
      <VueTwigTreeH
        :data="remote"
        :parser="remoteLoadParser"
        :load-children="loadChildren"
        reload-on-extend
      />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Node, LoadChildrenCallback } from "@/components/Twig";
import simple from "./mock/simple";
import custom from "./mock/custom";
@Component
export default class Example extends Vue {
  simple = simple;
  custom = custom;
  remote = { name: "Root" };
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
  remoteLoadParser(data: any, labelName: string): Node {
    const node = new Node();
    const name = data[labelName];
    if (name) {
      node.name = name;
    }
    node.children = [];
    node.hasChild = true;
    return node;
  }
  loadChildren(node: Node, callback: LoadChildrenCallback) {
    setTimeout(() => {
      const children = [{ name: "child-1" }, { name: "child-2" }];
      callback(children);
    }, 1000);
  }
  changeNodeName(updater: any) {
    updater("changed node name");
  }
  removeNode(remover: any) {
    remover();
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
  color: azure;
  cursor: pointer;
  position: relative;
}
.slot-node.info {
  background: #0e9ad1;
}
.slot-node.danger {
  background: #f56c6c;
}

.hover-prompt {
  white-space: nowrap;
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
}

.slot-node:hover .hover-prompt {
  display: inline;
  z-index: 1;
}
</style>
