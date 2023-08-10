$couponTable = $('.js-couponTable');//店家資料 表格欄
document.write('<script src="js/divide.js"></script>');
/**new_element = document.createElement("script");
new_element.setAttribute("src", "js/firebase.js");
initFirebaseModule();

-MDU-yYY3BZ_gafuzoRd
~content
image(之後再做)
~name
point

$(function () {

    //連接後端資料 動態生成表格 
    //可用if..else判斷 當有資料才生成表格，否則.js-memberTable 區塊顯示"尚無資料"
    $couponTable.append(
        //表格標題
        '<thead class="thead-light" border="1"><tr>' +
        '<th scope="col"></th>' +
        '<th scope="col">優惠券編號</th>' +
        '<th scope="col">優惠券名稱</th>' +
        '<th scope="col">優惠券說明</th>' +
        '<th scope="col">優惠券點數</th>' +
        '<th scope="col">操作</th>' +
        '</tr></thead>'
    )
    ref_Coupon.on('value', (snapshot) => {
        var i = 1
        snapshot.forEach((child) => {
            $couponTable.append(
                // 表格資料//可用變數替換
                '<tbody><tr class="table-item">' +
                '<th scope="row">'+i+'</th>' +
                // '<td>storeId</td>'優惠券編號
                '<td >'+child.key+'</td>' +
                // '<td>store</td>'優惠券名稱
                '<td>'+ child.val().name+'</td>' +
                // '<td>time</td>'優惠券說明
                '<td>'+child.val().content+'</td>' +
                // '<td>usetime</td>'優惠券點數
                '<td>'+ child.val().point+'</td>' +
                // 編輯按鈕
                '<td><i class="far fa-trash-alt btn" data-toggle="modal" data-target="#deleteModal" data-whatever="@mdo" onclick="CouponLog('+i+')"></i></td>' +
                '</tr></tbody>'
            )
            i++
        })
        document.getElementById('showCouponNum').innerHTML = (i - 1)
    })
}) */