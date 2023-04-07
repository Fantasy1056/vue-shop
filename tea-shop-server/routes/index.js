var express = require('express')
var router = express.Router()
var connection = require('../db/sql.js')
const userSql = require('../db/sqlUser.js')
const listData = require('../data/list-data.json')
const options = require('../data/user-options.json')
const QcloudSms = require('qcloudsms_js')
connection.connect()
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})
router.get('/api/tabbar-list', function (req, res, next) {
  res.send({
    code: 200,
    data: [
      {
        title: '首页',
        path: '/',
        active: 0,
        icon: '#icon-31shouye'
      },
      {
        title: '列表',
        path: '/list',
        active: 1,
        icon: '#icon-liebiao'
      },
      {
        title: '购物车',
        path: '/cart',
        active: 2,
        icon: '#icon-shiwu-gouwuche'
      },
      {
        title: '用户',
        path: '/user',
        active: 3,
        icon: '#icon-yonghu1'
      }
    ]
  })
})
router.get('/api/swiper-list', function (req, res, next) {
  res.send({
    code: 200,
    data: [
      {
        id: 1,
        url: 'http://img.tea7.com/0175360_0.jpeg?x-oss-process=image/resize,w_720'
      },
      {
        id: 2,
        url: 'http://img.tea7.com/0166434_0.jpeg?x-oss-process=image/resize,w_720'
      },
      {
        id: 3,
        url: 'http://img.tea7.com/0169413_0.jpeg?x-oss-process=image/resize,w_720'
      }
    ]
  })
})
router.get('/api/icon-list', function (req, res, next) {
  res.send({
    code: 200,
    data: [
      {
        id: 1,
        icon: 'http://imgcon.tea7.com/6363743876200428263577206.png',
        text: '自饮茶'
      },
      {
        id: 2,
        icon: 'http://imgcon.tea7.com/6363743876164490164235224.png',
        text: '茶具'
      },
      {
        id: 3,
        icon: 'http://imgcon.tea7.com/6363743876136364412448843.png',
        text: '茶礼盒'
      },
      {
        id: 4,
        icon: 'http://imgcon.tea7.com/6363743876147303652949610.png',
        text: '领福利'
      },
      {
        id: 5,
        icon: 'http://imgcon.tea7.com/6366085324327706652770939.png',
        text: '官方验证'
      }
    ]
  })
})
router.get('/api/xiaoqi', function (req, res, next) {
  res.send({
    code: 200,
    data: [
      {
        id: 1,
        url: 'http://img.tea7.com/0160209_0.png?x-oss-process=image/resize,w_720'
      },
      {
        id: 2,
        url: 'http://img.tea7.com/0149845_0.png?x-oss-process=image/resize,w_720'
      }
    ]
  })
})
router.get('/api/bannerswiper', function (req, res, next) {
  res.send({
    code: 200,
    data: [
      {
        id: 1,
        url: 'http://img.tea7.com/0149491_0.jpeg?x-oss-process=image/resize,w_720'
      },
      {
        id: 2,
        url: 'http://img.tea7.com/0013098_0.jpeg?x-oss-process=image/resize,w_720'
      },
      {
        id: 3,
        url: 'http://img.tea7.com/0013101_0.jpeg?x-oss-process=image/resize,w_720'
      }
    ]
  })
})
router.get('/api/hot', function (req, res, next) {
  connection.query('select * from home_hot', (err, result) => {
    res.send({
      code: 200,
      data: result
    })
  })
})
router.get('/api/tea', function (req, res, next) {
  res.send({
    code: 200,
    data: [
      {
        id: 1,
        url: 'http://imgcon.tea7.com/6363728602845403744544786.jpg',
        title: '好文精选',
        desc: '原创好文都在这'
      },
      {
        id: 2,
        url: 'http://imgcon.tea7.com/6363728602893842921158290.jpg',
        title: '茶叶百科',
        desc: '让您喝的更专业'
      }
    ]
  })
})
router.get('/api/like', function (req, res, next) {
  const sql = 'select * from search_list where type like "%like%"'
  connection.query(sql, (err, result) => {
    res.send({
      code: 200,
      data: result
    })
  })
})
router.get('/api/search/hot', function (req, res, next) {
  res.send({
    code: 200,
    data: [
      {
        id: 1,
        content: '易冲泡茶叶'
      },
      {
        id: 2,
        content: '经典紫砂壶'
      },
      {
        id: 3,
        content: '送礼'
      },
      {
        id: 4,
        content: '旅行茶具'
      },
      {
        id: 5,
        content: '待客茶'
      },
      {
        id: 6,
        content: '新手入门茶'
      },
      {
        id: 7,
        content: '大师壶'
      },
      {
        id: 8,
        content: '福鼎白茶'
      }
    ]
  })
})
router.get('/api/search/recommend', function (req, res, next) {
  const sql = 'select * from search_list where type like "%recommend%"'
  connection.query(sql, (err, result) => {
    res.send({
      code: 200,
      data: result
    })
  })
})
router.get('/api/search', function (req, res, next) {
  const searchId = req.query.id
  const searchWord = req.query.word
  const searchType = req.query.type
  const searchSift = req.query.sift
  if (searchWord) {
    const sql = `select * from search_list where keywords like "%${searchWord}%"`
    if (searchType && searchSift) {
      const orderSql = sql + ' order by ' + searchType + ' ' + searchSift
      return connection.query(orderSql, (err, result) => {
        res.send({
          code: 200,
          data: result
        })
      })
    }
    connection.query(sql, (err, result) => {
      res.send({
        code: 200,
        data: result
      })
    })
  } else if (searchId) {
    const sql = `select * from search_list where id="${searchId}"`
    connection.query(sql, (err, result) => {
      res.send({
        code: 200,
        data: result
      })
    })
  } else {
    if (searchType && searchSift) {
      const orderSql =
        'select * from search_list order by ' + searchType + ' ' + searchSift
      return connection.query(orderSql, (err, result) => {
        res.send({
          code: 200,
          data: result
        })
      })
    }
    connection.query('select * from search_list', (err, result) => {
      res.send({
        code: 200,
        data: result
      })
    })
  }
})
router.get('/api/list', function (req, res, next) {
  res.send({
    code: 200,
    data: listData
  })
})
router.get('/api/user-options', function (req, res, next) {
  res.send({
    code: 200,
    data: options
  })
})
router.post('/api/login', (req, res, next) => {
  const data = req.body
  console.log(req.headers.Authorization)
  if (data.code && data.tel) {
    connection.query(userSql.sqlUserCode(data), (err, result) => {
      if (result.length > 0) {
        res.send({
          code: 200,
          data: {
            msg: '登陆成功!',
            success: true,
            data: result[0]
          }
        })
      } else {
        connection.query(userSql.insertUser(data), (err, result1) => {
          connection.query(userSql.sqlUserTel(data), (e, r) => {
            res.send({
              code: 200,
              data: {
                msg: '登陆成功!',
                success: true,
                data: r[0]
              }
            })
          })
        })
      }
    })
  } else if (data.tel) {
    connection.query(userSql.sqlUserTel(data), (err, result) => {
      // 手机号存在
      if (result.length > 0) {
        connection.query(userSql.sqlUserPWd(data), (err, result) => {
          if (result.length > 0) {
            res.send({
              code: 200,
              data: {
                msg: '登陆成功!',
                success: true,
                data: result[0]
              }
            })
          } else {
            res.send({
              code: 301,
              data: {
                msg: '密码错误！',
                success: false
              }
            })
          }
        })
      } else {
        //手机号不存在
        res.send({
          code: 300,
          data: {
            msg: '手机号不存在!',
            success: false
          }
        })
      }
    })
  } else if (data.token) {
    connection.query(userSql.sqlUserToken(data), (err, result) => {
      if (result.length > 0) {
        res.send({
          code: 200,
          data: {
            msg: '登陆成功!',
            success: true,
            data: result[0]
          }
        })
      }
    })
  }
})
router.post('/api/loginbycode', (req, res, next) => {
  const data = req.body
  if (data.code && data.tel) {
    connection.query(userSql.sqlUserCode(data), (err, result) => {
      if (result.length > 0) {
        res.send({
          code: 200,
          data: {
            msg: '登陆成功!',
            success: true,
            data: result[0]
          }
        })
      } else {
        connection.query(userSql.sqlUserTel(data), (e, r) => {
          if (r.length <= 0) {
            connection.query(userSql.insertUser(data), (err, result1) => {})
            res.send({
              code: 200,
              data: {
                msg: '登陆成功!',
                success: true,
                data: r[0]
              }
            })
          } else {
            res.send({
              code: 300,
              data: {
                msg: '登陆失败，验证码不正确!',
                success: false
              }
            })
          }
        })
      }
    })
  }
})
router.post('/api/sendcode', (req, res, next) => {
  const tel = req.body.tel
  var appid = 1400187558

  var appkey = 'dc9dc3391896235ddc2325685047edc7'

  var phoneNumbers = [tel]

  var templateId = 285590

  var smsSign = '三人行慕课'

  var qcloudsms = QcloudSms(appid, appkey)

  function callback(err, ress, resData) {
    if (err) {
      console.log(err)
    } else {
      res.send({
        code: 200,
        data: {
          success: true,
          data: ress.req.body.params[0]
        }
      })
    }
  }

  var ssender = qcloudsms.SmsSingleSender()

  var params = [Math.floor(Math.random() * (9999 - 1000)) + 1000]

  ssender.sendwithparam(
    86,
    phoneNumbers[0],
    templateId,
    params,
    smsSign,
    '',
    '',
    callback
  )
})
router.post('/api/register', (req, res, next) => {
  const data = req.body
  connection.query(userSql.sqlUserTel(data), (err, result) => {
    if (result.length > 0) {
      res.send({
        code: 300,
        msg: '该手机号已被注册！'
      })
    } else {
      connection.query(userSql.insertUser(data), (err, result) => {
        res.send({
          code: 200,
          msg: '注册成功！'
        })
      })
    }
  })
})
router.post('/api/finduser', (req, res, next) => {
  const data = req.body
  connection.query(userSql.sqlUserTel(data), (err, result) => {
    if (result.length > 0) {
      res.send({
        code: 200,
        msg: '查找用户成功！',
        data: result[0]
      })
    } else {
      res.send({
        code: 300,
        msg: '用户不存在！'
      })
    }
  })
})
router.post('/api/changepwd', (req, res, next) => {
  const data = req.body
  connection.query(userSql.sqlChangePwd(data), (err, result) => {
    res.send({
      code: 200,
      msg: '修改密码成功！',
      data: result[0]
    })
  })
})
router.post('/api/addtocart', (req, res, next) => {
  const data = req.body
  connection.query(
    `select * from cart_list where goods_id="${data.goods_id}" and userid="${data.userid}"`,
    (e, r) => {
      if (r.length > 0) {
        connection.query(
          `updata cart_list set goods_num=(goods_num+1) where goods_id="${data.goods_id}" and userid="${data.userid}"`,
          (e1, r1) => {
            res.send({
              code: 200,
              msg: '添加成功！'
            })
          }
        )
      } else {
        connection.query(userSql.sqlAddToCart(data), (e, result) => {
          res.send({
            code: 200,
            msg: '添加成功！'
          })
        })
      }
    }
  )
})
router.get('/api/cartlist', (req, res, next) => {
  const data = req.query
  connection.query(userSql.sqlUserCart(data), (e, result) => {
    if (result.length > 0) {
      res.send({
        code: 200,
        msg: '获取成功',
        data: result
      })
    } else {
      res.send({
        code: 300,
        msg: '获取失败！'
      })
    }
  })
})
router.post('/api/updatecartlist', (req, res, next) => {
  const data = req.body
  connection.query(userSql.sqlChangeCart(data), (err, result) => {
    res.send({
      code: 200,
      msg: '更新成功'
    })
  })
})
router.delete('/api/deletecartitem', (req, res, next) => {
  const data = req.body
  console.log(data)
  connection.query(userSql.sqlDeleteItem(data), (err, result) => {
    res.send({
      code: 200,
      msg: '删除成功'
    })
  })
})
router.post('/api/addnewaddress', (req, res, next) => {
  const data = req.body
  const sql = `select * from address_list where consignee="${data.consignee}" and area="${data.area}" and address="${data.address}" and moblie="${data.moblie}";`
  connection.query(sql, (e, r) => {
    if (r.length > 0) {
      res.send({
        code: 300,
        msg: '地址已存在'
      })
    } else {
      if (data.isDefault === 1) {
        connection.query(userSql.sqlChangeDefaultAdd(data), (e1, r1) => {})
      }
      connection.query(userSql.sqlAddNewAdd(data), (err, result) => {
        res.send({
          code: 200,
          msg: '添加成功'
        })
      })
    }
  })
})
router.get('/api/addresslist', (req, res, next) => {
  const data = req.query
  const sql = `select * from address_list where userid="${data.userid}"`
  connection.query(sql, (e, r) => {
    if (r.length > 0) {
      res.send({
        code: 200,
        msg: '获取地址成功！',
        data: r
      })
    } else {
      res.send({
        code: 300,
        msg: '获取地址失败！'
      })
    }
  })
})
router.get('/api/getaddress', (req, res, next) => {
  const id = req.query.id
  connection.query(userSql.sqlGetAddress(id), (err, result) => {
    if (result.length > 0) {
      res.send({
        code: 200,
        data: result[0],
        msg: '获取地址成功'
      })
    } else {
      res.send({
        code: 304,
        msg: '获取地址失败'
      })
    }
  })
})
router.post('/api/editaddress', (req, res, next) => {
  const data = req.body
  connection.query(
    `select * from address_list where add_id="${data.add_id}"`,
    (e2, r2) => {
      if (r2.length > 0) {
        if (data.isDefault === 1) {
          console.log(data)
          connection.query(userSql.sqlChangeDefaultAdd(data), (e1, r1) => {})
        }
        connection.query(userSql.sqlUpdateAddress(data), (err, result) => {
          res.send({
            code: 200,
            msg: '更新地址成功'
          })
        })
      } else {
        res.send({
          code: 304,
          msg: '该地址不存在'
        })
      }
    }
  )
})
router.post('/api/changedefaultAdd', (req, res, next) => {
  const data = req.body
  const sql = `update address_list set isDefault="1" where add_id="${data.add_id}"`
  connection.query(userSql.sqlChangeDefaultAdd(data), (e1, r1) => {
    connection.query(sql, (e2, r2) => {
      res.send({
        code: 200,
        msg: '修改成功'
      })
    })
  })
})
router.delete('/api/deleteaddress', (req, res, next) => {
  const id = req.body.id
  const sql = `delete from address_list where add_id="${id}"`
  connection.query(
    `select * from address_list where add_id="${id}"`,
    (e, r) => {
      if (r.length > 0) {
        connection.query(sql, (e1, r2) => {
          res.send({
            code: 200,
            msg: '删除成功'
          })
        })
      } else {
        res.send({
          code: 304,
          msg: '删除失败'
        })
      }
    }
  )
})
module.exports = router
