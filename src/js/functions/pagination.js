import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { listRef } from '../refs/refs';
import { getPopular, getBySearchName, getByGenres } from '../api/get-api';
import { moviesListMarkupFirstRender } from '../functions/render-home-page';

const container = document.getElementById('tui-pagination-container');
const options = { // below default value of options
    totalItems: 10000,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
            '<a href="#" class="tui-page-btn tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</a>',
        disabledMoveButton:
            '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</span>',
        moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                '<span class="tui-ico-ellip">...</span>' +
            '</a>'
    }
};

const pagination = new Pagination(container, options);

const pagePaginationNumber = pagination.getCurrentPage();

export async function givePaginationNumber(pagePaginationNumber) {
    console.log(pagePaginationNumber);
    try {
        const data = (await getPopular(pagePaginationNumber)).data.page;
        // const data = (await getBySearchName(pagePaginationNumber)).data.page;
        // const data = (await getByGenres(pagePaginationNumber)).data.page;
        console.log(data);
        // return data;
        clearMoviesList();
        moviesListMarkupFirstRender(data);
    }
    catch (error) {
        console.log(error)
    }
}

function clearMoviesList() {
    listRef.innerHTML = '';
}

pagination.on('afterMove', updatePage);

async function updatePage(event) {
    const currentPage = event.page;
    console.log('currentPage', currentPage);

    await givePaginationNumber(currentPage);
}