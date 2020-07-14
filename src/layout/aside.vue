<template>
  <a-layout-sider
    collapsible
    v-model="collapsed"
    :trigger="null"
    :theme="theme == 'light' ? 'light' : 'dark'" 
    style="height:100%"
    :class="theme == 'light' ? 'light' : 'dark'"
  >
    <div class="logo">logo</div>
    <a-menu 
      mode="inline"
      class="menu"
      v-model="selectedKeys"
      :theme="theme == 'light' ? 'light' : 'dark'" 
      @select="onSelect"
    >
      <a-menu-item :theme="theme" v-for="item in menus" :key="item.key">
        <router-link :to="item.key">
          <a-icon :type="item.icon" />
          <span>{{item.name}}</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  data () {
    return {
      selectedKeys: []
    }
  },

  props: {
    theme: String,
    menus: Array,
    collapsed: Boolean
  },

  methods: {
    onSelect(item) {
      this.selectedKeys = item.selectedKeys
    }
  },

  watch:{
    $route(to,from){
      let paths = to.path.split("/")
      this.selectedKeys = [`/${paths[1]}`]
    }
  },
}
</script>
<style lang="less">
.ant-layout-sider{
  .logo {
    height: 32px;
    margin: 16px;
    line-height: 32px;
    text-align: center;
  }
  &.light{
    color: @text-color;
    .ant-menu-item > a {
      color: @text-color;
    }
  }
  &.dark{
    color: white;
    .ant-menu-item > a {
      color: white;
    }
  }
  &.night{
    color: @text-color-inverse;
    .ant-menu-item > a {
      color: @text-color-inverse;
    }
  }   
}

</style>
