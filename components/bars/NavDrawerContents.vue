<template>
  <div>
    <div
      style="font-size: 0.86rem; display: flex"
      class="text--secondary px-4 pt-2 pb-2"
    >
      <span class="mr-auto">Feeds</span>
      <nuxt-link to="/planets/explore" class="primary--text"
        >Explore Planets</nuxt-link
      >
    </div>
    <v-list class="py-0">
      <v-list-item
        active-class="linkactive"
        class="text--primary"
        dense
        nuxt
        to="/"
        title="Posts from Planets I have joined"
        @click="$emit('selected')"
      >
        <v-list-item-avatar size="24">
          <v-icon size="20">{{ $vuetify.icons.values.mdiEarth }}</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title style="font-size: 1rem"
            >My Planets</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        active-class="linkactive"
        class="text--primary"
        dense
        nuxt
        to="/universe"
        title="Posts from every Planet"
        @click="$emit('selected')"
      >
        <v-list-item-avatar size="24">
          <v-icon size="20">{{ $vuetify.icons.values.mdiInfinity }}</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title style="font-size: 1rem"
            >Universe</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item dense @click="showGalaxies = !showGalaxies">
        <v-list-item-avatar size="24">
          <v-icon size="20">{{
            showGalaxies
              ? $vuetify.icons.values.mdiChevronUp
              : $vuetify.icons.values.mdiChevronDown
          }}</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title style="font-size: 1rem"
            >Galaxies</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-expand-transition>
      <div v-show="showGalaxies">
        <v-list class="py-0">
          <v-list-item
            v-for="galaxy in galaxies"
            :key="galaxy.name"
            active-class="linkactive"
            class="text--primary pl-8"
            dense
            nuxt
            :to="`/g/${galaxy.name}`"
            @click="$emit('selected')"
          >
            <v-list-item-avatar size="24">
              <v-icon size="20">{{
                $vuetify.icons.values[galaxy.icon]
              }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                style="font-size: 1rem; white-space: normal; line-height: 1.5"
                >{{ galaxy.fullName }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>

    <div
      v-if="joinedPlanets.length > 0"
      style="font-size: 0.86rem"
      class="text--secondary px-4 pt-4 pb-2"
    >
      My Planets
    </div>

    <!--<v-text-field
      solo
      flat
      dense
      label="Filter"
      hide-details
      class="mx-2 mb-2"
      style="height: 34px"
    />-->

    <v-list class="py-0">
      <PlanetListItem
        v-for="planet in joinedPlanets"
        :key="planet.name"
        :planet="planet"
      />
    </v-list>

    <div v-if="$device.isDesktop" style="height: 300px" />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import joinedPlanetsGql from '@/gql/joinedPlanets'
import PlanetListItem from '@/components/PlanetListItem'

export default {
  name: 'NavDrawerContents',
  components: { PlanetListItem },
  data() {
    return {
      joinedPlanets: [],
      showGalaxies: false,
      galaxies: []
    }
  },
  apollo: {
    joinedPlanets: {
      query: joinedPlanetsGql
    },
    galaxies: {
      query: gql`
        query {
          galaxies {
            fullName
            name
            icon
          }
        }
      `
    }
  }
}
</script>

<style scoped>
.linkactive {
  color: var(--v-primary-base) !important;
}

.linkactive:before {
  opacity: 0 !important;
}

.planetactive:before {
  opacity: 0.06 !important;
}

>>> .v-input__control {
  min-height: 34px !important;
  height: 34px !important;
}

>>> .v-label {
  font-size: 1rem;
}
</style>
