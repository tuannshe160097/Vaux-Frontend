// About
<template>
    <div class="userdetails-page-container flex flex-column">
        <h3>Thông tin của chúng tôi</h3>
        <div class="grid">
            <div class="col-6">
                <div class="card-control"><img class="img" :src="require('assets/images/2021010623546_04950.png')" alt="" />
                </div>
            </div>
            <div class="col-6">
                <div class="card-control" style="font-size: 17px;">
                    <div class="card-body p-5">
                        <label>Catawiki is the most-visited curated marketplace in Europe for special objects, offering over
                            65,000 objects for auction each week. Our mission is to provide an exciting and seamless
                            experience to our customers for buying and selling special, hard-to-find objects.
                            <Founded>in 2008 with a mission to make special objects more accessible, Catawiki now offers
                                over 600 auctions each week, across multiple categories such as collectables, art, design,
                                jewellery, watches, classic cars and more.</Founded>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
        
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'


@Component
class about extends Vue {

}
export default about
</script>

<style lang="sass" scoped>

</style>
              