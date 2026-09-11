<div align="center">

# Ycity.top

<p>
  <img src="https://img.shields.io/badge/Platform-Minecraft-brightgreen?style=for-the-badge" alt="Minecraft" />
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge" alt="Frontend" />
  <img src="https://img.shields.io/badge/Backend-Express%20%7C%20REST%20API-orange?style=for-the-badge" alt="Backend" />
  <img src="https://img.shields.io/badge/Plugin-Java%20%7C%20WebSocket-purple?style=for-the-badge" alt="Plugin" />
  <img src="https://img.shields.io/badge/Stack-React%20%7C%20Express%20%7C%20Java-blue?style=for-the-badge" alt="Stack" />
</p>

<p>
  <em>
    A Minecraft server management website providing user authentication,
    account management, and real-time server communication through a custom plugin.
  </em>
</p>

</div>

---

## Overview

Ycity.top is a full-stack website built for a Minecraft server ecosystem.

The platform provides users with authentication and account management features,
while also allowing the website to communicate with the Minecraft server through
a custom plugin.

The architecture is divided into three main components:

<table>
  <thead>
    <tr>
      <th align="left">Component</th>
      <th align="left">Technology</th>
      <th align="left">Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Frontend</b></td>
      <td><code>React</code></td>
      <td>User interface, authentication pages, account management and server information.</td>
    </tr>
    <tr>
      <td><b>Backend</b></td>
      <td><code>REST API</code></td>
      <td>Authentication, account management, API logic and communication with the database.</td>
    </tr>
    <tr>
      <td><b>Minecraft Plugin</b></td>
      <td><code>Java</code> / <code>WebSocket</code></td>
      <td>Connects the Minecraft server to the backend and provides real-time server communication.</td>
    </tr>
  </tbody>
</table>

---

## Architecture

The project consists of three separate layers that communicate with each other:

<table>
  <thead>
    <tr>
      <th align="left">Layer</th>
      <th align="left">Communication</th>
      <th align="left">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Frontend</b></td>
      <td><code>REST API</code></td>
      <td>Communicates with the backend for authentication, account management and server data.</td>
    </tr>
    <tr>
      <td><b>Backend</b></td>
      <td><code>REST API</code> / <code>WebSocket</code></td>
      <td>Handles business logic and acts as the communication layer between the frontend and Minecraft plugin.</td>
    </tr>
    <tr>
      <td><b>Minecraft Plugin</b></td>
      <td><code>WebSocket</code></td>
      <td>Runs on the Minecraft server and maintains a connection with the backend.</td>
    </tr>
  </tbody>
</table>

---

## Features

<table>
  <thead>
    <tr>
      <th align="left">Feature</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>User Login</td>
    </tr>
    <tr>
      <td>User Registration</td>
    </tr>
    <tr>
      <td>Account Management</td>
    </tr>
    <tr>
      <td>Password Management</td>
    </tr>
    <tr>
      <td>Account Deletion</td>
    </tr>
    <tr>
      <td>Minecraft Server Status</td>
    </tr>
    <tr>
      <td>Minecraft Plugin Integration</td>
    </tr>
    <tr>
      <td>Real-time WebSocket Communication</td>
    </tr>
    <tr>
      <td>Backend REST API</td>
    </tr>
  </tbody>
</table>

---

## Project Structure

<table>
  <thead>
    <tr>
      <th align="left">Part</th>
      <th align="left">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Frontend</code></td>
      <td>Website interface and user experience</td>
    </tr>
    <tr>
      <td><code>Backend</code></td>
      <td>REST API, authentication and application logic</td>
    </tr>
    <tr>
      <td><code>Plugin</code></td>
      <td>Minecraft server integration and WebSocket communication</td>
    </tr>
  </tbody>
</table>

---

## Screenshots

### Login Page

<img src="https://github.com/Amiroim/Ycity.top/blob/main/media/Screenshot%20(536).png" alt="Login Page">

### Register Page

<img src="https://github.com/Amiroim/Ycity.top/blob/main/media/Screenshot%20(537).png" alt="Register Page">

### Home Page / Landing

<img src="https://github.com/Amiroim/Ycity.top/blob/main/media/Screenshot%20(538).png" alt="Home Page">

### Menu

<img src="https://github.com/Amiroim/Ycity.top/blob/main/media/Screenshot%20(539).png" alt="Menu">

### Menu for Users

<img src="https://github.com/Amiroim/Ycity.top/blob/main/media/Screenshot%20(542).png" alt="User Menu">

### Account Page

<img src="https://github.com/Amiroim/Ycity.top/blob/main/media/Screenshot%20(546).png" alt="Account Page">

### Change Password Page

<img src="https://github.com/Amiroim/Ycity.top/blob/main/media/Screenshot%20(547).png" alt="Change Password Page">

### Delete Account Page

<img src="https://github.com/Amiroim/Ycity.top/blob/main/media/Screenshot%20(548).png" alt="Delete Account Page">

### Server Status Page

<img src="https://github.com/Amiroim/Ycity.top/blob/main/media/Screenshot%20(556).png" alt="Server Status Page">

---

## Development Status

<table>
  <thead>
    <tr>
      <th align="left">Component</th>
      <th align="center">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Frontend</td>
      <td align="center">Implemented</td>
    </tr>
    <tr>
      <td>Backend</td>
      <td align="center">Implemented</td>
    </tr>
    <tr>
      <td>Minecraft Plugin</td>
      <td align="center">Implemented</td>
    </tr>
    <tr>
      <td>WebSocket Integration</td>
      <td align="center">Implemented</td>
    </tr>
    <tr>
      <td>REST API Integration</td>
      <td align="center">Implemented</td>
    </tr>
  </tbody>
</table>

---

## Note

The backend and Minecraft plugin were developed with the assistance of AI-based development tools.

---

<div align="center">

<p>
  <em>Ycity.top</em>
</p>

</div>
