<template>
<div>
  <a-layout-header style="padding: 0;display:flex;justify-content:space-between;" :class="theme == 'light' ? 'light' : 'dark'">
    <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="onCollapsed"
    />
    <div id="index_header_right">
      <span class="index_header_right_action" @click="showDrawer">
        <span style="margin-left: 6px;fontSize:16px">
          主题色系
        </span>
      </span>
      <a-dropdown placement="bottomRight">
        <span class="index_header_right_action">
          <span class="user-avatar">
            <a-icon type="user" style="fontSize:16px"/>
          </span>
          <span style="margin-left: 6px;fontSize:16px">
            {{nickName}}
          </span>
        </span>
        <a-menu slot="overlay">
          <a-menu-item>
            <a @click="logout"><a-icon type="logout" /><span style="marginLeft:15px">退出登录</span></a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </a-layout-header>
  <a-drawer
    title="主题色系"
    placement="right"
    :closable="false"
    :visible="visible"
    @close="showDrawer"
  >
    <div class="title">主题</div>
    <div class="content">
      <a class="img" @click="changeTheme('dark')">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg" />
        <a-icon type="check" v-if="theme == 'dark'"/>
      </a>
      <a class="img" @click="changeTheme('light')">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg" />
        <a-icon type="check" v-if="theme == 'light'"/>
      </a>
      <a class="img" @click="changeTheme('night')">
        <img src="https://gw.alipayobjects.com/zos/antfincdn/hmKaLQvmY2/LCkqqYNmvBEbokSDscrm.svg" />
        <a-icon type="check" v-if="theme == 'night'"/>
      </a>
    </div>
    <div class="title">色系</div>
    <div class="content">
      <a @click="changeColor('#1890ff')">
        <span style="background: #1890ff;"></span>
        <a-icon type="check" v-if="color == '#1890ff'"/>
      </a>
    
      <a @click="changeColor('#f5222d')">
        <span style="background: #f5222d;"></span>
        <a-icon type="check" v-if="color == '#f5222d'"/>
      </a>
    
      <a @click="changeColor('#fa541c')">
        <span style="background: #fa541c;"></span>
        <a-icon type="check" v-if="color == '#fa541c'"/>
      </a>
    
      <a @click="changeColor('#faad14')">
        <span style="background: #faad14;"></span>
        <a-icon type="check" v-if="color == '#faad14'"/>
      </a>
    
      <a @click="changeColor('#13c2c2')">
        <span style="background: #13c2c2;"></span>
        <a-icon type="check" v-if="color == '#13c2c2'"/>
      </a>
    
      <a @click="changeColor('#52c41a')">
        <span style="background: #52c41a;"></span>
        <a-icon type="check" v-if="color == '#52c41a'"/>
      </a>
    
      <a @click="changeColor('#722ed1')">
        <span style="background: #722ed1;"></span>
        <a-icon type="check" v-if="color == '#722ed1'"/>
      </a>
    
      <a @click="changeColor('#ffbfca')">
        <span style="background: #ffbfca;"></span>
        <a-icon type="check" v-if="color == '#ffbfca'"/>
      </a>
    </div>
  </a-drawer>
</div>
</template>
<script>
import util from '@/helpers/themeUtil'
import config from '../../config'
export default {
  data () {
    return {
      visible: false,
      color: '#1890ff',
      collapsed: false
    };
  },

  props: {
    theme: String,
    nickName: String
  },

  methods: {
    logout(){
      this.$router.push({ path: '/login' })
    },

    showDrawer() {
      this.visible = !this.visible
    },

    changeColor(color) {
      this.color = color
      let closeMessage = this.$message.loading(`您选择了主题色 ${color}, 正在切换...`)
      util.changeThemeColor(color, this.theme).then(() => {
        setTimeout(closeMessage, 1000)
      })
    },

    changeTheme(theme) {
      this.$emit('onTheme', theme)
      let closeMessage = this.$message.loading(`您选择了主题色 ${theme}, 正在切换...`)
      util.changeThemeColor(this.color, theme).then(() => {
        setTimeout(closeMessage, 1000)
      })
    },

    onCollapsed() {
      this.collapsed = !this.collapsed
      this.$emit('onCollapsed', !this.collapsed)
    }
  }
}

</script>
<style lang="less">
  .ant-layout-header{
    background: @base-bg-color;
    &.light{
      background: @base-bg-color;
      color: @text-color;
    }
    &.dark{
      background: @header-bg-color-dark;
      color: white;
    }
    &.night{
      color: @text-color-inverse;
      background: @base-bg-color;
    }   
  }
  .title{
    margin: 10px 0;
  }
  .content{
    margin-bottom: 20px;
    > a{
      display: inline-block;
      position: relative;
      span{
        width: 18px;
        height: 18px; 
        margin: 0 4px;
        display: inline-block;
      }
      i{
        position: absolute;
        z-index: 10;
        top: 2px;
        left: 6px;
        color: @text-color;
      }
      &.img{
        i{
          color: @primary-color;
          top: 15px;
          left: 20px;
        }
      }
    }
  }
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color .3s;
  }
  .index_header_right_action {
    display: inline-block;
    height: 100%;
    padding: 0 12px;
    cursor: pointer;
    transition: all .3s;
  }
  .user-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    padding: 4px;
    background: @bg-color;
    text-align: center;
  } 
</style>