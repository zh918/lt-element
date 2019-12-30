<template>
  <div class="el-data-container">
    <slot name="search-container">
      <el-row :gutter="20">
        <el-col :span="item.span || 4" :key="'col_' + index" v-for="(item,index) in searchContainer.list">
          <!-- 文本框 -->
          <el-input v-if="item.type=='input'" v-model="item.value" size="small" :placeholder="item.placeholder"></el-input>
          
          <!-- 下拉框 -->
          <el-select
            v-else-if="item.type==='select'"
            size="small"
            v-model="item.value"
            :placeholder="item.placeholder"
            clearable
            :disabled="item.disabled"
            :filterable="item.filterable"
            @change="(changeItem)=>!!item.change && item.change(changeItem)"
          >
            <el-option
              v-for="(oitem,oi) in (item.options.length != 0 ? item.options : item.cb())"
              :key="oi"
              :label="oitem.label"
              :value="oitem.value"
            ></el-option>
          </el-select>

          <!-- 时间 -->
          <el-date-picker
            v-else-if="item.type==='date'"
            size="small"
            v-model="item.value"
            type="date"
            :placeholder="item.placeholder"
            clearable
          ></el-date-picker>

          <!-- 文本框 自动加载数据 -->
          <el-autocomplete
            v-else-if="item.type==='autocomplete'"
            size="small"
            class="inline-input"
            v-model="item.value"
            :fetch-suggestions="item.fetch"
            :placeholder="item.placeholder"
            :trigger-on-focus="false"
            @select="item.cb"
          ></el-autocomplete>
        </el-col>

        <el-col :span="searchContainer.btn.span" :offset="searchContainer.btn.offset" class="text-align-right">
          <el-button id="btn_search" type="info" plain size="small" @click="handleSearch">搜索</el-button>
          <el-button id="btn_reset" type="info" plain size="small" @click="handleReset">重置</el-button>
        </el-col>
      </el-row>
    </slot>
    <slot name="operator-container">

    </slot>
    <slot name="list-container">

    </slot>
    <slot name="pagination-container">

    </slot>
  </div>
</template>

<script>
  export default {
    name: 'ElDataContainer',
    componentName: 'ElDataContainer',
    props: {
      searchContainer: {
        // isResetAutoSearch: false,
        // list: [{ type: 'input', class: '', size: '', placeholder: '', defaultValue: '', fetch: '', cb: '', span: ''}],
        // btn: {
        //   span: 4,
        //   offset: 6 
        // }
      },
      operatorContainer: [],
      tableContainer: [],
      paginationContainer: []
    },
    data() {
      return {
      };
    },
    created() {
      console.log('hello data container');
      this._resetOffset();
    },
    methods: {
      _resetOffset() {
        let cols = 24;
        let len = 0;
        this.searchContainer.list.forEach((s, i) => {
          if (s.span) len += Number(s.span);
          else len += 4;

          s.span = 4;
        });

        let p = 6;
        let col = len % cols;
        this.searchContainer.btn.offset = cols - col - p;
        this.searchContainer.btn.span = p;
        console.log(this.searchContainer);
      },
      handleSearch() {
        this.$emit('search', this.searchContainer.list);
      },
      handleReset() {
      }
    }
  };
</script>