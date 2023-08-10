$storeTable = $('.js-storeTable');//店家資料 表格欄

new_element = document.createElement("script");
new_element.setAttribute("src", "js/firebase.js");
initFirebaseModule();

/**
 * -MFHcbzAt6yDk1K_weIR
cup_num
address
latitude
longitude
name
picture
 */
$(function () {
    //連接後端資料 動態生成表格 
    //可用if..else判斷 當有資料才生成表格，否則.js-memberTable 區塊顯示"尚無資料"
    $storeTable.append(
        //表格標題
        '<thead class="thead-light" border="1"><tr>' +
        '<th scope="col"></th>' +
        '<th scope="col" style="display:none">店家編號</th>' +
        '<th scope="col">店家名稱</th>' +
        '<th scope="col">營業時間</th>' +
        '<th scope="col">杯子總數</th>' +
        '<th scope="col">經度</th>' +
        '<th scope="col">緯度</th>' +
        '<th scope="col">地址</th>' +
        '<th scope="col">操作</th>' +
        '</tr></thead>'
    )
    ref_Store.on('value', (snapshot) => {
        var i = 1
        snapshot.forEach((child) => {
            $storeTable.append(
                // 表格資料//可用變數替換
                '<tbody id="myTable1"><tr class="table-item">' +
                '<th scope="row">'+i+'</th>' +
                // '<td>storeId</td>'
                '<td style="display:none">'+child.key+'</td>' +
                // '<td>store</td>'
                '<td>'+child.val().name+'</td>' +
                // '<td>time</td>'
                '<td>'+child.val().openTime+'</td>' +
                // '<td>use_time</td>'
                '<td>'+child.val().cup_num+'</td>' +
                // '<td>latitude</td>'
                '<td>'+child.val().latitude+'</td>' +
                // '<td>longitude</td>'
                '<td>'+child.val().longitude+'</td>' +
                // '<td>location</td>'
                '<td>'+child.val().address+'</td>' +
                // 編輯按鈕
                '<td><i class="far fa-edit btn" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" onclick="StoreLog(' + i + ',2)"></i><i class="far fa-trash-alt btn" data-toggle="modal" data-target="#deleteModal" data-whatever="@mdo" onclick="StoreLog(' + i + ',3)"></i></td>' +
                '</tr></tbody>'
            )
            i++
        })
        document.getElementById('showStoreNum').innerHTML = (i - 1)
    })
    $(document).ready(function () {
        $("#tableSearch1").on("keyup", function () {
          var value = $(this).val().toLowerCase();
          $("#myTable1 tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });
})