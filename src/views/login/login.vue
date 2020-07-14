<template>
  <div id="login_page">
    <a-form
      id="login_page_form"
      :form="form"
      @submit="handleSubmit"
    >
      <div style="marginBottom: 40px;fontSize: 26px;letter-spacing: 5px; textAlign:center">
        管理系统
      </div>
      <a-form-item>
        <a-input
          v-decorator="[
            'userName',
            { rules: [{ required: true, message: '请输入登录名!' }] }
          ]"
          placeholder="用户名"
          size="large"
        >
          <a-icon
            slot="prefix"
            type="user"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: '请输入登录密码!' }] }
          ]"
          type="password"
          placeholder="密码"
          size="large"
        >
          <a-icon
            slot="prefix"
            type="lock"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            }
          ]"
        >
          记住账户
        </a-checkbox>
        <a-button
          type="primary"
          html-type="submit"
          class="login-form-button"
          size="large"
        >
          登录
        </a-button>
        <a @click="$router.push({path:'/register'})">
          立即注册
        </a>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

export default {
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$router.push({ path: '/adminReport'});
          this.$store.commit('getRole','admin');
          sessionStorage.setItem('role',this.$store.state.role)
        }
      });
    }
  },
};
</script>
<style lang="less">
#login_page{
  height: 100vh;
  width: 100%;
  background-image: url('../../assets/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  color: @text-color;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#login_page_form{
  width: 400px;
  padding: 40px;
  margin: 0 auto;
  background-color: @bg-color;
}
#login_page_form .login-form-forgot {
  float: right;
}
#login_page_form .login-form-button {
  margin-top: 16px;
   margin-bottom: 24px;
  width: 100%;
}
</style>