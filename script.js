


const image = document.createElement('img')
const userStatus = document.createElement('div')
const item1 = document.createElement('div')
const item2 = document.createElement('div')
const item3 = document.createElement('div')


const titleNum = document.createElement('p')


async function getApi() {
    const val = document.querySelector('input').value;
    const response = await fetch(`https://api.github.com/users/${val}`)
    const jsonData = await response.json()
    const numItem = [jsonData.public_repos, jsonData.followers, jsonData.following]
    const titles = ['Repositórios', 'Seguindo', 'Seguidores']
    const textos = [jsonData.location, jsonData.company]
    console.log(jsonData)

    content.style.display = 'flex'

    if (val != '') {
        let imageParent = document.getElementById('profile')
        image.src = jsonData.avatar_url
        imageParent.appendChild(image)
    
        const userName = document.getElementById('user_name')
        const userLink = document.getElementById('user-link')
        const username = document.getElementById('username')
        const userBio = document.getElementById('user-bio')


        userName.innerText = jsonData.name
        userLink.href = `https://github.com/${jsonData.login}`
        username.innerText = `@${jsonData.login}`

        if (jsonData.bio != null) {
            userBio.innerText = jsonData.bio
        } else {
            userBio.innerText = 'este usuário não possui descrição na bio'
        }
        
        const getItem = document.querySelectorAll('#title')
        const getNumItem = document.querySelectorAll('#num')
        getItem.forEach((x, i) => {
            x.innerText = titles[i]
        })
        getNumItem.forEach((x, i) => {
            x.innerText = numItem[i]
        })

        const getText = document.querySelectorAll('#text')
        getText.forEach((item, index) => {

            item.innerText = textos[index]

            if (index === 1 && jsonData.company === null) {
                item.innerText = 'Not Available'
            }
            if (index === 0 && jsonData.location === null) {
                item.innerText = 'Not Available'
            }

        })
        
    }else {
        alert('errado')
    }
    
}

