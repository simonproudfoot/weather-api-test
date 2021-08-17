<template>
<div id="app">
    <h1>Weather API test</h1>
    <div style="width: 60%; display: inline-block; ">
        Change weather conditions <br>
        <button @click="condition.rain = !condition.rain" :class="condition.rain ? 'active' : null">rain</button>
        <button @click="condition.lighting = !condition.lighting" :class="condition.lighting ? 'active' : null">lighting</button>
        <button @click="condition.snow = !condition.snow" :class="condition.snow ? 'active' : null">snow</button>
        <button @click="condition.fog = !condition.fog" :class="condition.fog ? 'active' : null">fog</button>
        <button @click="condition.clouds = !condition.clouds" :class="condition.clouds ? 'active' : null">clouds</button>
        <button @click="condition.wind = !condition.wind" :class="condition.wind ? 'active' : null">wind</button>
        |
        <button @click="condition.sunny = !condition.sunny, reset()" :class="condition.sunny ? 'active' : null">Sunny</button>
    </div>
    <div v-if="weatherData.weatherParams.length">
        <div style="width: 30%; display: inline-block; margin: 20px 0">
            <select v-model="dateSelected">
                <option value="">Select day</option>
                <option v-for="(day, i) in weatherData.info.Location.Period" :value="day.value" :key="i">
                    {{ day.value.replace("Z", "") }}
                </option>
            </select>
        </div>
        <!-- pass the data to the side window -->
        <main v-if="weatherData.info.Location">

            <div class="overayColor colourFog" v-if="condition.fog"></div>
            <div class="overayColor" :class="overlayColor"></div>

            <video refs="rain" v-show="condition.rain" class="rain overflow-weather" autoplay loop muted playsinline>
                <source src="./assets/video/rain.mp4" type="video/mp4" codecs="hvc1" />
            </video>
            <video refs="snow" v-show="condition.snow" class="overflow-weather snow" autoplay loop muted playsinline>
                <source src="./assets/video/snow.mp4" type="video/mp4" codecs="hvc1" />
            </video>
            <video v-show="condition.lighting" class="overflow-weather lightning" autoplay loop muted playsinline>
                <source src="./assets/video/lightning.mp4" type="video/mp4" codecs="hvc1" />
            </video>
            <!-- <video v-show="condition.fog" class="overflow-weather fog" autoplay loop muted playsinline>
                <source src="./assets/video/fog.mp4" type="video/mp4" codecs="hvc1" />
            </video> -->
            <video ref="clouds" v-show="condition.clouds" class="clouds overflow-weather" autoplay loop muted playsinline>
                <source src="./assets/video/clouds.mp4" type="video/mp4" codecs="hvc1" />
            </video>
            <dataWindow :data="weatherData" :dateInfo="dateInfo" />
            <gmap-map ref="mymap" map-type-id="terrain" :center="position" class="map" :zoom="12" :options="{ disableDefaultUI: true, gestureHandling: 'none' }">
            </gmap-map>
            <div class="sWeather">
                <strong> Weather throught the day </strong><br /><small>(Change to icons)</small>
                <p v-for="(time, i) in significantWeather" :key="i">{{ time }}</p>
            </div>

            <!-- <transition name="news">
                <div class="weatherWarning" v-if="weatherWarning > 1 && showWarning || condition.sunny">
                    <div v-if="!condition.sunny">
                        <h2>Breaking news!</h2>
                        <p>Weather warning in Liverpool</p>
                    </div>
                    <div v-else>
                        <h2>News</h2>
                        <p>Beaches full as heatwave begins</p>
                    </div>
                    <template v-if="weatherWarning > 2 ">
                        <video v-if="condition.rain && condition.wind && !condition.snow && !condition.lighting && weatherWarning < 3" autoplay loop muted playsinline>
                            <source src="./assets/video/footage-ocean.mp4" type="video/mp4" codecs="hvc1" />
                        </video>
                        <video v-if="condition.rain && condition.snow && weatherWarning < 3" autoplay loop muted playsinline>
                            <source src="./assets/video/footage-snow.mp4" type="video/mp4" codecs="hvc1" />
                        </video>
                        <video v-if="!condition.snow && condition.lighting && weatherWarning < 3" autoplay loop muted playsinline>
                            <source src="./assets/video/footage-storm.mp4" type="video/mp4" codecs="hvc1" />
                        </video>
                        <video v-if="weatherWarning > 3 && !condition.sunny" autoplay loop muted playsinline>
                            <source src="./assets/video/footage-hurricane.mp4" type="video/mp4" codecs="hvc1" />
                        </video>
                    </template>

                    <video v-if="condition.sunny" autoplay loop muted playsinline>
                        <source src="./assets/video/footage-beach.mp4" type="video/mp4" codecs="hvc1" />
                    </video>
                </div>
            </transition> -->

        </main>
    </div>
</div>
</template>

<script>
// sunny should turn off snow and rain

import dataWindow from "./components/dataWindow.vue";
export default {
    name: "App",
    data: function () {
        return {
            key: "1acb56e9-c15e-4547-a783-d93aa5a9ef81",
            // we'll store the date we get from the API here
            observations: {
                info: [],
            },
            weatherData: {
                info: {},
                weatherParams: [],
            },
            dateSelected: "",
            current: "",
            condition: {
                sunny: false,
                wind: false,
                clouds: false,
                lighting: false,
                snow: false,
                fog: false,
                rain: false,
            },
            overlay: "",
            showWarning: false
        };
    },
    methods: {
        // function to connect to API
        getWeatherData() {
            let api =
                "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/310012?res=3hourly&key=" +
                this.key;
            this.axios.get(api).then((response) => {
                this.$set(this.weatherData, "info", response.data["SiteRep"]["DV"]);
                this.$set(
                    this.weatherData,
                    "weatherParams",
                    response.data["SiteRep"]["Wx"]["Param"]
                );
            });
        },

        getObservations() {
            let api =
                "http://datapoint.metoffice.gov.uk/public/data/layer/wxobs/all/json/capabilities?key=" +
                this.key;
            this.axios.get(api).then((response) => {
                this.$set(this.observations, "info", response.data);
            });
        },
    },
    computed: {
        weatherWarning() {
            var obj = Object.values(this.condition)
            const count = obj.filter(Boolean).length;
            return count
        },
        overlayColor() {
            if (this.condition.snow && this.condition.fog) {
                return 'colourCold'
            } else if (!this.condition.snow && this.condition.rain && !this.condition.fog) {
                return 'colourGrey'

            } else if (this.condition.sunny) {
                return 'colourSunny'
            } else {
                return ''
            }
        },
        dateInfo() {
            var arr = Object.values(this.weatherData.info.Location.Period).find(
                (x) => x.value === this.dateSelected
            );
            return arr ? arr["Rep"] : [];
        },
        position() {
            var arr = this.weatherData.info.Location;
            return {
                lat: Number(arr.lat),
                lng: Number(arr.lon),
            };
        },
        significantWeather() {
            var arr = [];
            this.dateInfo.forEach((x) => {
                if (x.W === "0") {
                    arr.push("Clear night");
                }
                if (x.W === "1") {
                    arr.push("Sunny day");
                }
                if (x.W === "2") {
                    arr.push("Partly cloudy");
                }
                if (x.W === "3") {
                    arr.push("Partly cloudy(day)");
                }
                if (x.W === "4") {
                    arr.push("N/A");
                }
                if (x.W === "5") {
                    arr.push("Mist");
                }
                if (x.W === "6") {
                    arr.push("Fog");
                }
                if (x.W === "7") {
                    arr.push("Cloudy");
                }
                if (x.W === "8") {
                    arr.push("Overcast");
                }
                if (x.W === "9") {
                    arr.push("Light rain shower(night)");
                }
                if (x.W === "10") {
                    arr.push("Light rain shower(day)");
                }
                if (x.W === "11") {
                    arr.push("Drizzle");
                }
                if (x.W === "12") {
                    arr.push("Light rain");
                }
                if (x.W === "13") {
                    arr.push("Heavy rain shower(night)");
                }
                if (x.W === "14") {
                    arr.push("Heavy rain shower(day)");
                }
                if (x.W === "15") {
                    arr.push("Heavy rain");
                }
                if (x.W === "16") {
                    arr.push("Sleet shower(night)");
                }
                if (x.W === "17") {
                    arr.push("Sleet shower(day)");
                }
                if (x.W === "18") {
                    arr.push("Sleet");
                }
                if (x.W === "19") {
                    arr.push("Hail shower(night)");
                }
                if (x.W === "20") {
                    arr.push("Hail shower(day)");
                }
                if (x.W === "21") {
                    arr.push("Hail");
                }
                if (x.W === "22") {
                    arr.push("Light snow shower(night)");
                }
                if (x.W === "23") {
                    arr.push("Light snow shower(day)");
                }
                if (x.W === "24") {
                    arr.push("Light snow");
                }
                if (x.W === "25") {
                    arr.push("Heavy snow shower(night)");
                }
                if (x.W === "26") {
                    arr.push("Heavy snow shower(day)");
                }
                if (x.W === "27") {
                    arr.push("Heavy snow shower");
                }
                if (x.W === "28") {
                    arr.push("Heavy snow shower");
                }
                if (x.W === "29") {
                    arr.push("Heavy snow shower");
                }
                if (x.W === "30") {
                    arr.push("Heavy snow shower");
                }
            });
            return arr;
        },
    },
    watch: {
        weatherWarning() {
            !this.showWarning ? this.showWarning = true : null
            setTimeout(() => {
                this.showWarning ? this.showWarning = false : null
            }, 5000);
        },
        condition: {
            deep: true,
            handler(val) {
                if (val.sunny) {
                    val.rain = false
                    val.snow = false
                    val.fog = false
                    val.lighting = false
                    val.clouds = false
                    val.wind = false
                } else {
                    val.sunny = false
                }
            }
        },

        wind(val) {
            if (val) {
                this.$refs['clouds'].playbackRate = 3;
                this.$refs['rain'].playbackRate = 3;
                this.$refs['snow'].playbackRate = 3;
            } else {
                this.$refs['clouds'].playbackRate = 1;
                this.$refs['rain'].playbackRate = 1;
                this.$refs['snow'].playbackRate = 1;
            }
        },

    },
    created() {
        this.getWeatherData(); // load the function when the app loads
        this.getObservations(); // load the function when the app loads
    },
    components: {
        dataWindow,
    },
};
</script>

<style>
.active {
    background-color: red;
}

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

.weatherWarning video {
    width: 100%
}

.weatherWarning {
    position: absolute;
    width: 300px;
    height: auto;
    bottom: 0;
    right: 1em;
    background-color: red;
    color: #fff;
    padding: 0 10px 10px 10px;
    z-index: 100;

}

.map {
    height: calc(85vh);
}

.sWeather {
    position: absolute;
    bottom: 0;
    background-color: #0000ffc4;
    width: auto;
        z-index: 99999;
    left: 1em;
    color: blanchedalmond;
    padding: 1em;
}

main {
    position: relative;
}

.overflow-weather,
.overayColor {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
    z-index: 99;
    pointer-events: none;
}

.colourCold {
    background: linear-gradient(0deg, rgb(29, 106, 253) 0%, rgb(195, 200, 238) 100%);
    mix-blend-mode: color;
    opacity: 1;
}

.colourSunny {
    background: rgb(253, 29, 29);
    background: linear-gradient(0deg, rgba(253, 29, 29, 1) 0%, rgba(252, 176, 69, 1) 100%);
    mix-blend-mode: color;
    opacity: 1;
}

.colourGrey {
    background: gray;
    mix-blend-mode: color;
    opacity: 0.6;
}

.colourFog {
    background-color: gray;
    mix-blend-mode: saturation;
    opacity: 0.8;
    backdrop-filter: blur(10px);
}

.snow {
    mix-blend-mode: screen;
}

.rain {
    mix-blend-mode: screen;
}

.fog {
    mix-blend-mode: hard-light;
}

.clouds {
    mix-blend-mode: luminosity;
    opacity: 0.2;
}

.lightning {
    mix-blend-mode: hard-light;
    animation: flickerLightning 5s infinite;
}

@keyframes flickerLightning {
    0% {
        opacity: 1;
    }

    8% {
        opacity: 0;
    }

    20% {
        opacity: 1;
    }

    28% {
        opacity: 0;
    }

    40% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.news-enter {
    animation: savein 2s ease-in-out;
}

.news-leave {
    animation: saveout 2s ease-out;
}

@keyframes savein {
    from {
        bottom: -500px;
    }

    to {
        bottom: 0;
    }
}

@keyframes saveout {
    from {
        bottom: 0;
    }

    to {
        bottom: -500px;
    }
}
</style>
