<template>
  <div></div>
</template>
<script>
import Keyboard from "../../components/keyboard/index.js";
import '../../../dist/keyboard/style.css';
export default {
  mounted () {
    this._renderDigitalKeyboard();
  },
  methods: {
    _renderDigitalKeyboard () {
    	return new Keyboard (
          {
            el: this.$el,
            type: 'number',
            inputValue: this.inputValue
          }
        );
    },
    inputValue(value) {
      console.log(value); //DigitalKeyboard return value
    }
  }
}
</script>
<style>
.keyboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  font-family: PingFang-SC, "San Francisco", "Source Sans", Rotobo, "Helvetica Neue";
  font-size: 12px; }
  .keyboard button {
    width: 33%;
    height: 2.17em;
    line-height: 2.17em;
    font-family: PingFang-SC, "San Francisco", "Source Sans", Rotobo, "Helvetica Neue";
    font-size: 2em;
    text-align: center;
    color: #3f3f3f;
    border: 0;
    background-color: #fff;
    cursor: pointer;
    touch-action: none;
    -webkit-tap-highlight-color: transparent; }
    .keyboard button:focus {
      outline: none; }
    .keyboard button:active {
      background-color: #dfdfdf; }
    .keyboard button.keyClear {
      height: 2.89em;
      line-height: 2.89em;
      font-size: 1.5em; }
    .keyboard button.keyX {
      height: 2.55em;
      line-height: 2.55em;
      font-size: 1.7em; }

</style>
