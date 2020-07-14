<template>
  <div id="login_page">
    <a-form
      id="login_page_form"
      :form="form"
      @submit="handleSubmit"
    >
      <div style="marginBottom: 40px;fontSize: 26px;letter-spacing: 5px; textAlign:center">
        注册
      </div>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: 'Please input your Password!' }] }
          ]"
          type="password"
          placeholder="用户名"
          size="large"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          placeholder="手机号码"
          size="large"
          v-decorator="[
            'phone',
            {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            }
          ]"
          style="width: 100%"
        >
          <a-select
            slot="addonBefore"
            v-decorator="[
              'prefix',
              { initialValue: '86' }
            ]"
            style="width: 70px"
          >
            <a-select-option value="86">
              +86
            </a-select-option>
            <a-select-option value="87">
              +87
            </a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-row type="flex" justify="space-between" align="middle">
          <a-col :span="16">
            <a-input
              v-decorator="[
                'password',
                { rules: [{ required: true, message: 'Please input your Password!' }] }
              ]"
              type="password"
              placeholder="验证码"
              size="large"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-col>
          <a-col :span="8" style="textAlign:right">
            <a-button size="large">获取验证码</a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: 'Please input your Password!' }] }
          ]"
          type="password"
          placeholder="密码"
          size="large"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: 'Please input your Password!' }] }
          ]"
          type="password"
          placeholder="确认密码"
          size="large"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0,0,0,.25)"
          />
        </a-input>
      </a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        class="login-form-button"
        size="large"
      >
        注册
      </a-button>
      <a @click="$router.push({path:'/login'})">
        立即登录
      </a>
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
          console.log('Received values of form: ', values);
        }
      });
    },
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
  width: 100%;
}
</style>