let light = document.getElementById("light")
let dark = document.getElementById("dark")
let inputs = document.querySelectorAll("input")


light.onclick= function(){
    document.body.classList.add("light")
    light.style.display="none"
    dark.style.display="block"
    let inputs = document.querySelectorAll("input")
    inputs.forEach(input => {
        
        input.style.backgroundColor= "gray"
        
    })
    }

dark.onclick = function(){
    document.body.classList.remove("light")
    dark.style.display="none"
    light.style.display="block"
    inputs.forEach(input => {
        
        input.style.backgroundColor= "#111"
        
    })}

//====================================================
//get total
let price = document.getElementById("price")
let taxes= document.getElementById("taxes")
let ads= document.getElementById("ads")
let discount= document.getElementById("discount")
let total = document.getElementById("total")
let title= document.getElementById("title")
let category= document.getElementById("category")
let count= document.getElementById("count")
let create= document.getElementById("create")
let deleteAllbtn= document.getElementById("delete-all")
let updatenew=document.getElementById("updatenew")
let seachTitle= document.getElementById("by-title")
let seachCategory= document.getElementById("by-category")
let search = document.getElementById("search")
let mood ="create"
let upadatevar 

function getTotal(){
    if(price.value!= ''){
        total.innerHTML=(+price.value+ +taxes.value + +ads.value)- +discount.value
        total.style.background="green"
    }else{ total.style.background="brown"

    }
}
let dataPro;
if(localStorage.product != null){
    dataPro= JSON.parse(localStorage.product)
}else{
    dataPro=[]
}


create.onclick= function(){
    if(title.value !=""&&price.value!='null'&& category.value!=''){
    let newPro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,        
        category:category.value
    }   
    if(mood === "create"){ 
    if(newPro.count>1){
        for(let i=0;i<newPro.count;i++ ){
            dataPro.push(newPro)
        }
    }else{
        dataPro.push(newPro)
    }}else{
        dataPro[upadatevar]=newPro
        create.innerHTML= 'Create'
        count.style.display="block"
    }
    

    //save local storage
    localStorage.setItem("product",JSON.stringify(dataPro))

    clearDAata()
    showData()}}
    //==========================================


function clearDAata(){
inputs.forEach(input => {
    input.value=''
    }
    );
    total.innerHTML=""
}



function showData(){
let table ='';
for(let i=0;i <dataPro.length;i++){
    table += `
    <tr> 
    <td>${i+1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].taxes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].discount}</td>
    <td>${dataPro[i].total}</td>
    <td>${dataPro[i].category}</td>
    <td><button onclick="updateData(${i})"id="upadate">Update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
</tr>
    
    `
    document.getElementById('tbody').innerHTML=table
    if(dataPro.length>0){
        deleteAllbtn.style.display="block"
        deleteAllbtn.innerHTML=`Delete All (${dataPro.length})`

    }else{
        deleteAllbtn.style.display="none"
    }


}
}
showData()

function deleteData(i){
    dataPro.splice(i,1)
    localStorage.product= JSON.stringify(dataPro)
    showData()
}
function deleteAll(){
    window.confirm(`Do you want to delete all data?`)
    localStorage.clear()
    dataPro.splice(0,dataPro.length)  
    document.getElementById('tbody').innerHTML=""
    deleteAllbtn.style.display="none"
}
function updateData(i){
    mood="update"
    title.value= dataPro[i].title
    price.value= dataPro[i].price
    taxes.value= dataPro[i].taxes
    ads.value= dataPro[i].ads
    discount.value= dataPro[i].discount
    category.value= dataPro[i].category
        getTotal()
        count.style.display="none"
        create.innerHTML="Update"
        // updatenew.style.display="block"
    upadatevar= i 
    scroll({top:0,
    behavior:"smooth"})


    
        
    };
    //search
    let searchMood= 'title'
function searchbtn(id){
    if(id === "by-title"){
        searchMood='title'
        search.placeholder="Search By Title"
    }
    else if(id='by-category'){

        searchMood='category'
        search.placeholder="Search By category"
    }
    console.log(searchMood)
search.focus()
search.value=''
showData()
}
function searchData(value){
    let table ='';
    if(searchMood==='title'){
            for (let i = 0; i < dataPro.length; i++) {
            if(dataPro[i].title.includes(value)){
                table += `
                <tr> 
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})"id="upadate">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>
                
                `
        document.getElementById('tbody').innerHTML=table  
        
        
            }
        
        
        }
    
        
        
        
                }
        else{
            if(searchMood==='category'){
                for (let i = 0; i < dataPro.length; i++) {
                if(dataPro[i].category.includes(value)){
                    table += `
                    <tr> 
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})"id="upadate">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
                    
                    `
            document.getElementById('tbody').innerHTML=table  
            
            
                }
            
            
            }
        
            
            
            
                    }

        }
            
            
            }
            





