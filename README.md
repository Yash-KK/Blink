# 🚀 Blink – Decentralized Uptime Monitoring Platform

**Blink** is a decentralized uptime monitoring platform designed to track website availability in real time. It uses a modular architecture powered by **TurboRepo** with four apps, ensuring efficiency, scalability, and flexibility. Validators are compensated with **Solana wallets** at the end of each month.

---

## 🛠️ Architecture

Blink consists of **four apps**:
1. **Front-end** – Built with **Next.js**, providing a sleek and responsive UI for users to monitor website uptime.
2. **API** – An **HTTP Bun server** that handles requests from the front-end and interacts with the Hub and Validators.
3. **Hub** – A **WebSocket Bun server** responsible for distributing website URLs to Validators every minute. It listens for validation responses and triggers callback functions on completion.
4. **Validator** – A **WebSocket Bun server** that performs the actual website validation by sending HTTP requests and returning the status to the Hub.

---

## 🔗 Flow Overview

1. **Website Submission:** Users submit websites to monitor through the front-end.
2. **Distribution:** The API sends the list of websites to the Hub.
3. **Callback-based Validation:** 
    - The Hub assigns a **unique request ID** to each website request and sends it to the Validators over a WebSocket connection.
    - When the Validator receives the request, it performs the uptime check by sending an HTTP request to the website.
    - Once the validation is complete, the Validator sends the response back to the Hub, including the original request ID.
    - The Hub uses the request ID to **trigger the corresponding callback function**, ensuring that the correct website status is updated.
4. **Real-time Updates:** The Hub sends the validation results back to the front-end, updating the website status in real-time.
5. **Payment:** Validators are compensated with **Solana wallet payments** at the end of each month.

---

## ⚙️ Tech Stack

- **TurboRepo** – Monorepo management.
- **Next.js** – Front-end app with a modern UI.
- **Bun** – For the API, Hub, and Validator servers.
- **WebSockets** – Real-time communication between the Hub and Validators.
- **Solana Wallets** – For decentralized validator payments.

---


## ⚙️ Callback-based Architecture Explained

In this architecture, a **WebSocket connection** exists between the **Hub** and the **Validator**. When the Hub sends a request, it specifies a **callback function** that should be triggered upon receiving the corresponding response.

### 🛠️ How It Works:
- The Hub maintains a **Global Callback List**, which tracks all pending requests.
- Each request is assigned a **unique identifier** (e.g., `requestID`) and is stored in the callback list as a key-value pair:

- When the Validator sends a response, the Hub looks for the corresponding `requestID` in the callback list.
- The matching callback function is executed, and the `requestID` is removed from the list to **prevent memory leaks or redundant calls**.

### ✅ Benefits:
- Ensures that each response is mapped to its original request.
- Enables **asynchronous, non-blocking communication** between the Hub and Validator.
- Prevents stale or redundant callbacks by cleaning up the callback list.

---

![image](https://github.com/user-attachments/assets/ff139aea-5a8c-4f0a-b13f-db531214aa55)

---

https://github.com/user-attachments/assets/1291bc0a-aee4-4d09-85c9-48a912fed91d
