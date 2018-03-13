import Message from './message'
import Loading from './loading'
import LoadMore from './loadMore'
import PayKeyboard from './keyboard-pay'

const packageDetail = require('../../package.json');

const components = [
  Message,
  Loading,
  LoadMore,
  PayKeyboard
];

const install = function(Vue, options) {
  if (install.installed) return;
  // Vue.component(Message.name, Message);
  // Vue.component(Loading.name, Loading);
  // Vue.component(LoadMore.name, LoadMore);
  // Vue.component(PayKeyboard.name, PayKeyboard);
  // for (var i = components.length - 1; i >= 0; i--) {
  //   Vue.component(item.name, item);
  // }
  components.forEach(function(component) {
    Vue.component(component.name, component);
  });
  Vue.prototype.$loading = Loading;
  Vue.prototype.$message = Message;
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

let Fly = {
  version: `${packageDetail.version}`,
  install,
  Message,
  Loading,
  LoadMore,
  PayKeyboard
}

export default Fly
