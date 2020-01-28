<template>
  <div class="home">
    <h1 class="home__title text-center">
      Star Wars App
    </h1>

    <el-row>
      <el-col :span="8">
        <person-card />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PersonCard from '@/components/PersonCard.vue'

export default {
  name: 'Home',
  components: {
    PersonCard
  }
}
</script>

<style lang="scss" scoped>
.home {
  &__title {
    margin-bottom: 40px;
  }
}
</style>
