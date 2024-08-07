document.addEventListener("DOMContentLoaded", function () {
  const text = "도파민 중독 신지원입니다";
  const typingText = document.getElementById("typing-text");
  let index = 0;
  const typingSpeed = 100; // 타이핑 속도 (밀리초)
  const pauseBetweenLoops = 2000; // 반복 사이의 대기 시간 (밀리초)

  function type() {
    if (index < text.length) {
      typingText.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(resetAndType, pauseBetweenLoops);
    }
  }

  function resetAndType() {
    typingText.innerHTML = "";
    index = 0;
    type();
  }

  type();
});
// AOS 라이브러리 시작
AOS.init();
// AOS 라이브러리 끝

window.onscroll = function () {
  makeSticky();
};

const navbar = document.querySelector(".header");
const sticky = header.offsetTop; // 요소의 초기 위치를 기억
console.log("header.offsetTop", sticky);
let isSticky = false; // 고정 상태를 추적하기 위한 변수
let slideTimeout; // 슬라이드업 타이머
let isMouseOverNavbar = false; // 마우스가 네비게이션 바 위에 있는지 여부
let lastMouseMoveTime = 0; // 마지막 mousemove 이벤트 시간

function makeSticky() {
  if (window.pageYOffset >= sticky && !isSticky) {
    // 네비게이션 바가 처음 고정될 때
    console.log("window.pageYOffset", window.pageYOffset);
    console.log("isSticky", isSticky);
    navbar.classList.add("sticky");
    isSticky = true; // 상태를 고정됨으로 설정
    console.log("isSticky", isSticky);

    // 2초 후 슬라이드업 클래스 추가
    slideTimeout = setTimeout(() => {
      if (!isMouseOverNavbar) {
        // 마우스가 네비게이션 바에 없을 때만 슬라이드 업
        navbar.classList.add("slide-up");
        console.log("네비게이션 슬라이드업");
        console.log("isMouseOverNavbar", isMouseOverNavbar);
      }
    }, 2000);
  } else if (window.pageYOffset < sticky && isSticky) {
    // 네비게이션 바가 고정되지 않을 때
    navbar.classList.remove("sticky", "slide-up"); // 슬라이드업 상태도 제거
    isSticky = false; // 상태를 고정되지 않음으로 설정
    console.log("isSticky", isSticky);

    // 슬라이드업 타이머 취소
    clearTimeout(slideTimeout);
  }
}

// 마우스가 상단 근처에 있을 때 네비게이션 바 슬라이드다운 (throttle 적용)
window.addEventListener("mousemove", function (event) {
  const now = Date.now(); // 현재 시간을 밀리초 단위로 반환하는 함수

  if (now - lastMouseMoveTime < 100) {
    // 100ms 간격으로만 처리
    return;
  }

  lastMouseMoveTime = now;

  if (event.clientY < 50 && isSticky && !isMouseOverNavbar) {
    // 마우스가 상단 50px 이내에 있을 때
    header.classList.remove("slide-up");
    console.log("마우스가 상단에 위치하여 슬라이드다운");
  }
});

// 마우스가 네비게이션 바에 들어왔을 때
navbar.addEventListener("mouseenter", function () {
  isMouseOverHeader = true;
  if (isSticky) {
    console.log("isMouseOverNavbar", isMouseOverNavbar);
    header.classList.remove("slide-up");
    console.log("마우스가 네비게이션 바에 위치하여 슬라이드다운");
  }
});

// 마우스가 네비게이션 바를 벗어났을 때
navbar.addEventListener("mouseleave", function () {
  isMouseOverHeader = false;
  if (isSticky) {
    console.log("isMouseOverNavbar", isMouseOverNavbar);
    header.classList.add("slide-up");
    console.log("마우스가 네비게이션 바를 벗어나 슬라이드업");
  }
});
