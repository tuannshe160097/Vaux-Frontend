<template>
  <div class="info-box info-box-primary" :style="{ 'background': sBg }" v-if="value !== undefined && value!==null">
    <span class="info-box-icon info-box-icon-primary" :style="{ 'background': sBgIcon }">
      <div class="icon icon--xlarge bg-white" :class="`icon-${iconNm}`"></div>
    </span>
    <div class="info-box-content">
      <div class="info-box-text">{{ title }}</div>
      <div class="info-box-number">
        <div>{{ value }}</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>

import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
class AccountItemValue extends Vue {
  @Prop() readonly title!: string
  @Prop() readonly value!: number
  @Prop() readonly iconNm!: string
  @Prop() readonly sBg!: string
  @Prop() readonly sBgIcon!: string
}

export default AccountItemValue
</script>

<style lang="sass" scoped>
.info-box
  margin-bottom: 0

.info-box
  display: block
  min-height: 70px
  width: 100%
  box-shadow: 0 1px 1px rgba(0,0,0,.1)
  border-radius: 5px
  margin-bottom: 15px
  color: #fff

.info-box-icon
  border-radius: 5px 0 0 5px
  display: flex
  justify-content: center
  align-items: center
  float: left
  height: 70px
  width: 70px
  text-align: center
  line-height: 70px
  color: #fff

.info-box-content
  padding: 5px 10px
  margin-left: 70px

.info-box-text
  display: block
  font-size: 14px
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  text-transform: uppercase

.info-box-number
  display: block
  font-weight: 500
  font-size: 21px

.info-box-icon>* 
  font-size: 45px

</style>
