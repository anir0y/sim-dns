// script.js

document.getElementById('query-btn').addEventListener('click', function () {
    const domain = document.getElementById('domain').value.trim();
    const queryType = document.getElementById('query-type').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.textContent = ''; // Clear previous results

    if (!domain) {
        alert('Please enter a domain name.');
        return;
    }

    // Reset packet position and icon
    const packet = document.getElementById('packet');
    const packetData = document.getElementById('packet-data');
    packet.style.left = '0%';
    packetData.textContent = '';
    updatePacketIcon(queryType);

    // Show/hide Mail Server node and arrow
    const mailServerNode = document.querySelector('.mail-server');
    const mxArrow = document.querySelector('.mx-arrow');
    if (queryType === 'MX') {
        mailServerNode.style.display = 'flex';
        mxArrow.style.display = 'block';
    } else {
        mailServerNode.style.display = 'none';
        mxArrow.style.display = 'none';
    }

    // Simulate DNS query flow
    simulateDNSQuery(domain, queryType);
});

// Reset Simulation Button
document.getElementById('reset-btn').addEventListener('click', resetSimulation);

function resetSimulation() {
    // Reset input fields
    document.getElementById('domain').value = '';
    document.getElementById('query-type').value = 'A';

    // Reset results section
    const resultsDiv = document.getElementById('results');
    resultsDiv.textContent = '';

    // Reset packet position and icon
    const packet = document.getElementById('packet');
    const packetData = document.getElementById('packet-data');
    packet.style.left = '0%';
    packetData.textContent = '';
    updatePacketIcon('A'); // Default to A record icon

    // Hide Mail Server node and arrow
    const mailServerNode = document.querySelector('.mail-server');
    const mxArrow = document.querySelector('.mx-arrow');
    mailServerNode.style.display = 'none';
    mxArrow.style.display = 'none';
}

function updatePacketIcon(queryType) {
    const packet = document.getElementById('packet');
    switch (queryType) {
        case 'A':
        case 'AAAA':
            packet.className = 'fa-solid fa-envelope packet';
            break;
        case 'MX':
            packet.className = 'fa-solid fa-envelope-open-text packet';
            break;
        case 'SOA':
            packet.className = 'fa-solid fa-shield-halved packet';
            break;
        case 'TTL':
            packet.className = 'fa-solid fa-clock packet';
            break;
        default:
            packet.className = 'fa-solid fa-envelope packet';
    }
}

function simulateDNSQuery(domain, queryType) {
    const packet = document.getElementById('packet');
    const packetData = document.getElementById('packet-data');
    const resultsDiv = document.getElementById('results');

    // Step 1: User sends query to Local DNS
    resultsDiv.textContent += `1. You entered "${domain}" in your browser.\n`;
    resultsDiv.textContent += `   Your computer asks the Local DNS server for the ${queryType} record of "${domain}".\n\n`;

    movePacket(packet, packetData, 0, `Query: ${queryType} for ${domain}`, () => {
        setTimeout(() => {
            resultsDiv.textContent += `   Local DNS checks its cache... No record found.\n\n`;

            // Step 2: Local DNS queries Root DNS
            movePacket(packet, packetData, 20, 'Ask Root DNS for TLD', () => {
                setTimeout(() => {
                    resultsDiv.textContent += `2. Local DNS doesn't know the IP address, so it asks the Root DNS server:\n`;
                    resultsDiv.textContent += `   "Where can I find the TLD server for '${getTLD(domain)}'?"\n\n`;

                    movePacket(packet, packetData, 40, 'Response: TLD IP', () => {
                        setTimeout(() => {
                            resultsDiv.textContent += `   Root DNS responds with the IP address of the TLD server for '${getTLD(domain)}'.\n\n`;

                            // Step 3: Local DNS queries TLD DNS
                            movePacket(packet, packetData, 60, 'Ask TLD DNS for Auth DNS', () => {
                                setTimeout(() => {
                                    resultsDiv.textContent += `3. Local DNS asks the TLD DNS server:\n`;
                                    resultsDiv.textContent += `   "Where can I find the Authoritative DNS server for '${domain}'?"\n\n`;

                                    movePacket(packet, packetData, 80, 'Response: Auth DNS IP', () => {
                                        setTimeout(() => {
                                            resultsDiv.textContent += `   TLD DNS responds with the IP address of the Authoritative DNS server for '${domain}'.\n\n`;

                                            // Step 4: Local DNS queries Authoritative DNS or Mail Server
                                            if (queryType === 'MX') {
                                                simulateMXQuery(packet, packetData, domain, resultsDiv);
                                            } else {
                                                simulateAuthoritativeQuery(packet, packetData, domain, queryType, resultsDiv);
                                            }
                                        }, 1000);
                                    });
                                }, 1000);
                            });
                        }, 1000);
                    });
                }, 1000);
            });
        }, 1000);
    });
}

function simulateAuthoritativeQuery(packet, packetData, domain, queryType, resultsDiv) {
    movePacket(packet, packetData, 100, `Ask Auth DNS for ${queryType} Record`, () => {
        setTimeout(() => {
            resultsDiv.textContent += `4. Local DNS asks the Authoritative DNS server:\n`;
            resultsDiv.textContent += `   "What is the ${queryType} record of '${domain}'?"\n\n`;

            movePacket(packet, packetData, 0, `Response: ${queryType} Record`, () => {
                setTimeout(() => {
                    const dnsRecords = {
                        A: '192.168.1.40',
                        AAAA: '2001:db8::1',
                        SOA: 'ns1.example.com admin.example.com 2023101001 3600 1800 1209600 3600',
                        TTL: '3600 seconds'
                    };

                    const recordValue = dnsRecords[queryType] || 'Record not found';
                    resultsDiv.textContent += `   Authoritative DNS responds with the ${queryType} record for '${domain}':\n`;
                    resultsDiv.textContent += `      ${queryType} Record: ${recordValue}\n\n`;

                    resultsDiv.textContent += `5. Local DNS saves the records in its cache and gives them back to your computer.\n`;
                    resultsDiv.textContent += `   Now your browser knows the ${queryType} record of "${domain}" and can proceed!\n`;
                }, 1000);
            });
        }, 1000);
    });
}

function simulateMXQuery(packet, packetData, domain, resultsDiv) {
    movePacket(packet, packetData, 80, 'Ask TLD DNS for Mail Server', () => {
        setTimeout(() => {
            resultsDiv.textContent += `4. Local DNS asks the Mail Server:\n`;
            resultsDiv.textContent += `   "What is the MX record of '${domain}'?"\n\n`;

            movePacket(packet, packetData, 100, 'Response: MX Record', () => {
                setTimeout(() => {
                    const mxRecord = 'mail.example.com (Priority: 10)';
                    resultsDiv.textContent += `   Mail Server responds with the MX record for '${domain}':\n`;
                    resultsDiv.textContent += `      MX Record: ${mxRecord}\n\n`;

                    resultsDiv.textContent += `5. Local DNS saves the MX record in its cache and gives it back to your computer.\n`;
                    resultsDiv.textContent += `   Now your email client knows the mail server for "${domain}" and can send emails!\n`;
                }, 1000);
            });
        }, 1000);
    });
}

// Helper function to extract the TLD (Top-Level Domain) from the domain name
function getTLD(domain) {
    const parts = domain.split('.');
    return parts[parts.length - 1];
}

// Function to animate the packet movement
function movePacket(packet, packetData, position, data, callback) {
    // Limit the position to a maximum of 100% to keep the packet inside the frame
    const maxPosition = 100; // Maximum left position as a percentage
    const clampedPosition = Math.min(position, maxPosition);

    packet.style.left = clampedPosition + '%';
    packetData.textContent = data;
    packetData.style.left = clampedPosition + '%';

    setTimeout(callback, 1000); // Wait for animation to complete
}