package com.amiro.realtimeapi;

import org.bukkit.Server;
import org.bukkit.command.CommandSender;
import org.bukkit.permissions.Permission;
import org.bukkit.permissions.PermissionAttachment;
import org.bukkit.permissions.PermissionAttachmentInfo;
import org.bukkit.plugin.Plugin;

import java.util.*;

public class CustomCommandSender implements CommandSender {

    private final List<String> messages = new ArrayList<>();
    private final Server server;

    public CustomCommandSender(Server server) {
        this.server = server;
    }

    public String getOutput() {
        return String.join("\n", messages);
    }

    @Override
    public void sendMessage(UUID sender, String message) {
        sendMessage(message);
    }

    @Override
    public void sendMessage(UUID sender, String... messages) {
        for (String m : messages) sendMessage(m);
    }

    @Override
    public void sendMessage(String message) {
        messages.add(message);
    }

    @Override
    public void sendMessage(String[] messages) {
        for (String m : messages) sendMessage(m);
    }

    @Override
    public boolean isPermissionSet(String name) { return true; }

    @Override
    public boolean isPermissionSet(Permission perm) { return true; }

    @Override
    public boolean hasPermission(String name) { return true; }

    @Override
    public boolean hasPermission(Permission perm) { return true; }

    @Override
    public PermissionAttachment addAttachment(Plugin plugin) { return null; }

    @Override
    public PermissionAttachment addAttachment(Plugin plugin, String name, boolean value) { return null; }

    @Override
    public PermissionAttachment addAttachment(Plugin plugin, int ticks) { return null; } 
    @Override
    public PermissionAttachment addAttachment(Plugin plugin, String name, boolean value, int ticks) { return null; } 

    @Override
    public void removeAttachment(PermissionAttachment attachment) {}

    @Override
    public void recalculatePermissions() {}

    @Override
    public Set<PermissionAttachmentInfo> getEffectivePermissions() { return Collections.emptySet(); }

    @Override
    public Server getServer() { return server; }

    @Override
    public boolean isOp() { return true; }

    @Override
    public void setOp(boolean value) {}

    @Override
    public org.bukkit.command.CommandSender.Spigot spigot() {
        return new org.bukkit.command.CommandSender.Spigot() {};
    }

    @Override
    public String getName() {
        return "CustomSender";
    }
}
