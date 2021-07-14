<template>
<div id="app">
    <h1>Weather API test</h1>
    <!-- pass the data to the side window -->
    <main v-if="weatherData.info.Location">
        <dataWindow :data="weatherData" :dayInfo="dateInfo" />
        <select v-model="dateSelected">
            <option value="">Select day</option>
            <option v-for="(day, i) in weatherData.info.Location.Period" :value="day.value" :key="i">{{day.value.replace('Z', '')}}</option>
        </select>

        <gmap-map ref="mymap" :center="position" class="map" :zoom="12" :options="{disableDefaultUI: true, gestureHandling: 'none'}">
        </gmap-map>
        <small class="footer">{{significantWeather}}</small>
    </main>
</div>
</template>

<script>
import dataWindow from './components/dataWindow.vue'
export default {
    name: 'App',
    data: function () {
        return {
            // we'll store the date we get from the API here
            weatherData: {
                info: {},
                weatherParams: []
            },
            dateSelected: ''
        }
    },
    methods: {
        // function to connect to API
        getWeatherData() {
            let api = 'http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/310012?res=3hourly&key=1acb56e9-c15e-4547-a783-d93aa5a9ef81'
            this.axios.get(api).then((response) => {
                this.$set(this.weatherData, 'info', response.data['SiteRep']['DV'])
                this.$set(this.weatherData, 'weatherParams', response.data['SiteRep']['Wx']['Param'])
            })
        }
    },
    computed: {
        dateInfo() {
            var arr = Object.values(this.weatherData.info.Location.Period).find(x => x.value === this.dateSelected)
            return arr ? arr['Rep'] : []
        },
        position() {
            var arr = this.weatherData.info.Location
            return {
                'lat': Number(arr.lat),
                'lng': Number(arr.lon),
            }
        },
        significantWeather() {
            var arr = []
            this.dateInfo.forEach(x => {
                if (x.W === '0') {
                    arr.push('Clear night')
                }
                if (x.W === '1') {
                    arr.push('Sunny day')
                }
                if (x.W === '2') {
                    arr.push('Partly cloudy')
                }
                if (x.W === '3') {
                    arr.push('Partly cloudy(day)')
                }
                if (x.W === '4') {
                    arr.push('N/A')
                }
                if (x.W === '5') {
                    arr.push('Mist')
                }
                if (x.W === '6') {
                    arr.push('Fog')
                }
                if (x.W === '7') {
                    arr.push('Cloudy')
                }
                if (x.W === '8') {
                    arr.push('Overcast')
                }
                if (x.W === '9') {
                    arr.push('Light rain shower(night)')
                }
                if (x.W === '10') {
                    arr.push('Light rain shower(day)')
                }
                if (x.W === '11') {
                    arr.push('Drizzle')
                }
                if (x.W === '12') {
                    arr.push('Light rain')
                }
                if (x.W === '13') {
                    arr.push('Heavy rain shower(night)')
                }
                if (x.W === '14') {
                    arr.push('Heavy rain shower(day)')
                }
                if (x.W === '15') {
                    arr.push('Heavy rain')
                }
                if (x.W === '16') {
                    arr.push('Sleet shower(night)')
                }
                if (x.W === '17') {
                    arr.push('Sleet shower(day)')
                }
                if (x.W === '18') {
                    arr.push('Sleet')
                }
                if (x.W === '19') {
                    arr.push('Hail shower(night)')
                }
            });

            return arr
            // 20 Hail shower(day) 21 Hail22Light snow shower(night) 23 Light snow shower(day) 24 Light snow25Heavy snow shower(night) 26 Heavy snow shower(day) 27 Heavy snow28Thunder shower(night) 29 Thunder shower(day) 30 Thunder
        }
    },
    created() {
        this.getWeatherData() // load the function when the app loads
    },
    components: {
        dataWindow
    }
}
</script>

<style>
body {
    margin: 0;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-right: 25%;
    margin: 0;

}

.map {
    height: calc(85vh);
}

.footer {
    position: absolute;
    bottom: 0;
    background-color: #fff;
    width: 100%;
    left: 0;
}

main {
    position: relative;

}
</style>
