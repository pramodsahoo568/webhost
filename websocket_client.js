

function myFunction() {
	console.log("myFunction++");
	let ws = new WebSocket("ws://localhost:5000");
	ws.send("Hello server , I am client.");
}