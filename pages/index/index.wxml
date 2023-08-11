<!-- index.wxml -->
<view class="container">
    <!-- 搜索 -->
    <view class="search-wrap">
        <t-icon name="menu-fold" size="48rpx" style="margin-top: 10rpx;" bind:click="onOpenDrawer" />
        <!-- <t-icon name="setting" size="48rpx" style="margin-top: 10rpx;" bind:click="onChangeLevel" /> -->
        <view bindtap="onChangeLevel" style="width: 86rpx; height: 70rpx; line-height: 66rpx; text-align: right;">
            {{ level }}本
        </view>
        <t-icon name="caret-down-small" size="48rpx" style="margin-top: 10rpx;" bind:click="onChangeLevel" />
        <!-- <view style="width: 200rpx;">
            <t-dropdown-menu>
                <t-dropdown-item options="{{ levelOptions }}" default-value="{{ 2 }}" keys="{{ keysOptions }}" bindchange="onChangeLevel" />
            </t-dropdown-menu>
        </view> -->
        <view class="search">
            <image class="search-icon" src="/assets/icon/search.png" mode="" />
            <input class="search-input" disabled placeholder="搜索兵种、法术、建筑、英雄等" bindtap="onGoSearch" />
            <!-- <view style="padding: 0rpx 30rpx;" bindtap="onScanCode">
                <image class="search-icon" src="/assets/icon/scan.png" mode="" />
            </view> -->
        </view>
    </view>
    <view class="countdown">
        <t-grid column="{{3}}" theme="card">
            <t-grid-item text="{{ attackWeekendTitle }}" description="{{ attackWeekendCountdown }}" />
            <t-grid-item text="{{ teamRaceTitle }}" description="{{ teamRaceCountdown }}" />
            <t-grid-item text="{{ teamLeagueTitle }}" description="{{ teamLeagueCountdown }}" />
            <!-- <t-grid-item text="月卡结算" description="1天23小时33分" />
            <t-grid-item text="商人刷新" description="1天23小时33分" />
            <t-grid-item text="赛季重置" description="1天23小时33分" /> -->
        </t-grid>
    </view>
    <t-tabs sticky swipeable value="{{ tabValue }}" bind:change="onTabsChange">
        <t-tab-panel label="{{ item.name }}" value="{{ index }}" wx:for="{{ unitData }}" wx:key="index">
            <t-grid column="{{4}}" theme="card">
                <t-grid-item wx:for="{{ item.children }}" wx:key="index" text="{{ item.name }}" image="{{ 'http://119.96.189.81:7788/images/' + item.name + '.png' }}" bindtap="onDetail" data-content="{{item}}" />
            </t-grid>
        </t-tab-panel>
    </t-tabs>
    <!-- 抽屉 -->
    <t-drawer visible="{{ drawerVisible }}" placement="left" items="{{ sideMenuList }}" bind:item-click="onClickDrawerItem"></t-drawer>
    <!-- 面板 -->
    <t-action-sheet id="t-action-sheet" bind:selected="onHandleActionSelected" />
</view>