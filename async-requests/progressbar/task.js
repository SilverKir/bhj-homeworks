const progress = document.getElementById('progress');
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(form);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
            let percentLoaded = (e.loaded / e.total);
            progress.value = percentLoaded;
        }
    };
    xhr.send(data);
});

