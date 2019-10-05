'use strict';

const store = new Vuex.Store({
  state: {
    showModal: false
  },
  mutations: {
    showModal: state => state.showModal = !state.showModal,
  },
  actions: {
    showModal: ({commit}) => commit('showModal')
  }
});

const modalComponent = {
  template: `
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <slot name="header">
                Default header
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                Default body
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                Default footer
                <button
                  class="modal-default-button"
                  @click="$emit('close')">
                  Ok
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>

  `
}

const modal = new Vue({
  el: '#app',
  store,
  computed: Vuex.mapState({
    modal: state => state.showModal,
  }),
  methods: Vuex.mapActions([
    'showModal'
  ]),
  components: {
    'modalComponent': modalComponent
  },
  template: `
    <div id="app">
      <button
        id="show-modal"
        @click="showModal()">
        Show Modal
      </button>
      <modalComponent v-if="modal" @close="showModal()">
        <h3 slot="header">Custom header</h3>
      </modalComponent>
    </div>
  `
})