<template>
  <table ref="twig" class="twig-wrapper h">
    <template v-if="node">
      <tr>
        <td :rowspan="span" :class="[extend ? 'twig-extend' : '']">
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
        <td v-if="node.children.length > 0" v-show="extend">
          <VueTwigTreeH
            class="twig-child"
            v-for="(child, i) in node.children"
            :key="i"
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
          </VueTwigTreeH>
        </td>
      </tr>
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
