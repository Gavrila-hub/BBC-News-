//create a counter that will be used to display the articles
document.getElementById("formContainer").style.display = "none";
document.getElementById("btnRank").style.display = "none";


var counter = 1;
var articleContainer = document.getElementById("articleContainer");
var btnShowArticle = document.getElementById("btnShowArticle");
var title = document.getElementById("title");
var visited = false;

//create an event listener for the button 
btnShowArticle.addEventListener("click", function(){
	document.getElementById("welcome").style.display = "none";
	btnShowArticle.innerHTML ="Click to see Article "+ (counter + 1);
	
	//articleContainer.insertAdjacentHTML('beforeend', "this is a test");
	//create an XMLHttpRequest
	var fileRequest = new XMLHttpRequest();
	//use the HTTP GET request to access the JSON file
	fileRequest.open('GET', 'https://raw.githubusercontent.com/Gavrila-hub/news-coding-test-dataset/master/data/article-'+counter +'.json');
	fileRequest.onload = function(){
		var dataFromFile = JSON.parse(fileRequest.responseText);
		renderHTML(dataFromFile);
	};	
	fileRequest.send(); 
	
	//check if the counter if less than 5
	if( counter < 5 ){
		//increment the counter so that the next article is being accessed
		counter++;
	}	
	else
	{
		//this means the user have see the five articles
		visited = true;	
		document.getElementById("btnRank").style.display = "block";
		document.getElementById("formContainer").style.display = "block";

		
		//change the counter back to one
		counter = 1;
		btnShowArticle.innerHTML ="Click to see Article 1";
	} 
});



//create a function that will display the data from the file
function renderHTML(data){
	//create a variable that will store the data from the file
	var htmlString="";
	title = data.title;
	//iterate through the body array from the JSON file to retrieve all the objects
	for(i=0; i < data.body.length; i++){
		//htmlString += "<p>" + data.body[i].type + ".</p>";
		
		//check if the type of the data is a heading
		if (data.body[i].type == "heading"){
			htmlString += "<h1>" + data.body[i].model.text + ",</h1>";
		}
		
		//check if the type of the data is paragraph
		if (data.body[i].type == "paragraph"){
			htmlString += "<p>" + data.body[i].model.text + ",</p>";
		}
		
		//check if the type of the data is image
		if (data.body[i].type == "image"){
			htmlString += "<img src=" + data.body[i].model.url + 
			" alt="+ data.body[i].model.altText + "class='center' width=" + 
			data.body[i].model.width + " height=" + 
			data.body[i].model.height + ">";
		}
		
		//check if the type of the data is list
		if (data.body[i].type == "list"){
			//check if the type of the list is unordered
			if(data.body[i].model.type == "unordered"){
				htmlString += "<ul>";
				for (j=0; j < data.body[i].model.items.length; j++){
					htmlString += "<li>" + data.body[i].model.items[j] + "</li>";
				}
				htmlString += "</ul>";
			}
		}
		
	}
	
	

	articleContainer.innerHTML = "";
	articleContainer.insertAdjacentHTML('beforeend', htmlString);

	
}

	
function validate(){
	var name = document.getElementById("name");
	var article1 = document.getElementById('article1');
	var article2 = document.getElementById('article2');
	var article3 = document.getElementById('article3');
	var article4 = document.getElementById('article4');
	var article5 = document.getElementById('article5');
	if((article1.value == article2.value) || (article1.value == article3.value) || (article1.value == article4.value) || (article1.value == article5.value)
		|| (article2.value == article3.value)|| (article2.value == article4.value) || (article2.value == article5.value)
		|| (article3.value == article4.value) || (article3.value == article5.value) || (article4.value == article5.value)){
		alert("the values are the same!");
		return false;
	}
	else{
		alert(" Dear " + name.value +", \n The infomation was sent! \n The ranking submited is:" +
		"\n Article 1 - position in ranking: " + article1.value +
		"\n Article 2 - position in ranking: " + article2.value +
		"\n Article 3 - position in ranking: " + article3.value +
		"\n Article 4 - position in ranking: " + article4.value +
		"\n Article 5 - position in ranking: " + article5.value +
		"\n Thank you!")
		return true;
		
	}
}

	
