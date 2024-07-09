<template>
  <el-carousel trigger="hover" height="180px">
    <el-carousel-item v-for="(img, index) in images" :key="index">
      <img :src="img" alt="Swiper Image" style="width: 100%; height: 100%; object-fit: cover;">
    </el-carousel-item>
  </el-carousel>
</template>



<script>
import {ElCarousel, ElCarouselItem} from "element-plus";
import {ref} from "vue";
import swiper1 from "../assets/swiper1.jpg";
import swiper2 from "../assets/swiper2.jpg";
import swiper3 from "../assets/swiper3.png";



export default {
  name: "Swiper",
  components: {
    ElCarousel,
    ElCarouselItem
  },
  setup(){
    const images = ref([swiper1, swiper2, swiper3]);
    return {images};
  }
}
</script>

<style scoped>

</style>