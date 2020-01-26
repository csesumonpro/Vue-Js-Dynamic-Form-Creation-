<template>
    <div class="all-component">
        <div class="container">
            <div class="row">
                <div class="col-md-5">
                    <!-- Form Start -->
                    <form action="">
                        <div v-for="(field,index) in fields" :key="index">
                               <!-- Form Title -->
                            <div v-if="field.type=='info_html'" v-html="field.content"></div>
                             <!-- Text Component Start -->
                            <div v-else-if="field.type=='text'">
                                <text-component  :error="errors" :data="formData"  :field="field"></text-component>
                            </div>
                             <!-- Text Component End -->  

                              <!-- Email Component Start -->
                            <div v-else-if="field.type=='email'">
                                <email-component :error="errors" :data="formData"  :field="field"></email-component>
                            </div>
                             <!-- Email Component End -->

                             <!-- Single Select Component Start -->
                            <div v-else-if="field.type=='select'">
                                <select-component :error="errors" :data="formData"  :field="field"></select-component>
                            </div>
                             <!-- Single Select Component End -->

                             <!-- Radio Option Component Start -->
                              <div v-else-if="field.type=='radio'">
                                <radio-component :error="errors" :data="formData"  :field="field"></radio-component>
                            </div>
                             <!-- Radio Option Component End -->

                              <!-- Multi Select Component Start -->
                            <div v-else-if="field.type=='multi-select'">
                                <multi-select-component :error="errors" :data="formData"  :field="field"></multi-select-component>
                            </div>
                             <!-- Multi Select Component End -->
                        </div>
                      <div class="text-right">
                            <button v-if="!editInput" @click.prevent="saveFormData" class="btn btn-primary" type="submit">Add</button>
                            <button v-else @click.prevent="updateFormData" class="btn btn-primary" type="submit">Update</button>
                        </div>
                    </form>
                     <!-- Form End -->
                </div>
                <div class="col-md-7">
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
                                    <button v-if="data != editInput" class="btn btn-danger" @click.prevent="removeFormData(index)">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                
                         <!-- Table End -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import jsonField from '../fields.json'
import TextComponent from './TextComponent'
import EmailComponent from './EmailComponent'
import SelectComponent from './SelectComponent'
import RadioComponent from './RadioComponent'
import MultiSelectComponent from './MultiSelectComponent'

  export default {
      name:'render-component',
        data(){
            return {
                fields:jsonField.fields,
                errors:{},
                tableData:[],
                formData:{},
                editInput:false,
            }
        },
      components:{
          TextComponent,
          EmailComponent,
          SelectComponent,
          RadioComponent,
          MultiSelectComponent,
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
             this.errors = {};
             this.formData = {}
             this.fields.forEach(element => {
               if (element.type=='multi-select') {
                   document.getElementById(element.name).value = ''
               }
           })
             
        },
        validateForm () {
            var count = 0;
            this.fields.forEach(element => {
                if(element.type!='info_html'){
                    if (element.required && typeof this.formData[element.name] == 'undefined') {
                        this.errors[element.name]=element.validation_message
                            count++;
                    }else{
                    if(this.formData[element.name].length<=0 && element.required){
                            this.errors[element.name]=element.validation_message
                            count++;
                      }
                    }
                }
            });
            if(count>0){
                return false
            }else{
                return true
            } 
          },
      }

  }
</script>
<style>

</style>