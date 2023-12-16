// View User Detail
<template>
  <div class="box-page-container flex flex-column">
    <div class="header flex justify-content-between container">
      <div class="col-fixed">
        <h2 class="font-bold m-0 text-uppercase">Thông tin người dùng</h2>
      </div>
      <div class="col-fixed">
        <div class="grid align-content-center">
          <!-- <div class="col-fixed">
            <Button class="w-9rem h-3rem" type="button" label="Thêm Mới" @click="onAddNew()"></Button>
                    </div> -->
        </div>
      </div>
    </div>

    <div class="card-body">
      <div class="col-fixed grid">
        <div class="md:col-8 sm:col-12">
          <div class="card-control card">
            <div class="card-header justify-content-between flex align-items-center"
              style="padding: 0.8rem 1.5rem !important">
              <div class="title text-xl flex">
                <span>Thông tin tài khoản</span>
              </div>
              <div class="card-action">
                <label class="text-normal">Quyền hạn<span class="text-danger">*</span>:</label>
                <Tag class="px-2 " v-if="curUserRoleId == '1'" severity="warning" value="Quản trị viên">
                </Tag>
                <Tag class="px-2 " v-else-if="curUserRoleId == '2'" severity="success" value="Quản lý">
                </Tag>
                <Tag class="px-2 " v-else-if="curUserRoleId == '3'" severity="success" value="Kiểm định viên">
                </Tag>
                <Tag class="px-2 " v-else-if="curUserRoleId == '4'" severity="warning" value="Người bán">
                </Tag>
                <Tag class="px-2 " v-else-if="curUserRoleId == '5'" severity="info" value="Người mua">
                </Tag>
                <Tag class="px-2 " v-else severity="info" :value="curUserRoleId">
                </Tag>
              </div>
            </div>
            <div class="p-4 grid formgrid">
              <div class="field col-6">
                <label>Tên</label>
                <InputText class="w-100" type="text" v-model="name" disabled />
              </div>
              <div class="field col-6">
                <label>Số điện thoại</label>
                <InputText class="w-100" type="text" v-model="phone" disabled />
              </div>
              <div class="field col-6">
                <label>Email</label>
                <InputText class="w-100" type="text" v-model="email" disabled />
              </div>
              <div class="field col-6">
                <label>Số CCCD</label>
                <InputText class="w-100" type="text" v-model="cccd" disabled />
              </div>
              <div class="field col-6">
                <label>Giới tính</label>
                <Dropdown class="w-100" v-model="gender" :options="oGenders" optionLabel="name" optionValue="value"
                  disabled />
              </div>
              <div class="field col-6">
                <label>Ngày sinh</label>
                <Calendar class="w-100" v-model="dob" dateFormat="dd-mm-yy" disabled :maxDate="new Date()" />
              </div>
              <div class="field col-4">
                <label>Thành phố</label>
                <!-- <InputText class="w-100" type="text" v-model="city" /> -->
                <Dropdown class="w-100 line-height-1" v-model="selectedCity" :options="oCitys" :filter="true"
                  filterPlaceholder="Tìm kiếm" optionLabel="name" placeholder="-Chọn Thành phố-" @change="onSelectCity()"
                  disabled />
              </div>
              <div class="field col-4">
                <label>Quận, huyện</label>
                <!-- <InputText class="w-100" type="text" v-model="district" /> -->
                <Dropdown class="w-100 line-height-1" v-model="selectedDistrict" :options="oDistricts" :filter="true"
                  filterPlaceholder="Tìm kiếm" optionLabel="name" placeholder="-Chọn Quận/Huyện-" @change="getStreet()"
                  disabled />
              </div>
              <div class="field col-4">
                <label>Phường, xã</label>
                <!-- <InputText class="w-100" type="text" v-model="street" /> -->
                <Dropdown class="w-100 line-height-1" v-model="street" :options="oStreets" :filter="true"
                  filterPlaceholder="Tìm kiếm" optionLabel="name" placeholder="-Chọn Phố/Phường-" optionValue="value"
                  disabled />
              </div>
              <div class="field col-12">
                <label>Địa chỉ</label>
                <InputText class="w-100" type="text" v-model="houseNumber" disabled />
              </div>

              <div class="field col-4">
                <label>Ngày tạo</label>
                <InputText class="w-100" type="text" v-model="dateCreated" disabled />
              </div>
              <div class="field col-4">
                <label>Ngày cập nhật</label>
                <InputText class="w-100" type="text" v-model="dateUpdated" disabled />
              </div>
              <div class="field col-4">
                <label>Ngày cấm</label>
                <InputText class="w-100" type="text" v-model="dateDeleted" disabled />
              </div>
              <div class="field col-12 justify-content-center flex">
                <div v-if="displayButton" class="field"><Button label="Sửa" @click="Edit()" /></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card-control">
            <div class="card-header font-medium text-xl">Ảnh chân dung</div>
            <div class="p-5 text-center">
              <ImagePreview
                :src="portraitUrl || 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'"
                alt="Image" class="wm-100" preview imageStyle="width: 100%" />
            </div>
          </div>
          <div class="card-control mt-3">
            <div class="card-header font-medium text-xl">Ảnh CCCD</div>
            <div class="p-5 text-center">
              <ImagePreview
                :src="citizenIdUrl || 'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'"
                alt="Image" class="wm-100" preview imageStyle="width: 100%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script lang="ts" >
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { GENDER_OPTION, ROLE_OPTION_ADMIN, ROLE_OPTION_MOD } from '~/utils'
import { Option } from '~/models/Option'
const nsStoreUser = namespace('user/store-user')
const nsStoreAddress = namespace('address/store-address')

@Component({
  middleware: ['authenticate'],
  layout: 'admin',
})
class ViewUser extends Vue {
  name: string = ''
  phone: string = ''
  email: string = ''
  cccd: string = ''
  role: string = ''
  houseNumber: string = ''
  city: string = ''
  district: string = ''
  street: string = ''
  dob: string = ''
  gender: any = 'MALE'
  dateCreated: string = ''
  dateUpdated: string = ''
  dateDeleted: string = ''
  curUserId: string = ''
  curUserRoleId: any
  portraitUrl: string = ''
  citizenIdUrl: string = ''

  oGenders = GENDER_OPTION
  oRoles: any = null
  selectedCity: Option.Option | null = null
  selectedDistrict: Option.Option | null = null
  selectedStreet: Option.Option | null = null
  option: Option.Option | undefined
  oCitys: Option.Option[] = []
  oDistricts: Option.Option[] = []
  oStreets: Option.Option[] = []

  displayButton: boolean = true

  @nsStoreUser.Action
  actGetUser!: (params: { userId: string }) => Promise<any>
  @nsStoreAddress.Action
  actGetCity!: () => Promise<string>
  @nsStoreAddress.Action
  actGetDistrict!: (params: any) => Promise<string>
  @nsStoreAddress.Action
  actGetStreet!: (params: any) => Promise<string>
  @nsStoreUser.Action
  actGetUserImage!: (params: any) => Promise<any>

  async mounted() {
    this.fetchData()
    const role = this.$cookies.get('auth.role')
    if (role == 1) {
      this.displayButton = false
    }
    await this.GetCity()
    await this.getDistrict()
    await this.getStreet()
  }
  async fetchData() {
    const userId = Array.isArray(this.$route.query.userId)
      ? this.$route.query.userId[0]
      : this.$route.query.userId
    if (userId) {
      this.curUserId = userId
      const params = {
        userId: userId || '',
      }
      const result = await this.actGetUser(params)
      console.log(result)
      this.name = result.name
      this.phone = result.phone
      this.email = result.email
      this.cccd = result.citizenId
      this.houseNumber = result.houseNumber
      this.street = result.street
      this.district = result.district
      this.city = result.city
      this.dob = this.formatDate(result.doB)
      this.role = result.role.title
      this.curUserRoleId = result.role.id
      this.dateCreated = this.formatDate(result.created)
      this.dateUpdated = this.formatDate(result.updated)
      this.dateDeleted = result.deleted ? this.formatDate(result.deleted) : ''
      this.portraitUrl = await this.getImageUrl(result.portraitId, this.curUserId)
      this.citizenIdUrl = await this.getImageUrl(result.citizenIdImageId, this.curUserId)
    }
  }
  async getImageUrl(imgId: any, userId: any): Promise<any> {
    try {
      if (imgId == null || userId == null) return ''
      const response = await this.actGetUserImage({ imageId: imgId, userId: userId });
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          const base64Image = reader.result;
          resolve(base64Image);
        };
      });
    } catch (error) {
      console.error("Error fetching or converting image:", error);
      return null;
    }
  }
  formatDate(dateString: string) {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  Edit() {
    let url = '/admin/user/detail?userId=' + this.curUserId
    if (this.curUserRoleId == 5) url + '&subject=ADM'
    else if (this.curUserRoleId == 1) url + '&subject=MOD'
    else if (this.curUserRoleId == 2) url + '&subject=EXP'
    this.$router.push(url)
  }

  async GetCity() {
    const response: any = await this.actGetCity()
    this.oCitys = response.map((city: any) => ({
      id: city.code,
      name: city.name,
      value: city.codename,
    }))
    this.selectedCity =
      this.oCitys.find((city) => city.value === this.city) || null
  }
  async getDistrict() {
    if (this.selectedCity == undefined || this.selectedCity == null) return
    this.city = this.selectedCity.value
    const response: any = await this.actGetDistrict({
      cityId: this.selectedCity?.id,
    })
    this.oDistricts = response.districts.map((district: any) => ({
      id: district.code,
      name: district.name,
      value: district.codename,
    }))
    this.selectedDistrict =
      this.oDistricts.find((district) => district.value === this.district) ||
      null
  }
  async getStreet() {
    if (this.selectedDistrict == undefined || this.selectedDistrict == null)
      return
    this.district = this.selectedDistrict.value
    const response: any = await this.actGetStreet({
      districtId: this.selectedDistrict?.id,
    })
    this.oStreets = response.wards.map((street: any) => ({
      id: street.code,
      name: street.name,
      value: street.codename,
    }))
    this.selectedStreet =
      this.oStreets.find((street) => street.value === this.street) || null
  }
  onSelectCity() {
    this.district = ''
    this.street = ''
    this.oStreets = []
    this.getDistrict()
  }
}
export default ViewUser
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
</style>
            