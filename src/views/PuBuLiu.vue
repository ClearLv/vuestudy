<template>
    <div class="container-water-fall">
        <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData">
            <div slot="waterfall-head" style="height: 100%;width: 100%">waterfall-head</div>
        </vue-waterfall-easy>
    </div>

</template>

<script>
    //import vueWaterfallEasy from 'vue-waterfall-easy'
     import waterfall from 'vue-waterfall2'
    import axios from 'axios'
    const getFile = {
        getPic() {
            return axios.get('./static/data/picture.json')
        }
    }

    export default {

        data() {
            return {
                imgsArr: [],
                group: 0, // request param
            }
        },
        components: {
            vueWaterfallEasy
        },
        methods: {
            getdata(){
                getFile.getPic().then(({data})=>{
                    for (let x of data){
                        console.log(x.src)
                        this.imgsArr = this.imgsArr.concat(x.src)
                        this.group++
                    }
                })
            },
        },
        mounted(){
            this.getdata()
        }

    }
</script>

<style scoped>

</style>