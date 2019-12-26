

<template>
  <div style="width:100%">
    <div class="home">
      <el-button type="primary" @click="getData">获取数据</el-button>
    </div>
    <el-table :data="tableData" style="width: 80%;margin: auto">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    getData() {
      this.$api
        .get("/home", { pageIndex: 1, pageSize: 10 })
        .then(res => (this.tableData = res.data));
    },
    handleClick(row) {
      this.$router.push({
        path: `/details/${row.id}`
      });
    }
  }
};
</script>