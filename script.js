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
        "数と式": "math1-unit1.pdf",
        "集合と命題": "math1-unit2.pdf",
        "2次関数": "math1-unit3.pdf",
        "図形と軽量": "math1-unit4.pdf",
        "データの分析": "math1-unit5.pdf"
    },
    math2: {
        "式と証明": "math2-unit1.pdf",
        "複素数と方程式": "math2-unit2.pdf",
        "図形と方程式": "math2-unit3.pdf",
        "三角関数": "math2-unit4.pdf",
        "指数関数と対数関数": "math2-unit5.pdf",
        "微分法と積分法": "math2-unit6.pdf"
    },
    math3: {
        "関数": "math3-unit1.pdf",
        "極限": "math3-unit2.pdf",
        "微分法": "math3-unit3.pdf",
        "微分法の応用": "math3-unit4.pdf",
        "積分法とその応用": "math3-unit5.pdf"
    },
    mathA: {
        "場合の数と確率": "mathA-unit1.pdf",
        "図形の性質": "mathA-unit2.pdf"
    },
    mathB: {
        "数列": "mathB-unit1.pdf"
    },
    mathC: {
        "平面上のベクトル": "mathC-unit1.pdf",
        "空間のベクトル": "mathC-unit2.pdf"
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

function updateLinks() {
    const subject = document.getElementById('subject').value;
    const unit = document.getElementById('unit').value;
    const pdfLinksContainer = document.getElementById('pdf-links');

    pdfLinksContainer.innerHTML = ''; // 既存のリンクをクリア

    if (subject && unit) {
        const pdfUrl = materials[subject][unit];
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.target = '_blank'; // 新しいタブで開く
        link.textContent = `PDF: ${unit}`;
        pdfLinksContainer.appendChild(link);
        pdfLinksContainer.style.display = 'block';
    } else {
        pdfLinksContainer.style.display = 'none';
    }
}