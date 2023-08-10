$missionTable = $('.js-missionTable');//店家資料 表格欄
new_element = document.createElement("script");
new_element.setAttribute("src", "js/firebase.js");
initFirebaseModule();
document.write('<script src="js/divide.js"></script>');
/*
~mission1
content
point
rentaltimes
title
 */
$(function () {

    //連接後端資料 動態生成表格 
    //可用if..else判斷 當有資料才生成表格，否則.js-memberTable 區塊顯示"尚無資料"
    $missionTable.append(
        //表格標題
        '<thead class="thead-light" border="1"><tr>' +
        '<th scope="col"></th>' +
        '<th scope="col">任務編號</th>' +
        '<th scope="col">任務名稱</th>' +
        '<th scope="col">任務說明</th>' +
        '<th scope="col">租借次數</th>' +
        '<th scope="col">獲得點數</th>' +
        '<th scope="col">操作</th>' +
        '</tr></thead>'
    )
    ref_Mission.on('value', (snapshot) => {
        var i = 1
        snapshot.forEach((child) => {
            $missionTable.append(
                // 表格資料//可用變數替換
                '<tbody><tr class="table-item">' +
                '<th scope="row">' + i + '</th>' +
                // '<td>missionId</td>'
                '<td >' + child.key + '</td>' +
                // '<td>mission</td>'
                '<td>' + child.val().title + '</td>' +
                // '<td>mission_content</td>'
                '<td>' + child.val().content + '</td>' +
                // '<td>use_time</td>'
                '<td>' + child.val().rentaltimes + '</td>' +
                // '<td>point</td>'
                '<td>' + child.val().point + '</td>' +
                // 編輯按鈕
                '<td><i class="far fa-trash-alt btn" data-toggle="modal" data-target="#deleteModal" data-whatever="@mdo"></i></td>' +
                '</tr></tbody>'
            )
            i++
        })
        var a;
        document.getElementById('showMissionNum').innerHTML = (i - 1)
        a = "mission" + i;
        document.getElementById('showNewMissionId').innerHTML = a;
        //CupLog(a, 1)
    })
})