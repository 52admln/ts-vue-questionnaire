<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
  body,
  html,
  div,
  header,
  h1, h2, h3, h4, h5, h6,
  p {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  #app {
    width: 100%;
    line-height: 1.5;
    color: #657180;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: #39f;
    background: 0 0;
    text-decoration: none;
    outline: 0;
    cursor: pointer;
    transition: color .2s ease;
  }

  .highlight {
    color: #F56C6C;
  }
</style>
