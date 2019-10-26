export default {
    // 表格加载
    tableLoading(table_Obj, callback) {
        if (!table_Obj.loading) {
            table_Obj.loading = true;
        } else {
            table_Obj = true;
        }

        if (typeof callback == "function") {
            callback();
        }
    },
    // 表格加载取消
    cancelTableLoading(table_Obj, callback) {
        if (table_Obj.loading) {
            table_Obj.loading = false;
        } else {
            table_Obj = false;
        }

        if (typeof callback == "function") {
            callback();
        }
    },
    // 加载表格数据
    loadTableData(table_Obj, data, callback) {
        if (table_Obj.Rows) {
            table_Obj.Rows = data;
        } else {
            table_Obj = data;
        }

        if (typeof callback == "function") {
            callback();
        }
    },
    // 加载表格数据
    setTableData(table_Obj, data, callback) {
        if (table_Obj.Rows) {
            table_Obj.Rows = data;
        } else {
            table_Obj = data;
        }

        if (typeof callback == "function") {
            callback();
        }
    },
    // 设置表格的总条数
    setTableTotal(table_Obj, total, callback) {
        
        if (table_Obj.total) {
            table_Obj.total = total;
            
        } else {
            table_Obj = total;
        }
        
        if (typeof callback == "function") {
            callback();
        }
    },
    // 处理页码切换
    handleCurrentChange(table_Obj, index, callback) {
        if (table_Obj.currentPage) {
            table_Obj.currentPage = index;
        } else {
            table_Obj = index;
        }

        if (typeof callback == "function") {
            callback();
        }
    },
    // 处理每页显示条数切换
    handleSizeChange(table_Obj, pageSizes, callback) {
        if (table_Obj.pageSizes) {
            table_Obj.pageSizes = pageSizes;
            table_Obj.currentPage = 1;
        } else {
            table_Obj = pageSizes;
        }

        if (typeof callback == "function") {
            callback();
        }
    },
    // 刷新当前页或指定页
    refreshCurrentChange(table_Obj, currentPage) {
        if (table_Obj.currentPage) {
            var page = table_Obj.currentPage

            table_Obj.currentPage = 0;

            if (currentPage) {
                table_Obj.currentPage = currentPage;
            } else {
                table_Obj.currentPage = page;
            }

            
        }
    },
    // 表格排序
    sort_change(table_Obj, item, callback) {
        if (table_Obj.sort) {
            table_Obj.sort = item;
        } else {
            table_Obj = item;
        }
  
        if (typeof callback == "function") {
            callback();
        }
      }
}