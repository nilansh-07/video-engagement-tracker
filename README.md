# 🎓 EduTrack: Intelligent Learning Progress Tracker

**EduTrack** is a smart, interactive lecture video tracker measuring genuine user engagement. Unlike traditional methods that mark videos as "watched" once played till the end, EduTrack calculates progress **only when unique, previously unseen parts** of a video are viewed. Ideal for modern e-learning platforms, this tool ensures that student interaction is both meaningful and measurable.

---

## 🚀 Features

- ✅ Tracks **only new segments** of a video watched (avoids repeat inflation)
- ✅ **Prevents cheating** by skipping or rewatching previously watched content
- ✅ **Persists progress** across sessions using the browser `localStorage`
- ✅ **Resume playback** from the last watched position
- ✅ Live **progress indicator** updates in real-time
- ✅ Built with **React**, styled using **Tailwind CSS**
- ✅ Customizable **playback speed selector**

---

## 📈 **Demo**

> *[Live Demo Link]*  

---

## 🔠 How It Works

### 📊 Unique Viewing Logic

- Tracks every watched segment as a time interval `[start, end]`
- On pause/end, merges overlapping intervals using a merge algorithm
- Progress is calculated as:

```text
(Unique seconds watched / Total video duration) * 100
```

### 🔖 Data Persistence

- All data (watched intervals, progress %, last position) saved in `localStorage`
- On reload, playback resumes and progress is re-rendered

---

## 🔧 Technologies Used

| Tech            | Description                  |
| --------------- | ---------------------------- |
| React           | Component-based UI           |
| Vite            | Blazing-fast dev environment |
| Tailwind CSS    | Utility-first CSS framework  |
| JavaScript ES6+ | Modern browser support       |
| HTML5 `<video>` | Native video player support  |

---

## 📄 Project Structure

```
video-progress-tracker/
├── public/
│   └── PalPalSample.mp4       # Video file for testing
├── src/
│   ├── App.jsx                # Main React logic
│   ├── main.jsx               # App entry
│   └── index.css              # Tailwind CSS import
├── index.html
├── tailwind.config.js
└── vite.config.js
```

---

## 📖 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/nilansh-07/video-engagement-tracker.git
cd video-engagement-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open your browser at `http://localhost:5173`

> Tip: Replace the video file in `public/` folder with your lecture content.

---

## 📅 Design Decisions

- Used `useRef` to directly access the video DOM
- Used `useEffect` to bind/unbind player events
- Saved intervals and progress in `localStorage` for simplicity
- Playback resume is implemented using the last watched time
- Tailwind CSS is used for consistent, responsive design

##
---

## 📧 Contact

For questions or suggestions, feel free to reach out:

- GitHub: [@nilansh-07](https://github.com/nilansh-07)
- Email: [nilanshkumar7500@gmail.com](mailto\:nilanshkumar7500@gmail.com)


##
