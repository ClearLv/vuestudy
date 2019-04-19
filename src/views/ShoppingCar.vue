<template>
    <div class="ShoppingCar">
        <h1>购物车</h1>
        <el-table
                ref="multipleTable"
                :data="tableData"
                style="width: 100%"

                @selection-change="handleSelectionChange">
                <!--v-model="tableData">-->
            <el-table-column
                    label="全选"
                    type="selection"

                    width="55">
                <template scope="scope">
                    <el-checkbox v-model="scope.row.checked" ></el-checkbox>
                    <!--<el-checkbox v-model="tableData.checked"></el-checkbox>-->
                </template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="商品名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="price"
                    label="价格"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop=""
                    label="数量">
                <template slot-scope="scope">
                    <el-input-number v-model="scope.row.num"  size="small"  @change="handleChange" :min="1" :max="99" label="描述文字"></el-input-number>
                </template>
            </el-table-column>
            <el-table-column
                    prop=""
                    label="总价">
                <template scope="scope">
                    <div>{{scope.row.price*scope.row.num}}</div>
                </template>
            </el-table-column>
        </el-table>
        <div>总价钱:<span>{{countList}}</span></div>
    </div>

</template>

<script>
    export default {
        data(){
            return {
                tableData:[{
                    name:'电脑',
                    checked:false,
                    price:'3000',
                    num:1,
                    total:1
                },{
                    name:'手机',
                    checked:false,
                    price:'5000',
                    num:1,
                    total:1
                }],
                count:0,
                multipleSelection: [],
                isTrue: false,
            }
        },
        computed:{
            countList() {
                var a = 0;
                for(let i = 0; i<this.tableData.length; i++){
                    if(this.tableData[i].checked == true){
                        a += this.tableData[i].price * this.tableData[i].num
                    }
                }
                this.count = a;
                return this.count
            }
        },
        methods:{

            handleSelectionChange(val) {
                //console.log(val)

                for (let x of val){
                    console.log(val)
                     let zhenshi = !this.tableData.checked;
                     x.checked = zhenshi;
                    //this.tableData.checked = !val.checked;

                }
                this.multipleSelection = val;
            },
            handleChange(value) {
                // console.log(value);
            }
        },
        watch:{
            isTrue: function () {
                if (this.isTrue == true) {
                    for (let k = 0; k < this.tableData.length; k++) {
                        this.tableData[k].checked = true;
                    }
                } else {
                    for (let k = 0; k < this.tableData.length; k++) {
                        this.tableData[k].checked = false;
                    }
                }

            }
        }
    }
</script>

<style scoped>

</style>