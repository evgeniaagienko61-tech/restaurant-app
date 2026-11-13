import fs from "node:fs";
import path from "node:path";
import { MenuStorageAdapter } from "@restaurant/core";

export class FileStorageAdapter extends MenuStorageAdapter {
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }

  load() {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }
      const raw = fs.readFileSync(this.filePath, "utf8");
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  save(dishes) {
    const dir = path.dirname(this.filePath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(this.filePath, JSON.stringify(dishes, null, 2), "utf8");
  }
}