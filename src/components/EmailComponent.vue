<template>
    <div class="form-group">
        <label :for="`${field.name}`">{{field.label?field.label:'Text Field'}}</label>
        <input  v-model="data[field.name]" :name="field.name" :type="field.type" class="form-control" :required="field.required?field.required:false" :id="`${field.name}`" :placeholder="field.placeholder?field.placeholder:'Enter your text'">
        <div v-if="error" class="text text-danger" role="alert">
            {{error[field.name]}}
        </div>
    </div>
</template>
<script>

export default {
    name:'email-component',
   props:['field','data','error'],
   
}
</script>
<style>

</style>