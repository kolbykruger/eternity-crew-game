import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        correct: 0,
        incorrect: 0,
        count: 1,
        total: 0
    },
    mutations: {
        incrementCorrect(state) {
            state.correct++
        },
        incrementIncorrect(state) {
            state.incorrect++
        },
        incrementCount(state) {
            state.count++
        }
    }
})
export default store
