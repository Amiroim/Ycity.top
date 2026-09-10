package com.amiro.realtimeapi;

import org.bukkit.Bukkit;
import org.bukkit.plugin.java.JavaPlugin;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;
import org.json.JSONObject;

import java.net.URI;
import java.util.Timer;
import java.util.TimerTask;

import fr.xephi.authme.api.v3.AuthMeApi;

public class RealtimeAPI extends JavaPlugin {

    private WebSocketClient client;
    private Timer reconnectTimer;

    @Override
    public void onEnable() {
        getLogger().info("RealtimeAPI Enabled");

        if (Bukkit.getPluginManager().getPlugin("AuthMe") == null) {
            getLogger().warning("AuthMe is not loaded! This plugin requires AuthMe.");
        }

        connectWebSocket();
    }

    private void connectWebSocket() {
        try {
            final JavaPlugin plugin = this;
                // backend web-socket api
            client = new WebSocketClient(new URI("ws://IP:8000")) {
                @Override
                public void onOpen(ServerHandshake handshake) {
                    plugin.getLogger().info("Connected to API server!");
                }

                @Override
                public void onMessage(String message) {
                    try {
                        JSONObject json = new JSONObject(message);
                        final String requestId = json.has("requestId") ? json.getString("requestId") : "none";

                        if (!json.has("type") || !json.getString("type").equals("command") || !json.has("command")) {
                            plugin.getLogger().warning("Received JSON without 'command' or unknown type: " + message);
                            return;
                        }

                        String cmd = json.getString("command");

                        if (cmd.toLowerCase().startsWith("login ")) {
                            handleLogin(cmd, requestId);
                        } else {
                            handleCommand(cmd, requestId);
                        }

                    } catch (Exception e) {
                        getLogger().warning("Failed to handle message: " + e.getMessage());
                        e.printStackTrace();
                    }
                }

                @Override
                public void onClose(int code, String reason, boolean remote) {
                    plugin.getLogger().info("Disconnected from API server: " + reason);
                    scheduleReconnect();
                }

                @Override
                public void onError(Exception ex) {
                    plugin.getLogger().warning("WebSocket Error: " + ex.getMessage());
                    ex.printStackTrace();
                }
            };

            client.connect();

        } catch (Exception e) {
            e.printStackTrace();
            scheduleReconnect();
        }
    }

    private void handleLogin(String cmd, String requestId) {
        final JavaPlugin plugin = this;
        String[] parts = cmd.split(" ");
        if (parts.length < 3) {
            sendErrorResponse(requestId, "INVALID_COMMAND", "Login command must be: login <username> <password>");
            return;
        }

        final String username = parts[1];
        final String password = parts[2];

        Bukkit.getScheduler().runTaskAsynchronously(plugin, () -> {
            JSONObject resp = new JSONObject();
            resp.put("requestId", requestId);

            try {
                AuthMeApi authme = AuthMeApi.getInstance();

                if (!authme.isRegistered(username)) {
                    resp.put("ok", false);
                    resp.put("code", "USER_NOT_FOUND");
                    resp.put("message", "User is not registered");
                } else if (!authme.checkPassword(username, password)) {
                    resp.put("ok", false);
                    resp.put("code", "INVALID_PASSWORD");
                    resp.put("message", "Password is incorrect");
                } else {
                    resp.put("ok", true);
                    resp.put("code", "SUCCESS");
                    resp.put("message", "Login successful");
                }
            } catch (Exception e) {
                resp.put("ok", false);
                resp.put("code", "UNKNOWN_ERROR");
                resp.put("message", e.toString());
                e.printStackTrace();
            }

            client.send(resp.toString());
        });
    }

    private void handleCommand(String cmd, String requestId) {
        final JavaPlugin plugin = this;
        Bukkit.getScheduler().runTask(plugin, () -> {
            try {
                if (cmd.toLowerCase().contains("authme")) {
                    CustomCommandSender sender = new CustomCommandSender(Bukkit.getServer());
                    Bukkit.dispatchCommand(sender, cmd);

                    Bukkit.getScheduler().runTaskLater(plugin, () -> {
                        String output = sender.getOutput();
                        if (output.isEmpty()) output = "✔ Command executed with no output.";

                        JSONObject resp = new JSONObject();
                        resp.put("ok", true);
                        resp.put("requestId", requestId);
                        resp.put("output", output);

                        client.send(resp.toString());
                    }, 20L);

                } else {
                    boolean success = Bukkit.dispatchCommand(Bukkit.getConsoleSender(), cmd);
                    JSONObject resp = new JSONObject();
                    resp.put("ok", success);
                    resp.put("requestId", requestId);
                    resp.put("output", success ? "Command executed" : "Command failed");
                    client.send(resp.toString());
                }
            } catch (Exception e) {
                sendErrorResponse(requestId, "COMMAND_ERROR", e.getMessage());
                e.printStackTrace();
            }
        });
    }

    private void sendErrorResponse(String requestId, String code, String message) {
        try {
            JSONObject resp = new JSONObject();
            resp.put("ok", false);
            resp.put("requestId", requestId);
            resp.put("code", code);
            resp.put("message", message);
            if (client != null) client.send(resp.toString());
        } catch (Exception ignored) {}
    }

    private void scheduleReconnect() {
        if (reconnectTimer != null) {
            reconnectTimer.cancel();
        }
        reconnectTimer = new Timer();
        reconnectTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                getLogger().info("Trying to reconnect WebSocket...");
                connectWebSocket();
            }
        }, 30_000);
    }

    @Override
    public void onDisable() {
        getLogger().info("RealtimeAPI Disabled");
        if (client != null) client.close();
        if (reconnectTimer != null) reconnectTimer.cancel();
    }
}
