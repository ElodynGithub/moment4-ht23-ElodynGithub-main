"use strict";
// En global array skapas för att lagra listan över saker att göra.
var todoList = [];
// En funktion för att lägga till ett nytt element i listan skapas.
function addItem() {
	// Hämtar referenser till textfältet och meddelandet
	var input = document.getElementById("newtodo");
	var message = document.getElementById("message");
	// Kontrollerar om textfältet är tomt eller inte
	if (input.value == "") {
		// Visar ett felmeddelande
		message.innerHTML = "Felmeddelande: Du måste skriva någonting i textfältet.";
		message.style.color = "red";
	} else {
		// Kontrollerar om textfältet innehåller fem eller fler tecken.
		if (checkItemText(input.value)) {
			// Lägger till texten i listan
			todoList.push(input.value);
			// Visar ett bekräftelsemeddelande
			message.innerHTML = "Du har lagt till " + input.value + " i listan.";
			message.style.color = "green";
			// Rensar textfältet
			input.value = "";
			// Uppdaterar listan på sidan
			showList();
		} else {
			// Visar ett felmeddelande
			message.innerHTML = "Felmeddelande: Texten måste innehålla minst fem tecken.";
			message.style.color = "red";
		}
	}
}
// Skapar en funktion för att radera ett element från listan
function deleteItem(index) {
	// Hämtar referensen till meddelandet
	var message = document.getElementById("message");
	// Sparar texten som ska raderas i en variabel
	var item = todoList[index];
	// Raderar elementet från listan
	todoList.splice(index, 1);
	// Visar ett bekräftelsemeddelande
	message.innerHTML = "Du har raderat " + item + " från listan!";
	message.style.color = "green";
	// Uppdaterar listan på sidan
	showList();
	// Sparar listan i local storage
	saveList();
}
// Skapar en funktion för att kontrollera om texten innehåller fem eller fler tecken
function checkItemText(text) {
	// Returnerar true om texten är minst fem tecken lång, annars false
	return text.length >= 5;
}
// Skapar en funktion för att visa listan på sidan
function showList() {
	// Hämtar referensen till todolist-sektionen
	var todolist = document.getElementById("todolist");
	// Tömmer todolist-sektionen från eventuellt tidigare innehåll
	todolist.innerHTML = "";
	// Loopar igenom listan och skapar HTML-element för varje element
	for (var i = 0; i < todoList.length; i++) {
		// Skapar ett p-element för att visa texten
		var p = document.createElement("p");
		p.innerHTML = todoList[i];
		// Skapar ett span-element för att visa ett rött kryss för att radera elementet
		var span = document.createElement("span");
		span.innerHTML = " ✘";
		span.style.color = "red";
		span.style.fontSize = "85%";
		span.style.fontWeight = 700;
		span.style.cursor = "pointer";
		// Lägger till en händelsehanterare för att radera elementet när man klickar på krysset
		span.onclick = (function(index) {
			return function() {
				deleteItem(index);
			};
		})(i);
		// Lägger till span-elementet i p-elementet
		p.appendChild(span);
		// Lägger till p-elementet i todolist-sektionen
		todolist.appendChild(p);
	}
}
// En funktion för att spara listan i local storage
function saveList() {
	// Konverterar listan till en sträng
	var listString = JSON.stringify(todoList);
	// Sparar strängen i local storage med nyckelnamnet "todoList"
	localStorage.setItem("todoList", listString);
}
// En funktion för att hämta listan från local storage
function getList() {
	// Hämtar strängen från local storage med nyckelnamnet "todoList"
	var listString = localStorage.getItem("todoList");
	// Kontrollerar om strängen är null eller inte
	if (listString) {
		// Konverterar strängen tillbaka till en lista
		todoList = JSON.parse(listString);
	} else {
		// Om strängen är null sätter listan till en tom array
		todoList = [];
	}
}
// Skapar en funktion för att rensa listan 
function clearList() {
	// Tömmer listan från arrayen
	todoList = [];
	// Uppdaterar listan på sidan
	showList();
}
// Lägger till händelsehanterare för att köra funktioner när sidan laddas, när knapparna klickas och när textfältet ändras
window.onload = showList;
document.getElementById("newtodobutton").onclick = addItem;
document.getElementById("clearbutton").onclick = clearList;
document.getElementById("newtodo").onchange = function() {
	// Hämtar referensen till meddelandet
	var message = document.getElementById("message");
	// Tömmer meddelandet när textfältet ändras
	message.innerHTML = "";
};
window.onload = function() {
	// Hämtar listan från local storage
	getList();
	// Visar listan på sidan
	showList();
};
document.getElementById("newtodobutton").onclick = function() {
	// Lägger till ett nytt element i listan
	addItem();
	// Sparar listan i local storage
	saveList();
};
document.getElementById("clearbutton").onclick = function() {
	// Rensar listan 
	clearList();
	// Sparar listan i local storage
	saveList();
};