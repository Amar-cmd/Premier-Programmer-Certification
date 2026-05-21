document.addEventListener('DOMContentLoaded', () => {
            // Setup Date
            const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById('certDate').innerText = new Date().toLocaleDateString('en-US', dateOptions);

            // Generate Random ID
            const randomId = 'PY-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            document.getElementById('certId').innerText = randomId;

            // Generate QR Code containing the verification link
            new QRCode(document.getElementById("qrcode"), {
                text: "https://www.youtube.com/playlist?list=PLoisYo0ETDv7KWCyR_3bKLDRvfXNFN_Pj",
                width: 64,
                height: 64,
                colorDark : "#111827",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.L
            });
        });

        function changeTheme() {
            const theme = document.getElementById('themeSelect').value;
            const cert = document.getElementById('certificate');
            cert.className = 'certificate ' + theme;
        }

        function updateCertificate() {
            const name = document.getElementById('inputName').value || 'Student Name';
            const github = document.getElementById('inputGithub').value;
            const social = document.getElementById('inputSocial').value;

            document.getElementById('certName').innerText = name;

            let linksText = [];
            if(github) linksText.push(`GitHub: ${github}`);
            if(social) linksText.push(`Profile: ${social}`);
            
            document.getElementById('certLinks').innerText = linksText.join(' | ');
        }

        async function downloadCerts(type) {
            const certElement = document.getElementById('certificate');
            const loader = document.getElementById('loader');
            const name = document.getElementById('inputName').value || 'Certificate';
            
            loader.style.display = 'flex';

            try {
                const canvas = await html2canvas(certElement, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: '#ffffff'
                });

                if (type === 'png' || type === 'jpg') {
                    const format = type === 'png' ? 'image/png' : 'image/jpeg';
                    const link = document.createElement('a');
                    link.download = `${name.replace(/\s+/g, '_')}_Python_Certificate.${type}`;
                    link.href = canvas.toDataURL(format, 1.0);
                    link.click();
                } else if (type === 'pdf') {
                    window.jsPDF = window.jspdf.jsPDF;
                    const pdf = new jsPDF('l', 'mm', 'a4'); 
                    const imgData = canvas.toDataURL('image/jpeg', 1.0);
                    pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);
                    pdf.save(`${name.replace(/\s+/g, '_')}_Python_Certificate.pdf`);
                }
            } catch (error) {
                console.error("Error generating certificate: ", error);
                alert("An error occurred while generating the certificate.");
            } finally {
                loader.style.display = 'none';
            }
        }