<!--  -->
<template>
  <table ref="twig" class="twig-wrapper h">
    <template v-if="node">
      <tr>
        <td :rowspan="span" :class="{ extend: extend }">
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
        <td
          v-if="node.children.length > 0"
          v-show="extend"
          :class="['child', 'first', node.children.length === 1 ? 'one' : '']"
        >
          <VueTwigTreeH
            :data="node.children[0]"
            :index="0"
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
          </VueTwigTreeH>
        </td>
      </tr>
      <template v-if="node.children.length > 1">
        <tr v-for="i in node.children.length - 1" :key="i" v-show="extend">
          <td :class="['child', i >= node.children.length - 1 ? 'last' : '']">
            <VueTwigTreeH
              :data="node.children[i]"
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
            </VueTwigTreeH>
          </td>
        </tr>
      </template>
    </template>
  </table>
</template>
<script lang="ts">
import "@/styles/styles.css";
import "@/styles/styles.h.css";
import { Component } from "vue-property-decorator";
import Twig from "./Twig";
@Component({
  name: "VueTwigTreeH",
})
export default class VueTwigTreeH extends Twig {}
</script>
