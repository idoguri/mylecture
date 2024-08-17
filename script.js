const correctPassword = "kaito"; // ここに設定したいパスコードを入力

function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === correctPassword) {
        document.getElementById('access-form').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
}

const materials = {
    math1: {
        "数と式": "pdfs/math1-unit1.pdf",
        "集合と命題": "pdfs/math1-unit2.pdf"
        // 他の資料も同様に追加
    },
    math2: {
        "式と証明": "pdfs/math2-unit1.pdf"
        // 他の資料も同様に追加
    }
    // 他の科目も同様に追加
};

function updateUnits() {
    const subject = document.getElementById('subject').value;
    const unitSelect = document.getElementById('unit');
    unitSelect.innerHTML = '<option value="">選択してください</option>';

    if (subject) {
        const units = Object.keys(materials[subject]);
        units.forEach(unit => {
            const option = document.createElement('option');
            option.value = materials[subject][unit];
            option.textContent = unit;
            unitSelect.appendChild(option);
        });
    }
}

// PDF.jsの設定
let pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 1.5, // 拡大率を調整
    canvas = document.getElementById('pdf-canvas'),
    ctx = canvas.getContext('2d');

// PDFを読み込む
function loadPDF() {
    const pdfUrl = document.getElementById('unit').value;
    if (pdfUrl) {
        pdfjsLib.getDocument(pdfUrl).promise.then(function (pdf) {
            pdfDoc = pdf;
            document.getElementById('page-controls').style.display = 'block';
            renderPage(pageNum);
        });
    }
}

// 指定されたページを描画
function renderPage(num) {
    pageRendering = true;
    pdfDoc.getPage(num).then(function(page) {
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        const renderTask = page.render(renderContext);

        renderTask.promise.then(function () {
            pageRendering = false;

            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });

        document.getElementById('page-info').textContent = `ページ ${num} / ${pdfDoc.numPages}`;
    });
}

// 次のページへ
document.getElementById('next-page').addEventListener('click', function () {
    if (pageNum >= pdfDoc.numPages) return;
    pageNum++;
    renderPage(pageNum);
});

// 前のページへ
document.getElementById('prev-page').addEventListener('click', function () {
    if (pageNum <= 1) return;
    pageNum--;
    renderPage(pageNum);
});
