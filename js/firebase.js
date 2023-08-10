/*
~顯示杯子資料all(要加租借時間嗎？)
//修改店家編號、使用者編號
~刪除杯子
~顯示店家資料all
~新增店家
~店家修改all
~刪除店家
~顯示優惠券資料all
~新增優惠券
//資料庫家使用說明、圖片上傳
~刪除優惠券
~顯示任務表all
//新增任務表
//刪除任務表
//(最後做)訂單歸還:{1.訂單改歸還}{2.杯子使用者false}{3.杯子次數+1}{4.使用者使用次數+1}{5.使用者點數+10}{6.店家杯子數量+1}
*/

document.write('<script src="js/divide.js"></script>');
var db, ref_Store, ref_Coupon, ref_Cup, ref_Mission, ref_Member, ref_Box;
//___________________________________________________________firebase載入
function initFirebaseModule() {
    firebase.initializeApp(initFirebase());
    db = firebase.database();
    //firebase節點
    ref_Store = db.ref('/Shops/');
    ref_Coupon = db.ref('coupon');
    ref_Cup = db.ref('cups');
    ref_Mission = db.ref('/mission/');
    ref_Member = db.ref('/users/');
    ref_Box = db.ref('/Box/');
}
function getRef() {
    //initFirebaseModule
    ref_Store = db.ref('/Shops/');
    ref_Coupon = db.ref('coupon');
    ref_Cup = db.ref('cups');
    ref_Mission = db.ref('/mission/');
    ref_Member = db.ref('/users/');
    ref_Box = db.ref('/Box/');
}
var storeArray = [], memberArray = [];
function getArray() {
    ref_Store.on('value', snapshot => {
        snapshot.forEach((child) => {
            storeArray.push({
                id: child.key,
                name: child.val().name,
            })
        })
    })
    ref_Member.on('value', snapshot => {
        snapshot.forEach((child) => {
            memberArray.push({
                id: child.key,
                email: child.val().email,
            })
        })
    })
}
//___________________________________________________________LogData
function MemberLog(data) {
    //id 會員信箱	姓名	性別	電話	點數	租借狀態	租借次數
    document.getElementById('edit_mid').innerHTML = document.getElementById('Table_Member').rows[data].cells[1].innerHTML;
    document.getElementById('edit_memail').innerHTML = document.getElementById('Table_Member').rows[data].cells[2].innerHTML;
    document.getElementById('edit_mname').value = document.getElementById('Table_Member').rows[data].cells[3].innerHTML;
    document.getElementById('edit_mphone').value = document.getElementById('Table_Member').rows[data].cells[5].innerHTML;
    document.getElementById('edit_mpoint').value = document.getElementById('Table_Member').rows[data].cells[6].innerHTML;
}
var NewCup_cupId, NewCup_storeId
function CupLog(data, num) {
    var cupId, cupstore, cupstatus
    switch (num) {
        case 1: NewCup_cupId = data; break;
        case 2: NewCup_storeId = data; CreateNewCup(NewCup_cupId, NewCup_storeId); break;
        case 3:
            cupId = document.getElementById('Table_Cup').rows[data].cells[1].innerHTML;
            cupstore = document.getElementById('Table_Cup').rows[data].cells[2].innerHTML;
            var cuptimes = document.getElementById('Table_Cup').rows[data].cells[3].innerHTML;
            cupstatus = document.getElementById('Table_Cup').rows[data].cells[4].innerHTML;
            document.getElementById('delete_cupid').innerHTML = cupId
            document.getElementById('delete_cup').innerHTML = "<br/>存放店家：" + cupstore + "<br/>已使用：" + cuptimes + "次<br/>使用者：" + cupstatus;
            break;
        case 4:
            document.getElementById('edit_cupid').innerHTML = document.getElementById('Table_Cup').rows[data].cells[1].innerHTML;
            document.getElementById('edit_cupcstore').innerHTML = document.getElementById('Table_Cup').rows[data].cells[2].innerHTML;
            document.getElementById('edit_cupcstatus').innerHTML = document.getElementById('Table_Cup').rows[data].cells[4].innerHTML;
            break;
        default: break;
    }
}
function CouponLog(num) {
    var cId = document.getElementById('Table_Coupon').rows[num].cells[1].innerHTML;
    var cname = document.getElementById('Table_Coupon').rows[num].cells[2].innerHTML;
    var ccontent = document.getElementById('Table_Coupon').rows[num].cells[3].innerHTML;
    var cpoint = document.getElementById('Table_Coupon').rows[num].cells[4].innerHTML;
    //db.ref('coupon/'+cId).once('value',(snapshot)=>{})
    document.getElementById('delete_couponid').innerHTML = "優惠券編號：" + cId
    document.getElementById('delete_coupon').innerHTML = "名稱：" + cname + "<br/>說明：" + ccontent + "<br/>點數：" + cpoint;
}
function StoreLog(data, num) {
    //<!--店家編號 店家名稱 營業時間 杯子總數 經度 緯度 地址 操作-->
    var sId, sname, scup, stime, sadd, slat, slong;
    switch (num) {
        case 2:
            document.getElementById('edit_sid').innerHTML = document.getElementById('Table_Store').rows[data].cells[1].innerHTML;
            document.getElementById('edit_sname').value = document.getElementById('Table_Store').rows[data].cells[2].innerHTML;
            document.getElementById('edit_stime').value = document.getElementById('Table_Store').rows[data].cells[3].innerHTML;
            document.getElementById('edit_scup').value = document.getElementById('Table_Store').rows[data].cells[4].innerHTML;
            document.getElementById('edit_slong').value = document.getElementById('Table_Store').rows[data].cells[5].innerHTML;
            document.getElementById('edit_slat').value = document.getElementById('Table_Store').rows[data].cells[6].innerHTML;
            document.getElementById('edit_sadd').value = document.getElementById('Table_Store').rows[data].cells[7].innerHTML;
            //document.getElementById('edit_sid').value=sId;
            break;
        case 3:
            sId = document.getElementById('Table_Store').rows[data].cells[1].innerHTML;
            sname = document.getElementById('Table_Store').rows[data].cells[2].innerHTML;
            scup = document.getElementById('Table_Store').rows[data].cells[4].innerHTML;
            //db.ref('coupon/'+cId).once('value',(snapshot)=>{})
            document.getElementById('delete_storeid').innerHTML = "店家編號：" + sId
            document.getElementById('delete_store').innerHTML = "店家名稱：" + sname + "<br/>還剩餘：" + scup + "個杯子";
            break;
        case 4:
            return data;
        default: break;
    }
}
//___________________________________________________________firebase_Create
//Cup
function CreateNewCup(cupid, storeindex) {
    ref_Store.on('value', (snapshot) => {
        var storeid, i = 0
        snapshot.forEach((child) => {
            if (i == storeindex) {
                storeid = child.key;
            }
            i++
        })
        db.ref('cups/' + cupid).set({
            CurrentStore: storeid,
            UseTimes: 0,
            UserId: 'false',
            WashId: 'false'
        });
    })
    NewCup_cupId = null;
    NewCup_storeId = null;
    alert("新增成功");
    window.location.reload()
}
//Store
function CreateNewStore() {
    //<!--店家編號 店家名稱 營業時間 杯子總數 經度 緯度 地址 操作-->
    var n = document.getElementById("Store_i_name").value; //店家編名稱
    var o = document.getElementById("Store_i_opentime").value; //營業時間
    var a = document.getElementById("Store_i_add").value; //地址
    var c = document.getElementById("Store_i_cup").value; //杯子總數
    var lo = document.getElementById("Store_i_long").value; //經度
    var la = document.getElementById("Store_i_lat").value; //緯度
    ref_Store.push({
        'name': n,
        'address': a,
        'latitude': la,
        'longitude': lo,
        'cup_num': c,
        'openTime': o,
        'picture': '',
    });
    db.ref('/Shops/')
    alert("新增成功");
    window.location.reload()
}
//Coupon
function CreateNewCoupon() {
    //<!--優惠券編號	優惠券名稱	優惠券說明	優惠券點數	操作-->
    var n = document.getElementById("Coupon_i_name").value; //名稱
    var c = document.getElementById("Coupon_i_content").value; //說明
    var p = document.getElementById("Coupon_i_point").value; //點數
    ref_Coupon.push({
        'name': n,
        'content': c,
        'point': p,
        'image': '',
    });
    alert("新增成功");
    window.location.reload()
}
function CreateNewMission() {
    var mid = document.getElementById('showNewMissionId').innerHTML;
    //任務編號	任務名稱	任務說明	租借次數	獲得點數
    var n = document.getElementById("Mission_i_name").value; //名稱
    var c = document.getElementById("Mission_i_content").value; //說明
    var p = document.getElementById("Mission_i_point").value; //點數
    var t = document.getElementById("Mission_i_time").value;
    db.ref('mission/' + mid).set({
        title: n,
        content: c,
        point: parseInt(p, 10),
        rentaltimes: parseInt(t, 10),
    });
    alert("新增成功");
    window.location.reload()
}
//___________________________________________________________firebase_Update
function UpdateMember() {
    var mid = document.getElementById('edit_mid').innerHTML;
    document.getElementById('edit_memail').innerHTML;
    var mname = document.getElementById('edit_mname').value;
    var mphone = document.getElementById('edit_mphone').value;
    var mpoint = document.getElementById('edit_mpoint').value;
    db.ref("users/" + mid).update({
        name: mname,
        phone: mphone,
        point: parseInt(mpoint, 10),
    })
    alert("新增成功");
}
function UpdateStore() {
    var sId, sname, scup, stime, sadd, slat, slong;
    sId = document.getElementById('edit_sid').innerHTML
    sname = document.getElementById('edit_sname').value
    stime = document.getElementById('edit_stime').value
    scup = document.getElementById('edit_scup').value
    slong = document.getElementById('edit_slong').value
    slat = document.getElementById('edit_slat').value
    sadd = document.getElementById('edit_sadd').value
    db.ref("Shops/" + sId).update({
        address: sadd,
        cup_num: parseInt(scup, 10),
        latitude: slat,
        longitude: slong,
        name: sname,
        openTime: stime,
    })
    alert("更改成功");
    window.location.reload()
}
function UpdateCup(cid) {
    var store, member, sid, mid;
    if ($("#R").prop("checked")) {
        store = document.getElementById('c_store-list').value;
        for (var k = 0; k < storeArray.length; k++) {
            if (store == storeArray[k]['name']) {
                sid = storeArray[k]['id']
                db.ref("cups/" + cid).update({
                    CurrentStore: sid
                })
            }
            if (store == '清洗中') {
                db.ref("cups/" + cid).update({
                    CurrentStore: 'false'
                })
            }
        }
    }
    if ($("#L").prop("checked")) {
        member = document.getElementById('c_member-list').value;
        for (var h = 0; h < memberArray.length; h++) {
            if (member == memberArray[h]['email']) {
                mid = memberArray[h]['id']
                db.ref("cups/" + cid).update({
                    UserId: mid
                })
            }
        }
    }
    alert("更改成功");
}
var indexid, indexchose;
function BoxUpdate(data, num) {
    switch (num) {
        case 1: index = data; break;
        case 2: var bid = document.getElementById('Table_washed').rows[index].cells[2].innerHTML;
            var store = document.getElementById('divide-store-list').value;
            for (var i = 0; i < storeArray.length; i++) {
                if (store == storeArray[i]['name']) {
                    nsid = storeArray[i]['id'];
                    break;
                }
            }
            db.ref("Box/" + bid).update({ storeId: nsid, wash: false });
            alert("更改成功");
            break;
        case 3: indexchose = data; break;
        case 4:
            var bid = document.getElementById('Table_washed').rows[data].cells[2].innerHTML;
            db.ref("Box/" + bid).update({ wash: false });
            alert("配送成功");
            break;
        default: break;
    }
}
//___________________________________________________________firebase_Delete
function DeleteCoupon(cid) {
    db.ref("coupon/" + cid).remove();
    alert("刪除成功");
    window.location.reload()
}
function DeleteCup(cupid) {
    console.log(cupid);
    db.ref("cups/" + cupid).remove();
    alert("刪除成功");
}
function DeleteStore(sid) {
    db.ref("Shops/" + sid).remove();
    alert("刪除成功");
    window.location.reload()
}
var bindex;
function BoxClear(data, num) {
    switch (num) {
        case 1: bindex = data; break;
        case 2: bid = document.getElementById('Table_unwash').rows[bindex].cells[2].innerHTML;
            db.ref("Box/" + bid).update({ wash: true });
            alert("杯子已送去工廠清洗");
            break;
    }
}
//___________________________________________________________initTable
function initMember() {
    ref_Member.on('value', (snapshot) => {
        var i = 1
        var tablestr = []
        snapshot.forEach((child) => {
            var a = "無記錄", b = 0;
            if (child.val().myorder != null) {
                db.ref('users/' + child.key + '/myorder').on('value', (snapshot) => {
                    snapshot.forEach((child) => {
                        if (child.val().useState == 'true') {
                            b = 1;
                        }
                    })
                    if (b == 1) {
                        a = "租借中"
                    } else {
                        a = "已歸還"
                    }
                })
            }
            tablestr[i] =
                '<tbody id="myTable"><tr class="table-item">' +
                '<th scope="row">' + i + '</th>' +
                '<td style="display:none">' + child.key + '</td>' +
                // '<td>userId</td>'
                '<td>' + child.val().email + '</td>' +
                //'<td>userMail</td>'+
                // '<td>userName</td>'
                '<td id="u_name">' + child.val().name + '</td>' +
                // '<td>userSex</td>'
                '<td id="u_gender">' + child.val().gender + '</td>' +
                // '<td>userPhone</td>'
                '<td>' + child.val().phone + '</td>' +
                // '<td>point</td>'
                '<td>' + child.val().point + '</td>' +
                // '<td>state</td>'
                '<td>' + a + '</td>' +
                // '<td>times</td>'
                '<td>' + child.val().usetimes + '</td>' +
                // 編輯按鈕
                '<td><i class="far fa-edit btn" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" onclick="MemberLog(' + i + ')"></i></td>' +
                '</tr></tbody>';
            i++

        });

        inputMemberTable(tablestr);
        document.getElementById('showMemberNum').innerHTML = (i - 1)
    });
    $(document).ready(function () {
        $("#tableSearch").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

}
function initCoupon() {
    ref_Coupon.on('value', (snapshot) => {
        var i = 1
        var tablestr = []
        snapshot.forEach((child) => {
            tablestr[i] =
                // 表格資料//可用變數替換
                '<tbody id="myTable3"><tr class="table-item">' +
                '<th scope="row">' + i + '</th>' +
                // '<td>storeId</td>'優惠券編號
                '<td style="display:none">' + child.key + '</td>' +
                // '<td>store</td>'優惠券名稱
                '<td>' + child.val().name + '</td>' +
                // '<td>time</td>'優惠券說明
                '<td>' + child.val().content + '</td>' +
                // '<td>usetime</td>'優惠券點數
                '<td>' + child.val().point + '</td>' +
                // 編輯按鈕
                '<td><i class="far fa-trash-alt btn" data-toggle="modal" data-target="#deleteModal" data-whatever="@mdo" onclick="CouponLog(' + i + ')"></i></td>' +
                '</tr></tbody>';

            i++
        })
        inputCouponTable(tablestr);
        document.getElementById('showCouponNum').innerHTML = (i - 1)
    })
    $(document).ready(function () {
        $("#tableSearch3").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable3 tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });
}
function initCup() {
    //getArray();
    //var store = [];
    //ref_Store.on('value', (snapshot) => {
    //    snapshot.forEach((child) => {
    //        store.push({ name: child.val().name, storeId: child.key })
    //    })
    ref_Cup.on('value', (snapshot) => {
        var collegeSelect = document.getElementById("college-list");
        var inner = "";
        for (var i = 0; i < storeArray.length; i++) {
            inner = inner + '<option value=i>' + storeArray[i]['name'] + '</option>';
        }
        collegeSelect.innerHTML = inner;
        var tablestr = []
        var i = 1, cupstore = '', member = 'false'
        snapshot.forEach((child) => {
            for (var k = 0; k < storeArray.length; k++) {
                if (storeArray[k]['id'] == child.val().CurrentStore) {
                    cupstore = storeArray[k]['name'];
                }
            }
            for (var r = 0; r < memberArray.length; r++) {
                if (memberArray[r]['id'] == child.val().UserId) {
                    member = memberArray[r]['email'];
                    break;
                } else {
                    member = "無"
                }
            }
            tablestr[i] =
                // 表格資料//可用變數替換
                '<tbody id="myTable2"><tr class="table-item ">' +
                '<th scope="row">' + i + '</th>' +
                // '<td>storeId</td>'
                '<td >' + child.key + '</td>' +
                // '<td>store</td>'
                '<td>' + cupstore + '</td>' +
                // '<td>time</td>'
                '<td>' + child.val().UseTimes + '</td>' +
                // '<td>use_time</td>'
                '<td>' + member + '</td>' +
                '<td>' + child.val().WashId + '</td>' +
                // 編輯按鈕
                '<td><i class="far fa-edit btn" id="cup_edit" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" onclick="CupLog(' + i + ',4)"></i><i class="far fa-trash-alt btn" data-toggle="modal" data-target="#deleteModal" data-whatever="@mdo" onclick="CupLog(' + i + ',3)"></i></td>' +
                '</tr></tbody>';
            i++
        });
        inputCupTable(tablestr);
        var a;
        document.getElementById('showCupNum').innerHTML = (i - 1)
        if ((i - 1) < 10) {
            a = "SDC00" + i;
        }
        else if ((i - 1) >= 10 && i < 101) {
            a = "SDC0" + i;
        } else {
            a = "SDC" + i;
        }
        document.getElementById('showNewCupId').innerHTML = a;
        CupLog(a, 1)
    })
    $(document).ready(function () {
        $("#tableSearch2").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable2 tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });
}
function initStoreStatus() {
    ref_Store.on('value', (snapshot) => {
        var i = 1, tablestr = [];
        snapshot.forEach((child) => {
            var cupnum = child.val().cup_num < 50 ? '<label type="text" style="color:red;border-width:2px;border;border-color:red">杯子不足</label>' : '';
            var washcupnum = child.val().washCup > 50 ? '<label type="text" style="color:red;border-width:2px;border;border-color:red">達標需回收</label>' : '';
            tablestr[i] =
                // 表格資料//可用變數替換
                '<tbody id="myTable4"><tr class="table-item">' +
                '<th scope="row">' + i + '</th>' +
                // '<td>storeId店家編號</td>'
                '<td style="display:none">' + child.key + '</td>' +
                // '<td>store</td>'
                '<td>' + child.val().name + '</td>' +
                // '<td>time</td>'
                '<td>' + child.val().cup_num + '</td>' +
                '<td>' + cupnum + '</td>' +
                '<td>' + child.val().washCup + '</td>' +
                '<td>' + washcupnum + '</td>' +
                '</tr></tbody>';
            i++
        })
        inputStoreStatus(tablestr);
    })

    $(document).ready(function () {
        $("#tableSearch4").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable4 tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });
}
function initunWash() {
    ref_Box.on('value', (snapshot) => {
        var i = 1;
        var tablestr = []
        snapshot.forEach((child) => {
            if (child.val().wash == false) {
                var storename, storeid;
                for (var k = 0; k < storeArray.length; k++) {
                    if (storeArray[k]['id'] == child.val().storeId) {
                        storename = storeArray[k]['name'];
                        storeid = storeArray[k]['id'];
                        tablestr[i] =
                            // 表格資料//可用變數替換
                            '<tbody id="myTable5"><tr class="table-item">' +
                            '<th scope="row">' + i + '</th>' +
                            '<td style="display:none">' + storeid + '</td>' +
                            '<td>' + child.key + '</td>' +
                            '<td>' + storename + '</td>' +
                            //  '<td>' + child.val().washCup + '</td>' +
                            // 編輯按鈕
                            '<td><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal" data-whatever="@mdo" onclick="BoxClear(' + i + ',1)">清洗</button></td>' +
                            '</tr></tbody>';
                        i++
                    }
                }
            }
        })
        inputWashCupTable(tablestr);
    })
}
function divideCup() {
    ref_Box.on('value', (snapshot) => {
        var dividestoreselect = document.getElementById("divide-store-list");
        var dStoreinner = "";
        for (var j = 0; j < storeArray.length; j++) {
            dStoreinner = dStoreinner + '<option value="' + storeArray[j]['name'] + '">' + storeArray[j]['name'] + '</option>';
        }
        dividestoreselect.innerHTML = dStoreinner;
        var tablestr = []
        var i = 1;
        snapshot.forEach((child) => {
            if (child.val().wash == true) {
                var storename, storeid;
                for (var k = 0; k < storeArray.length; k++) {
                    if (storeArray[k]['id'] == child.val().storeId) {
                        storename = storeArray[k]['name'];
                        storeid = storeArray[k]['id'];
                        tablestr[i] =
                            // 表格資料//可用變數替換
                            '<tbody><tr class="table-item">' +
                            '<th scope="row">' + i + '</th>' +
                            '<td style="display:none">' + storeid + '</td>' +
                            '<td>' + child.key + '</td>' +
                            '<td>' + storename + '</td>' +
                            //  '<td>' + child.val().washCup + '</td>' +
                            // 編輯按鈕
                            '<td><button style="margin-right:10px" type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#divideModal" onclick="BoxUpdate(' + i + ',1)">分派其他店家</button>' +
                            '<button type="button" class="btn btn-secondary btn-sm " style="border-radius: 5px;background-color: #8db2c6;border-width: inherit;border-color:#8db2c6;color: #f5f5f5;" onclick="BoxUpdate(' + i + ',4)">分派</button></td>' +
                            '</tr></tbody>';
                        i++
                    }
                }
            }
        })
        inputdivideCupTable(tablestr);
    })
}
function inputMemberTable(data) {
    $memberTable.empty();
    $memberTable.append(
        //表格標題
        '<thead class="thead-light" border="1"><tr>' +
        '<th scope="col"></th>' +
        '<th style="display:none">會員編號</th>' +
        '<th scope="col">會員信箱</th>' +
        '<th scope="col">姓名</th>' +
        '<th scope="col">性別</th>' +
        '<th scope="col">電話</th>' +
        '<th scope="col">點數</th>' +
        '<th scope="col">租借狀態</th>' +
        '<th scope="col">租借次數</th>' +
        '<th scope="col">操作</th>' +
        '</tr></thead>'
    )
    $memberTable.append(data)
}
function inputCouponTable(data) {
    $couponTable.empty();
    $couponTable.append(
        //表格標題
        '<thead class="thead-light" border="1"><tr>' +
        '<th scope="col"></th>' +
        '<th scope="col" style="display:none">優惠券編號</th>' +
        '<th scope="col">優惠券名稱</th>' +
        '<th scope="col">優惠券說明</th>' +
        '<th scope="col">優惠券點數</th>' +
        '<th scope="col">操作</th>' +
        '</tr></thead>'
    )
    $couponTable.append(data)
}
function inputCupTable(data) {
    $cupTable.empty();
    $cupTable.append(
        //表格標題
        '<thead class="thead-light" border="1"><tr>' +
        '<th scope="col"></th>' +
        '<th scope="col">杯子編號</th>' +
        '<th scope="col">店家編號</th>' +
        '<th scope="col">使用次數</th>' +
        '<th scope="col">租借狀態</th>' +
        '<th scope="col">回收序號</th>' +
        '<th scope="col">操作</th>' +
        '</tr></thead>'
    )
    $cupTable.append(data)
}
function inputStoreStatus(data) {
    $storeStatusTable = $('.js-storeStatusTable');
    $storeStatusTable.empty();
    $storeStatusTable.append(
        //表格標題
        '<thead class="thead-light" border="1"><tr>' +
        '<th scope="col"></th>' +
        '<th scope="col" style="display:none">店家編號</th>' +
        '<th scope="col">店家名稱</th>' +
        '<th scope="col">可使用杯子</th>' +
        '<th scope="col">狀態</th>' +
        '<th scope="col">已使用杯子</th>' +
        '<th scope="col">狀態</th>' +
        '</tr></thead>'
    )
    $storeStatusTable.append(data);
}
function inputdivideCupTable(data) {
    $washedTable = $('.js-washedTable');
    $washedTable.empty();
    $washedTable.append(
        //表格標題
        '<thead class="thead-light" border="1"><tr>' +
        '<th scope="col"></th>' +
        '<th scope="col" style="display:none">店家編號</th>' +
        '<th scope="col">箱子編號</th>' +
        '<th scope="col">店家名稱</th>' +
        '<th scope="col">操作</th>' +
        '</tr></thead>'
    )
    $washedTable.append(data);
}
function inputWashCupTable(data) {
    $unwashTable = $('.js-unwashTable');
    $unwashTable.empty();
    $unwashTable.append(
        //表格標題
        '<thead class="thead-light" border="1"><tr>' +
        '<th scope="col"></th>' +
        '<th scope="col" style="display:none">店家編號</th>' +
        '<th scope="col">箱子編號</th>' +
        '<th scope="col">店家名稱</th>' +
        '<th scope="col">操作</th>' +
        '</tr></thead>'
    )
    $unwashTable.append(data);
}
//___________________________________________________________SyncFrom
function getcheckbox(num) {
    switch (num) {
        case 1:
            if ($("#R").prop("checked")) {
                var storelist = document.getElementById("c_store-list");
                var inner = "<option value=i>清洗中</option>";
                for (var i = 0; i < storeArray.length; i++) {
                    inner = inner + '<option >' + storeArray[i]['name'] + '</option>';
                }
                storelist.innerHTML = inner;
                document.getElementById("c_store-list").innerHTML += innermember;
                document.getElementById('c_store-list').style.visibility = "visible";
                document.getElementById('c_store-title').style.visibility = "visible";
            } else {
                document.getElementById('c_store-list').style.visibility = "hidden";
                document.getElementById('c_store-title').style.visibility = "hidden";
            } break;
        case 2:
            if ($('#L').prop("checked")) {
                var memberlist = document.getElementById("c_member-list");
                var innermember = "<option value=i>無</option>";
                for (var i = 0; i < memberArray.length; i++) {
                    innermember = innermember + '<option >' + memberArray[i]['email'] + '</option>';
                }
                memberlist.innerHTML = innermember;
                document.getElementById('c_member-list').style.visibility = "visible";
                document.getElementById('c_member-title').style.visibility = "visible";
            } else {
                document.getElementById('c_member-list').style.visibility = "hidden";
                document.getElementById('c_member-title').style.visibility = "hidden";
            } break;
        default: break;
    }
}
//___________________________________________________________Chart
function userChart() {
    var marray = [];
    ref_Member.on('value', snapshot => {
        var i = 1, j = 0, k = 1;
        marray[0] = [];
        marray[0][0] = 0;
        marray[0][1] = 0;
        snapshot.forEach((child) => {
            marray[i] = []
            marray[i][j] = i;
            marray[i][k] = child.val().usetimes;
            i++;
        })
        google.charts.load('current', { 'packages': ['scatter'] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = new google.visualization.DataTable();
            data.addColumn('number', '使用者編號');
            data.addColumn('number', '總量');
            data.addRows(marray);
            var options = {
                width: 600,
                height: 350,
                chart: {
                    title: '使用者每月使用杯子數量',
                    //subtitle: 'based on hours studied'
                },
                hAxis: { title: '使用者編號' },
                vAxis: { title: '使用量' }
            };
            var chart = new google.charts.Scatter(document.getElementById('scatterchart_material'));
            chart.draw(data, google.charts.Scatter.convertOptions(options));
        }
    })
}
function storeChart() {
    google.charts.load('current', { 'packages': ['line'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', '月份');
        ref_Store.on('value', snapshot => {
            var i = 1;
            var sarray = [];
            sarray[0] = []; sarray[1] = []; sarray[2] = [];
            sarray[0][0] = 9;
            sarray[1][0] = 10;
            sarray[2][0] = 11;
            snapshot.forEach((child) => {
                if (child.child("history/2020-09").exists()) {
                    console.log(child.child("history/2020-09").exists());
                    data.addColumn('number', child.val().name);
                    sarray[0][i] = child.child("history/2020-09").val().cup
                    sarray[1][i] = child.child("history/2020-10").val().cup
                    sarray[2][i] = child.child("history/2020-11").val().cup
                    i++;
                }
            })
            data.addRows(sarray)
            var options = {
                chart: {
                    title: '店家每月租借杯子數量',
                },
                width: 800,
                height: 350,

            };
            var chart = new google.charts.Line(document.getElementById('line_top_x'));
            chart.draw(data, google.charts.Line.convertOptions(options));
        })
    }
}
function cupChart() {
    ref_Cup.on('value', snapshot => {
        var using = 0, washing = 0, none = 0;
        snapshot.forEach((child) => {
            if (child.val().UserId != "false") {
                using++;
            }
            else {
                if (child.val().WashId == "false") {
                    none++;
                } else {
                    washing++;
                }
            }
        })
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Pizza');
            data.addColumn('number', 'Populartiy');
            data.addRows([
                ['使用中', using],
                ['廠商清洗中', washing],
                ['待租借', none],
                ['遺失', 0],
            ]);
            var options = {
                backgroundColor: 'white',
                chart: {
                    title: '杯子狀態',
                    titleTextStyle: { color: 'black' },
                },
            };
            var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }
    })
}
function divideChart() {
    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        ref_Store.on('value', snapshot => {
            var scarray = [], i = 1;
            scarray[0] = ['', '已租借', '已歸還'];
            snapshot.forEach((child) => {
                if (child.child("history/").exists()) {
                    scarray[i] = []
                    scarray[i][0] = child.val().name;
                    scarray[i][1] = child.child("history/").val().dayNumCup
                    scarray[i][2] = child.child("history/").val().dayNumWashCup
                    i++;
                }
            })
            var data = google.visualization.arrayToDataTable(scarray);
            var options = {

                chart: {
                    title: '杯子使用狀況',
                    titleTextStyle: { color: 'black' }
                }
            };
            var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
            chart.draw(data, google.charts.Bar.convertOptions(options));
        })
    }
}