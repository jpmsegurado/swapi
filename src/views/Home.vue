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

    <el-row class="home__search">
      <el-col :md="8" :sm="12" :offset-sm="12">
        <el-input v-model="search" @change="onSearchChange" placeholder="What do you want to search?">
          <el-button slot="append" icon="el-icon-search" />
        </el-input>
      </el-col>
    </el-row>

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

      <el-col :span="24">
        <div v-if="people.length === 0 && !loading" class="home__empty-state">
          No result found
        </div>
      </el-col>
    </el-row>

    <div v-if="people.length > 0 && !loading" class="home__pagination">
      <el-pagination
        :page-size="params.size"
        :current-page="params.currentPage"
        :total="params.count"
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
      search: '',
      loading: true,
      params: {
        size: 10,
        count: 0,
        currentPage: 2
      }
    }
  },
  async mounted () {
    const page = parseInt(this.$route.query.page) || 1
    const search = this.$route.query.search
    await this.loadPeople({ page, search })
    this.params.currentPage = page
    this.search = search
  },
  methods: {
    async loadPeople ({ page, search }) {
      this.loading = true

      const params = { page }
      if (search) { params.search = search }

      const { results, count } = await People.getAll(params)
      this.people = results
      this.params.count = count
      this.loading = false
    },
    async onCurrentChange (page) {
      this.params.currentPage = page
      await this.loadPeople({ page, search: this.search })
      this.$router.push({ name: 'home', query: { page, search: this.search } })
    },
    async onSearchChange (search) {
      const page = this.params.currentPage = 1
      await this.loadPeople({ page, search })
      this.$router.push({ name: 'home', query: { page, search } })
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

  &__search {
    margin-bottom: 20px;
  }

  &__person {
    margin-bottom: 20px;
  }

  &__pagination {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  &__empty-state {
    text-align: center;
    padding: 100px 0;
  }
}
</style>
