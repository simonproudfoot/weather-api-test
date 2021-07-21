<template>
<div class="dataWindow">
    <div v-if="dateInfo.length" style="padding: 1em">
        <h2>Filtered by day</h2>
        <pre>{{dateInfo}}</pre>
    </div>
    <div v-else>
        <h2 style="padding: 1em">All data from API</h2>
        <pre>{{data}}</pre>
    </div>
</div>
</template>

<script>
export default {
    name: 'datawindow',
    props: ['data', 'dateInfo'] // We've passed the data fron the App.vue into this component as a prop
}
</script>

<style>
.dataWindow {
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    width: 25%;
    background-color: black;
    color: blanchedalmond;
    text-align: left;
    overflow-y: auto;
}
</style>
