import { setSearchFocus, showClearTextButton, clearSearchText, clearPushListener } from './js/searchbar.js'
import { getsearchTerm } from './js/datafunctions.js'
import { retrieveSearchResults } from './js/datafunctions.js'
import { deleteSearchResults, buildSearchResults, clearStatsLine, setStatsLine } from './js/searchResults.js'

document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState === "complete") {
        initApp()
    }

})

const initApp = () => {
    setSearchFocus()
    const search = document.getElementById('search')
    search.addEventListener('input', showClearTextButton)

    const clear = document.getElementById("clear");
    clear.addEventListener("click", clearSearchText);
    clear.addEventListener("keydown", clearPushListener);

    const form = document.getElementById('searchBar')
    form.addEventListener('submit', submitTheSearch)
}

const submitTheSearch = (e) => {
    e.preventDefault()
    deleteSearchResults()
    processtheSearch()
    setSearchFocus()
}
const processtheSearch = async() => {
    clearStatsLine()
    const searchTerm = getsearchTerm()
    if (searchTerm === '') return
    const resultArray = await retrieveSearchResults(searchTerm)
    if (resultArray.length) buildSearchResults(resultArray)
    setStatsLine(resultArray.length)
}