let UsersUI = document.querySelector(".UsersUI");
let maleBtn = document.querySelector(".maleBtn");
let female = document.querySelector(".femaleBtn");

let search = document.querySelector("#search");
let load = document.querySelector(".loading");
let viewBtn = document.querySelector(".viewmore");

let images = 20;

window.addEventListener("DOMContentLoaded",()=>{
    viewBtn.addEventListener("click",()=>{
        images += 20;
        allImages()
    })
allImages();

})

function allImages(){

        fetch(`https://randomuser.me/api?results=${images}`)
            .then(res => res.json())
            .then(data => {
    
                load.style.display = "none"
    
                let lists = document.querySelectorAll(".mainDiv")
                remove(lists)
    
                for (let i = 0; i < data.results.length; i++) {
                    filters(data.results[i])
                }
    
                maleBtn.addEventListener("click", (e) => {
                    e.preventDefault()
                    maleBtn.classList.toggle("active")
                    female.classList.remove("active")
    
                    let lists = document.querySelectorAll(".mainDiv")
                    remove(lists)
    
                    for (let i = 0; i < data.results.length; i++) {
                        filters(data.results[i])
                    }
    
                })
                female.addEventListener("click", (e) => {
                    e.preventDefault()
                    female.classList.toggle("active")
                    maleBtn.classList.remove("active")
    
                    let lists = document.querySelectorAll(".mainDiv")
                    remove(lists)
    
                    for (let i = 0; i < data.results.length; i++) {
                        filters(data.results[i])
                    }
    
                })
    
                search.addEventListener("keyup", () => {
                    let lists = document.querySelectorAll("#name")
                    for (let i = 0; i < lists.length; i++) {
                        if (lists[i].innerText.toUpperCase().indexOf(search.value.toUpperCase()) != -1) {
                            lists[i].parentElement.parentElement.style.display = "block"
                        }
                        else {
                            lists[i].parentElement.parentElement.style.display = "none"
                        }
                    }
                })
    
                function remove(lists) {
                    for (let i = 0; i < lists.length; i++) {
                        lists[i].remove()
                    }
                }
            
                function filters(updateData) {
                    if (maleBtn.classList.contains("active")) {
                        if (updateData.gender == "male") {
                            addNew(updateData)
                        }
                    }
                    else if (female.classList.contains("active")) {
                        if (updateData.gender == "female") {
                            addNew(updateData)
                        }
                    }
                    else {
                        addNew(updateData)
                    }
                }
    
                function addNew(newData) {
    
                    let mainDiv = document.createElement("div")
                    mainDiv.setAttribute("class", "mainDiv")
                    UsersUI.append(mainDiv)
    
                    let img = document.createElement("img")
                    img.setAttribute("id", "imgs")
                    img.src = newData.picture.large
                    mainDiv.append(img)
    
                    let a = document.createElement("a")
                    a.href = `./user.html?id=${newData.id.value}`
                    mainDiv.append(a)
    
                    let name = document.createElement("li")
                    name.setAttribute("id", "name")
                    name.innerText = `${newData.name.first}  ${newData.name.last}`
                    a.append(name)
    
                  
                }
    
    
            }) // JSON to js object
            .catch(() => console.log("Oops something went wrong"))
    }


