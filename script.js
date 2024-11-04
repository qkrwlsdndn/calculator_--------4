const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".display");

let firstOperand = null; //첫번째 입력값
let secondOperand = null; // 두번째 입력값
let operator = null; // 연산자
let isOperatorClicked = false; //연산자 클릭 이후

buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        const buttonValue = event.target.textContent;
    
        if (button.classList.contains("number")) {
            if (display.textContent === "0" || isOperatorClicked) { //숫자를 눌렀을때 0 이거나 연산자 클릭이후 
                display.textContent = buttonValue; //현재 버튼값을 표시
                isOperatorClicked = false; // 연산자 누르고 상태 초기화해서 다음 숫자 누를준비 
            } else {
                display.textContent += buttonValue;
            }
        }
        //연산자를 눌렀을때
        if (button.classList.contains("operator")) {
            if (firstOperand === null) { //첫번째 입력값이 아직 입력되지 않았을때
                firstOperand = parseFloat(display.textContent); //첫번째 입력값을 저장 parseFloat을 써서 문자를 숫자로 바꿔줌
            } else if (operator) { // 첫번째 입력값이 이미 있을때 
                secondOperand = parseFloat(display.textContent); // 두번째 입력값을 문자를 숫자로 바꿔줌
                firstOperand = calculate(firstOperand, operator, secondOperand);  // calculate 함수를 호출
                // calculate는 주어진 두 숫자와 연산자를 기반으로 기본적인 수학 연산을 수행하는 함수
                display.textContent = firstOperand; // 계산결과 표시 이걸 두번씩 쓴 이유는 연산자를 눌렀을대도 결과값이 나오게 하기위해서씀
            }
            operator = buttonValue; // 누른 연산자를 operator변수에 저장
            isOperatorClicked = true; //연산자가 클릭됐으니 true로 설정하고 다음 숫자 입력 시 디스플레이에 새로표시
        }
        //=눌렀을때
        if (button.classList.contains("equals") && firstOperand !== null && operator) { //첫번째 입력값이 입력값이 잇고 연산자가 설정돼있는지 확인
            secondOperand = parseFloat(display.textContent); // 현재 표시된 값을 문자를 숫자로
            display.textContent = calculate(firstOperand, operator, secondOperand); // calculate 함수를 호출
            firstOperand = null; //초기화
            operator = null;
            secondOperand = null;
        }
        //C눌렀을때 초기화시키기
        if (button.classList.contains("reset")) {
            display.textContent = "0";
            firstOperand = null;
            secondOperand = null;
            operator = null; 
        }
    });
});
//계산함수 switch도 사용가능 
function calculate(firstOperand, operator, secondOperand) {
    if (operator === "+") {
        return firstOperand + secondOperand;
    } else if (operator === "-") {
        return firstOperand - secondOperand;
    } else if (operator === "*") {
        return firstOperand * secondOperand;
    } else if (operator === "/") {
        return firstOperand / secondOperand;
    } else {
        return secondOperand;
    }
}
