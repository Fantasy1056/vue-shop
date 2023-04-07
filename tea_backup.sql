/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : tea

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 05/04/2023 15:21:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address_list
-- ----------------------------
DROP TABLE IF EXISTS `address_list`;
CREATE TABLE `address_list`  (
  `userid` int NOT NULL,
  `add_id` int NOT NULL AUTO_INCREMENT,
  `consignee` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `moblie` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `area` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `isDefault` tinyint NULL DEFAULT NULL,
  PRIMARY KEY (`add_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of address_list
-- ----------------------------
INSERT INTO `address_list` VALUES (1, 4, '虎弟', '18656461056', '辽宁省 沈阳市 大东区', '沈阳大街', 1);
INSERT INTO `address_list` VALUES (1, 15, '黑头哥', '18656461056', '安徽省 六安市 霍邱县', '临淮岗', 0);
INSERT INTO `address_list` VALUES (1, 18, '白楼有限', '18656461056', '安徽省 六安市 霍邱县', '泽塔环带', 0);
INSERT INTO `address_list` VALUES (1, 19, '刀哥', '13556567878', '辽宁省 鞍山市 海城市', 'fw刀', 0);
INSERT INTO `address_list` VALUES (15, 20, '小黄', '13505644262', '安徽省 六安市 霍邱县', '临淮岗', 1);

-- ----------------------------
-- Table structure for cart_list
-- ----------------------------
DROP TABLE IF EXISTS `cart_list`;
CREATE TABLE `cart_list`  (
  `userid` int NOT NULL,
  `goods_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `goods_imgUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `goods_num` int NULL DEFAULT NULL,
  `goods_price` decimal(10, 2) NULL DEFAULT NULL,
  `goods_id` int NULL DEFAULT NULL,
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `keywords` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sales` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `state` tinyint NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cart_list
-- ----------------------------
INSERT INTO `cart_list` VALUES (1, '武夷山高级大红袍2号', 'http://img.tea7.com/0126611_0.jpeg?x-oss-process=image/resize,w_300', 1, 99.00, 2, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `cart_list` VALUES (1, '2023春茶明前龙井飞花', 'http://img.tea7.com/0149490_0.jpeg?x-oss-process=image/resize,w_800', 1, 128.00, 22, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `cart_list` VALUES (15, '消青工艺浓香铁观音1号', 'http://img.tea7.com/0130740_0.png?x-oss-process=image/resize,w_300', 1, 128.00, 24, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO `cart_list` VALUES (1, '云南凤庆高海拔古树滇红', 'http://img.tea7.com/0014005_0.jpeg?x-oss-process=image/resize,w_800', 1, 99.00, 23, NULL, NULL, NULL, NULL, NULL, 0);

-- ----------------------------
-- Table structure for home_hot
-- ----------------------------
DROP TABLE IF EXISTS `home_hot`;
CREATE TABLE `home_hot`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `imgUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of home_hot
-- ----------------------------
INSERT INTO `home_hot` VALUES (1, 'http://img.tea7.com/0116098_0.jpeg?x-oss-process=image/resize,w_720', '铁观音2號250g', '核心产区滋味正', 128.00, '老铁推荐');
INSERT INTO `home_hot` VALUES (2, 'http://img.tea7.com/0123034_0.jpeg?x-oss-process=image/resize,w_720', '正山小种3號150g', '难以忘怀的桂花香', 99.00, '爆款');
INSERT INTO `home_hot` VALUES (3, 'http://img.tea7.com/0123036_0.jpeg?x-oss-process=image/resize,w_720', '黑檀镂空六君子', '给生活一点精致的仪式感', 55.00, '茶友必备');

-- ----------------------------
-- Table structure for search_list
-- ----------------------------
DROP TABLE IF EXISTS `search_list`;
CREATE TABLE `search_list`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `imgUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` int NULL DEFAULT NULL,
  `num` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `keywords` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sales` int NULL DEFAULT NULL,
  `tip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of search_list
-- ----------------------------
INSERT INTO `search_list` VALUES (1, 'http://img.tea7.com/0012932_0.jpeg?x-oss-process=image/resize,w_300', '武夷中火醇香大红袍1号', '专为新客打造的入门级岩茶，香足味浓，恰到好处。', 99, 'null', '红茶，大红袍，茶叶', 111, NULL, NULL);
INSERT INTO `search_list` VALUES (2, 'http://img.tea7.com/0126611_0.jpeg?x-oss-process=image/resize,w_300', '武夷山高级大红袍2号', '口感清淡无负担的日常品饮。', 99, 'null', '红茶，大红袍，茶叶', 123, '轻火焙制  天然花香  ', 'recommend, like');
INSERT INTO `search_list` VALUES (3, 'http://img.tea7.com/0156516_0.jpeg?x-oss-process=image/resize,w_300', '武夷山高级大红袍3号', '产自半岩山场，原料上佳，茶汤顺滑，岩香醇浓。', 128, 'null', '红茶，大红袍，茶叶', 34, NULL, NULL);
INSERT INTO `search_list` VALUES (4, 'http://img.tea7.com/0166716_0.jpeg?x-oss-process=image/resize,w_300', '浅尝-金螺滇红', '来自彩云之南的甜蜜问候', 6, 'null', '红茶，茶叶', 321, NULL, NULL);
INSERT INTO `search_list` VALUES (5, 'http://img.tea7.com/0152541_0.jpeg?x-oss-process=image/resize,w_300', '金油滴建盏', '器表黄金龙鳞纹理片片分明，金光闪闪，值得收藏和品鉴', 298, 'nul', '茶具', 33, NULL, NULL);
INSERT INTO `search_list` VALUES (6, 'http://img.tea7.com/0170763_0.png?x-oss-process=image/resize,w_300', '黄山太平猴魁绿茶1号', '黄山雨前茶，日常爽口畅饮必备。', 99, NULL, '绿茶，猴魁，茶叶', 345, '正宗原产 幽香口感', 'recommend');
INSERT INTO `search_list` VALUES (7, 'http://img.tea7.com/0052311_0.jpeg?x-oss-process=image/resize,w_300', '历史名茶黄山毛峰1号', '产自核心产区，芽叶细嫩带香，滋味鲜爽醇厚。', 58, NULL, '绿茶，茶叶', 22, NULL, NULL);
INSERT INTO `search_list` VALUES (8, 'http://img.tea7.com/0052268_0.jpeg?x-oss-process=image/resize,w_300', '雨前头采碧螺春1号散茶', '香气悠长且滋味浓郁', 68, NULL, '绿茶，茶叶', 54, '正宗原产 幽香口感', 'recommend');
INSERT INTO `search_list` VALUES (9, 'http://img.tea7.com/0173833_0.png?x-oss-process=image/resize,w_300', '简盒装-大红袍-肉桂1號', '辛辣滋味桂皮香显，回甘迅速且持久，八泡有余韵。', 69, NULL, '红茶，大红袍，茶叶', 65, NULL, NULL);
INSERT INTO `search_list` VALUES (10, 'http://img.tea7.com/0017170_0.jpeg?x-oss-process=image/resize,w_300', '漳平水仙兰香1号', '兰香中夹杂桂香，清醇爽口。', 99, NULL, '绿茶，茶叶', 441, NULL, NULL);
INSERT INTO `search_list` VALUES (11, 'http://img.tea7.com/0169706_0.png?x-oss-process=image/resize,w_300', '祁门红茶-璀璨礼盒', NULL, 138, NULL, '红茶，茶叶', 33, NULL, NULL);
INSERT INTO `search_list` VALUES (12, 'http://img.tea7.com/0174688_0.jpeg?x-oss-process=image/resize,w_300', '组合装—红茶习茶系列·起航版（1-3）', '茶七研茶学院出品，资深茶师监制，一次喝懂红茶。', 39, NULL, '红茶，茶叶', 44, NULL, NULL);
INSERT INTO `search_list` VALUES (13, 'http://img.tea7.com/0167276_0.jpeg?x-oss-process=image/resize,w_300', '见山-坦洋工夫红茶[礼盒装]', '非遗传承人匠心监制，花香馥郁，口感醇正。', 129, NULL, '红茶，茶叶', 33, NULL, NULL);
INSERT INTO `search_list` VALUES (14, 'http://img.tea7.com/0167244_0.png?x-oss-process=image/resize,w_300', '英德红茶-英红九号', '大叶种中的优质品种，汤感稠厚，超级耐泡', 109, NULL, '红茶，茶叶', 66, NULL, NULL);
INSERT INTO `search_list` VALUES (15, 'http://img.tea7.com/0149490_0.jpeg?x-oss-process=image/resize,w_500', '2023春茶明前龙井飞花', '2023年明前龙井，全芽的外形超漂亮，口感一级棒\r\n               ', 99, NULL, '绿茶，茶叶', 123, '只采单芽 满口鲜活', 'recommend');
INSERT INTO `search_list` VALUES (16, 'http://img.tea7.com/0032494_0.jpeg?x-oss-process=image/resize,w_500', '无烟工艺正山小种2号', '由传统工艺制成，入口顺滑，耐泡度高达10泡', 89, NULL, '红茶，茶叶', 223, '浓厚薯密香', 'recommend');
INSERT INTO `search_list` VALUES (17, 'http://img.tea7.com/0130744_0.png?x-oss-process=image/resize,w_500', '云南凤庆经典蜜香滇红', '一股新鲜、清爽的蜜香', 88, NULL, '红茶，茶叶', 11, '外形讨喜  甘甜可口', 'recommend');
INSERT INTO `search_list` VALUES (20, 'http://img.tea7.com/0170739_0.png?x-oss-process=image/resize,w_800', '雨前珍稀白茶1号', '泡后酷似凤羽，名为白茶实为绿茶，新手辨茶不可绕过的路。', 68, NULL, '绿茶，茶叶', 333, NULL, 'like');
INSERT INTO `search_list` VALUES (21, 'http://img.tea7.com/0012966_0.jpeg?x-oss-process=image/resize,w_300', '武夷山灰芽花香金骏眉3号', '全芽采摘，特色是香气浓，口感偏向清甜类型，适合简单泡饮\r\n', 68, NULL, '绿茶，茶叶', 452, NULL, 'like');
INSERT INTO `search_list` VALUES (22, 'http://img.tea7.com/0149490_0.jpeg?x-oss-process=image/resize,w_800', '2023春茶明前龙井飞花', '2023年明前龙井，全芽的外形超漂亮，口感一级棒\r\n               ', 128, NULL, '绿茶，茶叶', 321, NULL, 'like');
INSERT INTO `search_list` VALUES (23, 'http://img.tea7.com/0014005_0.jpeg?x-oss-process=image/resize,w_800', '云南凤庆高海拔古树滇红', '采用80年以上的古树原料制作，手工工艺细制而成', 99, NULL, '红茶，茶叶', 332, NULL, 'like');
INSERT INTO `search_list` VALUES (24, 'http://img.tea7.com/0130740_0.png?x-oss-process=image/resize,w_300', '消青工艺浓香铁观音1号', '奶香型，汤水很醇厚。', 128, NULL, '绿茶，茶叶', 126, NULL, 'like');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `pwd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `avatarUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '18656461056', 'fantasy1056', NULL, NULL, 'fantasy1056', '1056');
INSERT INTO `user` VALUES (15, '15856430818', 'a123456', '', '', '0818', '0818');
INSERT INTO `user` VALUES (16, '13505644262', 'a123456', '', '', '4262', '4262');
INSERT INTO `user` VALUES (17, '18555667788', 'Hy1056', '', '', '7788', '7788');
INSERT INTO `user` VALUES (18, '13555446633', 'fantasy1056', '', '', '6633', '6633');

SET FOREIGN_KEY_CHECKS = 1;
