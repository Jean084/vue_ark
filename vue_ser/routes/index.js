var express = require("express");
var router = express.Router();
const mysqlmodel = require("../model/connet");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/get_character", function (req, res, next) {
  const sql = "select * from character_staff";
  mysqlmodel.querydb(sql, function (result) {
    res.send(result);
  });
  //res.render('index', { title: 'Express' });
});

router.post("/get_character_list", function (req, res, next) {
  const sql ="select staff,camp,stars,english,profession,profession_2 from character_staff";
  mysqlmodel.querydb(sql, function (result) {
    res.send(result);
  });
  //res.render('index', { title: 'Express' });
});

router.post("/get_character_one", function (req, res, next) {
  const sql ="select * from character_staff where staff='" + req.body.staff + "'";
  mysqlmodel.querydb(sql, function (result) {
    console.log(sql)
    var character_one = result[0];
    const staff = character_one.staff;
    const sql_f = "select * from skill_f where staff='" + staff + "' order by level ASC";
    mysqlmodel.querydb(sql_f, function (result) {
      console.log(sql_f)
      character_one.skill_f = result;
      const sql_b = "select * from skill_b where staff='" + staff + "'";
      mysqlmodel.querydb(sql_b, function (result) {
        console.log(sql_b)
        character_one.skill_b = result;
        const sql_t = "select * from talent where staff='" + staff + "'";
        mysqlmodel.querydb(sql_t, function (result) {
          console.log(sql_t)
          character_one.skill_t = result;
          const sql_tag ="select * from character_tag where staff='" + staff + "'";
          mysqlmodel.querydb(sql_tag, function (result) {
            console.log(sql_tag)
            character_one.tag = result[0];
            const sql_test ="select * from character_test where staff='" + staff + "'";
            mysqlmodel.querydb(sql_test, function (result) {
              console.log(sql_test)
              character_one.test = result[0];
              const sql_modesec ="select * from mode_sec where staff='" + staff + "'";
              mysqlmodel.querydb(sql_modesec, function (result) {
                console.log(sql_modesec)
                character_one.modesec = result;
                const sql_pro ="select * from profession_2 where profession_2='" +character_one.profession_2 +"'";
                mysqlmodel.querydb(sql_pro, function (result) {
                  console.log(sql_pro)
                  console.log(character_one);
                  character_one.profession_de = result[0];
                  res.send(character_one);
                });
              });
            });
          });
        });
      });
    });
  });
  //res.render('index', { title: 'Express' });
});

router.post("/get_modeinit_code", function (req, res, next) {
  console.log("getin")
  const sql =
    "select code,de from mode_init where code='" +
    req.body.code +
    "'";
    mysqlmodel.querydb(sql, function (result) {
    res.send(result[0]);
  });
});

router.post("/get_orgin", function (req, res, next) {
  const sql = "select place from place";
  mysqlmodel.querydb(sql, function (result) {
    res.send(result);
  });
  //res.render('index', { title: 'Express' });
});

router.post("/get_race", function (req, res, next) {
  const sql = "select * from race";
  mysqlmodel.querydb(sql, function (result) {
    res.send(result);
  });
  //res.render('index', { title: 'Express' });
});

router.post("/get_profession", function (req, res, next) {
  const sql = "select * from profession";
  mysqlmodel.querydb(sql, function (result) {
    res.send(result);
  });
});

router.post("/get_place", function (req, res, next) {
  const sql = "select * from place";
  mysqlmodel.querydb(sql, function (result) {
    res.send(result);
  });
});

router.post("/get_profession_2", function (req, res, next) {
  const sql =
    "select profession_2,de,cio from profession_2 where profession_1='" +
    req.body.profession +
    "'";
  mysqlmodel.querydb(sql, function (result) {
    res.send(result);
  });
});

router.post("/get_camp", function (req, res, next) {
  const sql = "select * from camp";
  mysqlmodel.querydb(sql, function (result) {
    res.send(result);
  });
});

router.post("/get_activity_0", function (req, res, next) {
  const sql = "select * from activity where type='Side Story' and again=0";
  mysqlmodel.querydb(sql, function (result) {
    res.send(result);
  });
  //res.render('index', { title: 'Express' });
});

router.post("/add_profession_2", function (req, res, next) {
  const data = req.body;
  const sql =
    "insert into profession_2(profession_1,profession_2,cio,de) values (?,?,?,?)";
  console.log(data);
  const params = [data.ico, data.ico_2, data.cio, data.de];
  mysqlmodel.insterdb(sql, params, function (result) {
    res.send(result);
  });
  //res.render('index', { title: 'Express' });
});

router.post("/add_camp", function (req, res, next) {
  const data = req.body;
  const sql = "insert into camp(name,ico,orgin) values (?,?,?)";
  const params = [data.name, data.name, data.orgin];
  mysqlmodel.insterdb(sql, params, function (result) {
    res.send(result);
  });
  //res.render('index', { title: 'Express' });
});

router.post("/add_activity", function (req, res, next) {
  const data = req.body;
  const sql =
    "insert into activity(name,type,time_start,time_end,code,pic,again,notes) values (?,?,?,?,?,?,?,?)";
  const params = [
    data.name,
    data.type,
    data.time_start,
    data.time_end,
    data.code,
    data.pic,
    data.again,
    data.notes,
  ];
  if (data.again == 1) {
    const sql0 =
      "update activity set again=1 where type='Side Story' and name='" +
      data.name +
      "'";
    mysqlmodel.updatedb(sql0, function (result) {
      console.log("update data into db");
    });
  }
  mysqlmodel.insterdb(sql, params, function (result) {
    console.log("inster data into db");
    res.send(result);
  });
  //res.render('index', { title: 'Express' });
});

router.post("/add_character", function (req, res, next) {
  const data = req.body;
  const skill_f = data.skill_f;
  const skill_b = data.skill_b;
  const talent = data.tianfu;
  const test = data.test;
  var i = 0;
  for (var i = 0; i < skill_b.length; i++) {
    const skill_b_i = skill_b[i];
    const sql =
      "insert into skill_b(name,staff,de,need,pos,icon) values (?,?,?,?,?,?)";
    const params = [
      skill_b_i.name,
      data.id,
      skill_b_i.de,
      skill_b_i.need,
      skill_b_i.pos,
      skill_b_i.ico,
    ];
    mysqlmodel.insterdb(sql, params, function (result) {
      console.log("inster data into skill_b");
      console.log(result);
    });
  }
  for (var i = 0; i < skill_f.length; i++) {
    const skill_f_i = skill_f[i];
    const sql =
      "insert into skill_f(name,staff,level,reply_way,release_way,start_tec,use_tec,time,de,note,ico) values (?,?,?,?,?,?,?,?,?,?,?)";
    const params = [
      skill_f_i.name,
      data.id,
      i + 1,
      skill_f_i.type1,
      skill_f_i.type2,
      skill_f_i.start,
      skill_f_i.use,
      skill_f_i.usetime,
      skill_f_i.de,
      skill_f_i.note,
      skill_f_i.name,
    ];
    mysqlmodel.insterdb(sql, params, function (result) {
      console.log(sql);
      console.log(result);
    });
  }
  for (var i = 0; i < talent.length; i++) {
    const talent_i = talent[i];
    const sql =
      "insert into talent(name,staff,de_zero,de_one,de_two,notes) values (?,?,?,?,?,?)";
    const params = [
      talent_i.name,
      data.id,
      talent_i.de_zero,
      talent_i.de_one,
      talent_i.de_two,
      talent_i.notes,
    ];
    mysqlmodel.insterdb(sql, params, function (result) {
      console.log(sql);
      console.log(result);
    });
  }
  const sql_test =
    "insert into character_test(staff,phy,speed,blood,pla,ski,stone) values (?,?,?,?,?,?,?)";
  const params_test = [
    data.id,
    test.phy,
    test.speed,
    test.blood,
    test.pla,
    test.ski,
    test.stone,
  ];
  mysqlmodel.insterdb(sql_test, params_test, function (result) {
    console.log(sql_test);
    console.log(result);
  });
  var tag_list = "";
  for (var i = 0; i < data.tag.length; i++) {
    if (i == 0) {
      tag_list = "";
    } else {
      tag_list += ",";
    }
    tag_list += data.tag[i];
  }
  console.log(tag_list);
  console.log(data.tag);
  const sql_tag =
    "insert into character_tag(staff,open,tag_list) values (?,?,?)";
  const params_tag = [data.id, data.open, tag_list];
  mysqlmodel.insterdb(sql_tag, params_tag, function (result) {
    console.log(sql_tag);
    console.log(result);
  });
  const sql =
    "insert into character_staff(staff,english,name,camp,stars,sex,race,orgin,profession,profession_2,exp,birth,height,spelical,sto,note,sto_mi,sto_mi_de,sto_act,sto_act_de,sto_note,obj,dang1,dang2,dang3,dang4,up) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  const params = [
    data.id,
    data.eng,
    data.real_name,
    data.camp,
    data.stars,
    data.sex,
    data.race,
    data.orgin,
    data.ico,
    data.ico_2,
    data.exp,
    data.birth,
    data.height,
    data.special,
    data.sto,
    data.sto_area,
    data.mi,
    data.mi_de,
    data.act,
    data.act_de,
    data.sto_note,
    data.obj,
    data.dang1,
    data.dang2,
    data.dang3,
    data.dang4,
    data.up,
  ];
  console.log(params);
  mysqlmodel.insterdb(sql, params, function (result) {
    console.log(sql);
    console.log(result);
    res.send(result);
  });
  //res.render('index', { title: 'Express' });
});

router.post("/add_modeinit", function (req, res, next) {
  const data = req.body;
  const sql = "insert into mode_init(code,de,profession) values (?,?,?)";
  const params = [data.code, data.de, data.profession];
  mysqlmodel.insterdb(sql, params, function (result) {
    console.log("inster data into db");
    res.send(result);
  });
  //res.render('index', { title: 'Express' });
});

router.post("/add_modesec", function (req, res, next) {
  const data = req.body;
  var img = data.name;
  if (data.code == "ORIGINAL") {
    img = data.ico_2 + "证章";
  }
  const sql =
    "insert into mode_sec(name,code,staff,new,talant,story,img,add1,add2,add3,talent2,talent3) values (?,?,?,?,?,?,?,?,?,?,?,?)";
  const params = [
    data.name,
    data.code,
    data.staff,
    data.new,
    data.talant,
    data.story,
    img,
    data.add1,
    data.add2,
    data.add3,
    data.talent2,
    data.talent3,
  ];
  mysqlmodel.insterdb(sql, params, function (result) {
    console.log("inster data into db");
    res.send(result);
  });
  //res.render('index', { title: 'Express' });
});

router.post("/get_modeinit", function (req, res, next) {
  console.log(req.body);
  const sql =
    "select code,de from mode_init where profession='" +
    req.body.profession_2 +
    "' or profession='通用'";
  mysqlmodel.querydb(sql, function (result) {
    res.send(result);
  });
});

router.post("/get_activate", function (req, res, next) {
  const sql =
    "select * from activity where YEAR(time_start)='" +
    req.body.year +"' order by time_start desc";
  mysqlmodel.querydb(sql, function (result) {
    res.send(result);
  });
});

router.post("/get_character_pro2", function (req, res, next) {
  console.log(req.body);
  const sql =
    "select staff from character_staff where profession_2='" +
    req.body.profession_2 +
    "'";
  mysqlmodel.querydb(sql, function (result) {
    console.log(result);
    res.send(result);
  });
});

router.post("/get_tanlent_staff", function (req, res, next) {
  console.log(req.body);
  const sql =
    "select * from talent where staff='" + req.body.staff + "'";
  mysqlmodel.querydb(sql, function (result) {
    console.log(result);
    res.send(result);
  });
});

router.post("/get_clothes_class", function (req, res, next) {
  console.log(req.body);
  const sql = "select * from skin_class";
  mysqlmodel.querydb(sql, function (result) {
    console.log(result);
    res.send(result);
  });
});

router.post("/get_clothes", function (req, res, next) {
  const sql = "select * from skin order by online desc";
  mysqlmodel.querydb(sql, function (result) {
    res.send(result);
  });
});

router.post("/get_clothes_b", function (req, res, next) {
  const sql = "select * from skin where class='"+req.body.class+"'";
  mysqlmodel.querydb(sql, function (result) {
    res.send(result);
  });
});

router.post("/update_character", function (req, res, next) {
  const data = req.body;
  const skill_f = data.skill_f;
  const skill_b = data.skill_b;
  const talent = data.skill_t;
  const test = data.test;
  var i = 0;
  for (var i = 0; i < skill_b.length; i++) {
    const skill_b_i = skill_b[i];
    var sql_b = ""
    if(skill_b_i.id){
      sql_b = "update skill_b set name=?,staff=?,de=?,need=?,pos=?,icon=? where id="+skill_b_i.id;
    }
    else{
      sql_b = "insert into skill_b(name,staff,de,need,pos,icon) values (?,?,?,?,?,?)";
    }
    const params = [
      skill_b_i.name,
      data.staff,
      skill_b_i.de,
      skill_b_i.need,
      skill_b_i.pos,
      skill_b_i.icon,
    ];
    mysqlmodel.insterdb(sql_b, params,function (result) {
      console.log(result);
    });
  }
  for (var i = 0; i < skill_f.length; i++) {
    const skill_f_i = skill_f[i];
    var sql_skill;
    if(skill_f_i.id){
      sql_skill = "update skill_f set name=?,staff=?,level=?,reply_way=?,release_way=?,start_tec=?,use_tec=?,time=?,de=?,note=?,ico=? where id="+skill_f_i.id;
    }else{
      sql_skill="insert into skill_f(name,staff,level,reply_way,release_way,start_tec,use_tec,time,de,note,ico) values (?,?,?,?,?,?,?,?,?,?,?)"
    }
      const params = [
      skill_f_i.name,
      data.staff,
      i + 1,
      skill_f_i.reply_way,
      skill_f_i.release_way,
      skill_f_i.start_tec,
      skill_f_i.use_tec,
      skill_f_i.time,
      skill_f_i.de,
      skill_f_i.note,
      skill_f_i.name,
    ];
    mysqlmodel.insterdb(sql_skill, params, function (result) {
      console.log(result);
    });
  }
  for (var i = 0; i < talent.length; i++) {
    const talent_i = talent[i];
    var sql_talent;
    if(talent_i.id){
      sql_talent ="update talent set name=?,staff=?,de_zero=?,de_one=?,de_two=?,notes=? where id="+talent_i.id;
    }else{
      sql_talent ="insert into talent(name,staff,de_zero,de_one,de_two,notes) values (?,?,?,?,?,?)";
    }
    const params = [
      talent_i.name,
      data.staff,
      talent_i.de_zero,
      talent_i.de_one,
      talent_i.de_two,
      talent_i.notes,
    ];
    mysqlmodel.insterdb(sql_talent, params, function (result) {
      console.log(result);
    });
  }
  var sql_test;
  
  if(test.id){
    sql_test ="update character_test set staff=?,phy=?,speed=?,blood=?,pla=?,ski=?,stone=?,note=? where id="+test.id;
  }else{
    sql_test ="insert into character_test(staff,phy,speed,blood,pla,ski,stone,note) values (?,?,?,?,?,?,?,?)";
  }
  const params_test = [
    data.staff,
    test.phy,
    test.speed,
    test.blood,
    test.pla,
    test.ski,
    test.stone,
    test.note
  ];
  mysqlmodel.insterdb(sql_test, params_test, function (result) {
    console.log(result);
  });
  var tag_list = "";
  for (var i = 0; i < data.tag_list.length; i++) {
    if (i == 0) {
      tag_list = "";
    } else {
      tag_list += ",";
    }
    tag_list += data.tag_list[i];
  }
  var sql_tag;
  
  if(data.tag){
    sql_tag ="update character_tag set staff=?,open=?,tag_list=? where id="+data.tag.id;
  }else{
    sql_tag ="insert into character_tag(staff,open,tag_list) values (?,?,?)";
  }
  const params_tag = [data.staff, data.open, tag_list];
  mysqlmodel.insterdb(sql_tag, params_tag, function (result) {
    console.log(result);
  });
  var sql;
  if(data.id){
    sql = "update character_staff set staff=?,english=?,name=?,camp=?,stars=?,sex=?,race=?,orgin=?,profession=?,profession_2=?,exp=?,birth=?,height=?,spelical=?,sto=?,note=?,sto_mi=?,sto_mi_de=?,sto_act=?,sto_act_de=?,sto_note=?,obj=?,dang1=?,dang2=?,dang3=?,dang4=?,up=? where id="+data.id;
  }else{
    sql = "insert into character_staff(staff,english,name,camp,stars,sex,race,orgin,profession,profession_2,exp,birth,height,spelical,sto,note,sto_mi,sto_mi_de,sto_act,sto_act_de,sto_note,obj,dang1,dang2,dang3,dang4,up) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  }
  const params = [
    data.staff,
    data.english,
    data.name,
    data.camp,
    data.stars,
    data.sex,
    data.race,
    data.orgin,
    data.profession,
    data.profession_2,
    data.exp,
    data.birth,
    data.height,
    data.spelical,
    data.sto,
    data.note,
    data.sto_mi,
    data.sto_mi_de,
    data.sto_act,
    data.sto_act_de,
    data.sto_note,
    data.obj,
    data.dang1,
    data.dang2,
    data.dang3,
    data.dang4,
    data.up,
  ];
  mysqlmodel.insterdb(sql, params, function (result) {
    console.log(result);
    res.send(result)
  });
  //res.render('index', { title: 'Express' });
});

router.post("/get_character_tag", function (req, res, next) {
  const sql = "select * from character_tag where open=1";
  mysqlmodel.querydb(sql, function (result) {
    res.send(result);
  });
});

router.post("/get_glory0", function (req, res, next) {
  const sql = "select * from glory0";
  mysqlmodel.querydb(sql, function (result) {
    res.send(result);
  });
});

router.post("/get_glory1_0", function (req, res, next) {
  const data = req.body;
  const class0 = data.class;
  console.log(class0)
  const sql = "select * from glory1 where class='"+class0+"'";
  mysqlmodel.querydb(sql, function (result) {
    console.log(result)
    res.send(result);
  });
});

router.post("/get_glory_0", function (req, res, next) {
  const data = req.body;
  const class0 = data.class;
  console.log(class0)
  const sql = "select * from glory where group_name='-' and class='"+class0+"'";
  mysqlmodel.querydb(sql, function (result) {
    console.log(result)
    res.send(result);
  });
});

router.post("/get_glory_1", function (req, res, next) {
  const data = req.body;
  const class0 = data.group;
  const sql = "select * from glory where group_name='"+class0+"'";
  mysqlmodel.querydb(sql, function (result) {
    res.send(result);
  });
});
module.exports = router;
