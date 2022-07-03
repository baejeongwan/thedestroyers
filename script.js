
const postViewModal = new bootstrap.Modal(getId('postViewModal'));
const newsListModal = new bootstrap.Modal(getId('newsListModal'));
let newsList;

init()

function init() {
    //파괴자의 날 표시
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    let stDate = new Date(2022, 06, 30);
    let endDate = new Date(year, month, day);
    let btMs = endDate.getTime() - stDate.getTime();
    let btDay = Math.abs(btMs / (1000*60*60*24))
    console.log(btDay)
    getId('dayAfterMade').innerText = "파괴자 모둠 설립후 " + btDay + "일 지남."
    //파괴자의 날 계산
    if (btDay % 100 == 0) {
        getId('destroyerDayNotice').classList.remove('d-none');
        getId('destroyerDayNotice').classList.add('show');
    }

    //뉴스 로드

    //파일 읽기
    fetch('./newslist.json')
    .then(response => {
        return response.json();
    })
    .then(jsondata => {
        newsList = jsondata;
        newsLoadComplete();
    });
}

function newsLoadComplete() {

    //파일 출력
    if (newsList.length > 0) {
        loadNewsOnCard(0);
        if (newsList.length > 1) {
            loadNewsOnCard(1);
            if (newsList.length > 2) {
                loadNewsOnCard(2);
            }
        }
    }
}

function loadNewsOnCard(num) {
    getId('card-title-' + num).innerText = newsList[num].newsTitle;
    getId('card-text-' + num).innerText = newsList[num].description;
    getId('card-date-' + num).innerText = newsList[num].date;
    getId('viewbutton-' + num).classList.remove('d-none');
}

getId('resultModal').addEventListener('hide.bs.modal', event => {
    getId('mainPage').classList.remove('d-none');
    getId('examPage').classList.add('d-none');
});



//Function to shorten code
function getId(id) {
    return document.getElementById(id);
}


async function loadFile() {
    let file = getId('fileBox').files[0];
    let fileContent = await file.text();
    let JSONFile = JSON.parse(fileContent);
    console.log(JSONFile);
    getId('viewBox').innerHTML = `
    ===표시 시작===
    시도 횟수 (브라우저 기준): ${JSONFile.try}<br>
    총점수: ${JSONFile.totalScore}<br>
    전하고 싶은 말: ${JSONFile.question6}<br>
    안내: true는 정답, false는 오답을 의미합니다<br>
    1번: ${JSONFile.question1},<br>
    2번: ${JSONFile.question2},<br>
    3번: ${JSONFile.question3},<br>
    4번: ${JSONFile.question4},<br>
    안내: none은 오답, yes는 예 선택지, no는 아니요 선택지를 의미합니다<br>
    5번: ${JSONFile.question5}<br>
    ===표시 종료===`
}

function readResult() {
    getId('mainPage').classList.add('d-none');
    getId('viewPage').classList.remove('d-none');
}

function viewPost(num) {
    getId('postViewModalLabel').innerText = newsList[num].newsTitle;
    getId('postViewModalIframe').src = newsList[num].newsFile;
    postViewModal.show();
}

function loadNewsList() {
    getId('newsListGroup').innerHTML = ""
    newsList.forEach((element, index, array) => {
        getId('newsListGroup').innerHTML += `
        <a class="list-group-item list-group-item-action" onclick="launchPostFromList(${index})">${element.newsTitle}</a>`
    });
    newsListModal.show()
}

function launchPostFromList(num) {
    newsListModal.hide()
    viewPost(num)
}
//Fix