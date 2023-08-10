$memberTable = $('.js-memberTable');//會員資料 表格欄
document.write('<script src="js/divide.js"></script>');
/*new_element = document.createElement("script");
new_element.setAttribute("src", "js/firebase.js");
initFirebaseModule();

email 
gender
name
otherdata
phone 
planet 
point
usetimes

$(function () {
    //連接後端資料 動態生成表格 
    //可用if..else判斷 當有資料才生成表格，否則.js-memberTable 區塊顯示"尚無資料"
    //$memberTable.append(//rowElements)
    $memberTable.append(
        //表格標題
        '<thead class="thead-light" border="1"><tr>' +
        '<th scope="col"></th>' +
        '<th scope="col">會員信箱(編號)</th>'+
        '<th scope="col">姓名</th>' +
        '<th scope="col">性別</th>' +
        '<th scope="col">電話</th>' +
        '<th scope="col">點數</th>' +
        '<th scope="col">租借狀態</th>' +
        '<th scope="col">租借次數</th>' +
        '<th scope="col">操作</th>' +
        '</tr></thead>'
    )
    ref_Member.on('value', (snapshot) => {
        var i = 1
        snapshot.forEach((child) => {
            $memberTable.append(
                '<tbody><tr class="table-item">' +
                '<th scope="row">' + i + '</th>' +
                // '<td>userId</td>'
                '<td>'+ child.val().email +"<br/>"+child.key+'</td>' +
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
                '<td>租借中</td>' +
                // '<td>times</td>'
                '<td>' + child.val().usetimes + '</td>' +
                // 編輯按鈕
                '<td><i class="far fa-edit btn" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo"></i></td>' +
                '</tr></tbody>');
            i++
        });
        document.getElementById('showMemberNum').innerHTML = (i - 1)
    });

})*/