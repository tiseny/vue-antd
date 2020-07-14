<template>
  <a-layout class="app-root">
    <Aside :menus="menus" :theme="theme" :collapsed="collapsed"></Aside>
    <a-layout>
      <Header :nickName="nickName" :theme="theme" @onTheme="onTheme" @onCollapsed="onCollapsed"></Header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', minHeight: '280px', minWidth: '600px', overflow: 'auto' }" class="beauty-scroll">
        <div :style="{ height: '21px', marginBottom: '16px'}">
          <a-breadcrumb 
            style="float:left"
            :routes="routes"
          >
            <template slot="itemRender" slot-scope="{route, params, routes, paths}">
              <span v-if="routes.indexOf(route) === routes.length - 1">
                {{route.breadcrumbName}}
              </span>
              <router-link v-else :to="`/${paths.join('/')}`">
                {{route.breadcrumbName}}
              </router-link>
            </template>
          </a-breadcrumb>
        </div>
        <div>
          <keep-alive>
            <router-view :key="key"/>
          </keep-alive>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import config from '../../config'
import Aside from './aside'
import Header from './header'

let menus = [
  { key: '/adminReport', name: '首页报表', icon: 'pie-chart' },
  { key: '/seniorAdmin', name: '用户权限管理', icon: 'usergroup-add' },
  { key: '/logs', name: '用户日志', icon: 'file-text' },
  { key: '/sysSetting', name: '系统设置', icon: 'setting' },
  { key: '/test', name: '测试', icon: 'bars' }
]

export default {
  data () {
    return {
      collapsed: false,
      nickName: '',
      menus: menus,
      theme: config.theme.mode,
      routes: [{
        path: 'adminReport',
        breadcrumbName: '首页'
      },{
        path: '',
        breadcrumbName: ''
      }]
    };
  },

  components: {
    Aside, 
    Header
  },

  computed: {
    key() {
      return this.$route.fullPath
    }
  },
  
  created(){
    this.nickName = sessionStorage.getItem('role');
    this.routes = [{
      path: 'adminReport',
      breadcrumbName: '首页'
    },{
      path: '',
      breadcrumbName: '首页报表'
    }]
  },

  methods: {
    onTheme(theme) {
      this.theme = theme
    },
    onCollapsed(collapsed) {
      this.collapsed = !collapsed
    },
  },

  watch:{
    $route(to,from){
      this.routes[1].breadcrumbName = to.name;
    }
  }
}

</script>
<style>
  .app-root {
    height: 100vh;
  }
</style>