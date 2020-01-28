<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="home"
  >
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
          :image="person.image"
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
        @next-click="onNextClick"
        @prev-click="onPrevClick"
        @current-change="onCurrentChange"
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
      loading: true,
      params: {
        size: 10,
        count: 0,
        currentPage: 2
      }
    }
  },
  mounted () {
    this.loadPeople()
  },
  methods: {
    async loadPeople (page = 1) {
      this.loading = true
      const { results, count } = await People.getAll({ page })
      this.people = results
      this.params.count = count
      this.loading = false
    },
    onNextClick () {
      this.params.currentPage += 1
      this.loadPeople(this.params.currentPage)
    },
    onPrevClick () {
      this.params.currentPage -= 1
      this.loadPeople(this.params.currentPage)
    },
    onCurrentChange (params) {
      this.params.currentPage = params
      this.loadPeople(this.params.currentPage)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
  width: 100%;
  height: 100%;

  &__title {
    width: 100%;
    margin-bottom: 40px;
  }

  &__person {
    margin-bottom: 20px;
  }

  &__pagination {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
