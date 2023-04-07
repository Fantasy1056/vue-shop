const sqlUser = {
  sqlUserTel(data) {
    return `select * from user where tel="${data.tel}"`
  },
  sqlUserPWd(data) {
    return `select * from user where tel="${data.tel}" and pwd="${data.pwd}"`
  },
  insertUser(data) {
    const token = data.tel.slice(-4)
    return `insert into user (tel,pwd,avatarUrl,nickname,token,code) values ("${data.tel}","${data.pwd}","","","${token}","${data.code}")`
  },
  sqlUserToken(data) {
    return `select * from user where token="${data.token}"`
  },
  sqlUserCode(data) {
    return `select * from user where code="${data.code}" and tel="${data.tel}"`
  },
  sqlChangePwd(data) {
    return `update user set pwd="${data.pwd}" where tel="${data.tel}"`
  },
  sqlAddToCart(data) {
    return `insert into cart_list (userid,goods_name,goods_imgUrl,goods_num,goods_price,goods_id,state) values ("${data.userid}","${data.goods_name}","${data.goods_imgUrl}","${data.goods_num}","${data.goods_price}","${data.goods_id}","${data.state}")`
  },
  sqlUserCart(data) {
    return `select * from cart_list where userid="${data.userid}"`
  },
  sqlChangeCart(data) {
    return `update cart_list set goods_num="${data.goods_num}",state="${data.state}" where goods_id="${data.goods_id}" and userid="${data.userid}"`
  },
  sqlDeleteItem(data) {
    return `delete from cart_list where goods_id="${data.goods_id}" and userid="${data.userid}"`
  },
  sqlAddNewAdd(data) {
    return `insert into address_list (userid,consignee,area,address,isDefault,moblie) values ("${data.userid}","${data.consignee}","${data.area}","${data.address}","${data.isDefault}","${data.moblie}")`
  },
  sqlGetAddress(id) {
    return `select * from address_list where add_id="${id}"`
  },
  sqlChangeDefaultAdd(data) {
    return `update address_list set isDefault="0" where isDefault="1" and userid="${data.userid}"`
  },
  sqlUpdateAddress(data) {
    return `update address_list set consignee="${data.consignee}",moblie="${data.moblie}",area="${data.area}",address="${data.address}",isDefault="${data.isDefault}" where add_id="${data.add_id}"`
  }
}
module.exports = sqlUser
