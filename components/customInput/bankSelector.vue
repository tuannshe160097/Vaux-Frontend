<!-- <template>
  <Dropdown v-model="selectedCountry" :options="countries" optionLabel="name" :filter="true"
    placeholder="Select a Country" :showClear="true">
    <template #value="slotProps">
      <div class="country-item country-item-value" v-if="slotProps.value">
        <img src="../../assets/images/flag_placeholder.png" :class="'flag flag-' + slotProps.value.code.toLowerCase()" />
        <div>{{ slotProps.value.name }}</div>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <div class="country-item">
        <img src="../../assets/images/flag_placeholder.png" :class="'flag flag-' + slotProps.option.code.toLowerCase()" />
        <div>{{ slotProps.option.name }}</div>
      </div>
    </template>
  </Dropdown>
</template>
  
<script lang="ts">
import { Component, Vue, Prop, namespace, Watch } from 'nuxt-property-decorator'
import { User } from '~/models/User'
const nsStoreBank = namespace('bank/store-bank')
import * as signalR from "@microsoft/signalr"

@Component
class BidDialog extends Vue {
  countries: any
  selectedCountry: any[] = []
  @Prop() selected!: string;


  @nsStoreBank.Action
  actGetStreet!: (params: any) => Promise<string>
  mounted() {

  }
}
export default BidDialog
</script>
  
<style lang="sass" scoped>

  </style> -->