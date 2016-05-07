<template>
<div class="article">
  <nav class="bar bar-nav">
    <h1 class="title" v-text="title"></h1>
    <!-- <v-button types="nav link"
      class-name="pull-right"
      @click="openPanel">
      <v-icon type="more"></v-icon>
    </v-button> -->
  </nav>
  <v-tabs type="tab" class-name="article-tabs">
    <v-tab name="timer-tasks" title="我的待办" status="active"
    distance="55" v-pull-to-refresh="refreshAll">
      <v-layer></v-layer>
      <div class="allTasks">
          <v-card-container>
            <card type="header">资金支付</card>
            <card type="content">
              <card type="content-inner">
              这里是第1条待办，下拉刷新
              </card>
            </card>
          </v-card-container>
      </div>
    </v-tab>
    <v-tab name="common-tasks" title="任务跟踪"
    distance="55" v-pull-to-refresh="refreshMine">
      <v-layer></v-layer>
      <div class="myTasks">
          <v-card-container v-for="task in tasks | orderBy 'id' -1">
            <card type="header">{{task.title}}</card>
            <card type="content">
              <card type="content-inner">
              {{task.content}}
              </card>
            </card>
          </v-card-container>
      </div>
    </v-tab>
  </v-tabs>
  <!-- <div class="panel-overlay"></div>
  <div class="panel panel-right panel-cover" id='panel-demo'>
    <div class="content-block">
      <p>我是从右边出现的</p>
      <p>并且我是覆盖在页面上而不是推开页面</p>
      <p></p>
      <p><button class="button close-panel">关闭</button></p>
    </div>
  </div> -->
</div>
</template>

<script>
import VButton from '../components/Button'
import VIcon from '../components/Iconfont'
import VTabs from '../components/Tabs'
import VTab from '../components/Tab'
import VLayer from '../components/PullToRefreshLayer'
import VCardContainer from '../components/Card'
import Card from '../components/CardItem'
import $ from 'zepto'

export default {
  ready () {
    $.init()
  },
  data () {
    return {
      title: '待办列表',
      tasks: [
        {
          id: 1,
          title: '资金支付',
          content: '这里是第1条待办，下拉刷新'
        }
      ]
    }
  },
  computed: {
    length () {
      return this.tasks.length
    }
  },
  methods: {
    openPanel () {
      $.openPanel('#panel-demo')
    },
    refreshAll () {
      $.showIndicator()
      setTimeout(function () {
        console.log('refreshAll')
        var cardNumber = $(this.$el).find('.card').length
        var cardHTML = '<div class="card">' +
          '<div class="card-header">资金支付' + '</div>' +
          '<div class="card-content">' +
          '<div class="card-content-inner">' +
          '这里是第' + cardNumber + '条待办，下拉刷新' +
          '</div>' +
          '</div>' +
          '</div>'
        $(this.$el).find('.allTasks').prepend(cardHTML)
        // 加载完毕需要重置
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }.bind(this), 1500)
    },
    refreshMine () {
      $.showIndicator()
      setTimeout(function () {
        console.log('refreshMine')
        let num = this.length + 1
        let title = `资金支付`
        let content = `这里是第${num}条待办，下拉刷新`
        this.tasks.push({
          id: num,
          title: title,
          content: content
        })
        $.pullToRefreshDone('.pull-to-refresh-content')
        $.hideIndicator()
      }.bind(this), 1500)
    }
  },
  components: {
    VButton,
    VIcon,
    VTabs,
    VTab,
    VLayer,
    VCardContainer,
    Card
  }
}
</script>

<style>
.article {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.article-tabs .buttons-tab {
  z-index: 10;
  margin-top:2.2rem;
}
#common-tasks, #timer-tasks {
  top: 2rem;
}
</style>
