//do not display the form container and the ranking button
document.getElementById("formContainer").style.display = "none";
document.getElementById("btnRank").style.display = "none";

//create a counter that will be used to display the articles
var counter = 1;
//create variables that access the elements form index.html
var articleContainer = document.getElementById("articleContainer");
var btnShowArticle = document.getElementById("btnShowArticle");
var title = document.getElementById("title");

//create an event listener for the button displayed on the index page
btnShowArticle.addEventListener("click", function(){
	//hide the 'welcome' message
	document.getElementById("welcome").style.display = "none";
	//change the value of the button
	btnShowArticle.innerHTML ="Click to see Article "+ (counter + 1);
	
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
		//this means the user have seen the five articles
		//dispay the ranking button 
		//display the form container
		document.getElementById("btnRank").style.display = "block";
		document.getElementById("formContainer").style.display = "block";

		//change the counter back to one
		counter = 1;
		
		//change the value of the button
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
	
	//remove everything from the article container
	articleContainer.innerHTML = "";
	
	//display the article
	articleContainer.insertAdjacentHTML('beforeend', htmlString);	
}

//create a function to validate the form
function validate(){
	//access the elements from the form
	var name = document.getElementById("name");
	var article1 = document.getElementById('article1');
	var article2 = document.getElementById('article2');
	var article3 = document.getElementById('article3');
	var article4 = document.getElementById('article4');
	var article5 = document.getElementById('article5');
	
	//check if the values of the input fields are the same
	if((article1.value == article2.value) || (article1.value == article3.value) || (article1.value == article4.value) || (article1.value == article5.value)
		|| (article2.value == article3.value)|| (article2.value == article4.value) || (article2.value == article5.value)
		|| (article3.value == article4.value) || (article3.value == article5.value) || (article4.value == article5.value)){
		alert(" The values are the same! \n To rank the article, please specify the position in the ranking. \n The positions must be different. \n The articles can be ranked from 1  to 5");
		return false;	
	}
	//this is accessed only if the values are not the same
	else{ 
		//display an alert message to confirm the submission
		alert(" Dear " + name.value +", \n The infomation was sent! \n The ranking submited is:" +
		"\n Article 1 - position in ranking: " + article1.value +
		"\n Article 2 - position in ranking: " + article2.value +
		"\n Article 3 - position in ranking: " + article3.value +
		"\n Article 4 - position in ranking: " + article4.value +
		"\n Article 5 - position in ranking: " + article5.value +
		"\n Thank you!")
	}


}
	
	



	