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

// Download PDF Functionality
function downloadPDF() {
    const text = document.getElementById("textInput").value;
    const filename = document.getElementById("filename").value || "document";
    const fontSize = parseInt(document.getElementById("fontSize").value);
    const font = document.getElementById("fontSelect").value;
    const lineSpacing = parseFloat(document.getElementById("lineSpacing").value); // Get line spacing value

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set font and font size
    doc.setFont(font);
    doc.setFontSize(fontSize);

    // Split the text into lines to manage page breaks
    const lines = doc.splitTextToSize(text, 180);

    // Calculate line height with spacing
    const lineHeight = fontSize * lineSpacing;

    // Add the text to the PDF and handle page breaks automatically
    let yPosition = 10;
    for (let i = 0; i < lines.length; i++) {
        if (yPosition > 270) { // Check if text exceeds the page
            doc.addPage();
            yPosition = 10; // Reset position for next page
        }
        doc.text(lines[i], 10, yPosition);
        yPosition += lineHeight; // Adjust line spacing
    }

    // Save the PDF
    doc.save(`${filename}.pdf`);
    hidePopup(); // Close the popup after saving
}

// Show PDF Preview Functionality
function showPreview() {
    const text = document.getElementById("textInput").value;
    const fontSize = parseInt(document.getElementById("fontSize").value);
    const font = document.getElementById("fontSelect").value;
    const lineSpacing = parseFloat(document.getElementById("lineSpacing").value);

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set font and font size
    doc.setFont(font);
    doc.setFontSize(fontSize);

    // Split the text into lines to manage page breaks
    const lines = doc.splitTextToSize(text, 180);

    // Calculate line height with spacing
    const lineHeight = fontSize * lineSpacing;

    // Add the text to the PDF and handle page breaks automatically
    let yPosition = 10;
    for (let i = 0; i < lines.length; i++) {
        if (yPosition > 270) { // Check if text exceeds the page
            doc.addPage();
            yPosition = 10; // Reset position for next page
        }
        doc.text(lines[i], 10, yPosition);
        yPosition += lineHeight; // Adjust line spacing
    }

    // Convert PDF to base64 for preview
    const pdfBase64 = doc.output('datauristring');
    const previewFrame = document.getElementById("pdfPreview");

    // Set the iframe's src to show the PDF preview
    previewFrame.src = pdfBase64;
}

// Line Spacing Adjustment
const lineSpacingInput = document.getElementById("lineSpacing");
const lineSpacingValue = document.getElementById("lineSpacingValue");

lineSpacingInput.addEventListener("input", () => {
    const spacing = lineSpacingInput.value;
    lineSpacingValue.textContent = spacing;  // Display the current value of line spacing
});
