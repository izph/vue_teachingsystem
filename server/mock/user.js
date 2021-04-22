let Mock = require('mockjs');
const com = require("../utils/common");
const router = require("express").Router();
let db = Mock.mock({
  'data': [{
    id: 1,
    coursename: '数学分析',
    classname: '信息与计算科学1班',
    classsize: 50,
    classtime: '周三, 1-2节',
    classlocation: '菲华楼201'


  }, {
    id: 2,
    coursename: 'Java编程',
    classname: '信息与计算科学2班',
    classsize: 48,
    classtime: '周四, 3-4节',
    classlocation: '数院201'
  }, {
    id: 3,
    coursename: '数据结构',
    classname: '信息与计算科学3班',
    classsize: 52,
    classtime: '周五, 7-8节',
    classlocation: '敬萱楼206'
  }]
});


module.exports = function (app) {
  //console.log(db)
  //获取列表数据
  router.get('/user/userinfo', function (req, res) {
    //console.log(db)
    res.json(com(true, '', db));

  });

  //获取单个详情
  router.get('/api/users/:id', function (req, res) {

    let id = req.params.id;
    let info = {
      data: {}
    };
    db.data.map(item => {
      if (item.id == id) {
        info.data = item
      }
    })

    res.status(200).json(info);

  });

  // //新增一条数据post
  // app.post('/api/users', function (req, res) {

  //   let user = req.body;
  //   user.id = Mock.mock('@id');
  //   db.data.push(user);

  //   res.status(200).json(user);

  // });

  // //修改一条数据put
  // app.put('/api/users/:id', function (req, res) {

  //   let id = req.params.id;
  //   let user = req.body;
  //   user.id = id;
  //   db.data.map((item, index) => {
  //     if (item.id == id) {
  //       db.data[index] = user;
  //     }
  //   })

  //   res.status(200).json(user);

  // });

  // //删除一条数据delete
  // app.delete('/api/users/:id', function (req, res) {

  //   let id = req.params.id;
  //   db.data.map((item, index) => {
  //     if (item.id == id) {
  //       db.data.splice(index, 1);
  //     }
  //   })

  //   res.status(200).json({ id: id });

  // });
  app.use("/api/admin", router);
}