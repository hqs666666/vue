<template>
<div class="login-body">
    <div class="login-box">
        <div class="login-title">用户登录</div>
        <div class="login-form">
            <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <FormItem prop="username">
                    <i-input type="text" v-model="formInline.username" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </i-input>
                </FormItem>
                <FormItem prop="password">
                    <i-input type="password" v-model="formInline.password" placeholder="Password">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </i-input>
                </FormItem>

                <FormItem prop="switch">
                    <i-switch v-model="formInline.switch" size="large">
                        <span slot="open">On</span>
                        <span slot="close">Off</span>
                    </i-switch>
                    <span>自动登录</span>
                </FormItem>
                <FormItem>
                    <Button type="primary" :loading="loading" @click="handleSubmit('formInline')" long>Signin</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            formInline: {
                username: '17602132272',
                password: '123456',
                switch: true
            },
            ruleInline: {
                user: [{
                    required: true,
                    message: '用户名不能为空',
                    trigger: 'blur'
                }],
                password: [{
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    },
                    {
                        type: 'string',
                        min: 6,
                        message: '长度不能小于6位',
                        trigger: 'blur'
                    }
                ]
            },
            loading: false
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                     this.loading = true;
                     this.$store.dispatch("Login",this.formInline)
                     .then(rsp => {
                         this.loading = false;
                         this.$router.push('/');
                     }).catch(err => {
                         this.loading = false;
                         this.$Message.error(err.message);
                     })
                } else {
                    this.$Message.error('Fail!');
                }
            })
        }
    }
}
</script>

<style scoped>
.login-body {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: antiquewhite;
    display: flex;
    justify-content: center;
    align-items: Center;
}

.login-box {
    width: 300px;
    height: auto;
    background-color: white;
    padding: 15px;
}

.login-title {
    width: 100%;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
}

.login-form {
    margin: 15px 0px;
}
</style>
