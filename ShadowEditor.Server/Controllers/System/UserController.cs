﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web;
using System.IO;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;
using ShadowEditor.Server.Base;
using ShadowEditor.Server.Helpers;
using ShadowEditor.Model.System;

namespace ShadowEditor.Server.Controllers.System
{
    /// <summary>
    /// 用户控制器
    /// </summary>
    public class UserController : ApiBase
    {
        /// <summary>
        /// 获取列表
        /// </summary>
        /// <param name="pageSize"></param>
        /// <param name="pageNum"></param>
        /// <param name="keyword"></param>
        /// <returns></returns>
        [HttpGet]
        public JsonResult List(int pageSize = 20, int pageNum = 1, string keyword = "")
        {
            var mongo = new MongoHelper();

            var filter = Builders<BsonDocument>.Filter.Ne("Status", -1);

            if (!string.IsNullOrEmpty(keyword))
            {
                var filter1 = Builders<BsonDocument>.Filter.Regex("Name", keyword);
                filter = Builders<BsonDocument>.Filter.And(filter, filter1);
            }

            var sort = Builders<BsonDocument>.Sort.Descending("_id");

            var total = mongo.Count(Constant.UserCollectionName, filter);
            var docs = mongo.FindMany(Constant.UserCollectionName, filter)
                .Sort(sort)
                .Skip(pageSize * (pageNum - 1))
                .Limit(pageSize)
                .ToList();

            var rows = new List<UserModel>();

            foreach (var doc in docs)
            {
                rows.Add(new UserModel
                {
                    ID = doc["_id"].ToString(),
                    Name = doc["Name"].ToString(),
                    CreateTime = doc["CreateTime"].ToLocalTime(),
                    UpdateTime = doc["UpdateTime"].ToLocalTime(),
                    Status = doc["Status"].ToInt32(),
                });
            }

            return Json(new
            {
                Code = 200,
                Msg = "Get Successfully!",
                Data = new
                {
                    total,
                    rows,
                },
            });
        }

        /// <summary>
        /// 添加
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Add(UserEditModel model)
        {
            if (string.IsNullOrEmpty(model.Name))
            {
                return Json(new
                {
                    Code = 300,
                    Msg = "Name is not allowed to be empty."
                });
            }

            if (model.Name.StartsWith("_"))
            {
                return Json(new
                {
                    Code = 300,
                    Msg = "Name is not allowed to start with _."
                });
            }

            var mongo = new MongoHelper();

            var filter = Builders<BsonDocument>.Filter.Eq("Name", model.Name);

            var count = mongo.Count(Constant.UserCollectionName, filter);

            if (count > 0)
            {
                return Json(new
                {
                    Code = 300,
                    Msg = "The name is already existed.",
                });
            }

            var now = DateTime.Now;

            var doc = new BsonDocument
            {
                ["ID"] = ObjectId.GenerateNewId(),
                ["Name"] = model.Name,
                ["CreateTime"] = now,
                ["UpdateTime"] = now,
                ["Status"] = 0,
            };

            mongo.InsertOne(Constant.UserCollectionName, doc);

            return Json(new
            {
                Code = 200,
                Msg = "Saved successfully!"
            });
        }

        /// <summary>
        /// 编辑
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Edit(UserEditModel model)
        {
            var objectId = ObjectId.GenerateNewId();

            if (!string.IsNullOrEmpty(model.ID) && !ObjectId.TryParse(model.ID, out objectId))
            {
                return Json(new
                {
                    Code = 300,
                    Msg = "ID is not allowed."
                });
            }

            if (string.IsNullOrEmpty(model.Name))
            {
                return Json(new
                {
                    Code = 300,
                    Msg = "Name is not allowed to be empty."
                });
            }

            if (model.Name.StartsWith("_"))
            {
                return Json(new
                {
                    Code = 300,
                    Msg = "Name is not allowed to start with _."
                });
            }

            var mongo = new MongoHelper();

            var filter = Builders<BsonDocument>.Filter.Eq("_id", objectId);
            var update1 = Builders<BsonDocument>.Update.Set("Name", model.Name);
            var update2 = Builders<BsonDocument>.Update.Set("UpdateTime", DateTime.Now);

            var update = Builders<BsonDocument>.Update.Combine(update1, update2);

            mongo.UpdateOne(Constant.UserCollectionName, filter, update);

            return Json(new
            {
                Code = 200,
                Msg = "Saved successfully!"
            });
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Delete(string ID)
        {
            var objectId = ObjectId.GenerateNewId();

            if (!string.IsNullOrEmpty(ID) && !ObjectId.TryParse(ID, out objectId))
            {
                return Json(new
                {
                    Code = 300,
                    Msg = "ID is not allowed."
                });
            }

            var mongo = new MongoHelper();

            var filter = Builders<BsonDocument>.Filter.Eq("_id", objectId);
            var doc = mongo.FindOne(Constant.UserCollectionName, filter);

            if (doc == null)
            {
                return Json(new
                {
                    Code = 300,
                    Msg = "The asset is not existed!"
                });
            }

            var update = Builders<BsonDocument>.Update.Set("Status", -1);

            mongo.UpdateOne(Constant.UserCollectionName, filter, update);

            return Json(new
            {
                Code = 200,
                Msg = "Delete successfully!"
            });
        }
    }
}
