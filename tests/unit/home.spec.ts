import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import config from '@/config.json'
describe('Test Site', () => {
  it('Rendering Site', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.find('h1').text()).to.equal(config.home.title)
  })
})
