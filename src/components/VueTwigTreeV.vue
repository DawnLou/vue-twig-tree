<!--  -->
<template>
  <table ref="twig" class="twig-wrapper v">
    <template v-if="node">
      <tr>
        <td :colspan="span" :class="[extend ? 'twig-extend' : '']">
          <div class="twig-node">
            <slot
              :node="node"
              :parents="parents"
              :add-child="addChild"
              :remove-current="removeCurrent"
              :update-current-name="updateCurrentName"
              :update-current-data="updateCurrentData"
            >
              {{ node.name }}
            </slot>
          </div>
          <div v-if="node.hasChild" class="twig-handle">
            <template v-if="loading">
              <slot name="loading">
                <div class="twig-hoop-loading" />
              </slot>
            </template>
            <div v-else class="twig-extend_handle" @click="onExtendHandleClick" />
          </div>
        </td>
      </tr>
      <tr v-if="node.children.length > 0" v-show="extend">
        <td v-for="(child, i) in node.children" :key="i" class="twig-child">
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
            <template
              slot-scope="{
                node,
                parents,
                addChild,
                removeCurrent,
                updateCurrentName,
                updateCurrentData,
              }"
            >
              <slot
                :node="node"
                :parents="parents"
                :add-child="addChild"
                :remove-current="removeCurrent"
                :update-current-name="updateCurrentName"
                :update-current-data="updateCurrentData"
              >
                {{ node.name }}
              </slot>
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
