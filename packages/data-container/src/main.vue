<template>
  <div class="el-data-container">
    <!-- 检索 -->
    <slot name="search-container" v-if="searchContainer">
      <el-row :gutter="20" v-if="searchContainer.displayType == 'placeholder'">
        <el-col
          class="item-box"
          :span="item.span ? item.span : searchContainer.itemSpan"
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

          <!-- 数字框 -->
          <el-input-number 
            v-if="item.type=='number'" 
            v-model="item.value" 
            type="money" 
            :placeholder='item.placeholder' 
            :tip="false">
          </el-input-number>

          <!-- 下拉框 -->
          <el-select
            v-if="item.type==='select'"
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
            v-if="item.type==='date'"
            size="small"
            v-model="item.value"
            type="date"
            :placeholder="item.placeholder"
            clearable
          ></el-date-picker>

          <!-- 文本框 自动加载数据 -->
          <el-autocomplete
            v-if="item.type==='autocomplete'"
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
      <el-row :gutter="40" v-if="searchContainer.displayType == 'title'">
        <el-col
          class="item-box"
          :span="item.span ? item.span : searchContainer.itemSpan"
          :key="'col_' + index"
          v-for="(item,index) in searchContainer.list"
        >
          <div class="item-box-field" v-if="item.type=='input'" >
            <div class="item-box-field-title">{{item.title}}</div>
            <!-- 文本框 -->
            <el-input
              v-model="item.value"
              size="small"
              :placeholder="item.placeholder"
            ></el-input>
          </div>


          <div class="item-box-field" v-if="item.type=='number'" >
            <div class="item-box-field-title">{{item.title}}</div>
            <!-- 数字框 -->
            <el-input-number
              v-model="item.value" 
              type="money" 
              :placeholder='item.placeholder' 
              :tip="false">
            </el-input-number>
          </div>

          <div class="item-box-field" v-if="item.type==='select'">
            <div class="item-box-field-title">{{item.title}}</div>
            <!-- 下拉框 -->
            <el-select
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
          </div>

          <div class="item-box-field" v-if="item.type==='date'">
            <div class="item-box-field-title">{{item.title}}</div>
            <!-- 时间 -->
            <el-date-picker
              size="small"
              v-model="item.value"
              type="date"
              :placeholder="item.placeholder"
              clearable
            ></el-date-picker>
          </div>

          <div class="item-box-field" v-if="item.type==='autocomplete'">
            <div class="item-box-field-title">{{item.title}}</div>
            <!-- 文本框 自动加载数据 -->
            <el-autocomplete
              size="small"
              class="inline-input"
              v-model="item.value"
              :fetch-suggestions="item.fetch"
              :placeholder="item.placeholder"
              :trigger-on-focus="false"
              @select="item.cb"
            ></el-autocomplete>
          </div>
   
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
          plain
          :key="index"
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
        <el-table-column :fixed="tableContainer.operate.fixed" :label="tableContainer.operate.label" :width="tableContainer.operate.width || 180" v-if="tableContainer.operate.list">
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
      isResetAutoSearch: true,
      displayType: 'placeholder' // placeholder,title
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
        if (s.span) {
          len += Number(s.span);
        } else if (this.searchContainer.itemSpan) {
          len += Number(this.searchContainer.itemSpan);
        } else {
          len += defaultSpan;
          this.searchContainer.itemSpan = defaultSpan;
        }
      });

      let rowCount = Math.ceil(len / cols);
      let totalSpan = rowCount * 24;

      if (len === totalSpan) {
        // 另起一行
        this.btn.offset = cols - defaultOperatorSpan;
        this.btn.span = defaultOperatorSpan;
      } else {
        let rowArray = [];
        for (let i = 0; i < rowCount; i++) {
          rowArray.push({
            maxSpan: 24,
            overSpan: 24,
            totalSpan: 0
          });
        }
        console.log('初始行数据：', rowCount, rowArray);

        let s = 0;
        for (let i = 0, n = this.searchContainer.list.length; i < n; i++) {
          let tempSpan = this.searchContainer.list[i].span || this.searchContainer.itemSpan;
          if (rowArray[s].overSpan - tempSpan < 0) {
            s++;
          }

          rowArray[s].totalSpan += tempSpan;
          rowArray[s].overSpan -= tempSpan;
        }

        if (rowArray[s].overSpan === defaultOperatorSpan) {
          this.btn.offset = 0;
        } else if (rowArray[s].overSpan > defaultOperatorSpan) {
          this.btn.offset = rowArray[s].overSpan - defaultOperatorSpan;
        } else {
          this.btn.offset = cols - defaultOperatorSpan;
        }
        this.btn.span = defaultOperatorSpan;
        console.log('================数据：', rowCount, rowArray);
      }
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