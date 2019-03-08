<template>
<div>
    <Table border :columns="columns" :data="logs" size="small">
        <template slot-scope="{ row }" slot="id">
            <strong>{{ row.id }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
            <Button type="error" size="small" @click="remove(index)">Delete</Button>
        </template>
    </Table>
    <div style="margin: 10px;text-align:center">
        <Page 
        :total="logTotal" 
        :current="requestData.page" 
        :page-size="requestData.pageSize" 
        :page-size-opts="pageSizeOpts"
        show-sizer show-elevator show-total
        @on-change="changePage" 
        @on-page-size-change="changeSize">
        </Page>
    </div>
</div>
</template>

<script>
import {
    getLogs
} from "@/api/login";
export default {
    name: "lofinfo",
    data() {
        return {
            logs: [],
            logTotal: 0,
            pageSizeOpts:[15,30,45,60],
            requestData:{
                page:1,
                pageSize:15,
            },
            columns: [{
                    title: '编号',
                    slot: 'id'
                },
                {
                    title: '类型',
                    key: 'logTypeName'
                },
                {
                    title: '请求地址',
                    key: 'accessUrl'
                },
                {
                    title: '详情',
                    key: 'description'
                },
                {
                    title: 'Action',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ]
        };
    },
    created: function () {
        this.getLogList();
    },
    methods: {
        getLogList: function () {
            var that = this;
            return getLogs(that.requestData).then(rep => {
                that.logs = rep.data.item;
                that.logTotal = rep.data.count;
                return rep.data;
            });
        },
        show(index) {
            this.$Modal.info({
                title: '详情',
                content: `编号：${this.logs[index].id}<br>类型：${this.logs[index].logTypeName}
                <br>请求地址：${this.logs[index].accessUrl}<br>详细信息：${this.logs[index].description}`
            })
        },
        remove(index) {
            this.logs.splice(index, 1);
        },
        changePage(page) {
            this.requestData.page = page;
            this.getLogList();
        },
        changeSize(size){
            this.requestData.pageSize = size;
            this.getLogList();
        }
    }
};
</script>
