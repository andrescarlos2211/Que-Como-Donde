let suggestions=["php","diseñador web", "programacion"]

const searchwrapper = document.querySelector(".search-input");
const inputBox = searchwrapper.querySelector("input");
const suggBox = searchwrapper.querySelector(".autocom-box");
const icon = searchwrapper.querySelector(".icon");
let linkTag = searchwrapper.querySelector("a")
let webLink;
inputBox.onkeyup =(e)=>{
    let userData=e.target.value;
    let emptyArray= [];
    if(userData){
        icon.onclick = () =>{
            webLink = `www.google.cl/search?q=${userData}`;
            linkTag.setAttribute("href",webLink);
            linkTag.click()
        }
        emptyArray=suggestions.filter((data)=>{
            
            data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
            return
        });
        emptyArray=emptyArray.map((data)=>{
            return data=`<li>${data}</li>`;
        });
        searchwrapper.classList.add("active");
        showSuggestions(emptyArray);
        let  AllList = suggBox.querySelector("li");
        for (let i=0; i< AllList.length;i++){
            AllList[i].setAttribute("onclick","select(this)");
        }}else{
            searchwrapper.classList.remove("active");
        }}
        function select(element){
            let selectData = element.textContent;
            inputBox.value=selectData;
            icon.onclick=()=>{
                webLink="www.google.cl/search?q=${userData}";
                linkTag.setAttribute("href",webLink);
                linkTag.click();
            }
            searchwrapper.classList.remove("active")
    
    }
function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue=inputBox.value;
        listData=`<li>${userValue}</li>`;
    }
    else{
        listData=lisy.join("");
    }
    suggBox.innerHTML=listData;
}