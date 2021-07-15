(function(e){function t(t){for(var n,i,u=t[0],s=t[1],l=t[2],p=0,d=[];p<u.length;p++)i=u[p],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&d.push(r[i][0]),r[i]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);c&&c(t);while(d.length)d.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],n=!0,u=1;u<a.length;u++){var s=a[u];0!==r[s]&&(n=!1)}n&&(o.splice(t--,1),e=i(i.s=a[0]))}return e}var n={},r={app:0},o=[];function i(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=n,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(a,n,function(t){return e[t]}.bind(null,n));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var c=s;o.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";a("85ec")},"2e67":function(e,t,a){},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("h1",[e._v("Weather API test")]),e.weatherData.info.Location?a("main",[a("dataWindow",{attrs:{data:e.weatherData,dayInfo:e.dateInfo}}),a("select",{directives:[{name:"model",rawName:"v-model",value:e.dateSelected,expression:"dateSelected"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.dateSelected=t.target.multiple?a:a[0]}}},[a("option",{attrs:{value:""}},[e._v("Select day")]),e._l(e.weatherData.info.Location.Period,(function(t,n){return a("option",{key:n,domProps:{value:t.value}},[e._v(e._s(t.value.replace("Z","")))])}))],2),a("gmap-map",{ref:"mymap",staticClass:"map",attrs:{center:e.position,zoom:12,options:{disableDefaultUI:!0,gestureHandling:"none"}}}),a("small",{staticClass:"footer"},[e._v(e._s(e.significantWeather))])],1):e._e()])},o=[],i=(a("7db0"),a("07ac"),a("a9e3"),a("159b"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"dataWindow"},[e.dayInfo.length?a("div",{staticStyle:{padding:"1em"}},[a("h2",[e._v("Filter by day")]),a("pre",[e._v(e._s(e.dayInfo))])]):a("div",[a("h2",{staticStyle:{padding:"1em"}},[e._v("All data from API")]),a("pre",[e._v(e._s(e.data))])])])}),u=[],s={name:"datawindow",props:["data","dayInfo"]},l=s,c=(a("d2b1"),a("2877")),p=Object(c["a"])(l,i,u,!1,null,null,null),d=p.exports,f={name:"App",data:function(){return{weatherData:{info:{},weatherParams:[]},dateSelected:""}},methods:{getWeatherData:function(){var e=this,t="http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/310012?res=3hourly&key=1acb56e9-c15e-4547-a783-d93aa5a9ef81";this.axios.get(t).then((function(t){e.$set(e.weatherData,"info",t.data["SiteRep"]["DV"]),e.$set(e.weatherData,"weatherParams",t.data["SiteRep"]["Wx"]["Param"])}))}},computed:{dateInfo:function(){var e=this,t=Object.values(this.weatherData.info.Location.Period).find((function(t){return t.value===e.dateSelected}));return t?t["Rep"]:[]},position:function(){var e=this.weatherData.info.Location;return{lat:Number(e.lat),lng:Number(e.lon)}},significantWeather:function(){var e=[];return this.dateInfo.forEach((function(t){"0"===t.W&&e.push("Clear night"),"1"===t.W&&e.push("Sunny day"),"2"===t.W&&e.push("Partly cloudy"),"3"===t.W&&e.push("Partly cloudy(day)"),"4"===t.W&&e.push("N/A"),"5"===t.W&&e.push("Mist"),"6"===t.W&&e.push("Fog"),"7"===t.W&&e.push("Cloudy"),"8"===t.W&&e.push("Overcast"),"9"===t.W&&e.push("Light rain shower(night)"),"10"===t.W&&e.push("Light rain shower(day)"),"11"===t.W&&e.push("Drizzle"),"12"===t.W&&e.push("Light rain"),"13"===t.W&&e.push("Heavy rain shower(night)"),"14"===t.W&&e.push("Heavy rain shower(day)"),"15"===t.W&&e.push("Heavy rain"),"16"===t.W&&e.push("Sleet shower(night)"),"17"===t.W&&e.push("Sleet shower(day)"),"18"===t.W&&e.push("Sleet"),"19"===t.W&&e.push("Hail shower(night)")})),e}},created:function(){this.getWeatherData()},components:{dataWindow:d}},h=f,v=(a("034f"),Object(c["a"])(h,r,o,!1,null,null,null)),y=v.exports,m=a("bc3a"),g=a.n(m),w=a("2106"),b=a.n(w),W=a("755e");n["a"].use(b.a,g.a),n["a"].use(W,{load:{key:"AIzaSyBiBOhiKQgdk79zNbrT8-YJYhsi9Ws-m-U"}}),n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(y)}}).$mount("#app")},"85ec":function(e,t,a){},d2b1:function(e,t,a){"use strict";a("2e67")}});
//# sourceMappingURL=app.474a5b8a.js.map