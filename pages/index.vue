<template>
  <v-app light>
    <v-toolbar dark color="primary">
      <img src="~/static/logo.png" alt="Logo de la archidiócesis">
      <v-toolbar-title id="encabezado">
        <div>
          <span class="titulo">I</span>glesia en
          <span class="titulo">C</span>amino</div>
        <div>Semanario de la Archidiócesis de Mérida-Badajoz (España)</div>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-layout v-show="loading" column wrap py-5 my-5 align-center>
        <circle8 size="100px"></circle8>
      </v-layout>
      <span v-show="!loading">
        <v-layout column wrap class="mt-5 pt-3" align-center>
          <v-flex xs12 sm4 pt8 class="my-3">
            <div class="text-xs-center">
              <span class="headline">
                Diciembre de 1996 - {{currentYearMonth}} de {{currentYear}}
              </span>
            </div>
          </v-flex>
        </v-layout>

        <section>

          <a :href="currentPDF">
            <v-layout column align-center justify-center class="white--text">
              <div class="subheading mb-3 text-xs-center"></div>
              <img id="revista" class="my-4 py-4" :src="currentImage" height="768" alt="Última revista">
            </v-layout>
          </a>

        </section>

        <section>
          <v-layout row wrap class="pt-2" align-center>
            <v-flex xs12>
              <div class="text-xs-center">
                <span class="subheading">
                  Última revista:
                </span>
                <a :href="currentPDF">
                  <h2 class="headline">Número {{numberCurrentIssue}}, {{currentDay}} de {{currentYearMonth}} de {{currentYear}}</h2>
                </a>
              </div>
            </v-flex>

            <v-flex xs12 sm12 md12 lg12 xl12>
              <v-container fill-height grid-list-md>
                <v-layout row xs12 sm12 md12 lg12 xl12 id="revistero">
                  <v-flex xs12 md2 right class="revistas menu">
                    <v-navigation-drawer stateless value="true">
                      <v-list>
                        <v-list-tile>
                          <v-list-tile-title>Números anteriores</v-list-tile-title>
                        </v-list-tile>
                        <v-list-group v-for="year in years" :key="year" sub-group no-action :value="year===currentYear">
                          <v-list-tile slot="activator">
                            <v-list-tile-title>{{year}}</v-list-tile-title>
                          </v-list-tile>
                          <v-list-tile v-for="month in Object.keys(items[year]) " :key="month" v-on:click="switchMonth(month, year)">
                            <v-list-tile-content>
                              <v-list-tile-title v-text="month"></v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list-group>
                      </v-list>
                    </v-navigation-drawer>
                  </v-flex>

                  <v-flex xs12 md10 class="revistas" align-content-space-around>
                    <div class="headline">{{viewMonth}} de {{viewYear}}</div>
                    <v-layout wrap row>
                      <v-flex v-for="issue in  this.viewIssues" :key="issue" xs12 md4>
                        <v-card color="secondary" align-content-center>
                          <v-card-title color="primary" primary-title>
                            <div class="headline  primary--text">Número {{issue.slice(3, 7).replace(/^0+/, '')}}, {{issue.slice(8, 10).replace(/^0+/, '')}} de
                              {{viewMonth}} de {{viewYear}}</div>
                          </v-card-title>
                          <v-card-media :src="`${base}/${issue}.png`" height="400px" contain></v-card-media>
                          <v-card-actions>
                            <v-btn flat color="primary" :href="`${base}/${issue}.pdf`">Descargar</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                </v-layout>
              </v-container>
            </v-flex>
          </v-layout>
        </section>
      </span>

      <v-footer class="primary">
        <v-layout row wrap>
          <v-flex xs6>
            <div class="white--text  ml-1">
              Director:Juan José Montes
            </div>
          </v-flex>

          <v-flex xs6>
            <div class="white--text align-content-end">
              Correo Electrónico
              <a class="white--text" href="mailto:iglenca@meridabadajoz.es">iglenca@meridabadajoz.es</a>
            </div>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-content>
  </v-app>



</template>

<script>
  import Vue from 'vue'
  import Vuetify from 'vuetify'
  import 'babel-polyfill'
  import colors from 'vuetify/es5/util/colors'
  import escudo from '~/assets/escudo.png'
  import Circle8 from '~/components/Circle8'
  import axios from 'axios'
  Vue.use(Vuetify, {

  })

  export default {
    components: {
      Circle8
    },
    data: () => ({
      selection: [],
      items: {},
      escudo: escudo,
      base: 'http://www.meridabadajoz.net/iglesiaencamino',
      viewYear: null,
      viewMonth: null,
      viewIssues: [],
      loading: true
    }),

    mounted: function () {
      this.fetchItems()
    },
    methods: {
      async fetchItems() {
        this.items = await this.$axios.$get(`${this.base}/ic.json`)
        this.viewYear = this.currentYear
        this.viewMonth = this.currentYearMonth
        this.viewIssues = this.items[this.currentYear][this.currentYearMonth]
        this.loading = false
      },
      switchMonth: function (month, year) {
        this.viewYear = year
        this.viewMonth = month
        this.viewIssues = this.items[year][month]
      }
    },

    computed: {
      currentImage: function () {
        return `${this.base}/${this.currentIssue}.png`
      },
      currentPDF: function () {
        return `${this.base}/${this.currentIssue}.pdf`
      },
      years: function () {
        return Object.keys(this.items).reverse()
      },
      currentYear: function () {
        const years = Object.keys(this.items)
        return years.pop()
      },
      currentYearMonth: function () {
        if (Object.keys(this.items).length) {
          const months = Object.keys(this.items[this.currentYear])
          //this.computedMonth=months[0]
          return months[0]
        } else return null
      },
      currentIssue: function () {
        if (Object.keys(this.items).length) {
          const issues = this.items[this.currentYear][this.currentYearMonth]
          return issues[0]
        } else return null
      },
      numberCurrentIssue: function () {
        if (this.currentIssue) return this.currentIssue.slice(3, 7)
        else return null
      },
      currentDay: function () {
        if (this.currentIssue) {
          const datePart = this.currentIssue.slice(8, 10)
          return datePart
        } else return null
      }
    }
  }

</script>

<style>
  #encabezado {
    width: 100%;
    text-align: center;
    margin-left: -160px;

  }

  #revistero {
    min-height: 1150px;
  }

  .titulo {
    color: red;
  }

  #revista {
    -webkit-filter: drop-shadow(5px 5px 5px #222);
    filter: drop-shadow(5px 5px 5px #222);
    transform: rotate(-8deg);
  }

  .container {
    /* min-height: 100vh; */
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
    /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }

</style>
