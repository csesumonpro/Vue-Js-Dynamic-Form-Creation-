<template>
      <div class="form-group">
         <label :for="field.name">{{field.label?field.label:'Radio Option'}}</label>
            <div class="form-check" v-for="(radio,index) in Object.values(field.options)[0]" :key="index">
                <input v-model="data[field.name]" :name="field.name" class="form-check-input" type="radio" :id="`prefix-${index}`" :value="radio" checked>
                <label class="form-check-label" :for="`prefix-${index}`">
                    {{radio}}
                </label>
            </div>
                <div v-if="error" class="text text-danger" role="alert">
                {{error[field.name]}}
            </div>
        </div>
</template>
<script>

export default {
    name:'radio-component',
   props:['field','data','error'],
   
}
</script>
<style>

</style>