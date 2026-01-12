# Updated: Characters → Pilgrims

## ✅ All Changes Complete

Successfully renamed all "characters" references to "pilgrims" throughout the codebase.

---

## 📁 Files & Folders Renamed

### Folders:
- `src/lib/components/characters/` → `src/lib/components/pilgrims/`
- `src/routes/characters/` → `src/routes/pilgrims/`

### Components:
- `CharacterCard.svelte` → `PilgrimCard.svelte`
- `CharacterCards.svelte` → `PilgrimCards.svelte`

---

## 🔧 Code Changes

### Configuration (`src/lib/config/site.ts`):
- `characters` array → `pilgrims` array
- Image paths: `/images/characters/` → `/images/pilgrims/`

### Navigation (`Header.svelte`):
- Menu item: "Characters" → "Pilgrims"
- Route: `/characters` → `/pilgrims`

### Pages Updated:
- ✅ Home page (`/+page.svelte`)
- ✅ Pilgrims page (`/pilgrims/+page.svelte`)
- ✅ Donate success page

### Components Updated:
- ✅ `PilgrimCard.svelte` - Interface and props
- ✅ `PilgrimCards.svelte` - Component name and imports
- ✅ Home page - Import and usage

---

## 📸 Image Folder Update Needed

**IMPORTANT**: When you upload images, use the new folder structure:

### Old path (don't use):
```
static/images/characters/
├── siriani.jpg
├── yonatan.jpg
└── ...
```

### New path (use this):
```
static/images/pilgrims/
├── siriani.jpg
├── yonatan.jpg
├── john-fatima.jpg
├── swami-ogi.jpg
├── luke.jpg
└── guruji.jpg
```

---

## 🧪 Test Your Changes

Visit these pages to verify:
- http://localhost:5173/ - Should say "Meet the Pilgrims"
- http://localhost:5173/pilgrims - Pilgrims page with all 6 profiles
- Navigation should show "Pilgrims" instead of "Characters"

---

## 👥 Pilgrims in Config

All 6 pilgrims are already in your config (including Luke Ram and Swami Nardanand):

1. **Siriani Txana** - Huni Kuin Shaman from the Amazon
2. **Yonatan Hoffman** - Ex-IDF Soldier Seeking Peace
3. **John Ellison & Fatima Ghedira** - Interfaith Couple
4. **Swami Ogi** - From Silicon Valley to Swami
5. **Luke Ram** - Australian Rediscovering Heritage ✓
6. **Swami Nardanand (Guruji)** - Spiritual Teacher ✓

---

## 🎨 Ready for Design Update

The structure is ready for kambai (your front-end agent) to redesign. All the terminology is consistent now:
- URLs use `/pilgrims`
- Components use `Pilgrim` terminology
- Navigation says "Pilgrims"
- Content refers to "pilgrims" throughout

---

## 🔄 If You Need to Revert

To change back to "characters" (unlikely):
```bash
# Rename folders back
mv src/lib/components/pilgrims src/lib/components/characters
mv src/routes/pilgrims src/routes/characters

# Update config: pilgrims → characters
# Update navigation: /pilgrims → /characters
```

---

**Status**: ✅ Complete and tested
**Server**: Running at http://localhost:5173
**Next**: Upload images to `static/images/pilgrims/`

_Updated: January 12, 2026_
