//create a counter that will be used to display the articles
document.getElementById("formContainer").style.display = "none";
var counter = 1;
var articleContainer = document.getElementById("articleContainer");
var btnShowArticle = document.getElementById("btnShowArticle");
var title = document.getElementById("title");
var visited = false;

//create an event listener for the button 
btnShowArticle.addEventListener("click", function(){
	
	
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
	if( counter < 5 )
		//increment the counter so that the next article is being accessed
		counter++;
		
	else
	{
		//this means the user have see the five articles
		visited = true;	
		//change the counter back to one
		counter = 1;
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
		
		
		
		//htmlString += "<p>" + JSON.stringify(data.body[i]) +".</p>";
		//for(j=0; j < data.body.model)
	}
	
	if(visited == true){
		document.getElementById("formContainer").style.display = "block";
		/* htmlString += "<table>" +
		"<form name='RankForm'>" +
		"<tr> <th>Article</th> <th>Ranking</th> </tr>" +
		"<tr> <td> <label for='article1'> Article 1 </label> </td>"+
		"<td><input type='number' id='article1' name='article1' min=1 max=5 required></td> </tr>" +
		
		"<tr> <td> <label for='article2'> Article 2 </label> </td>"+
		"<td><input type='number' id='article2' name='article2' min=1 max=5 required></td> </tr>" +
		
		"<tr> <td> <label for='article3'> Article 3 </label> </td>"+
		"<td><input type='number' id='article3' name='article3' min=1 max=5 required></td> </tr>" +
		
		"<tr> <td> <label for='article4'> Article 4 </label> </td>"+
		"<td><input type='number' id='article4' name='article4' min=1 max=5 required></td> </tr>" +
		
		"<tr> <td> <label for='article5'> Article 5 </label> </td>"+
		"<td><input type='number' id='article5' name='article5' min=1 max=5 required></td> </tr>" +

		"<tr> <td> <input type='submit' value='Submit'> </td> </tr> " +
		"</form> </table>"; */

	}
	

	articleContainer.innerHTML = "";
	articleContainer.insertAdjacentHTML('beforeend', htmlString);

	
}
var rankForm = document.getElementById('rankForm');
    rankForm.addEventListener('submit', function(){
		var article1 = document.getElementById('article1');
		var article2 = document.getElementById('article2');
		var article3 = document.getElementById('article3');
		var article4 = document.getElementById('article4');
		var article5 = document.getElementById('article5');
		if(article1.value == article2.value){
			alert("the values are the same!");
			return false;
		}
		else{
			alert("the infomation was sent")
			return true
			
		}
	});

	
