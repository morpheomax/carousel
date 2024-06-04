// Simula la carga del archivo JSON
fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
        initializeSlider(data.items);
    })
    .catch(error => console.error('Error loading data:', error));

function initializeSlider(items) {
    let listItemDom = document.querySelector('.carousel .list');
    let thumbnailDom = document.querySelector('.carousel .thumbnail');

    items.forEach(item => {
        // Crear elementos del slider
        let sliderItem = document.createElement('div');
        sliderItem.classList.add('item');
        sliderItem.innerHTML = `
            <img src="${item.img}" alt="">
            <div class="content">
                <div class="author">${item.author}</div>
                <div class="title">${item.title}</div>
                <div class="topic">${item.topic}</div>
                <div class="des">${item.description}</div>
                <div class="buttons">
                    <button>SEE MORE</button>
                    <button>SUSCRIBE</button>
                </div>
            </div>
        `;

        // Crear elementos del thumbnail
        let thumbnailItem = document.createElement('div');
        thumbnailItem.classList.add('item');
        thumbnailItem.innerHTML = `
            <img src="${item.img}" alt="">
            <div class="content">
                <div class="title">Name Slider</div>
                <div class="des">Description</div>
            </div>
        `;

        listItemDom.appendChild(sliderItem);
        thumbnailDom.appendChild(thumbnailItem);
    });

    // Iniciar la funcionalidad del slider
    startSlider();
}

function startSlider() {
    let nextDom = document.querySelector('#next');
    let prevDom = document.querySelector('#prev');
    let carouselDom = document.querySelector('.carousel');
    let listItemDom = document.querySelector('.carousel .list');
    let thumbnailDom = document.querySelector('.carousel .thumbnail');

    nextDom.onclick = function() {
        showSlider('next');
    };
    prevDom.onclick = function() {
        showSlider('prev');
    };

    let timeRunning = 3000;
    let timeAutoNext = 7000;
    let runTimeOut;
    let runAutoRun = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext);

    function showSlider(type) {
        let itemSlider = document.querySelectorAll('.carousel .list .item');
        let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item');

        if (type === 'next') {
            listItemDom.appendChild(itemSlider[0]);
            thumbnailDom.appendChild(itemThumbnail[0]);
            carouselDom.classList.add('next');
        } else {
            let positionLastItem = itemSlider.length - 1;
            listItemDom.prepend(itemSlider[positionLastItem]);
            thumbnailDom.prepend(itemThumbnail[positionLastItem]);
            carouselDom.classList.add('prev');
        }

        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');
        }, timeRunning);

        clearTimeout(runAutoRun);
        runAutoRun = setTimeout(() => {
            nextDom.click();
        }, timeAutoNext);
    }
}
