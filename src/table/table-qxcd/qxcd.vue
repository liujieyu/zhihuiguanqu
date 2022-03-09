<template>
    <iframe width="100%" height="100%" :src="url"></iframe>
</template>

<script>
    export default {
        // name: "qxxx"
        data(){
        	return{
        		id:this.$route.query.id,
        		url:'',
        	}
        },
        mounted() {
        	console.log(this.$route.query.id);
		    this.Reload();
		},
		methods: {
    		Reload(){
    			this.axios.get('/guanqu/web/menus/'+this.id).then((res) => {
			        // this.data = res.data;
			        this.url = res.data.url;
			    });
    		},
    	},
    }
</script>

<style scoped>

</style>
