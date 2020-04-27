import Label from './src/main';

/* istanbul ignore next */
Label.install = function(Vue) {
  Vue.component(Label.name, Label);
};

export default Label;
