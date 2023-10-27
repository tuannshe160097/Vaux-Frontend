// About
<template lang="pug">
.userdetails-page-container.flex.flex-column
    h3 Thông tin của chúng tôi
    .grid
        .col-6
          .card-control
            img.img(:src="require('assets/images/2021010623546_04950.png')" alt='' )
        .col-6
          .card-control(style="font-size: 17px;")
            .card-body.p-5
              label Catawiki is the most-visited curated marketplace in Europe for special objects, offering over 65,000 objects for auction each week. Our mission is to provide an exciting and seamless experience to our customers for buying and selling special, hard-to-find objects.
                   Founded in 2008 with a mission to make special objects more accessible, Catawiki now offers over 600 auctions each week, across multiple categories such as collectables, art, design, jewellery, watches, classic cars and more.

</template>
        
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'


@Component
class about extends Vue {

}
export default about
</script>

<style lang="sass" scoped>
.card-control
  display: block
  background: $color-white
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

.img
  width: 590px
  height: 590px


</style>
              