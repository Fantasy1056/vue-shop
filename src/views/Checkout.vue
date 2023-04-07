<template>
  <div class="checkout">
    <Header>提交订单</Header>
    <section id="page">
      <!-- 地址信息 -->
      <div class="address">
        <h3>收货信息：</h3>
        <div class="bd">
          <router-link to="/address/select">
            <div class="receive" v-if="defaultAddress.length > 0">
              <p class="name">
                {{ defaultAddress[0].consignee }} {{ defaultAddress[0].moblie }}
              </p>
              <p>
                {{ defaultAddress[0].area }} {{ defaultAddress[0].address }}
              </p>
            </div>
            <div class="right">
              <van-icon name="arrow"></van-icon>
            </div>
          </router-link>
        </div>
      </div>
      <!-- 支付方式 -->
      <div class="pay">
        <div class="pay-container">
          <div class="pay-hd">
            支付方式：<span style="color: #b0352f"
              >选择在线支付，随机减0-100元</span
            >
          </div>
          <div class="pay-bd">
            <span class="pay-btn action">货到付款</span>
            <span class="pay-btn">微信支付</span>
            <span class="pay-btn">支付宝</span>
          </div>
        </div>
      </div>
      <!-- 订单商品列表 -->
      <div class="cart_list">
        <div id="shop_list">
          <div class="shop_info"></div>
          <div class="shop_items">
            <div class="item" v-for="item in list" :key="item.goods_id">
              <div class="item_pic">
                <img :src="item.goods_imgUrl" alt="" />
              </div>
              <div class="item_info">
                <div class="item_title">
                  {{ item.goods_name }}
                </div>
                <p class="spec">规格：无</p>
                <p class="price">￥{{ item.goods_price }}.00</p>
                <span class="num">x{{ item.goods_num }}</span>
              </div>
            </div>
          </div>
          <div class="shop_remark">
            <textarea name="remark" placeholder="给卖家留言"></textarea>
          </div>
          <div class="shop_total">
            合计：
            <span>￥{{ totalPrice }}.00</span>
          </div>
        </div>
      </div>
      <!-- 支付详情 -->
      <div class="pay_detail">
        <h3>账单明细</h3>
        <dl>
          <dt>订单总价:</dt>
          <dd>￥{{ totalPrice }}.00</dd>
        </dl>
        <dl>
          <dt>运费:</dt>
          <dd>￥0.00</dd>
        </dl>
        <dl>
          <dt>优惠券:</dt>
          <dd>￥-0.00</dd>
        </dl>
        <dl>
          <dt>实付款:</dt>
          <dd style="color: #b0352f; font-weight: 700">
            ￥{{ totalPrice }}.00
          </dd>
        </dl>
      </div>
    </section>
    <!-- 结算底部栏 -->
    <div class="checkout_footer">
      <div class="footer_box">
        <div class="total_count">
          共 <em id="total_num">{{ totalNum }}</em> 件 总金额：
          <span
            ><em id="total_price">￥{{ totalPrice }}.00</em></span
          >
        </div>
        <div class="topay">
          <a href="">提交订单</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from '@/components/common/Header.vue'
import { cart } from '@/store/cart'
import { address } from '@/store/address'
import { computed } from 'vue'

const cartStore = cart()

const addressStore = address()

const list = computed(() => cartStore.checkedItems)

const defaultAddress = computed(() => addressStore.defaultAddress || [])

const totalPrice = computed(() => cartStore.totalPrice)

const totalNum = computed(() => cartStore.totalNum)

addressStore.getAddressList()
</script>

<style lang="less" scoped>
.checkout {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  section {
    margin-bottom: 3rem;
    overflow: scroll;
    padding-bottom: 1.2rem;
    .address {
      width: 100%;
      overflow: hidden;
      h3 {
        font-size: 0.3733rem;
        font-weight: normal;
        padding: 10px;
        color: #333;
      }
      .bd {
        padding: 10px;
        background-color: #fff;
        color: #333;
        a {
          display: flex;
          color: #333;
          .receive {
            width: 100%;
            p {
              font-size: 0.32rem;
            }
            .name {
              margin-bottom: 0.1333rem;
            }
          }
          .right {
            width: 0.8rem;
            color: #999;
            text-align: right;
            font-size: 0.64rem;
            line-height: 1rem;
          }
        }
      }
    }
    .pay {
      width: 100%;
      margin-top: 0.2667rem;
      color: #333;
      background-color: #fff;
      .pay-container {
        padding: 10px;
        .pay-hd {
          padding-bottom: 10px;
          font-size: 14px;
        }
        .pay-bd {
          width: 100%;
          .pay-btn {
            height: 0.8rem;
            line-height: 0.8rem;
            display: inline-block;
            margin: 0 0.7em 0 0;
            border: 0.0267rem solid #ccd1d9;
            padding: 0.0267rem 0.1333rem;
            text-align: center;
          }
          .action {
            border: 0.06rem solid #b0352f;
            padding: 0px 0.1067rem;
          }
        }
      }
    }
    .cart_list {
      width: 100%;
      overflow: hidden;
      #shop_list {
        overflow: hidden;
        .shop_info {
          padding: 6px 8px 6px 15px;
          line-height: 30px;
        }
        .shop_items {
          background-color: #fff;
          .item {
            display: flex;
            padding: 0.3467rem 0.4rem;
            border-bottom: 1px solid #e8e8e8;
            .item_pic {
              position: relative;
              width: 1.9733rem;
              height: 1.9733rem;
              border: 1px solid #e4e4e4;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .item_info {
              position: relative;
              flex: 1;
              font-size: 12px;
              padding: 0 45px 0 10px;
              position: relative;
              .item_title {
                line-height: 0.4267rem;
                height: 0.9067rem;
                overflow: hidden;
              }
              .spec {
                color: #999;
                margin: 0.1067rem 0;
              }
              .price {
                color: #b0352f;
                font-size: 0.2667rem;
              }
              .num {
                position: absolute;
                top: 60px;
                right: 0;
                font-size: 14px;
              }
            }
          }
        }
        .shop_remark {
          background-color: #fff;
          padding: 15px;
          border-bottom: 1px solid #e8e8e8;
          textarea {
            width: 100%;
            height: 0.9067rem;
            font-size: 12px;
            overflow: hidden;
            border: 1px solid #d8d8d8;
            padding: 7px 10px;
            resize: none;
          }
        }
        .shop_total {
          font-size: 12px;
          text-align: right;
          color: #666;
          padding: 0.2667rem 0.4rem;
          border-bottom: 1px solid #e8e8e8;
          background-color: #fff;
          span {
            font-size: 14px;
            text-align: right;
            color: #b0352f;
            font-weight: 700;
          }
        }
      }
    }
    .pay_detail {
      margin-top: 0.2667rem;
      h3 {
        font-weight: normal;
        padding: 5px 15px;
        font-size: 0.4267rem;
        background-color: #f5f5f5;
      }
      dl {
        padding: 5px 15px;
        background-color: #fff;
        font-size: 0.3733rem;
        dt {
          display: inline-block;
          width: 60%;
          color: #999;
        }
        dd {
          display: inline-block;
          width: 40%;
          color: #333;
          text-align: right;
        }
      }
    }
  }
  .checkout_footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.2rem;
    box-shadow: 0px 0 3px rgba(0, 0, 0, 0.3);
    .footer_box {
      display: flex;
      width: 100%;
      height: 100%;
      background-color: #fff;
      .total_count {
        padding-left: 0.2667rem;
        flex: 1;
        display: flex;
        align-items: center;
        #total_num {
          margin: 0 3px;
          color: #b0352f;
          font-size: 14px;
          font-style: normal;
        }
        #total_price {
          font-style: normal;
          font-size: 0.48rem;
          color: #b0352f;
        }
      }
      .topay {
        width: 32%;
        a {
          display: block;
          height: 100%;
          padding: 12px 12px 13px;
          line-height: 0.5333rem;
          color: #fff;
          background-color: #b0352f;
          text-align: center;
          font-size: 0.5rem;
        }
      }
    }
  }
}
</style>
