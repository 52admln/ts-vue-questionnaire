<template>
  <el-submenu v-if="submenu.children" :index="submenu.index">
    <template slot="title">
      <i v-if="submenu.icon" :class="submenu.icon" />
      <span>{{ submenu.title }}</span>
    </template>
    <nav-bar-item
      v-for="(item, index) in submenu.children"
      :key="index"
      :submenu="item"
    />
  </el-submenu>
  <el-menu-item v-else :index="submenu.index">
    <i v-if="submenu.icon" :class="submenu.icon" />
    {{ submenu.title }}
  </el-menu-item>
</template>

<script lang="ts">
import NavBarItem from './NavBarItem.vue'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {
    NavBarItem
  }
})
export default class NavBarItemComponent extends Vue {
  @Prop({ default: () => {} }) private submenu!: any
}
</script>
