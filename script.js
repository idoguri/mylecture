// パスコードを設定
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

// 以下、既存の関数 (updateUnits, updatePDF) をそのまま使用
const materials = {
    math1: {
        "数と式": "uploads/math1-unit1.pdf",
        "集合と命題": "uploads/math1-unit2.pdf",
        "2次関数": "uploads/math1-unit3.pdf",
        "図形と軽量": "uploads/math1-unit4.pdf",
        "データの分析": "uploads/math1-unit5.pdf"
    },
    math2: {
        "式と証明": "uploads/math2-unit1.pdf",
        "複素数と方程式": "uploads/math2-unit2.pdf",
        "図形と方程式": "uploads/math2-unit3.pdf",
        "三角関数": "uploads/math2-unit4.pdf",
        "指数関数と対数関数": "uploads/math2-unit5.pdf",
        "微分法と積分法": "uploads/math2-unit6.pdf"
    },
    mathA: {
        "場合の数と確率": "uploads/mathA-unit1.pdf",
        "図形の性質": "uploads/mathA-unit2.pdf"
    },
    mathB: {
        "数列": "uploads/mathB-unit1.pdf"
    },
    mathC: {
        "平面上のベクトル": "uploads/mathC-unit1.pdf",
        "空間のベクトル": "uploads/mathC-unit2.pdf"
    }
};

function updateUnits() {
    const subject = document.getElementById('subject').value;
    const unitSelect = document.getElementById('unit');
    unitSelect.innerHTML = '<option value="">選択してください</option>';

    if (subject) {
        const units = Object.keys(materials[subject]);
        units.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit;
            option.textContent = unit;
            unitSelect.appendChild(option);
        });
    }
}

function updatePDF() {
    const subject = document.getElementById('subject').value;
    const unit = document.getElementById('unit').value;
    const pdfViewer = document.getElementById('pdf-viewer');

    if (subject && unit) {
        pdfViewer.src = materials[subject][unit];
        pdfViewer.style.display = 'block';
    } else {
        pdfViewer.style.display = 'none';
    }
}