import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home'
import mock from '@/api/mock'
import People from '@/api/people'

const $route = {
  query: {}
}

const $router = {
  push: jest.fn()
}

People.getAll = jest.fn().mockResolvedValue(mock)

function setup () {
  return shallowMount(Home, {
    stubs: {
      'el-row': true,
      'el-col': true,
      'el-button': true,
      'el-input': true,
      'el-pagination': true
    },
    mocks: {
      $route,
      $router
    },
    directives: {
      loading () {
        return true
      }
    }
  })
}

describe('Home', () => {
  let wrapper

  beforeEach(() => {
    wrapper = setup()
  })

  describe('#render', () => {
    it('renders correctly', () => {
      const wrapper = setup()
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('#computed', () => {
    beforeEach(() => {
      wrapper = setup()
    })

    describe('#showPagination', () => {
      it('when array of people is not empty and loading is false it returns true', () => {
        wrapper.setData({ people: [...mock.results], loading: false })
        expect(wrapper.vm.showPagination).toBe(true)
      })
    })

    describe('#showEmptyState', () => {
      it('when array of people is empty and loading is false it returns true', () => {
        wrapper.setData({ people: [], loading: false })
        expect(wrapper.vm.showEmptyState).toBe(true)
      })
    })
  })

  describe('#methods', () => {
    beforeEach(() => {
      wrapper = setup()
    })

    describe('#loadPeople', () => {
      it('when called without search it calls People.getAll with only page param', () => {
        wrapper.vm.loadPeople({ page: 1 })
        expect(People.getAll).toHaveBeenCalledWith({ page: 1 })
      })

      it('when called with search it calls People.getAll with page and search param', () => {
        wrapper.vm.loadPeople({ page: 1, search: 'luke' })
        expect(People.getAll).toHaveBeenCalledWith({ page: 1, search: 'luke' })
      })
    })

    describe('#onCurrentChange', () => {
      it('when called it calls loadPeople with page and search', () => {
        wrapper.setMethods({ loadPeople: jest.fn() })
        wrapper.vm.onCurrentChange(2)
        expect(wrapper.vm.loadPeople).toHaveBeenCalledWith({ page: 2, search: '' })
      })

      it('when called it calls $router.push with page and search', () => {
        wrapper.vm.onCurrentChange(2)
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'home', query: { page: 2 } })
      })
    })

    describe('#onSearchChange', () => {
      it('when called it calls loadPeople with page and search', () => {
        wrapper.setMethods({ loadPeople: jest.fn() })
        wrapper.vm.onSearchChange('luke')
        expect(wrapper.vm.loadPeople).toHaveBeenCalledWith({ page: 1, search: 'luke' })
      })
    })
  })

  describe('#mounted', () => {
    it('when called it fills the people array', async () => {
      wrapper.vm.$route.query.page = 2
      wrapper.vm.$route.query.search = 'luke'
      await Home.mounted.call(wrapper.vm)
      expect(wrapper.vm.search).toEqual('luke')
    })
  })
})
