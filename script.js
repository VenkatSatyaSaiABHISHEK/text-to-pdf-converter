// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("openDownload");
    const overlay = document.getElementById("popupOverlay");
  
    // Show the popup when "Download PDF" button is clicked
    openBtn.addEventListener("click", () => {
      overlay.classList.remove("hidden");
    });
  });
  
  // Hide the popup
  function hidePopup() {
    document.getElementById("popupOverlay").classList.add("hidden");
  }
  
  // Download the PDF
  function downloadPDF() {
    const text = document.getElementById("textInput").value;
    const filename = document.getElementById("filename").value || "document";
  
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 10, 10);
    doc.save(filename + ".pdf");
  
    hidePopup(); // Close the popup after saving
  }
  
  // Optional: Support for Progressive Web App installation
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  
    // Add install button dynamically
    const installBtn = document.createElement("button");
    installBtn.textContent = "Install App";
    installBtn.style.marginTop = "10px";
    installBtn.style.padding = "10px";
    installBtn.style.fontSize = "14px";
    installBtn.style.background = "#4CAF50";
    installBtn.style.color = "#fff";
    installBtn.style.border = "none";
    installBtn.style.borderRadius = "5px";
  
    installBtn.onclick = () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        deferredPrompt = null;
        installBtn.remove();
      });
    };
  
    document.body.appendChild(installBtn);
  });
  