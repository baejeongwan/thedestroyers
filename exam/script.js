const resultModal = new bootstrap.Modal(getId('resultModal'));
const rulesModal = new bootstrap.Modal(getId('rulesModal'));
const toolTip = new bootstrap.Tooltip(getId('downloadBtn'));
let record;

function submitExam() {
    let score = 0;
    if (localStorage.length == 0) {
        localStorage.setItem('tryOnDevice', 1);
    } else {
        let currentValue = parseInt(localStorage.getItem('tryOnDevice'));
        localStorage.setItem('tryOnDevice', currentValue + 1);
    }
    record = {
        try: localStorage.getItem('tryOnDevice'),
        question1: false,
        question2: false,
        question3: false,
        question4: false,
        question5: 'none',
        question6: getId('question-6').value,
        totalScore: 0
    };
    if (getId('question-1').value >= 20) {
        score += 20;
        record.question1 = true;
        console.log("1st question: ok")
    }
    if (getId('question-2-1').checked) {
        score += 20;
        record.question2 = true;
        console.log("2nd question: ok")
    }

    if (getId('question-3-1').checked) {
        score += 20;
        record.question3 = true;
        console.log("3rd question: ok")
    }

    if (getId('question-4-1').checked) {
        score += 20;
        record.question4 = true;
        console.log("4th question: ok")
    }

    if (getId('question-5-1').checked || getId('question-5-2').checked) {
        score += 20;
        if (getId('question-5-1').checked) {
            record.question5 = 'yes';
        } else {
            record.question5 = 'no';
        }
        console.log("5th question: ok")
    }

    //Clear
    record.totalScore = score;
    //Display result
    if (score >= 70) {
        //Pass
        console.log('pass')
        getId('resultText').classList.forEach(function (value, index, array) {
            getId('resultText').classList.remove(value);
        });
        getId('resultText').classList.add('text-success');
        getId('resultText').innerText = "통과했습니다! (" + score + " 점)";
        getId('suggestText').innerText = "이 파일을 제출하십시오!";
        getId('download').classList.remove('d-none')
        
    } else {
        //Fail
        getId('resultText').classList.forEach(function (value, index, array) {
            getId('resultText').classList.remove(value);
        });
        getId('resultText').classList.add('text-danger');
        getId('resultText').innerText = "탈락했습니다! (" + score + " 점)";
        getId('suggestText').innerText = "안녕히 가세요! (NaN점일 경우 모든 빈칸을 채웠는지 확인해주세요)";
    }
    resultModal.show();
    //getId('examPage').reset();
}


function showRules() {
    rulesModal.show();
}

//Function to shorten code
function getId(id) {
    return document.getElementById(id);
}



function downloadResult() {
    let downloadBlob = new Blob([JSON.stringify(record)], {type: 'application/json'})
    let downloadTag = document.createElement('a');
    downloadTag.href = URL.createObjectURL(downloadBlob);
    downloadTag.download = "면접결과";
    downloadTag.click();
    downloadTag.remove();
}

getId('resultModal').addEventListener('hidden.bs.modal', function () {
    window.location.href = "/thedestroyers";
})