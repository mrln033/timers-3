document.addEventListener("DOMContentLoaded", () => {

  // ================= PARAMÈTRES PLANÈTE / CATÉGORIE =================
  const params = new URLSearchParams(window.location.search);
  const planetTitle = params.get("title") || "";
  const category = params.get("category") || "";

  const textarea = document.getElementById("commentaire");
  if(textarea){
    let text = textarea.value;
    text = text.replace("Planete :", `Planete : ${planetTitle}`);
    text = text.replace("Catégorie :", `Catégorie : ${category}`);
    textarea.value = text;
  }

  // ================= ÉLÉMENTS DU TOAST =================
  const toast = document.getElementById("discord-toast");
  const btnOpen = document.getElementById("discord-report-btn");
  const btnClose = document.getElementById("close-toast");
  const btnSend = document.getElementById("send-discord");
  const inputAvatar = document.getElementById("avatar-name");

  // ================= OUVRIR / FERMER LE TOAST =================
  if(btnOpen && toast){
    btnOpen.addEventListener("click", () => {
      toast.style.position = "fixed";
      toast.style.left = "50%";
      toast.style.top = "50%";
      toast.style.transform = "translate(-50%, -50%)"; // centrage exact
      toast.classList.remove("hidden");
    });
  }

  if(btnClose && toast){
    btnClose.addEventListener("click", () => {
      toast.classList.add("hidden");
    });
  }

  // ================= ENVOI DISCORD =================
  if(btnSend && toast && textarea){
    btnSend.addEventListener("click", async () => {
      const avatarName = inputAvatar ? inputAvatar.value.trim() : "";
      const messageContent = `@213002815923027969\nNom Avatar : ${avatarName}\n\n${textarea.value}`;

      const webhookUrl = "https://discord.com/api/webhooks/1482673609850884137/WGN9KPIBo2bQCkz6jidVQpqXY0QDfpwWXLQuD-5-rVpk0wWOR6tYxLNmNRTPHW_HvYrs";

      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: messageContent })
        });

        if(res.ok){
          alert("Message envoyé avec succès !");
          toast.classList.add("hidden");
          if(inputAvatar) inputAvatar.value = ""; // reset avatar
        } else {
          alert("Erreur lors de l'envoi du message.");
        }

      } catch(e){
        console.error(e);
        alert("Impossible d'envoyer le message. Vérifiez votre connexion.");
      }
    });
  }

});