# 🔧 Troubleshooting Guide - BSDI Admin Portal

## ❌ Error: QuotaExceededError

### What This Means:
Your browser's storage is full, usually from uploading large image files.

### ✅ Quick Fix (Automatic):

The system now **automatically removes** uploaded images when you:
1. Load the admin portal
2. Click "Publish"

**All your text content is preserved!** Only base64 image data is removed and replaced with default URLs.

---

## 🧹 Manual Cleanup Options

### Option 1: Use the "Clean Storage" Button (Recommended)
1. Go to `/admin`
2. Look for the **yellow warning banner** at the top (if you have uploaded images)
3. Click **"Clean Storage"** in the header or **"Clean Now"** in the banner
4. Confirm the action
5. ✅ Done! Storage is cleared, content preserved

### Option 2: Use Browser Console
1. Open browser DevTools (F12 or Right-click → Inspect)
2. Go to **Console** tab
3. Paste this command:
```javascript
localStorage.clear(); location.reload();
```
4. Press Enter
5. ✅ All storage cleared, page reloads

### Option 3: Clear Specific Data Only
1. Open browser DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Find **Local Storage** → Your site URL
4. Delete `bsdi_website_content`
5. Refresh the page
6. ✅ Reset to default content

---

## 🚫 How to Avoid This Error

### DO ✅
- **Use Image URLs** (paste links from Unsplash, Imgur, etc.)
- Keep uploaded files **under 500KB**
- Use the **"Image URL"** field (primary method)

### DON'T ❌
- Don't upload large image files (over 500KB)
- Don't upload multiple images via file upload
- Don't ignore the yellow warning banner

---

## 🎯 Recommended Workflow

### For All Images:
1. Find image on [Unsplash](https://unsplash.com)
2. Right-click → "Copy image address"
3. Paste into **"Image URL (Recommended)"** field
4. See instant preview
5. Click **"Publish"**

**No storage limits! No errors! Fast loading!** 🚀

---

## 🔍 Check Storage Usage

### In Browser Console:
```javascript
// Check total storage used
let total = 0;
for (let key in localStorage) {
  if (localStorage.hasOwnProperty(key)) {
    total += localStorage[key].length + key.length;
  }
}
console.log(`Storage used: ${(total / 1024).toFixed(2)} KB`);
```

### Typical Limits:
- **5-10 MB** per domain in most browsers
- **Base64 images** can easily exceed this
- **Image URLs** use almost no storage (just ~100 bytes each)

---

## 🛡️ Prevention Features (Now Active)

### Automatic Cleanup:
- ✅ Base64 images removed on page load
- ✅ Base64 images removed when publishing
- ✅ Replaced with default image URLs
- ✅ Text content always preserved

### User Warnings:
- 🟡 Yellow banner appears when base64 detected
- 🛑 500KB file size limit enforced
- 📢 Toast notifications for large files
- 💡 Helpful error messages

### Smart Validation:
- ✅ File size check before upload
- ✅ Clear error messages with actual file size
- ✅ Automatic cleanup on save
- ✅ Emergency cleanup if still fails

---

## 📊 Storage Breakdown

### What Uses Storage:

| Item | Typical Size |
|------|--------------|
| Text content (all sections) | ~5-10 KB |
| Image URL (external link) | ~100 bytes |
| Base64 image (uploaded file) | **500 KB - 2 MB each!** |
| Total with URLs | ~10-20 KB ✅ |
| Total with 3 uploaded images | **1.5-6 MB** ❌ |

**Conclusion:** Image URLs are 100x more efficient! 🎯

---

## 🆘 Still Having Issues?

### Nuclear Option - Complete Reset:
1. Open browser console
2. Run:
```javascript
localStorage.clear();
sessionStorage.clear();
location.reload();
```

This will:
- ❌ Remove all saved content
- ❌ Log you out
- ✅ Free all storage
- ✅ Start completely fresh

---

## 💡 Best Practices Summary

### Image Management:
1. **Always prefer Image URLs** over file uploads
2. **Use Unsplash** for professional stock images
3. **Use ImgBB/Imgur** for your own images
4. Keep files **under 500KB** if you must upload

### Storage Management:
1. Click **"Clean Storage"** if you see yellow warning
2. Monitor the warning banner
3. Use **"Preview"** before publishing
4. **"Publish"** regularly to trigger auto-cleanup

### Error Recovery:
1. Try **"Clean Storage"** button first
2. If that fails, use browser console `localStorage.clear()`
3. Your content is always safe with Image URLs!

---

## 📞 Technical Details

### Why Base64 Images Are Bad:
- Increases file size by ~33%
- Stored as text in localStorage
- Hits 5-10MB browser limit quickly
- Slows down page loads
- Can't be cached efficiently

### Why Image URLs Are Good:
- Minimal storage (~100 bytes)
- Cached by browser automatically
- No size limits
- Faster page loads
- Professional CDN delivery

---

**Remember:** The system now automatically protects you from storage errors! Just use Image URLs and you'll never see this error again. 🎉
