import { shallowMount } from '@vue/test-utils'
import MockAdapter from 'axios-mock-adapter'
import client from '@/client'
import { person } from '@/api/mock'
import Person from '@/views/Person'
import People from '@/api/people'

const adapter = new MockAdapter(client)

const $route = {
  params: {
    id: 2
  }
}

adapter.onGet('/people/' + $route.params.id).reply(200, person)

function setup () {
  return shallowMount(Person, {
    mocks: {
      $route
    },
    directives: {
      loading () {
        return true
      }
    }
  })
}

describe('Person', () => {
  let wrapper

  describe('#render', () => {
    it('renders correcly', () => {
      const wrapper = setup()
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('#computed', () => {
    beforeEach(() => {
      wrapper = setup()
    })

    describe('#films', () => {
      it('return two films titles separated by commas', () => {
        wrapper.setData({ person })
        expect(wrapper.vm.films).toBe('A New Hope, Rise of skywalker')
      })
    })

    describe('#species', () => {
      it('return two species separated by commas', () => {
        wrapper.setData({ person })
        expect(wrapper.vm.species).toBe('Robot, Droid')
      })
    })

    describe('#vehicles', () => {
      it('return two vehicles separated by commas', () => {
        wrapper.setData({ person })
        expect(wrapper.vm.vehicles).toBe('Falcon, X-wing')
      })
    })

    describe('#starships', () => {
      it('return two starships separated by commas', () => {
        wrapper.setData({ person })
        expect(wrapper.vm.starships).toBe('Falcon, X-wing')
      })
    })
  })

  describe('#methods', () => {
    beforeEach(() => {
      wrapper = setup()
    })

    describe('#loadWorld', () => {
      it('when called it calls client.get', () => {
        const spy = jest.spyOn(client, 'get')
        wrapper.vm.loadWorld('swapi.com')
        expect(spy).toHaveBeenCalled()
      })

      it('when called it sets person homeworld', async () => {
        const response = { name: 'tatooine' }
        adapter.onGet('swapi.com').reply(200, response)
        await wrapper.vm.loadWorld('swapi.com')
        expect(wrapper.vm.person.homeworld).toEqual({ name: 'tatooine' })
      })
    })

    describe('#loadFilms', () => {
      it('when called it sets person films', async () => {
        await wrapper.vm.loadFilms([])
        const films = []
        expect(wrapper.vm.person.films).toEqual(films)
      })

      it('when called with no urls it sets person films to empty array', async () => {
        const response = { name: 'film 1' }
        adapter.onGet('swapi.com').reply(200, response)
        await wrapper.vm.loadFilms(['swapi.com', 'swapi.com'])
        const films = [response, response]
        expect(wrapper.vm.person.films).toEqual(films)
      })
    })

    describe('#loadSpecies', () => {
      it('when called it sets person species', async () => {
        await wrapper.vm.loadSpecies([])
        const species = []
        expect(wrapper.vm.person.species).toEqual(species)
      })

      it('when called with no urls it sets person species to empty array', async () => {
        const response = { name: 'specie 1' }
        adapter.onGet('swapi.com').reply(200, response)
        await wrapper.vm.loadSpecies(['swapi.com', 'swapi.com'])
        const species = [response, response]
        expect(wrapper.vm.person.species).toEqual(species)
      })
    })

    describe('#loadVehicles', () => {
      it('when called it sets person vehicles', async () => {
        await wrapper.vm.loadVehicles([])
        const vehicles = []
        expect(wrapper.vm.person.vehicles).toEqual(vehicles)
      })

      it('when called with no urls it sets person vehicles to empty array', async () => {
        const response = { name: 'vehicle 1' }
        adapter.onGet('swapi.com').reply(200, response)
        await wrapper.vm.loadVehicles(['swapi.com', 'swapi.com'])
        const vehicles = [response, response]
        expect(wrapper.vm.person.vehicles).toEqual(vehicles)
      })
    })

    describe('#loadStarships', () => {
      it('when called it sets person starships', async () => {
        await wrapper.vm.loadStarships([])
        const starships = []
        expect(wrapper.vm.person.starships).toEqual(starships)
      })

      it('when called with no urls it sets person starships to empty array', async () => {
        const response = { name: 'starship 1' }
        adapter.onGet('swapi.com').reply(200, response)
        await wrapper.vm.loadStarships(['swapi.com', 'swapi.com'])
        const starships = [response, response]
        expect(wrapper.vm.person.starships).toEqual(starships)
      })
    })
  })

  describe('#mounted', () => {
    beforeEach(() => {
      wrapper = setup()
    })

    it('when called it sets person', async () => {
      wrapper.setMethods({
        loadWorld: jest.fn().mockResolvedValue({}),
        loadFilms: jest.fn().mockResolvedValue({}),
        loadSpecies: jest.fn().mockResolvedValue({}),
        loadStarships: jest.fn().mockResolvedValue({})
      })
      People.get = jest.fn().mockResolvedValue(person)
      await Person.mounted.call(wrapper.vm)
      expect(wrapper.vm.person).toBe(person)
    })
  })
})
