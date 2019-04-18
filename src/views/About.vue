<template>
    <div class="about">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-select v-model="formInline.pCate" placeholder="商品分类">

                <el-option
                        v-for="item in otions"
                        :key="item.pCate"
                        :value="item.pCate">

                </el-option>
            </el-select>

            <el-form-item style="margin: 0 10px 0 10px">
                <el-input v-model="formInline.pName" placeholder="商品名称"></el-input>
            </el-form-item>

            <el-form-item>
                <el-input v-model="formInline.pPrice" placeholder="价格"></el-input>
            </el-form-item>

            <el-form-item>
                <el-input v-model="formInline.pInfo" placeholder="简介"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
        </el-form>

        <el-table
                height="530"
                style="width: 90% ; margin:20px auto ;align: center"
                :data="listData">

            <el-table-column
                    prop="pid"
                    label="商品id">
                <template slot-scope="scope">
                    {{scope.row.pid}}
                </template>
            </el-table-column>

            <el-table-column
                    prop="pCate"
                    label="商品类型">
                <template slot-scope="scope">
                    {{scope.row.pCate}}
                </template>

            </el-table-column>

            <el-table-column
                    prop="pName"
                    label="商品名">
                <template slot-scope="scope">
                    {{scope.row.pName}}
                </template>

            </el-table-column>

            <el-table-column
                    prop="pJianjie"
                    label="简介">
                <template slot-scope="scope">
                    {{scope.row.pJianjie}}
                </template>

            </el-table-column>

            <el-table-column
                    prop="pPrice"
                    label="价格">
                <template slot-scope="scope">
                    {{scope.row.pPrice}}
                </template>

            </el-table-column>

            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="productShow(scope.$index, scope.row)">商品详情</el-button>
                    <!--dialogFormVisible = true-->
                    <el-dialog title="商品详情" :visible.sync="dialogFormVisible">
                        <el-form :model="form">
                            <el-form-item label="商品名称" :label-width="formLabelWidth">
                                <el-input v-model="form.pName" auto-complete="off" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="商品类型" :label-width="formLabelWidth">

                                <el-select v-model="form.pCate" placeholder="商品分类">
                                    <!--multiple-->
                                    <el-option
                                            v-for="item in otions"
                                            :key="item.pCate"
                                            :value="item.pCate">
                                        <!--:label="item.label"-->
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="商品简介" :label-width="formLabelWidth">
                                <el-input v-model="form.pInfo" disabled auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="商品价格" :label-width="formLabelWidth">
                                <el-input v-model="form.pPrice" disabled auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="this.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.totalSize"
                style="position:fixed; bottom: 0px;left: 0px;right: 0px; margin-left:auto;margin-right:auto;">
            <!--style="position:fixed; bottom: 0px;margin-top: 20px;margin-right: auto;margin-left: auto; ">-->
        </el-pagination>
    </div>

</template>

<script>
    import axios from '@/plugins/axios'

    const fileService = {
        findShangping() {

            return axios.get('http://localhost:8081/product/getAllProductInfos');
        },
        findFenlei() {

            return axios.get('http://localhost:8081/product/getProductCate');
        },
        findCount() {

            return axios.get('http://localhost:8081/product/getCountInfo');
        },
        findSearchCount() {
            return axios.get('http://localhost:8081/product/getSearchCountInfo');
        },
        findProductById(productId) {
            return axios.get('http://localhost:8081/product/getProductById', {
                params: {
                    productId: productId
                }
            })
        }

    };
    export default {

        data() {
            return {
                dialogTableVisible: false,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                form: {
                    pCate: '',
                    pName: '',
                    pPrice: '',
                    pInfo: '',
                },
                formInline: {

                    pid: '',
                    pCate: '',
                    pName: '',
                    pPrice: '',
                    pInfo: '',
                },
                listData: [{
                    pid: '',
                    pName: '',
                    pJianjie: '',
                    pCate: '',
                    pPrice: '',

                }],
                otions: [{

                    pCate: ''
                }],
                value: '',
                totalSize: '',
                pageNum: 1,
                pageSize: 10,
                resultData: [{
                    pid: '',
                    pName: '',
                    pJianjie: '',
                    pCate: '',
                    pPrice: ''
                }]
            }
        },
        mounted() {

            fileService.findFenlei()
                .then(({data}) => this.otions = data)
            this.pageSearch(this.pageNum);
            fileService.findCount()
                .then(({data}) => {
                    this.totalSize = data
                    //console.log(this.totalSize)
                })
        },
        methods: {
            productShow(index, row) {

                this.dialogFormVisible = true
                let productId = row.pid

                fileService.findProductById(productId)
                    .then(({data}) => {
                        console.log(data)
                        this.form.pName = data.pName;
                        this.form.pCate = data.pCate;
                        this.form.pInfo = data.pJianjie;
                        this.form.pPrice = data.pPrice;
                    })
            },
            rowClass() {
                return "text-align:center;";
            },
            onSubmit() {
                console.log('submit!');
                this.pageSearch()

            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.pageSearch(this.pageSize);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                this.pageSearch(this.pageNum);
            },
            pageSearch() {
                axios({
                    url: 'http://localhost:8081/product/findPageCeshi',
                    headers: {'Content-Type': 'application/json'},
                    params: {
                        pCate: this.formInline.pCate,
                        pName: this.formInline.pName,
                        pPrice: this.formInline.pPrice,
                        pInfo: this.formInline.pInfo,
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                    },
                }).then(({data}) => {
                    console.log(data);

                    this.listData = data.list;
                    this.totalSize = data.total;
                })
            },
            searchResultPage() {
                axios({
                    url: 'http://localhost:8081/product/findPageCeshi',
                    headers: {'Content-Type': 'application/json'},
                    params: {
                        pCate: this.formInline.pCate,
                        pName: this.formInline.pName,
                        pPrice: this.formInline.pPrice,
                        pInfo: this.formInline.pInfo,
                        pageNum: this.pageNum,
                        pageSize: this.pageSize,
                    },
                }).then(({data}) => {
                    this.listData = data
                    this.totalSize = data.length;
                })
            }

        },
    }
</script>