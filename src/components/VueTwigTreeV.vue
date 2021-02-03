<!--  -->
<template>
  <table ref="twig" class="twig-wrapper v">
    <template v-if="node">
      <tr>
        <td :colspan="span" :class="{ extend: extend }">
          <div class="node">
            <slot :node="node">{{ node.name }}</slot>
          </div>
          <div v-if="node.hasChild" class="handle">
            <template v-if="loading">
              <slot name="loading">
                <div class="hoop-loading" />
              </slot>
            </template>
            <div v-else class="extend_handle" @click="onExtendHandleClick" />
          </div>
        </td>
      </tr>
      <tr v-if="node.children.length > 0" v-show="extend">
        <td v-for="(child, i) in node.children" :key="i" class="child">
          <VueTwigTreeV
            :data="child"
            :index="i"
            :parser="parser"
            :label-name="labelName"
            :parents="parents.concat(data)"
            :auto-extend="autoExtend"
            :load-children="loadChildren"
            @remove-current="removeChild"
          >
            <template slot-scope="{ node }">
              <slot :node="node">{{ node.name }}</slot>
            </template>
          </VueTwigTreeV>
        </td>
      </tr>
    </template>
  </table>
</template>

<script lang="ts">
import "@/styles/styles.css";
import "@/styles/styles.v.css";
import { Component } from "vue-property-decorator";
import Twig from "./Twig";
@Component({
  name: "VueTwigTreeV",
})
export default class VueTwigTreeV extends Twig {}
</script>
