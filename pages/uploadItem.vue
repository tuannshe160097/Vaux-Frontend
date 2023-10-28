<template>
  <div class="stepsdemo-content">

        <Steps :model="items" :readonly="true"  style="margin-bottom: 1rem" />
        <keep-alive>
            <router-view :formData="formObject" @prevPage="prevPage($event)" @nextPage="nextPage($event)" @complete="complete" />
        </keep-alive>
    
    <Card>
        <template #title>
            Personal Information
        </template>
        <template #subtitle>
            Enter your information
        </template>
        <template #content>
            <p class="p-text-secondary">Enter your information</p>
            <div class="p-fluid">
                <div class="field">
                    <label for="firstname">Firstname</label>
                    <InputText id="firstname" v-model="$v.firstname.$model" :class="{'p-invalid':$v.firstname.$invalid && submitted}" />
                    <small v-show="$v.firstname.$invalid && submitted" class="p-error">Firstname is required.</small>
                </div>
                <div class="field">
                    <label for="lastname">Lastname</label>
                    <InputText v-model="$v.lastname.$model" :class="{'p-invalid':$v.lastname.$invalid && submitted}" />
                    <small v-show="$v.lastname.$invalid && submitted" class="p-error">Lastname is required.</small>
                </div>
                <div class="field">
                    <label for="age">Age</label>
                    <InputText id="age" v-model="$v.age.$model" :class="{'p-invalid':$v.age.$error && submitted}" />
                    <small v-show="$v.age.$invalid && submitted" class="p-error">Age should be a number.</small>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="grid grid-nogutter justify-content-between">
                <i></i>
                <Button label="Next" @click="nextPage(!$v.$invalid)" icon="pi pi-angle-right" iconPos="right" />
            </div>
        </template>
    </Card>
    <Card>
        <template #title>
            Seat Information
        </template>
        <template #subtitle>
            Choose your seat
        </template>
        <template #content>
            <div class="p-fluid formgrid grid">
                <div class="field col-12 md:col-6">
                    <label for="class">Class</label>
                    <Dropdown inputId="class" v-model="selectedClass" :options="classes" @change="setVagons($event)" optionLabel="name" placeholder="Select a Class" />
                </div>
                <div class="field col-12 md:col-6">
                    <label for="lastname">Wagon</label>
                    <Dropdown inputId="wagon" v-model="selectedVagon" :options="vagons" @change="setSeats($event)" optionLabel="vagon" placeholder="Select a Vagon" />
                </div>
                <div class="field col-12">
                    <label for="seat">Seat</label>
                    <Dropdown inputId="seat" v-model="selectedSeat" :options="seats" optionLabel="seat" placeholder="Select a Seat" />
                </div>
            </div>
        </template>
        <template #footer>
            <div class="grid grid-nogutter justify-content-between">
                <Button label="Back" @click="prevPage()" icon="pi pi-angle-left" />
                <Button label="Next" @click="nextPage()" icon="pi pi-angle-right" iconPos="right" />
            </div>
        </template>
    </Card>

  </div>
</template>

<script>
import {required, integer} from 'vuelidate/lib/validators';
export default {
    data() {
        return {
            firstname: '',
            lastname: '',
            age: '',
            submitted: false,
        
            items: [{
                label: 'Personal',
                to: '/steps'
            },
            {
                label: 'Seat',
                to: '/steps/seat'
            },
            {
                label: 'Payment',
                to: '/steps/payment'
            },
            {
                label: 'Confirmation',
                to: '/steps/confirmation'
            }],
            formObject: {}

        }
    },
    validations: {
        firstname: {
            required
        },
        lastname: {
            required
        },
        age: {
            integer
        }
    },
    methods: {
        nextPage(event) {
            for (const field in event.formData) {
                this.formObject[field] = event.formData[field];
            }

            this.$router.push(this.items[event.pageIndex + 1].to);
        },
        prevPage(event) {
            this.$router.push(this.items[event.pageIndex - 1].to);
        },
        complete() {
            this.$toast.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + this.formObject.firstname + ' ' + this.formObject.lastname + ' your order completed.'});
        },

        nextPage1(isFormValid) {
            this.submitted = true;

            if (!isFormValid) {
                return;
            }

            this.$emit('nextPage1', {formData: {firstname: this.firstname, lastname: this.lastname, age: this.age}, pageIndex: 0});
        }
    }
}

</script>

<style lang="scss" scoped>
  
</style>