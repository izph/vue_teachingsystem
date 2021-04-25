<template>
  <div class="block">
    <el-timeline dot>
      <el-timeline-item
        v-for="(item, index) in userInfo"
        :key="index"
        :timestamp="item.time"
        placement="top"
      >
        <el-card>
          <h4>{{ "更新 Github 模板" }}</h4>
          <p>{{ "王小虎 提交于 2018/4/12 20:46" }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: [
        {
          time: "2020-10-10",
        },
        {
          time: "2020-10-10",
        },
        {
          time: "2020-10-10",
        },
      ],
    };
  },
};
</script>

<style>
</style>