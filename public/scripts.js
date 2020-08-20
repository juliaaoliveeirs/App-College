const currentPage = location.pathname
const items = document.querySelectorAll('header .links .link a')

for (item of items) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}

// === Paginação ===
// totalPages = 20
// selectedPage = 15
// [1, ..., 13, 14, 15, 16, 17, ..., 20]

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const secondPageAndpenultimate = currentPage == 2 || currentPage == totalPages - 1
        const pagesAfterSelectedPage = currentPage <= selectedPage + 1
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 1

        if (totalPages > 7) {
            if (firstAndLastPage || secondPageAndpenultimate || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
                if (oldPage && currentPage - oldPage > 2) {
                    pages.push('...')
                }
                if (oldPage && currentPage - oldPage == 2) {
                    pages.push(oldPage + 1)
                }
                pages.push(currentPage)
                oldPage = currentPage
            }
        } else {
            pages.push(currentPage)
        }
    }
    return pages
}

function createPagination(pagination) {
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const filter = +pagination.dataset.filter
    const pages = paginate(page, total)

    let elements = ''
    for (let page of pages) {
        if (String(page).includes('...')) {
            elements += `<span>${page}</span>`
        } else {
            if (filter) {
                elements += `<a href='?page=${page}&filter=${filter}'>${page}</a>`
            } else {
                elements += `<a href='?page=${page}'>${page}</a>`
            }
        }
    }

    pagination.innerHTML = elements
}

const pagination = document.querySelector('.pagination')

if (pagination) {
    createPagination(pagination)
}