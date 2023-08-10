$cupTable = $('.js-cupTable');//店家資料 表格欄
document.write('<script src="js/divide.js"></script>');
//new_element = document.createElement("script");
//new_element.setAttribute("src", "js/firebase.js");
//initFirebaseModule();
/*
-SDC001
CurrentStore
UseTimes
UserId

//租借者改成email
$(function () {
    //連接後端資料 動態生成表格 
    //可用if..else判斷 當有資料才生成表格，否則.js-memberTable 區塊顯示"尚無資料"
    var store = [];
    $cupTable.append(
        //表格標題
        '<thead class="thead-light" border="1"><tr>' +
        '<th scope="col"></th>' +
        '<th scope="col">杯子編號</th>' +
        '<th scope="col">店家編號</th>' +
        '<th scope="col">使用次數</th>' +
        '<th scope="col">租借狀態</th>' +
        '<th scope="col">操作</th>' +
        '</tr></thead>'
    )
    ref_Store.once('value', (snapshot) => {
        snapshot.forEach((child) => {
            store.push({ name: child.val().name, storeId: child.key })
        })
        var collegeSelect = document.getElementById("college-list");
        var inner = "";
        for (var i = 0; i < store.length; i++) {
            inner = inner + '<option value=i>' + store[i]['name'] + '</option>';
        }
        collegeSelect.innerHTML = inner;
        ref_Cup.once('value', (snapshot) => {
            var i = 1,cupstore=''
            snapshot.forEach((child) => {
                for(var k=0;k<store.length;k++){
                    if(store[k]['storeId']==child.val().CurrentStore){
                        cupstore=store[k]['name'];
                    }
                }
                $cupTable.append(
                    // 表格資料//可用變數替換
                    '<tbody><tr class="table-item ">' +
                    '<th scope="row">' + i + '</th>' +
                    // '<td>storeId</td>'
                    '<td >' + child.key + '</td>' +
                    // '<td>store</td>'
                    '<td>' + cupstore + '<br/>'+child.val().CurrentStore+'</td>' +
                    // '<td>time</td>'
                    '<td>' + child.val().UseTimes + '</td>' +
                    // '<td>use_time</td>'
                    '<td>' + child.val().UserId + '</td>' +
                    // 編輯按鈕
                    '<td><i class="far fa-edit btn" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"></i><i class="far fa-trash-alt btn" data-toggle="modal" data-target="#deleteModal" data-whatever="@mdo"></i></td>' +
                    '</tr></tbody>'
                )
                i++
            });
            var a;
            document.getElementById('showCupNum').innerHTML = (i - 1)
            if ((i - 1) < 10) {
                a="SDC00" + i;
            }
            else if ((i - 1) >= 10 && i < 101) {
                a="SDC0" + i;
            } else {
                a="SDC" + i;
            }
            document.getElementById('showNewCupId').innerHTML = a;
            newCupLog(a,1)
        })
    })
})*/