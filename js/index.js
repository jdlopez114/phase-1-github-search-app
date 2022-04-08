const form = document.querySelector('#github-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
   
    const data = e.target[0].value;
    const li = document.createElement('li');

    fetch(`https://api.github.com/search/users?q=${data}`)
    .then(res => res.json())
    .then(res => { 
        const userList = document.querySelector('#user-list');
        const repoList = document.querySelector('#repos-list')
        userList.innerHTML = ""; // before we add new stuff
        repoList.innerHTML = "";
    // will have to use map since it can have thousands of indexes returns an array
        res.items.map(item => { // usually use a single items -> item   
         // create items you want to display and append

        const h2 = document.createElement('h2');
        h2.textContent = item.login; // easier to add event listener before append
        h2.addEventListener('click', e => userRepos(item.login, e))
        
        const img = document.createElement('img');
        img.src = item.avatar_url; //you get this when you console log the object and
        
        li.append(h2, img);
        userList.append(li);

        });
    })
    form.reset();
})

function userRepos(username, e){
    e.preventDefault();
    const repoList = document.querySelector('#repos-list')
    repoList.innerHTML = ""; // empty it out 
    const li2 = document.createElement('li');
    const h1 = document.createElement('h1');

    fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(res => res.map(repo => {
 
    h1.textContent = repo.name //got from obj 
    li2.append(h1);
    repoList.append(li2);
    }))
}