<template>
    <div class="register">

        <el-form :model="form" label-width="80px"
                 :rules="rules"
                 ref="form"
                 style="width: 90%;margin: auto;">
            <el-form-item label="用户名" required="true" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="密码"
                          required="true"
                          prop="pwd">
                <el-input v-model="form.pwd"
                          type="password"></el-input>
            </el-form-item>

            <el-form-item label="确认密码"
                          required="true"
                          prop="surePwd">
                <el-input v-model="form.surePwd"
                          ref="surePwd"
                          type="password"></el-input>
            </el-form-item>

            <el-form-item label="地区" prop="region" style="text-align: left">
                <el-cascader v-model="form.region"
                             width="100%"
                             :options="regions"
                             change-on-select
                             filterable
                             clearable></el-cascader>
            </el-form-item>

            <el-form-item label="活动时间" prop="time">

                <el-col :span="11">
                    <el-date-picker type="date"
                                    placeholder="选择日期"
                                    v-model="form.date1"
                                    value-format="yyyyMMdd"
                                    clearable
                                    style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>

                <el-col :span="11">
                    <el-time-picker type="fixed-time"
                                    placeholder="选择时间"
                                    clearable
                                    value-format="HHmmss"
                                    v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>


            <el-form-item label="性别" prop="chooseSex" style="text-align: left">
                <el-radio-group v-model="form.resource">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="爱好" prop="hobby" style="text-align: left">
                <el-checkbox-group v-model="form.hobby">
                    <el-checkbox label="看电影">电影</el-checkbox>
                    <el-checkbox label="听音乐">音乐</el-checkbox>
                    <el-checkbox label="跑跑">跑步</el-checkbox>
                    <el-checkbox label="跑跑">玩游戏</el-checkbox>
                </el-checkbox-group>

            </el-form-item>


            <el-form-item style="text-align: left" label="邮件推送" prop="sureEmail">
                <el-switch v-model="form.sureEmail"></el-switch>
            </el-form-item>

            <el-form-item label="Email" prop="email"
                          :rules="[{required:form.sureEmail, message: 'email不能空',trigger: 'blur'},
                              {pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                              message: 'email格式不对',
                              trigger: 'blur'}]">
                <el-input class="user-form-input" v-model="form.email" :maxlength="32"
                          placeholder="请输入有效的Email地址"/>
            </el-form-item>


            <el-form-item label="教育经历" prop="educations" v-model="this.educations">
                <!--<el-button icon="el-icon-circle-plus-outline"></el-button>-->
                <div style="text-align: left" v-for="(education, index) in form.educations" :key="education.uuid">
                    <el-button ref="jinzhi" :disabled="disabled" type="text" @click="addEducation(index)"><i
                            class="el-icon-circle-plus-outline"></i></el-button>
                    <el-button type="text" @click="remove(index)" style="color:#F56C6C"><i class="el-icon-delete"></i>
                    </el-button>

                    <el-form-item :prop="`educations[${index}].jiaoyuleixing`"
                                  style="display: inline-block;margin-left: 10px"
                                  :rules="[{required:true, message: '教育类型必填'}]">
                        <el-select placeholder="请选择" v-model="form.educations[index].jiaoyuleixing" clearable>
                            <el-option

                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item
                            style="display: inline-block;margin-left: 10px"
                            :prop="`educations[${index}].qizhitime`"
                            :rules="[{required:true, message: '起止时间必填'}
                            ,{pattern:/^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,message:'例如日期格式为2019-04-17'}]">
                        <el-input ref="education_qizhitime_input"
                                  placeholder="起止年月" clearable
                                  v-model="form.educations[index].qizhitime">
                        </el-input>
                    </el-form-item>

                    <el-form-item :prop="`educations[${index}].school`"
                                  style="display: inline-block;margin-left: 10px"
                                  :rules="[{required:true, message: '学校名称必填'}]">
                        <el-input placeholder="学校名称" clearable
                                  v-model="form.educations[index].school"/>
                    </el-form-item>
                </div>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit()">立即创建</el-button>
                <el-button @click="reset()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    //import axios from 'axios';
    import axios from '@/plugins/axios'
    import uuid from 'uuid/v4';

    const register = {
        getRegions() {
            return axios.get('./static/data/regions.json');
        },
        sameName(userName) {
            return axios.get('http://localhost:8081/myUser/sameName', {
                params: {
                    userCheckName: userName
                }
            });
        },
        sureRegister(params) {
            return axios.get('http://localhost:8081/myUser/register', {params: params})
        },
        postSureRegister(form) {
            return axios.post('http://localhost:8081/myUser/postRegister', form)
        }

    }
    export default {
        data() {
            return {
                disabled: false,
                clickTime: 0,
                form: {
                    name: '',
                    region: [],
                    pwd: '',
                    surePwd: '',
                    date1: '',
                    date2: '',
                    hobby: [],
                    email: '',
                    sureEmail: false,
                    resource: '',
                    checkList: '',
                    educations: [{
                        jiaoyuleixing: null,
                        qizhitime: null,
                        school: null
                    }],
                },
                options: [{
                    value: '小学',
                    label: '小学'
                }, {
                    value: '初中',
                    label: '初中'
                }, {
                    value: '高中',
                    label: '高中'
                }, {
                    value: '大学',
                    label: '大学'
                }, {
                    value: '硕士',
                    label: '硕士'
                }, {
                    value: '博士',
                    label: '博士'
                }, {
                    value: '其他',
                    label: '其他'
                }],

                regions: [],
                rules: {
                    name: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'},
                        {pattern: /^[a-zA-Z_][a-zA-Z0-9_]{3,32}$/, message: '小写字母/数字/下划线组成，字母开头,长度3-32位'},
                        {
                            validator: (rule, value, callback) => {
                                //console.log(value)
                                register.sameName(value)
                                    .then(({data}) => {
                                        // console.log(data)
                                        if (data == true) {
                                            callback("用户名存在")
                                        }
                                    })
                            }, trigger: 'blur'
                        },
                    ],
                    pwd: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 6, max: 16, message: '长度在6到16个字符', trigger: 'blur'},
                        {pattern: /^(\w){6,16}$/, message: '只能输入6-16个字母、数字、下划线'}
                    ],
                    surePwd: [
                        {required: true, message: '请确认两次密码是否一致', trigger: 'blur'},
                        {
                            validator: (rule, value, callback) => {
                                //console.log(value)
                                if (value != this.form.pwd) {

                                    callback("两次输入的密码不一致")
                                }
                            }
                        }
                    ],
                },
                emailRules: [
                    {required: true, message: '密码不能为空', trigger: 'blur'}
                ],
                cunchu: [],
            }
        },
        mounted() {
            this.printProven();
        },
        methods: {
            reset() {
                this.$refs.form.resetFields();
            },
            ceshi() {
                this.$message({
                    message: '恭喜你，注册成功了',
                    type: 'success'
                });
            },
            printProven() {
                register.getRegions()
                    .then(({data}) => this.regions = data)
            },
            onSubmit() {
                // console.log( this.$refs[formName]);
                //console.log( this.$refs.tijiaoform.validate(valid));
                // this.$refs[formName].validate(valid => {
                // console.log(valid);
                //    if (valid) {
                let form = {
                    name: this.form.name,
                    pwd: this.form.pwd,
                    region_provence: this.form.region[0],
                    region_city: this.form.region[1],
                    region_qu: this.form.region[2],
                    date: this.form.date1,
                    time: this.form.date2,
                    chooseSex: this.form.resource,
                    hobby: this.form.hobby,
                    email: this.form.email,
                    educations: this.form.educations
                };
                register.postSureRegister(form).then(({data}) => {
                    if (data == true) {
                        this.$message({
                            message: '恭喜你，注册成功了',
                            type: 'success'
                        });
                    }
                })
                //   }
                // })
            },
            addEducation(index) {
                let neirong = {
                    jiaoyuleixing: null,
                    qizhitime: null,
                    school: null
                };
                this.form.educations.splice(index, 0, neirong);
                if (this.clickTime == 3) {
                    //console.log(this.clickTime)
                    this.disabled = true
                }

                this.clickTime++;
            },
            remove(index) {
                this.form.educations.splice(index, 1);
               // console.log(this.clickTime)
                this.clickTime--;
                this.disabled = false
                //console.log(this.clickTime)
            }
        }
    }
</script>

<style scoped>

</style>