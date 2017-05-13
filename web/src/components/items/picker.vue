<template>
	<div @click='change'>
		
	</div>	
</template>

<script>
	import weui from 'weui.js';
	export default {
		name:'picker',
		props:{
				'mode':String,
				'disabled':Boolean,
				'range':Array,
				'range-key':Number,
				'value':Number
			  },
		data()
		{	
			return {ispicker:false}
		},
		created()
		{

		},
		computed:{

		},
		methods:{
			change()
			{
				this.dopicker();
			},
			dopicker()
			{
				let that=this;
				weui.picker(this.range,
				{
					defaultValue: [this.value],
					change(result)
					{
						console.log('change');
					},
					confirm(result)
					{
						that.$emit('bindchange',{detail:{value:result}})
					}

				});
			}
		}
	}
</script>