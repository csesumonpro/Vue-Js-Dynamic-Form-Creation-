<template>
    <div class="form-group">
        <label :for="field.name">{{field.label?field.label:'Select Option'}}</label>
        <select  v-model="data[field.name]" :name="field.name" class="form-control" :id="field.name">
            <option :value="select" v-for="(select,index) in Object.values(field.options)[0]" :key="index">
                    {{select}}
            </option>
        </select>
        <div v-if="error" class="text text-danger" role="alert">
            {{error[field.name]}}
        </div>
    </div>
</template>
<script>

export default {
    name:'select-component',
   props:['field','data','error'],
   
}
</script>
<style>

</style>