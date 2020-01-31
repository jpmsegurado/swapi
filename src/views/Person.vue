<template>
  <div
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    class="person"
  >
    <div class="person__profile">
      <div class="person__profile__image">
        <img :src="person.image">
      </div>

      <h2 class="person__profile__name">
        {{ person.name }}
      </h2>

      <p class="person__profile__field">
        Birth Year: <strong>{{ person.birth_year }}</strong>
      </p>

      <p class="person__profile__field">
        Eye color: <strong>{{ person.eye_color }}</strong>
      </p>

      <p class="person__profile__field">
        Gender: <strong>{{ person.gender }}</strong>
      </p>

      <p class="person__profile__field">
        Hair color: <strong>{{ person.hair_color }}</strong>
      </p>

      <p class="person__profile__field">
        Height: <strong>{{ person.height }}cm</strong>
      </p>

      <p class="person__profile__field">
        Mass: <strong>{{ person.mass }}kg</strong>
      </p>

      <p class="person__profile__field">
        Skin color: <strong>{{ person.skin_color }}</strong>
      </p>
    </div>

    <div v-if="!loading" class="person__content">
      <div class="person__content__section">
        <h2>Species</h2>
        <p v-for="specie in person.species" :key="specie.url">
          {{ species }}
        </p>
      </div>

      <div class="person__content__section">
        <h2>Homeworld</h2>
        <p>{{ person.homeworld.name }}</p>
      </div>

      <div class="person__content__section">
        <h2>Films</h2>
        <p>
          {{ films }}
        </p>
      </div>

      <div class="person__content__section">
        <h2>Vehicles</h2>
        <p>
          {{ vehicles.length > 2 ? vehicles : 'No Vehicles' }}
        </p>
      </div>

      <div class="person__content__section">
        <h2>Starship</h2>
        <p>
          {{ starships.length > 2 ? starships : 'No Starships' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import client from '../client'
import People from '@/api/people'

export default {
  data () {
    return {
      loading: true,
      person: {}
    }
  },
  computed: {
    films () {
      return this.person.films.map(film => film.title).join(', ')
    },
    species () {
      return this.person.species.map(specie => specie.name).join(', ')
    },
    vehicles () {
      return this.person.vehicles.map(vehicle => vehicle.name).join(', ')
    },
    starships () {
      return this.person.starships.map(starship => starship.name).join(', ')
    }
  },
  async mounted () {
    this.person = await People.get(this.$route.params.id)
    await this.loadWorld(this.person.homeworld)
    await this.loadFilms(this.person.films)
    await this.loadSpecies(this.person.species)
    await this.loadStarships(this.person.starships)
    this.loading = false
  },
  methods: {
    async loadWorld (url) {
      const response = await client.get(url)
      this.person.homeworld = response.data
    },
    async loadFilms (filmsUrl) {
      if (filmsUrl.length === 0) { this.person.films = [] }

      const films = await Promise.all(filmsUrl.map(async (url) => {
        const response = await client.get(url)
        const film = response.data
        return film
      }))

      this.person.films = films
    },
    async loadSpecies (speciesUrl) {
      if (speciesUrl.length === 0) { this.person.species = [] }

      const species = await Promise.all(speciesUrl.map(async (url) => {
        const response = await client.get(url)
        const specie = response.data
        return specie
      }))

      this.person.species = species
    },
    async loadVehicles (vehiclesUrl) {
      if (vehiclesUrl.length === 0) { this.person.vehicles = [] }

      const vehicles = await Promise.all(vehiclesUrl.map(async (url) => {
        const response = await client.get(url)
        const vehicle = response.data
        return vehicle
      }))

      this.person.vehicles = vehicles
    },
    async loadStarships (starshipsUrl) {
      if (starshipsUrl.length === 0) { this.person.starships = [] }

      const starships = await Promise.all(starshipsUrl.map(async (url) => {
        const response = await client.get(url)
        const starship = response.data
        return starship
      }))

      this.person.starships = starships
    }
  }
}
</script>

<style lang="scss" scoped>
.person {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 20px 0;

  &__profile {
    width: 300px;
    padding: 20px;
    box-sizing: border-box;
    border-right: solid 1px rgba(255, 255, 255, 0.1);

    &__field {
      margin-top: 10px;
    }

    &__image {
      overflow: hidden;
      width: 250px;
      height: 250px;
      border-radius: 50%;
      margin: 0 auto;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__name {
      margin: 20px 0;
    }
  }

  &__content {
    width: calc(100% - 300px);
    padding: 20px;

    &__section {
      margin-bottom: 20px;

      h2 {
        margin-bottom: 10px;
      }

      p {
        margin-top: 10px;
        line-height: 25px;
      }
    }
  }
}

@media (max-width: $screen-sm) {
  .person {
    flex-wrap: wrap;

    &__profile {
      width: 100%;
      border: 0;
    }

    &__content {
      width: 100%;
    }
  }
}
</style>
