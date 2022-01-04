// 1. 박스 두개 (전환할 환율 두개)
// 2. 드랍다운 리스트 만들기(통화)
// 3. 환율 정보 가져오기
// 3. 드랍다운 리스트에서 아이템 선택하면 아이템이 바뀜
// 4. 금액을 입력하면 실시간 반영
// 5. 드랍다운 리스트에서 아이템을 선택하면 다시 그 아이템 기준으로 환전
// 7. 반대로 밑에 박스에서 숫자를 바꿔도 윗 박스에 환율 적용

// to-do
// 6. 사용자 기준 읽기 편하게
// 8. 실시간 환율 반영

// 환율 객체 생성
let currencyRatio = {
    USD:{
        KRW: 1184.36,
        USD: 1,
        VND: 22972.50,
        unit: "달러"
    },
    KRW:{
        KRW: 1,
        USD: 0.00084,
        VND: 19.40,
        unit: "원"
   },
    VND:{  
        KRW: 0.052,
        USD: 0.000044,
        VND: 1,
        unit: "동"
 }
};

let fromCurrency = "USD";
let toCurrency  = "USD";

// 객체를 불러오는 방법
// 1. console.log(currencyRatio.VND.unit)
// 2. console.log(currencyRatio["VND"]["unit"])

// 버튼 ---------------------------
// 클릭이벤트 생성
document.querySelectorAll("#from-currency-list a").forEach((menu)=>menu.addEventListener("click",function(){
    // 1. 버튼을 가져온다
    // document.getElementsById("from-button");
    // 2. 버튼에 값을 바꾼다
    document.getElementById("from-button").textContent=this.textContent;
    // 3. 선택된 currency값을 변수에 저장한다.
    fromCurrency = this.textContent;
    console.log("fromcurrency는",fromCurrency);
    // console.log(currencyRatio[fromCurrency].unit);
    convert() // 환전 즉시 적용
    currency_name("from-name",fromCurrency) // 통화 이름 적용
    convert_to()
    })



);
function currency_name(inputId,inputText){
    let currencyName = currencyRatio[inputText].unit;
    document.getElementById(inputId).textContent = currencyName;
    // convert()
}
document.querySelectorAll("#to-currency-list a").forEach((menu)=>menu.addEventListener("click",function(){

    document.getElementById("to-button").textContent=this.textContent;
    toCurrency = this.textContent;
    console.log("tocurrency는",toCurrency);
    convert() // 환전 즉시 적용
    currency_name("to-name",toCurrency) // 통화 이름 적용
    convert_to()
})
);
// --------------------------------------
// 환전 적용 함수
//1. 키를 입력하는 순간
//2. 환전이 되고
//3. 환전된 값이 보인다

function convert(){
    // console.log("key up event issue")
    // 1. 환전
    // 금액, 현재 통화, 바꿀 통화 환율
    let amount = document.getElementById("from-input").value
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency]
    // console.log("환전 결과",convertedAmount)
    document.getElementById("to-input").value = convertedAmount;
}
// 환전 적용 아래박스
function convert_to(){
    let amount = document.getElementById("to-input").value
    let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency]

    document.getElementById("from-input").value = convertedAmount;
}