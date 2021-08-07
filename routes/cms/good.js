var express = require('express');
var router = express.Router();

var goodModel = require('../../model/goods')
var cateModel = require('../../model/cates')
var infoModel=require("../../model/infos")
// var jwt = require('../../utils/jwt')


// 获取所有品类
router.get('/cates', function(req, res) {
	cateModel.find({}).then(list=>{
		res.json({err: 0, msg: 'success', data: {list}})
	})
})
  
  
// 商品新增、编辑
router.post('/addOrEdit', function(req, res) {
	// 接受入参
	var { name,img,price,desc,rank,hot,cate, id,compoany,address,learning} = req.body
	// 必填字段校验
	if(!name || !price || !desc || !cate) {
		return res.json({err: 1, msg: '必填字段不完整'})
	}

	var good = {
		name,    
		price,
		desc,
		cate,
		compoany,
		address,
		learning,
		img: (img || ''),
		// 非必填字段，给默认值
		rank: (rank || 0),
		hot: (hot || false)
	}

	// 有id是修改，无id是新增
	if (id) {
		goodModel.updateOne({_id: id}, {$set: good}).then(()=>{
			res.json({err: 0, msg: 'success'})
		})
	} else {
		// 当新增入库时，才需要create_time字段
		good.create_time = Date.now()
		goodModel.insertMany([good]).then(()=>{
			// 响应客户端
			res.json({err:0, msg:'success'})
		})
	}
})

// 商品删除
router.get('/delete', function(req, res) {
	// GET取入参，使用 req.query
	// POST取入参，使用 req.body
	var { id } = req.query
	console.log('id', id)
	goodModel.deleteOne({_id: id}).then(()=>{
		res.json({err: 0, msg: 'success'})
	})
})

// 查询商品详情
router.get('/detail', function(req, res){
	var { id } = req.query
	goodModel.find({_id: id}).then(arr=>{
		res.json({err: 0, msg: 'success', data: arr[0]})
	})
})

// 商品列表查询
router.get('/list', function(req, res) {
	var { size, page, cate, hot, text } = req.query
	// 用于查询
	var params = {
		cate: (cate || ''),
		hot: (hot || false),
		name: new RegExp(text || '', 'img')   // 商品名称搜索
	}
	if(!params.cate) delete params.cate
	if(!params.hot) delete params.hot
	console.log('params', params)
	// 用户分页
	size = parseInt(size || 10)
	page = parseInt(page || 1)
	// 查询总条数
	goodModel.find(params).count().then(total=>{
		console.log('total', total)
		// 查询当前页
		goodModel.find(params).limit(size).skip(size*(page-1)).sort({create_time: -1}).then(list=>{
			res.json({err:0, msg:'success', data: {total, list}})
		})
	})
})

// 简历新增
router.post("/addresume",function(req,res){
	// 接收入参
	var {name1,major1,school1,hobby1,gender,date,political,native,schooling,location,id}=req.body
	var info={
		name1,
		major1,
		school1,
		hobby1,
		gender,
		date,
		political,
		native,
		schooling,
		location,
		// create_time : Date.now()
	}
	if (id) {
		infoModel.updateOne({_id: id}, {$set: info}).then(()=>{
			res.json({err: 0, msg: 'success编辑成功'})
		})
	}else{
			// 当新增入库时，才需要create_time字段
			info.create_time = Date.now()
			infoModel.insertMany([info]).then(()=>{
				// 响应客户端
				res.json({err:0, msg:'success新增成功'})
			})
		}
})

// 查询简历
router.get("/resume/list",function(req,res){
	infoModel.find({}).then(list=>{
		res.json({err:0,msg:"success",data:{list}})
	})
})


//简历详情
router.get('/resume/detail', function(req, res){
	var { id } = req.query
	infoModel.find({_id: id}).then(arr=>{
		res.json({err: 0, msg: 'success', data: arr[0]})
	})
})
module.exports = router;
