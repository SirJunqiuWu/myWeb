Vue.component('mobile-alert-modal', {
    props:['show', 'title'],
    data:function () {
        return{
            // 数据源 可向父视图传值
            dataDic:{},
        }
    },
    template:'<div v-if="show" style="position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: rgba(0,0,0,0.6);opacity: 1;z-index: 666;display: block;"><div style="position: fixed;background: white;top: 50%;left: 50%;width: 300px;height: 110px; margin-left: -150px;margin-top: -55px;background: white;font-size: 16px;color: #00F;text-align: center; border-radius: 6px;z-index: 777;"><div style="height: 60px;line-height: 60px;color: black;font-size: 17px;border-bottom: 1px solid #EDEDED;">{{title}}</div><div style="height: 50px;display: flex;"><div style="width: 50%;height: 50px;line-height: 50px;border-right: 1px solid #EDEDED;" @click="cancel">取消</div><div style="width: 50%;height: 50px;line-height: 50px;" @click="ok">确定</div></div></div></div>',
    methods:{
        cancel:function () {
            this.$emit('cancel-clicked', false)
        },
        ok:function () {
            this.$emit('ok-clicked', false)
        },
    },
});