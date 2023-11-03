//Request seller
<template>
  <section
    class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden p-2"
  >
    <div class="userdetails-page-container flex flex-column">
      <h3>Đăng ký tài khoản người bán</h3>
      <div class="grid">
        <div class="col-2"></div>
        <div class="col-8">
          <div class="card-control">
            <div class="card-header font-medium text-xl">
              Thông tin tài khoản
            </div>
            <div class="p-5 grid grid-form">
              <div class="field col-6">
                <label>{{ fieldLabels.gender }}</label>
                <Dropdown
                  class="w-100"
                  :class="{ 'p-invalid': errors.gender }"
                  v-model="gender"
                  :options="oGenders"
                  optionLabel="name"
                  optionValue="value"
                />
              </div>
              <div class="field col-6">
                <label>{{ fieldLabels.dob }}</label
                ><br />
                <Calendar
                  class="surface-overlay w-100"
                  :class="{ 'p-invalid': errors.dob }"
                  v-model="dob"
                  dateFormat="dd-mm-yy"
                >
                </Calendar>
              </div>
              <div class="field col-6">
                <label>{{ fieldLabels.phone }}</label>
                <InputText
                  class="w-100"
                  :class="{ 'p-invalid': errors.phone }"
                  type="text"
                  v-model="phone"
                />
              </div>
              <div class="field col-6">
                <label>{{ fieldLabels.email }}</label>
                <InputText
                  class="w-100"
                  :class="{ 'p-invalid': errors.email }"
                  type="text"
                  v-model="email"
                />
              </div>
              <div class="field col-12">
                <label>{{ fieldLabels.cccd }}</label>
                <InputText
                  class="w-100"
                  :class="{ 'p-invalid': errors.cccd }"
                  type="text"
                  v-model="cccd"
                />
              </div>
              <div class="field col-4">
                <label>{{ fieldLabels.city }}</label>
                <InputText
                  class="w-100"
                  :class="{ 'p-invalid': errors.city }"
                  type="text"
                  v-model="city"
                />
              </div>
              <div class="field col-4">
                <label>{{ fieldLabels.district }}</label>
                <InputText
                  class="w-100"
                  :class="{ 'p-invalid': errors.district }"
                  type="text"
                  v-model="district"
                />
              </div>
              <div class="field col-4">
                <label>{{ fieldLabels.street }}</label>
                <InputText
                  class="w-100"
                  :class="{ 'p-invalid': errors.street }"
                  type="text"
                  v-model="street"
                />
              </div>
              <div class="field col-12">
                <label>
                  {{ fieldLabels.houseNumber }}
                </label>

                <InputText
                  class="w-100"
                  :class="{ 'p-invalid': errors.houseNumber }"
                  type="text"
                  v-model="houseNumber"
                />
              </div>

              <div class="field col-6">
                <label>{{ fieldLabels.filePortrait }}</label>
                <div
                  :class="{ 'input-invalid': errors.filePortrait }"
                  class="w-100 text-center surface-overlay p-1 border-1 border-solid surface-border border-10 w-full"
                >
                  <ImagePreview
                    :src="portraitUrl || require('~/assets/images/default.jpg')"
                    alt="Image"
                    imageClass="w-max-100"
                    imageStyle="height:200px;object-fit: contain"
                  />
                  <div class="small font-italic text-muted mb-2">
                    JPG or PNG no larger than 5 MB
                  </div>
                  <input
                    type="file"
                    @change="onUploadFile($event, 'Portrait')"
                    accept="image/*"
                  />
                </div>
              </div>
              <div class="field col-6">
                <label>{{ fieldLabels.fileCitizenId }}</label>
                <div
                  :class="{ 'input-invalid': errors.fileCitizenId }"
                  class="w-100 text-center surface-overlay p-1 border-1 border-solid surface-border border-10 w-full"
                >
                  <ImagePreview
                    :src="
                      citizenIdUrl || require('~/assets/images/default.jpg')
                    "
                    imageClass="w-max-100"
                    imageStyle="height:200px;"
                    alt="Image"
                  />
                  <div class="small font-italic text-muted mb-2">
                    JPG or PNG no larger than 5 MB
                  </div>
                  <input
                    type="file"
                    @change="onUploadFile($event, 'CitizenId')"
                    accept="image/*"
                  />
                </div>
              </div>
              <div class="field col-12">
                <Button label="Yêu cầu" @click="onSubmit()" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
      
<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { GENDER_OPTION } from '~/utils'

@Component({
  layout: 'public',
  middleware: ['interception'],
})
class requestSeller extends Vue {
  gender: string = ''
  dob: any = null
  phone: string = ''
  email: string = ''
  cccd: string = ''
  city: string = ''
  district: string = ''
  street: string = ''
  houseNumber: string = ''
  filePortrait: any = null
  fileCitizenId: any = null

  //private
  portraitUrl: string = ''
  citizenIdUrl: string = ''

  //
  fieldLabels: Record<string, string> = {
    gender: 'Giới tính',
    dob: 'Ngày sinh',
    phone: 'Số điện thoại',
    email: 'Email',
    cccd: 'Số CCCD',
    city: 'Thành phố',
    district: 'Quận, huyện',
    street: 'Phường, xã',
    houseNumber: 'Địa chỉ',
    filePortrait: 'Ảnh chân dung',
    fileCitizenId: 'Ảnh thẻ cccd/cmnd mặt trước',
  }
  requiredFields: string[] = [
    'gender',
    'dob',
    'phone',
    'email',
    'cccd',
    'city',
    'district',
    'street',
    'houseNumber',
    'filePortrait',
    'fileCitizenId',
  ]

  errors: Record<string, boolean> = {}
  //option data
  oGenders = GENDER_OPTION
  onSubmit() {
    this.checkValid()
  }
  onUploadFile(event: Event, imgFor: string) {
    const inputElement = event.target as HTMLInputElement
    const files = inputElement.files
    if (files && files.length > 0) {
      if (files[0].size / 1024 / 1024 > 5) {
        //khong hoat dong???
        this.$store.commit('commons/store-error/setError')
        return
      }
      if (imgFor === 'Portrait') {
        this.filePortrait = files[0]
        this.portraitUrl = URL.createObjectURL(this.filePortrait)
      } else if (imgFor === 'CitizenId') {
        this.fileCitizenId = files[0]
        this.citizenIdUrl = URL.createObjectURL(this.fileCitizenId)
      }
    }
  }
  //   checkValid() {
  //   this.igender = false;
  //   this.idob = false;
  //   this.iphone = false;
  //   this.iemail = false;
  //   this.icccd = false;
  //   this.icity = false;
  //   this.idistrict = false;
  //   this.istreet = false;
  //   this.ihouseNumber = false;

  //   if (this.gender == null || this.gender === '') {
  //     this.igender = true;
  //     this.$store.commit('commons/store-error/setError', 'Chưa chọn giới tính');
  //   }
  //   if (this.dob == null || this.dob === '') {
  //     this.idob = true;
  //     this.$store.commit('commons/store-error/setError', 'Chưa điền ngày sinh');
  //   }
  //   if (this.phone == null || this.phone === '') {
  //     this.iphone = true;
  //     this.$store.commit(
  //       'commons/store-error/setError',
  //       'Chưa điền số điện thoại'
  //     );
  //   }
  //   if (this.email == null || this.email === '') {
  //     this.iemail = true;
  //     this.$store.commit('commons/store-error/setError', 'Chưa điền email');
  //   }
  //   if (this.cccd == null || this.cccd === '') {
  //     this.icccd = true;
  //     this.$store.commit('commons/store-error/setError', 'Chưa điền số cccd');
  //   }
  //   if (this.city == null || this.city === '') {
  //     this.icity = true;
  //     this.$store.commit('commons/store-error/setError', 'Chưa chọn thành phố');
  //   }
  //   if (this.district == null || this.district === '') {
  //     this.idistrict = true;
  //     this.$store.commit(
  //       'commons/store-error/setError',
  //       'Chưa chọn quận, huyện'
  //     );
  //   }
  //   if (this.street == null || this.street === '') {
  //     this.istreet = true;
  //     this.$store.commit('commons/store-error/setError', 'Chưa chọn Phường, xã');
  //   }
  //   if (this.houseNumber == null || this.houseNumber === '') {
  //     this.ihouseNumber = true;
  //     this.$store.commit('commons/store-error/setError', 'Chưa điền địa chỉ');
  //   }
  //   if (this.filePortrait == null) {
  //     this.$store.commit(
  //       'commons/store-error/setError',
  //       'Chưa có ảnh chân dung'
  //     );
  //   }
  //   if (this.fileCitizenId == null) {
  //     this.$store.commit('commons/store-error/setError', 'Chưa có ảnh cccd');
  //   }
  // }
  checkValid() {
    const invalidFields: string[] = this.validateFields(this.requiredFields)

    if (invalidFields.length > 0) {
      const errorFields = invalidFields
        .map((field) => this.fieldLabels[field])
        .join(', ')
      const errorMessage = `Vui lòng điền thêm thông tin: ${errorFields}`
      this.$store.commit('commons/store-error/setError', errorMessage)
    }
  }
  validateFields(fields: string[]): string[] {
    const invalidFields: string[] = []
    this.errors = {}
    fields.forEach((field) => {
      console.log((this as any)[field])
      this.errors[field] = !(this as any)[field]
      if (!(this as any)[field]) {
        invalidFields.push(field)
      }
    })

    return invalidFields
  }
  isRequiredField(field: string): boolean {
    return this.requiredFields.includes(field)
  }
}
export default requestSeller
</script>
  
<style lang="sass" scoped>
.card-control
  display: block
  background: $white
  font-weight: 1
  font-size: 0.875rem
  line-height: 1
  color: #69707a
  background-clip: padding-box
  border: 1px solid #c5ccd6
  appearance: none
  border-radius: 0.35rem
.card-header
  padding: 1.2rem 1.35rem
  margin-bottom: 0
  background-color: rgba(33, 40, 50, 0.03)
  border-bottom: 1px solid rgba(33, 40, 50, 0.125)
.rounded-circle
  border-radius: 50% !important
.required
  color: red
  margin-left: 4px
</style>
                