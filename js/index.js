// id, title, subtitle, description, author, img_url, users => (id ,username)

const ulList = document.getElementById("list")
const showPanel = document.getElementById("show-panel")
const myUser = {
    id: 11,
    username: "adrianic92"    
}

function fetchBooks() {
    fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(data => {
        data.forEach( book => {
            const li = document.createElement("li")
            li.innerHTML = book.title
            li.id = book.id
            li.addEventListener("click", () => renderBook(book))
            ulList.append(li)
        })
    })
}

function userPatch(book, ul) {
        const patchArray = [...book.users]
        const finder = patchArray.filter(user => (user.username === "adrianic92"))
        console.log(finder)
        if (finder.length === 0) {
            console.log("patch")
            patchArray.push(myUser)
            fetch(`http://localhost:3000/books/${book.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : 'application/json',
            },
            body: JSON.stringify({
                "users": patchArray
            })
            })
            ul.innerHTML = ""    
            renderUsers(patchArray, ul)
        }
        else {
            const unpatched = patchArray.filter(user => (user.username !== "adrianic92"))
            fetch(`http://localhost:3000/books/${book.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : 'application/json',
            },
            body: JSON.stringify({
                "users": unpatched
            })
            })
            ul.innerHTML = ""
            renderUsers(unpatched, ul)
        }
}

function renderBook (book) {
    showPanel.innerHTML = ""
    
    const title = book.title
    const thumbnail = book.img_url
    const subtitle = book.subtitle
    const description = book.description
    const author = book.author
    const ul = document.createElement("ul")

    const image = document.createElement("img")
    image.src = thumbnail
    
    const h3Title = document.createElement("h3")
    h3Title.innerText = title

    const h3Sub = document.createElement("h3")
    h3Sub.innerText = subtitle

    const h3Auth = document.createElement("h3")
    h3Auth.innerText = author
    
    const h4Des = document.createElement("h4")
    h4Des.innerText = description

    const button = document.createElement("button")
    button.innerText = "LIKE"
    button.addEventListener("click", () => userPatch(book, ul) )
    renderUsers(book.users, ul)
    
    showPanel.append(image, h3Title, h3Sub, h3Auth, h4Des, ul, button)
}

function renderUsers(users, ul) {
    users.forEach(user => {
        const li = document.createElement("li")
        li.innerText = user.username
        ul.append(li)
    })
}

fetchBooks()