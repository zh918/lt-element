<template>
  <div class="el-data-container">
    <!-- 检索 -->
    <slot name="search-container" v-if="searchContainer">
      <el-row :gutter="20">
        <el-col
          class="item-box"
          :span="searchContainer.itemSpan"
          :key="'col_' + index"
          v-for="(item,index) in searchContainer.list"
        >
          <!-- 文本框 -->
          <el-input
            v-if="item.type=='input'"
            v-model="item.value"
            size="small"
            :placeholder="item.placeholder"
          ></el-input>

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

        <el-col :span="btn.span" :offset="btn.offset" class="flex-auto-operator text-align-right">
          <el-button id="btn_search" type="primary" size="small" @click="handleBeginSearch">搜索</el-button>
          <el-button id="btn_reset" plain size="small" @click="handleReset">重置</el-button>
        </el-col>
      </el-row>
    </slot>
    <!-- 操作 -->
    <slot name="operator-container" v-if="operatorContainer">
      <div class="operator-container">
        <el-button
          :key="index"
          :type="(item.type || 'primary')"
          :size="(item.size || 'small')"
          :icon="(item.icon || '')"
          v-for="(item, index) in operatorContainer"
          @click="item.cb"
        >{{item.text}}</el-button>
      </div>
    </slot>
    <!-- 数据 -->
    <slot name="list-container">
      <el-table 
        border
        size="small"
        v-loading="loading"
        element-loading-text="数据加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableContainer.data" 
        class="data-table">
        <el-table-column
          :key="index"
          v-for="(item, index) in tableContainer.head"
          :label="item.label"
          :fixed="item.fixed == true"
          :width="item.width"
        >
          <template slot-scope="scope">
            <slot :name="item.prop" v-bind="scope.row">{{ scope.row[item.prop] }}</slot>
          </template>
        </el-table-column>
        <el-table-column :fixed="tableContainer.operate.fixed" :label="tableContainer.operate.label" :width="tableContainer.operate.width || 150" v-if="tableContainer.operate.list">
          <template slot-scope="scope">
            <slot name="operate" v-bind="scope.row">
              <el-button
                :key="'operator_'+index"
                v-for="(item, index) in tableContainer.operate.list"
                @click.native.prevent="item.cb(scope.row)"
                type="text"
                size="mini"
              >{{item.label}}</el-button>
            </slot>
          </template>
        </el-table-column>
      </el-table>
    </slot>
    <!-- 分页 -->
    <slot name="pagination-container" v-if="paginationContainer">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginationContainer.pageNum"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        :layout="paginationContainer.layout"
        :total="paginationContainer.total"
      ></el-pagination>
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
      // itemSpan: 4, // 请设置成偶数
      // list: [{ type: 'input', class: '', size: '', placeholder: '', defaultValue: '', fetch: '', cb: '', span: ''}],
    },
    operatorContainer: [],
    tableContainer: {
      // operate: []
      // head: [],
      // data: []
    },
    paginationContainer: {
      pageNum: 1,
      total: 0,
      layout: 'prev, pager, next' // "total, sizes, prev, pager, next, jumper"
    }
  },
  data() {
    return {
      btn: {
        span: 0,
        offset: 0
      },
      parameter: {},
      pagination: {
        pageSize: this.paginationContainer.pageSize | 10,
        pageSizes: [10, 20, 50]
      }
    };
  },
  created() {
    console.log('hello data container');
    this._resetOffset();
    this.handleSearch();
  },
  methods: {
    _resetOffset() {
      if (!this.searchContainer || !this.searchContainer.list) return;
      let defaultSpan = 4;
      let defaultOperatorSpan = 4;
      let cols = 24;
      let len = 0;
      this.searchContainer.list.forEach((s, i) => {
        if (this.searchContainer.itemSpan) {
          len += Number(this.searchContainer.itemSpan);
        } else {
          len += defaultSpan;
          this.searchContainer.itemSpan = defaultSpan;
        }
      });

      let p = defaultOperatorSpan; // 按钮栅格容器大小
      let col = 0; // 剩余未填满的栅格数量
      if (cols < len) col = cols - len % cols;
      else col = cols - len;
      if (col === p) this.btn.offset = 0;
      else if (col > p) this.btn.offset = col - p;
      else if (col < 0) this.btn.offset = cols - p - Math.abs(col);
      else this.btn.offset = cols - p;
      this.btn.span = p;
    },
    handleSearch() {
      this._getParms();
      this.$emit('search', {
        parameter: this.parameter,
        page: { ...this.paginationContainer, ...this.pagination }
      });
    },
    handleBeginSearch() {
      this._clearnPagination();
      this.handleSearch();
    },
    handleReset() {
      this._clearn();
      if (this.searchContainer.isResetAutoSearch) this.handleSearch();
    },
    handleSizeChange() {
      // 变更size pageNum 设置为1
      this._clearnPagination();
      this.handleSearch();
    },
    handleCurrentChange(val) {
      // 变更页码
      this.paginationContainer.pageNum = val;
      this.handleSearch();
    },
    _getParms() {
      let _this = this;
      // 获取参数
      if (
        _this.searchContainer &&
        _this.searchContainer.list &&
        _this.searchContainer.list.length > 0
      ) {
        _this.searchContainer.list.forEach(function(obj, i) {
          if (obj.key) _this.parameter[obj.key] = obj.value;
        });

      }
    },
    _clearn() {
      let _this = this;
      // 获取参数
      if (
        _this.searchContainer &&
        _this.searchContainer.list &&
        _this.searchContainer.list.length > 0
      ) {
        _this.searchContainer.list.forEach(function(obj, i) {
          obj.value = '';
          _this.parameter[obj.key] = obj.value;
        });
      }
    },
    _clearnPagination() {
      this.paginationContainer.pageNum = 1;
    }
  }
};
</script>