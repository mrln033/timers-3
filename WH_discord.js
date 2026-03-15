const webhookURL = "https://discord.com/api/webhooks/1482673609850884137/WGN9KPIBo2bQCkz6jidVQpqXY0QDfpwWXLQuD-5-rVpk0wWOR6tYxLNmNRTPHW_HvYrs";

document.addEventListener("DOMContentLoaded", () => {

const btn = document.getElementById("discord-report-btn");
const toast = document.getElementById("discord-toast");
const sendBtn = document.getElementById("send-discord");
const closeBtn = document.getElementById("close-toast");

btn.onclick = () => {
toast.classList.remove("hidden");
};

closeBtn.onclick = () => {
toast.classList.add("hidden");
};

sendBtn.onclick = async () => {

const avatar = document.getElementById("avatar-name").value.trim();
const commentaire = document.getElementById("commentaire").value.trim();

const message =
`<@213002815923027969>

📢 Nouvelle demande concernant les missions quotidiennes

Avatar IG : ${avatar}

${commentaire}
`;

try{

await fetch(webhookURL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
content:message
})
});

toast.classList.add("hidden");

alert("Message envoyé sur Discord 👍");

}catch(e){

alert("Erreur lors de l'envoi Discord");

}

};

});