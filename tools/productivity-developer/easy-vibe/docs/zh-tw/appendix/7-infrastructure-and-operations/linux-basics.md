# Linux 基礎

::: tip 前言
**伺服器的世界，Linux 是絕對的主角。** 全球超過 90% 的伺服器執行 Linux，從你每天用的微信到 Google 搜尋，背後都是 Linux 在支撐。作為開發者，掌握 Linux 基礎不是可選項，而是必修課。
:::

**這篇文章會帶你學什麼？**

學完這章後，你將獲得：

- **檔案系統**：理解 Linux 目錄結構和「一切皆檔案」的哲學
- **常用指令**：掌握檔案操作、文字處理、程序管理等核心指令
- **權限模型**：理解使用者、群組、權限的概念
- **Shell 基礎**：了解管線、重定向、環境變數等 Shell 核心概念
- **實戰技能**：學會日誌查看、程序排查、網路診斷等維運基本功

| 章節 | 內容 | 核心概念 |
|-----|------|---------|
| **第 1 章** | 檔案系統 | 目錄結構、一切皆檔案 |
| **第 2 章** | 常用指令 | 檔案、文字、程序、網路 |
| **第 3 章** | 權限模型 | 使用者、群組、rwx、sudo |
| **第 4 章** | Shell 基礎 | 管線、重定向、變數、腳本 |
| **第 5 章** | 實戰場景 | 日誌排查、效能診斷 |

---

## 1. 檔案系統：一切皆檔案

Linux 最核心的哲學之一就是**一切皆檔案**。普通檔案是檔案，目錄是檔案，硬碟是檔案，甚至網路連線、程序資訊都是檔案。這個統一的抽象讓你可以用同一套工具（讀、寫、權限控制）操作幾乎所有系統資源。

<LinuxFileSystemDemo />

### 目錄結構速記

把 Linux 檔案系統想像成一棵倒過來的樹：

```
/                    ← 根目錄（樹根）
├── home/            ← 使用者的家（你的檔案都在這）
├── etc/             ← 設定檔案（系統的「設定面板」）
├── var/             ← 變化的資料（日誌、快取）
├── usr/             ← 使用者安裝的程式
├── tmp/             ← 臨時檔案（重啟就沒了）
├── proc/            ← 程序資訊（虛擬的，不佔磁碟）
├── dev/             ← 裝置檔案（硬碟、終端）
├── bin/             ← 基礎指令（ls、cp、mv）
├── sbin/            ← 系統管理指令（需要 root）
├── opt/             ← 第三方軟體
└── root/            ← root 使用者的家目錄
```

### 路徑的兩種寫法

| 類型 | 格式 | 範例 | 說明 |
|------|------|------|------|
| 絕對路徑 | 從 `/` 開始 | `/home/alice/code/app.js` | 從根目錄出發，不會有歧義 |
| 相對路徑 | 從當前目錄開始 | `./code/app.js` 或 `../config` | `.` 是當前目錄，`..` 是上層目錄 |

::: tip 「一切皆檔案」的威力
想知道 CPU 資訊？讀檔案：`cat /proc/cpuinfo`
想知道記憶體使用？讀檔案：`cat /proc/meminfo`
想產生隨機數？讀檔案：`cat /dev/urandom`
想丟棄輸出？寫檔案：`echo "no thanks" > /dev/null`

不需要專門的 API，讀寫檔案就夠了。這就是 Unix 哲學的優雅之處。
:::

---

## 2. 常用指令

Linux 指令遵循一個統一的格式：`指令 [選項] [參數]`。比如 `ls -la /home` 中，`ls` 是指令，`-la` 是選項，`/home` 是參數。

<LinuxCommandDemo />

### 最常用的 10 個指令

如果只能記住 10 個指令，記這些：

| 指令 | 用途 | 記憶技巧 |
|------|------|----------|
| `ls` | 列出檔案 | list |
| `cd` | 切換目錄 | change directory |
| `cat` | 查看檔案 | concatenate |
| `grep` | 搜尋文字 | global regular expression print |
| `find` | 查找檔案 | 就是 find |
| `ps` | 查看程序 | process status |
| `tail -f` | 即時看日誌 | 看檔案「尾巴」，-f 是 follow |
| `chmod` | 改權限 | change mode |
| `curl` | 發 HTTP 請求 | client URL |
| `ssh` | 遠端登入 | secure shell |

### 指令組合的藝術

Linux 的強大不在於單個指令，而在於**指令組合**。透過管線 `|` 把多個簡單指令串起來，解決複雜問題：

```bash
# 找出佔用 CPU 最多的 5 個程序
ps aux --sort=-%cpu | head -6

# 統計日誌中出現最多的錯誤類型
grep "ERROR" app.log | awk '{print $4}' | sort | uniq -c | sort -rn | head -10

# 查找大於 100MB 的檔案
find / -size +100M -type f 2>/dev/null

# 即時監控日誌中的錯誤
tail -f /var/log/app.log | grep --color "ERROR"
```

::: tip Unix 哲學
「做一件事，做好它。」每個指令只負責一個功能，透過管線組合實現複雜操作。這就是為什麼 Linux 指令都很短小——它們是積木，不是瑞士軍刀。
:::

---

## 3. 權限模型

Linux 是多使用者系統，權限模型是安全的基石。每個檔案都有三組權限，分別控制**擁有者（Owner）**、**所屬群組（Group）**、**其他人（Others）**能做什麼。

### 讀懂 `ls -l` 的輸出

```bash
$ ls -l app.js
-rwxr-xr-- 1 alice developers 2048 Jan 15 10:30 app.js
│├──┤├──┤├──┤   │     │          │
│ │   │   │     │     │          └── 檔案大小
│ │   │   │     │     └── 所屬群組
│ │   │   │     └── 擁有者
│ │   │   └── 其他人權限：r-- (唯讀)
│ │   └── 群組權限：r-x (讀+執行)
│ └── 擁有者權限：rwx (讀+寫+執行)
└── 檔案類型：- 普通檔案，d 目錄，l 連結
```

### 權限的三種操作

| 權限 | 字母 | 數字 | 對檔案的含義 | 對目錄的含義 |
|------|------|------|-------------|-------------|
| 讀 | `r` | 4 | 查看檔案內容 | 列出目錄內容（ls） |
| 寫 | `w` | 2 | 修改檔案內容 | 建立/刪除目錄中的檔案 |
| 執行 | `x` | 1 | 執行程式/腳本 | 進入目錄（cd） |

<LinuxPermissionsDemo />

### 數字權限速算

三個數字分別代表 Owner、Group、Others 的權限，每個數字是 r(4) + w(2) + x(1) 的和：

```
chmod 755 script.sh
  7 = rwx (4+2+1)  → 擁有者：讀+寫+執行
  5 = r-x (4+0+1)  → 群組：讀+執行
  5 = r-x (4+0+1)  → 其他人：讀+執行
```

| 常見權限 | 含義 | 典型用途 |
|---------|------|---------|
| `644` | rw-r--r-- | 普通檔案（擁有者可寫，其他人唯讀） |
| `755` | rwxr-xr-x | 可執行檔案/目錄 |
| `600` | rw------- | 私密檔案（如 SSH 金鑰） |
| `777` | rwxrwxrwx | 所有人可讀寫執行（危險，避免使用） |

### sudo：臨時取得超級權限

普通使用者權限有限，有些操作需要 root 權限。`sudo` 讓你臨時以 root 身分執行指令：

```bash
# 普通使用者無法修改系統設定
$ vim /etc/nginx/nginx.conf
# Permission denied

# 用 sudo 臨時提權
$ sudo vim /etc/nginx/nginx.conf
# 輸入你的密碼後可以編輯

# 切換到 root 使用者（謹慎使用）
$ sudo su -
```

::: warning 最小權限原則
永遠不要用 `chmod 777` 解決權限問題，這等於把門鎖拆了。正確做法是搞清楚誰需要什麼權限，精確授予。同樣，不要長期以 root 身分操作，只在必要時用 `sudo`。
:::

---

## 4. Shell 基礎

Shell 是你和 Linux 核心之間的「翻譯官」。你輸入指令，Shell 解釋並交給核心執行。最常用的 Shell 是 **Bash**（大多數 Linux 發行版預設）和 **Zsh**（macOS 預設）。

### 管線與重定向

這是 Shell 最強大的兩個特性：

| 符號 | 名稱 | 作用 | 範例 |
|------|------|------|------|
| `|` | 管線 | 把前一個指令的輸出作為後一個的輸入 | `cat log \| grep ERROR` |
| `>` | 輸出重定向 | 把輸出寫入檔案（覆蓋） | `echo "hello" > file.txt` |
| `>>` | 追加重定向 | 把輸出追加到檔案末尾 | `echo "world" >> file.txt` |
| `<` | 輸入重定向 | 從檔案讀取輸入 | `wc -l < file.txt` |
| `2>` | 錯誤重定向 | 把錯誤資訊寫入檔案 | `cmd 2> error.log` |
| `2>&1` | 合併輸出 | 把錯誤和正常輸出合併 | `cmd > all.log 2>&1` |

### 環境變數

環境變數是 Shell 中的「全域設定」，影響指令的行為：

```bash
# 查看所有環境變數
env

# 查看某個變數
echo $PATH
echo $HOME

# 臨時設定（只在當前 Shell 有效）
export API_KEY="abc123"

# 永久設定（寫入設定檔案）
echo 'export API_KEY="abc123"' >> ~/.bashrc
source ~/.bashrc   # 讓設定立即生效
```

| 常見變數 | 含義 | 範例值 |
|---------|------|--------|
| `$PATH` | 指令搜尋路徑 | `/usr/local/bin:/usr/bin:/bin` |
| `$HOME` | 使用者主目錄 | `/home/alice` |
| `$USER` | 當前使用者名稱 | `alice` |
| `$PWD` | 當前工作目錄 | `/var/log` |
| `$SHELL` | 當前使用的 Shell | `/bin/bash` |

### Shell 腳本入門

把多個指令寫進一個檔案，就是 Shell 腳本。它是自動化維運的起點：

```bash
#!/bin/bash
# deploy.sh - 簡單的部署腳本

APP_DIR="/opt/myapp"
LOG_FILE="/var/log/deploy.log"

echo "$(date) - 開始部署..." >> $LOG_FILE

# 拉取最新程式碼
cd $APP_DIR && git pull origin main

# 安裝依賴
npm install --production

# 重啟服務
pm2 restart myapp

echo "$(date) - 部署完成" >> $LOG_FILE
```

```bash
# 給腳本執行權限並執行
chmod +x deploy.sh
./deploy.sh
```

::: tip 腳本除錯技巧
在腳本開頭加 `set -ex`：`-e` 讓腳本遇到錯誤立即退出（而不是繼續執行），`-x` 會列印每條執行的指令（方便排查問題）。這兩個選項在生產腳本中幾乎是標配。
:::

---

## 5. 實戰場景

理論學完了，來看幾個開發中最常遇到的實戰場景。

### 5.1 日誌排查

服務出問題，第一反應就是看日誌。以下是日誌排查的常用套路：

```bash
# 1. 即時追蹤日誌（最常用）
tail -f /var/log/app/error.log

# 2. 搜尋特定時間段的錯誤
grep "2024-01-15 14:" error.log | grep "ERROR"

# 3. 統計每小時的錯誤數量
grep "ERROR" app.log | awk '{print substr($1,1,13)}' | uniq -c

# 4. 查看最近 100 行日誌
tail -100 app.log

# 5. 在多個日誌檔案中搜尋
grep -r "OutOfMemory" /var/log/app/
```

### 5.2 程序排查

應用卡死、CPU 飆高、記憶體泄漏——這些問題都需要從程序入手：

```bash
# 查看 CPU 佔用最高的程序
ps aux --sort=-%cpu | head -10

# 查看記憶體佔用最高的程序
ps aux --sort=-%mem | head -10

# 查找特定程序
ps aux | grep "node"

# 查看程序的詳細資訊（包括執行緒）
top -Hp <PID>

# 查看程序開啟的檔案
lsof -p <PID>

# 優雅終止程序（SIGTERM）
kill <PID>

# 強制終止（SIGKILL，最後手段）
kill -9 <PID>
```

### 5.3 網路診斷

服務連不上？先搞清楚是網路問題還是應用問題：

```bash
# 測試目標是否可達
ping -c 4 google.com

# 檢查連接埠是否開放
telnet db-server 3306
# 或者用 nc
nc -zv db-server 3306

# 查看本機監聽的連接埠
ss -tlnp
# 或
netstat -tlnp

# DNS 解析檢查
dig api.example.com
nslookup api.example.com

# 測試 HTTP 介面
curl -v http://localhost:3000/health

# 查看網路連線狀態統計
ss -s
```

### 5.4 磁碟空間排查

磁碟滿了是線上最常見的故障之一：

```bash
# 查看各分區使用情況
df -h

# 找出佔用空間最大的目錄
du -sh /* 2>/dev/null | sort -rh | head -10

# 進一步定位大目錄
du -sh /var/log/* | sort -rh | head -10

# 查找大檔案（>100MB）
find / -type f -size +100M 2>/dev/null | head -20

# 清理常見的空間佔用
# 清理舊日誌
sudo journalctl --vacuum-size=500M
# 清理 Docker 無用映像
docker system prune -a
```

::: tip 線上排查口訣
**「一看日誌，二看程序，三看網路，四看磁碟」**。90% 的線上問題都能透過這四步定位到原因。養成習慣後，排查效率會大幅提升。
:::

---

## 總結

Linux 是開發者的必備技能，掌握基礎就能應對大部分日常開發和維運場景。

回顧本章的關鍵要點：

1. **一切皆檔案**：Linux 用檔案抽象統一了對硬體、程序、網路等資源的存取方式
2. **指令組合**：單個指令功能簡單，透過管線 `|` 組合才能發揮真正威力
3. **權限模型**：Owner/Group/Others × Read/Write/Execute，用數字（如 755）快速設定
4. **Shell 基礎**：管線、重定向、環境變數、腳本是自動化的基石
5. **實戰排查**：日誌 → 程序 → 網路 → 磁碟，四步定位大部分線上問題

## 延伸閱讀

- [Linux 指令大全](https://man7.org/linux/man-pages/) - Linux man pages 官方文件
- [The Linux Command Line](https://linuxcommand.org/tlcl.php) - 免費的 Linux 命令列入門書
- [Linux Journey](https://linuxjourney.com/) - 互動式 Linux 學習網站
- [explainshell.com](https://explainshell.com/) - 輸入指令自動解釋每個參數的含義
