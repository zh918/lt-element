import DataContainer from './src/main';

/* istanbul ignore next */
DataContainer.install = function(Vue) {
  Vue.component(DataContainer.name, DataContainer);
};

export default DataContainer;
