import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home'

const $route = {
  query: {}
}

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
      $route
    }
  })
}

describe('Home', () => {
  describe('#render', () => {
    it('renders correctly', () => {
      const wrapper = setup()
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
