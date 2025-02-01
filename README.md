# DNS Query Flow Simulation

[![Github Page status](https://github.com/anir0y/sim-dns/actions/workflows/static.yml/badge.svg)](https://github.com/anir0y/sim-dns/actions/workflows/static.yml)


This project simulates the flow of a DNS query in an interactive and visually engaging way. It demonstrates how a DNS query travels through various DNS servers (Local DNS, Root DNS, TLD DNS, Authoritative DNS) and retrieves different types of DNS records (A, AAAA, MX, SOA, TTL). The simulation includes animations, dynamic data updates, and user interaction to enhance the learning experience.

---

## Features

- **Interactive DNS Query Flow**: Simulate DNS queries step-by-step with animated packet movement.
- **Dynamic Packet Icons**: The packet icon changes based on the selected query type (e.g., envelope for A/AAAA, mail icon for MX).
- **Multiple Query Types**: Supports A, AAAA, MX, SOA, and TTL queries.
- **Mail Server Simulation**: Dynamically displays a Mail Server node for MX queries.
- **Reset Functionality**: Reset the simulation to its initial state with a single click.
- **Font Awesome Icons**: Uses scalable vector icons for a clean and professional design.

---

## Live Demo

You can try the live demo of this project hosted on GitHub Pages:

👉 [DNS Query Flow Simulation](https://anir0y.in/sim-dns/)

---

## How It Works

1. **Enter Domain Name**: Input a domain name (e.g., `www.example.com`) into the text field.
2. **Select Query Type**: Choose the type of DNS query you want to simulate (A, AAAA, MX, SOA, TTL).
3. **Query DNS**: Click the "Query DNS" button to start the simulation.
4. **Observe Results**:
   - Watch the animated packet move between DNS servers.
   - View detailed results in the "Query Results" section.
5. **Reset Simulation**: Use the "Reset Simulation" button to clear all inputs and reset the animation.

---

## Installation

### Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Edge).
- No additional dependencies are required since the project uses plain HTML, CSS, and JavaScript.

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/anir0y/sim-dns
   ```
2. Navigate to the project directory:
   ```bash
   cd sim-dns
   ```
3. Open the `index.html` file in your browser:
   ```bash
   open index.html
   ```

Alternatively, you can download the ZIP file from GitHub and extract it to run the simulation locally.

---

## Usage

### Input Section

- **Domain Name**: Enter the domain you want to query (e.g., `www.example.com`).
- **Query Type**: Select the type of DNS record to retrieve:
  - **A**: IPv4 address.
  - **AAAA**: IPv6 address.
  - **MX**: Mail Exchange record.
  - **SOA**: Start of Authority record.
  - **TTL**: Time to Live value.

### Network Diagram

The network diagram visually represents the DNS query flow:
- **User Computer → Local DNS → Root DNS → TLD DNS → Authoritative DNS**.
- For MX queries, a **Mail Server** node is dynamically added to the diagram.

### Packet Animation

- The packet moves between nodes to simulate the query flow.
- Dynamic data (e.g., query type, domain name) is displayed below the packet during animation.

### Result Section

The "Query Results" section displays detailed information about each step of the DNS query process, including responses from each server.

---

## Technologies Used

- **HTML5**: Structure of the web page.
- **CSS3**: Styling and layout.
- **JavaScript**: Logic for animations, interactivity, and dynamic updates.
- **Font Awesome**: Scalable vector icons for a clean design.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **Font Awesome**: For providing scalable vector icons used in the simulation.
- **GitHub Pages**: For hosting the live demo of this project.

---

## Contact

If you have any questions or suggestions, feel free to reach out:

- GitHub: [@anir0y](https://github.com/anir0y)
- X: [@anir0y](https://x.com/anir0y)

---

## Screenshots

### Main Interface
![img](https://i.imgur.com/2yn8gku.png)

### MX Query Simulation
![MX Query](https://i.imgur.com/H86enoQ.png)
---
