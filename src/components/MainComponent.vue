<template>
    <div class="main">
        <div class="container mt-2">
            <div class="row">
                <div class="col-md-8">
                    <div class="custom-table">
                       <h3 class="text-center">Data List</h3>
                       <!-- Table Start -->
                         <table class="table">
                            <thead>
                                <tr>
                                    <th  v-for="(field,index) in fields" :key="index" scope="col">
                                        {{field.label}}
                                    </th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data,index) in tableData" :key="index">   
                                  <td v-for="(field,index) in fields" :key="index">
                                       <div v-if="typeof(data[field.name])=='object'">
                                            <span v-for="(item,index) in data[field.name]" :key="index">{{item}} <br/></span>
                                       </div>
                                       <div v-else>
                                            {{data[field.name]}}
                                       </div>
                                    </td>
                                  <td> 
                                      <button class="btn btn-warning" @click.prevent="editFormData(data,index)">Edit</button>
                                      <button class="btn btn-danger" @click.prevent="removeFormData(index)">Delete</button>
                                  </td>
                                </tr>
                            </tbody>
                         </table>
                         <!-- Table End -->
                    </div>
                </div>
                <div class="col-md-4">
                  <div class="custom-form">
                    <!-- Start Form -->
                      <form >
                        <div v-for="(field,index) in fields" :key="index">
                            <!-- Form Title -->
                            <div v-if="field.type=='info_html'" v-html="field.content"></div>
                                <!-- Text and Email Field -->
                              <div class="form-group" v-if="field.type=='text' || field.type=='email'">
                                <label :for="`prefix-${index}`">{{field.label?field.label:'Text Field'}}</label>
                                <input  v-model="formData[field.name]" :name="field.name" :type="field.type" class="form-control" :required="field.required?field.required:false" :id="`prefix-${index}`" :placeholder="field.placeholder?field.placeholder:'Enter your text'">
                                <div v-if="errors" class="text text-danger" role="alert">
                                    {{errors[field.name]}}
                                </div>
                            </div>
                            <!-- Multiple Select Field -->
                            <div class="form-group" v-if="field.type=='multi-select' ">
                                 <label :for="`prefix-${index}`">{{field.label?field.label:'Select Option'}}</label>
                                <select :multiple="true" v-model="formData[field.name]" :name="field.name" class="form-control" :id="`prefix-${index}`">
                                    <option :value="select" v-for="(select,index) in Object.values(field.options)[0]" :key="index">
                                            {{select}}
                                    </option>
                                </select>
                                <div v-if="errors" class="text text-danger" role="alert">
                                    {{errors[field.name]}}
                                </div>
                            </div>
                            <!-- Radio option  -->
                             <div class="form-group" v-if="field.type=='radio'">
                                 <label :for="`prefix-${index}`">{{field.label?field.label:'Radio Option'}}</label>
                               <div class="form-check" :value="radio" v-for="(radio,index) in Object.values(field.options)[0]" :key="index">
                                    <input v-model="formData[field.name]" :name="field.name" class="form-check-input" type="radio" :id="`prefix-${index}`" :value="radio" checked>
                                    <label class="form-check-label" :for="`prefix-${index}`">
                                       {{radio}}
                                    </label>
                                </div>
                                 <div v-if="errors" class="text text-danger" role="alert">
                                    {{errors[field.name]}}
                                </div>
                            </div>
                            <!-- Single Select -->
                             <div class="form-group" v-if="field.type=='select'">
                                <label :for="`prefix-${index}`">{{field.label?field.label:'Select Option'}}</label>
                                <select  v-model="formData[field.name]" :name="field.name" class="form-control" :id="`prefix-${index}`">
                                    <option :value="select" v-for="(select,index) in Object.values(field.options)[0]" :key="index">
                                            {{select}}
                                    </option>
                                </select>
                                <div v-if="errors" class="text text-danger" role="alert">
                                    {{errors[field.name]}}
                                </div>
                            </div>

                        </div>
                        <div class="text-right">
                            <button v-if="!editInput" @click.prevent="saveFormData" class="btn btn-primary" type="submit">Add</button>
                            <button v-else @click.prevent="updateFormData" class="btn btn-primary" type="submit">Update</button>
                        </div>
                    </form>
                    <!-- End Form -->
                  </div>
                </div>
           </div>
        </div>
    </div>
</template>

<script>

export default {
    name:"main-component",
    data(){
        return {
        errors:{},
        tableData:[],
        formData: {},
        editInput:false,
        fields: [
            {
                type: 'info_html',
                content: '<h3>Please fill up the following form</h3>'
            },
            {
                name: 'first_name',
                type: 'text',
                label: 'First Name',
                placeholder: 'First Name',
                required: true,
                validation_message: 'First name is required'
            },
            {
                name: 'email',
                label: 'Email',
                type: 'email',
                placeholder: 'Email',
                required: true,
                validation_message: 'Email is required'
            },
            {
                name: 'ocupation',
                type: 'multi-select',
                label: 'Ocupation',
                placeholder: 'Select Ocupation',
                required: true,
                validation_message: 'Ocupation is required',
                options: [
                    {
                        doctor: 'Doctor',
                        engineer: 'Engineer',
                        teacher: 'Teacher',
                        other: 'Other'
                    }
                ]
            },
            {
                name: 'status',
                type: 'radio',
                label: 'Status',
                required: true,
                validation_message: 'Status is required',
                options: [
                    {
                        valid: 'Valid',
                        invalid: 'Invalid',
                        
                    }
                ]
            },
            {
                name: 'internal_status',
                type: 'select',
                label: 'Internal Status',
                required: true,
                validation_message: 'Internal Status is required',
                options: [
                    {
                        valid: 'Valid',
                        invalid: 'Invalid',
                    }
                ]
            }
        ]
        }
    },
    methods:{
        saveFormData(){ 
            this.errors = {}
            if(this.validateForm()){
                this.tableData.push(this.formData)
                this.clearForm();
            }    
        },
        removeFormData(index){
             this.tableData.splice(index,1);
        },
        editFormData(data,index){
            this.formData = data
             this.editInput = this.tableData[index];
        },
        updateFormData(){
            this.errors = {};
            if(this.validateForm()){
                this.clearForm();
                this.editInput = false
            }    
        },
        clearForm(){
            this.formData = [];
            this.errors = {};
        },
          validateForm () {
             var th = this
             var count = 0;
            th.fields.forEach(element => {
                if(element.type!='info_html'){
                    if(!th.formData[element.name] && element.required){
                       th.errors[element.name]=element.validation_message
                    count++;
                    }
                }
            });
            if(count>0){
                return false
            }else{
                return true
            } 
        },
            
    },
    
}
</script>

<style >

</style>