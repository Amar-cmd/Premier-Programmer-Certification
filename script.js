document.addEventListener('DOMContentLoaded', () => {
            // Setup Date
            const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById('certDate').innerText = new Date().toLocaleDateString('en-US', dateOptions);

            // Generate Random ID
            const randomId = 'PY-' + Math.random().toString(36).substr(2, 9).toUpperCase();
            document.getElementById('certId').innerText = randomId;

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

            const certLinks = document.getElementById('certLinks');
            certLinks.replaceChildren();

            if (github) certLinks.appendChild(createSocialLink('github', github));
            if (social) certLinks.appendChild(createSocialLink('linkedin', social));
        }

        function createSocialLink(type, value) {
            const item = document.createElement('div');
            item.className = `social-link-chip ${type}`;

            const icon = document.createElement('span');
            icon.className = 'social-icon';
            icon.innerHTML = type === 'github'
                ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.38-3.37-1.38-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.93.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.34 9.34 0 0 1 12 6.98c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.82 0 .27.18.59.69.49A10.18 10.18 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/></svg>'
                : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.37 21.1H1.9V8.68h3.47V21.1ZM3.63 7.01A2.03 2.03 0 1 1 3.64 2.95a2.03 2.03 0 0 1-.01 4.06ZM22.1 21.1h-3.47v-6.36c0-1.59-.57-2.67-1.92-2.67-1.04 0-1.66.72-1.94 1.42-.1.25-.13.61-.13.96v6.65h-3.47s.05-11.3 0-12.42h3.47v1.95c.2-.85 1.32-2.08 3.1-2.08 2.27 0 4.36 1.52 4.36 4.8v7.75Z"/></svg>';

            const text = document.createElement('span');
            text.className = 'social-text';
            text.textContent = value;

            item.append(icon, text);
            return item;
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
