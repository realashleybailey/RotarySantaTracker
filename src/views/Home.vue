<template>
    <section class="hero is-info">
      <div class="hero-body is-fullheight headerbox">
        <div class="container has-text-centered">
          <div class="column is-6 is-offset-3">
            <h1 class="title" v-html="title"></h1>
            <h2 class="subtitle" v-html="desc"></h2>
            <router-link to="/track" tag="div" class="buttons">
              <b-button type="is-primary" expanded>Track Santa</b-button>
            </router-link>
            <p style="margin-bottom: 10px;" v-if="selected">Santa is current at: <br>{{ selected.location }}</p>
            <strong>Scroll down to see future dates</strong>
            <br>
            <br>
            <br>
            <br>
            <div class="ca3-scroll-down-link ca3-scroll-down-arrow" data-ca3_iconfont="ETmodules" data-ca3_icon=""></div>
          </div>
        </div>
      </div>
      <div class="container" style="padding: 15px;">
        <h1 class="title" style="margin-bottom: 0px;">Santa Locations</h1>
        <h2 class="subttitle">Santa is currently at locations with a purple border</h2>
        <br>
        <b-table :data="collections" :columns="columns" :selected="selected"></b-table>
        <p style="padding: 10px;"><small>Please bear in mind Santa is replaced at some locations with Mrs Claus, please check social media for further information.</small></p>
    </div>
    </section>
</template>

<style>
html body [data-ca3_iconfont="ETmodules"]::before {
    font-family: "ETmodules";
}

[data-ca3_icon]::before {
    font-weight: normal;
    content: attr(data-ca3_icon);
}

.ca3-scroll-down-arrow {
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2hldnJvbl90aGluX2Rvd24iIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiBmaWxsPSJ3aGl0ZSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBhdGggZD0iTTE3LjQxOCw2LjEwOWMwLjI3Mi0wLjI2OCwwLjcwOS0wLjI2OCwwLjk3OSwwYzAuMjcsMC4yNjgsMC4yNzEsMC43MDEsMCwwLjk2OWwtNy45MDgsNy44M2MtMC4yNywwLjI2OC0wLjcwNywwLjI2OC0wLjk3OSwwbC03LjkwOC03LjgzYy0wLjI3LTAuMjY4LTAuMjctMC43MDEsMC0wLjk2OWMwLjI3MS0wLjI2OCwwLjcwOS0wLjI2OCwwLjk3OSwwTDEwLDEzLjI1TDE3LjQxOCw2LjEwOXoiLz48L3N2Zz4=);
  background-size: contain;
  background-repeat: no-repeat;
}

.ca3-scroll-down-link {
  cursor:pointer;
  height: 60px;
  width: 80px;
  margin: 0px 0 0 -30px;
  line-height: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  color: #FFF;
  text-align: center;
  font-size: 70px;
  z-index: 100;
  text-decoration: none;
  text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);

  -webkit-animation: ca3_fade_move_down 2s ease-in-out infinite;
  -moz-animation:    ca3_fade_move_down 2s ease-in-out infinite;
  animation:         ca3_fade_move_down 2s ease-in-out infinite;
}


/*animated scroll arrow animation*/
@-webkit-keyframes ca3_fade_move_down {
  0%   { -webkit-transform:translate(0,-20px); opacity: 0;  }
  50%  { opacity: 1;  }
  100% { -webkit-transform:translate(0,20px); opacity: 0; }
}
@-moz-keyframes ca3_fade_move_down {
  0%   { -moz-transform:translate(0,-20px); opacity: 0;  }
  50%  { opacity: 1;  }
  100% { -moz-transform:translate(0,20px); opacity: 0; }
}
@keyframes ca3_fade_move_down {
  0%   { transform:translate(0,-20px); opacity: 0;  }
  50%  { opacity: 1;  }
  100% { transform:translate(0,20px); opacity: 0; }
}

.headerbox {
  height: 95vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.hero.is-info {
  background: linear-gradient(rgba(0, 0, 0, 80%), rgba(0, 0, 0, 0.5)), url(../assets/background.jpeg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

/* If mobile */
@media only screen and (max-width: 768px) {
tr {
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.7) !important;
  font-weight: bold;
  /* background-color: hsla(0, 0%, 21%, 0.9) !important; */
  /* color: white !important; */
}

.is-selected {
  background-color: rgba(255, 255, 255, 0.7) !important;
  color: #363636 !important;
  border: 3px solid #8c67ef !important;
}

tr:not(:has(th)) {
  padding: 5px;
}

tr td:last-child {
  border-bottom: 0px !important;
}
}
</style>

<script lang="ts">
import Vue from "vue";
import config from "../config.json";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      title: "",
      desc: "",
      columns: [
          {
              field: 'location',
              label: 'Location',
          },
          {
              field: 'date',
              label: 'Date',
          },
          {
              field: 'time',
              label: 'Time',
          }
      ],
      locations: [] as { date: string; collections: ({ location: string; times: string[]; mrs: boolean; })[]; }[],
      collections: [] as { date: string; location: string; time: string; mrs: boolean; }[],
      selected: null as { date: string; location: string; time: string; mrs: boolean; } | null,
    };
  },
  created() {
    this.title = config.home.title;
    this.desc = config.home.desc;
    
    this.locations = config.locations;


    // Loop through locations and push collections to collections array in order by date
    this.locations.forEach(location => {
      location.collections.forEach(collection => {

        const debug = false;
        const today = new Date(debug ? "2022-11-29T18:00:00.000Z" : new Date().toISOString());

        const date = new Date(location.date);
        const dateString = new Date(location.date).toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

        const startTime = new Date(location.date);
        startTime.setHours(Number(collection.times[0].split(':')[0]), Number(collection.times[0].split(':')[1]), Number(collection.times[0].split(':')[2]));
        
        const endTime = new Date(location.date);
        endTime.setHours(Number(collection.times[1].split(':')[0]), Number(collection.times[1].split(':')[1]), Number(collection.times[1].split(':')[2]));

        
        const startString = startTime.toLocaleTimeString(["en-GB"], { hour12: true, hour: 'numeric', minute: 'numeric' });
        const endString = endTime.toLocaleTimeString(["en-GB"], { hour12: true, hour: 'numeric', minute: 'numeric' });
        
        const timeString = `${startString} - ${endString}`;

        // If date has already passed, don't add to collections array
        if (date.toDateString() < today.toDateString()) return;

        this.collections.push({ date: dateString, location: collection.location, time: timeString, mrs: collection.mrs });

        // If today is the same as the date
        if (today.toDateString() == date.toDateString()) {
          if (today.getTime() >= startTime.getTime() && today.getTime() <= endTime.getTime()) {
            this.selected = this.collections[this.collections.length - 1];
          }
        }

      });
    });

  }
});
</script>