import Vue from 'vue/dist/vue.esm'
import TurbolinksAdapter from 'vue-turbolinks'
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.use(TurbolinksAdapter);

document.addEventListener('turbolinks:load', () => {
  Vue.http.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

  var element = document.getElementById("team-form")

  if (element != null){

    var team = JSON.parse(element.dataset.team)
    var players_attributes = JSON.parse(element.dataset.playersAttributes)
    players_attributes.forEach(function(player) { player._destroy = null })
    team.players_attributes = players_attributes

    var app = new Vue({
      el: element,
      data: function() {
        return { team: team }
      },
      methods: {
        addPlayer: function() {
          team.players_attributes.push({
            id: null,
            name: "",
            // position: "",
            _destroy: null
          })
        },

        removePlayer: function(index) {
          this.team.players_attributes.splice(index, 1)
        }
      }
    });
  }
})
