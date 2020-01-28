<template>
  <div class="home">
    <h1 class="home__title text-center">
      Star Wars App
    </h1>

    <el-row :gutter="20">
      <el-col
        :lg="6"
        :md="8"
        :sm="12"
        :xs="24"
        v-for="person in people"
        :key="person.url"
        class="home__person"
      >
        <person-card
          :name="person.name"
          :gender="person.gender"
          :height="person.height"
          :mass="person.mass"
        />
      </el-col>
    </el-row>

    <div class="home__pagination">
      <el-pagination
        :page-size="params.size"
        :page-count="params.currentPage"
        :total="params.count"
        background
        clas="home__pagination"
        layout="prev, pager, next"
      />
    </div>
  </div>
</template>

<script>
import People from '../api/people'
import PersonCard from '@/components/PersonCard.vue'

export default {
  name: 'Home',
  components: {
    PersonCard
  },
  data () {
    return {
      people: [],
      params: {
        size: 10,
        count: 100,
        currentPage: 2
      }
    }
  },
  async mounted () {
    const { results } = await People.getAll({ page: 1 })
    this.people = results
  }
}
</script>

<style lang="scss" scoped>
.home {
  &__title {
    margin-bottom: 40px;
  }

  &__person {
    margin-bottom: 20px;
  }

  &__pagination {
    display: flex;
    justify-content: center;
  }
}
</style>
