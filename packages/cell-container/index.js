import CellContainer from './src/main';

/* istanbul ignore next */
CellContainer.install = function(Vue) {
  Vue.component(CellContainer.name, CellContainer);
};

export default CellContainer;
