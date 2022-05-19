const API_KEY = 'api_key=d01949766174c200525985c5cc3cd64a';
const BASE_URL = 'https://api.themoviedb.org/3';
const START_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc' + '&' + API_KEY;

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/original';

const mainEle = document.getElementById('movieContent');

const form = document.querySelector('.navForm');
const search = document.querySelector('.navSearch');

const searchicon = document.querySelector('.icon');

const search_URL = BASE_URL + '/search/movie?' + API_KEY;

const getColor = (num) => {
    if(num >= 8) {
        return 'rating-green';
    }else if(num >= 5) {
        return 'rating-orange';
    }
 
    return 'rating-red';
}
const showMovies = (data) => {
    mainEle.innerHTML = '';

    data.forEach(movie => {
        const {title , poster_path , vote_average , overview} = movie;
        const currMovie = document.createElement('div');
        currMovie.classList.add('movie');

        currMovie.innerHTML = `
            <img src="${poster_path ? IMG_BASE_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="#Image#">
            
            <div class="movieInfo">
                <h3 class="movieTitle">${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>

            <div class="review">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;


        mainEle.appendChild(currMovie);

    });
};
const getMovies = (url) => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        showMovies(data.results);
    })
    .catch(err => {
        console.log(err);

    })
};

getMovies(START_URL);

form.addEventListener('submit' , (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(search_URL + '&query=' + searchTerm);
    }else {
        getMovies(START_URL);
    }

    // console.log(search_URL + '&query=' + searchTerm);
});

searchicon.addEventListener('click' , (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(search_URL + '&query=' + searchTerm);
    }else {
        getMovies(START_URL);
    }

    // console.log(search_URL + '&query=' + searchTerm);
});


const genres = [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
]

const languages = [
    {
        iso_639_1:"hi",
        english_name:"Hindi",
        name:"हिन्दी"
    } ,
    {
        iso_639_1:"en",
        english_name:"English",
        name:"English"
    },
    {
        iso_639_1:"es",
        english_name:"Spanish",
        name:"Español"
    } ,
    {
        iso_639_1:"de",
        english_name:"German",
        name:"Deutsch"
    },
    {
        iso_639_1:"ja",
        english_name:"Japanese",
        name:"日本語"
    }
];
let selectedGenre = [];
let selectLanguage = [];
// let selectedYear = [];
// let selectedAge = [];
// let selectedRating = [];

let CALLING_URL = START_URL;

const selectedAny = () => {
    if(selectLanguage.length + selectedGenre.length > 0) {
        return true;
    }

    return false;
};
const genre_list = document.querySelector('#genreList');
const addGenre = () => {
    genre_list.innerHTML = '';

    genres.forEach(ele => {
        const currgenre = document.createElement('span');
        currgenre.classList.add('genreItem');

        currgenre.id = ele.id;
        currgenre.innerText = ele.name;

        currgenre.addEventListener('click' , () => {
            if(!selectedGenre.includes(ele.id)) {
                selectedGenre.push(ele.id);
                currgenre.style.fontWeight = '400';
            }else {
                selectedGenre.splice(selectedGenre.indexOf(ele.id) , 1);
                currgenre.style.fontWeight = '300';
            }
            
            if(selectedAny()) {
                document.querySelector('.applyFiltersBtn').style.display = 'block';

                document.querySelector('.clearFiltersBtn').style.display = 'block';
            }else {
                document.querySelector('.applyFiltersBtn').style.display = 'none';

                document.querySelector('.clearFiltersBtn').style.display = 'none';
            }
            console.log(selectedGenre);
        });
        genre_list.append(currgenre);
    });
};

addGenre();

const language_list = document.querySelector('#languageList');
const addLanguage = () => {
    language_list.innerHTML = '';

    languages.forEach(ele => {
        const currlanguage = document.createElement('span');
        currlanguage.classList.add('languageItem');

        currlanguage.id = ele.iso_639_1;
        currlanguage.innerText = ele.english_name;

        currlanguage.addEventListener('click' , () => {
            if(!selectLanguage.includes(ele.iso_639_1)) {
                selectLanguage.push(ele.iso_639_1);
                currlanguage.style.fontWeight = '400';
            }else {
                selectLanguage.splice(selectLanguage.indexOf(ele.iso_639_1) , 1);
                currlanguage.style.fontWeight = '300';
            }

            if(selectedAny()) {
                document.querySelector('.applyFiltersBtn').style.display = 'block';

                document.querySelector('.clearFiltersBtn').style.display = 'block';
            }else {
                document.querySelector('.applyFiltersBtn').style.display = 'none';

                document.querySelector('.clearFiltersBtn').style.display = 'none';
            }
            console.log(selectLanguage);
        });


        language_list.append(currlanguage);
    })
};

addLanguage();

const toggleFilter = document.querySelector('.filterList');
const filterTitle = document.querySelector('.filterTitle');
filterTitle.addEventListener('click' , () => {
    if(toggleFilter.style.display == 'flex') {
        // toggleFilter.style.transform = 'translateY(-101%)';
        filterTitle.innerText = 'FILTERS';
        toggleFilter.style.display = 'none';
    }else {
        filterTitle.innerHTML = `FILTERS<i class="fa-solid fa-xmark crossIcon"></i>`;
        console.log(toggleFilter.value);
        toggleFilter.style.display = 'flex';
        // toggleFilter.style.transform = 'translateY(0)';
    }
});

const changeItems = () => {
    if(selectedGenre.length > 0) {
        CALLING_URL += '&with_genres=' + encodeURI(selectedGenre.join(','));
    }
    if(selectLanguage.length > 0) {
        CALLING_URL += '&with_original_language=' + encodeURI(selectLanguage.join(','));
    }

    console.log(CALLING_URL);
    getMovies(CALLING_URL);
    CALLING_URL = START_URL;
}

const clearItems = () => {
    if(selectedAny()) {
        // console.log('1');
        selectLanguage = [];
        selectedGenre = [];
        addGenre();
        addLanguage();
        getMovies(START_URL);

        document.querySelector('.applyFiltersBtn').style.display = 'none';

        document.querySelector('.clearFiltersBtn').style.display = 'none';
    }
};