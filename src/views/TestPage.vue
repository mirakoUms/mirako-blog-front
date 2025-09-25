<template>
  <div class="big">
    <div class="boxA">A</div>
    <div class="boxB">B</div>
  </div>
</template>

<style scoped>
.big {
  background-color: lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  position: relative;
}
.boxA {
  width: 50px;
  height: 50px;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
}
.boxB {
  width: 50px;
  height: 50px;
  background-color: lightcoral;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
}
</style>
