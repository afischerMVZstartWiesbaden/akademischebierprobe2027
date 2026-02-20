# AKADEMISCHE BIERPROBE — EXPOSE

## Übersicht
Web-App für jährliche Bierverkostung. Läuft auf GitHub Pages + Firebase Realtime Database.

## Hosting
- **App-URL:** https://afischermvzstartwiesbaden.github.io/bierprobe/
- **GitHub Repo:** https://github.com/afischerMVZstartWiesbaden/bierprobe
- **Firebase:** https://akademische-bierprobe-2027-default-rtdb.europe-west1.firebasedatabase.app

## Dateien im Repo
| Datei | Beschreibung |
|-------|-------------|
| `index.html` | Komplette App (Splash, Lobby, Bewertung, Ergebnisse) |
| `intro.mp4` | Video-Intro (H.264 faststart, ~500KB) |
| `sw.js` | Service Worker (lässt MP4 durch, kein Intercept) |
| `BIERPROBE_EXPOSE.md` | Diese Datei |

## Jährlicher Update-Workflow

### Video tauschen
1. Neues Video in Claude-Chat hochladen
2. Claude enkodiert es: `ffmpeg -i input.mp4 -vcodec h264 -profile:v baseline -level 3.1 -crf 28 -acodec aac -b:a 64k -movflags +faststart intro.mp4`
3. Neue `intro.mp4` ins GitHub Repo hochladen (ersetzt alte)

### Splash-Bild tauschen
1. Neues PNG in Claude-Chat hochladen
2. Claude ersetzt das Base64-Bild in `index.html`
3. Neue `index.html` ins Repo hochladen

### Prompt für neuen Chat
```
Ich habe eine Bierprobe-App auf GitHub Pages. Ich möchte das jährliche 
Video-Intro und Splash-Bild aktualisieren. Die EXPOSE-Datei liegt im Repo:
https://github.com/afischerMVZstartWiesbaden/bierprobe
Hier sind die neuen Dateien: [Video + Bild anhängen]
```

## Kategorien ergänzen
Prompt: "Füge Kategorie [NAME] zur Bierprobe-App hinzu"
Claude ergänzt automatisch: Slider-HTML, JS-State, Submit-Logik, Ergebnis-Anzeige.

## Bewertungslogik
- Skala: 0–11 pro Kategorie
- Berechnung: **Summe** (kein Mittelwert) — alle Kategorien pro Taster → alle Taster summiert
- Kategorien: Vortrag, Sound, Haptik, Geschmack, Aroma, Stammwürze, Abgang, Parkbank, Credibility

## App-Ablauf
1. **Gastgeber** öffnet App → Gastgeber → Name + Probename + Datum → Probe eröffnen
2. **Taster** öffnen gleiche URL → Taster → Name eingeben → Beitreten
3. **Gastgeber** sieht Lobby mit Teilnehmern → "Alle am Start — Los!"
4. **Gastgeber** gibt Biernahmen ein → alle Taster sehen Ankündigung → bewerten
5. **Gastgeber** sieht Bewertungsstand (wer fertig, wer fehlt) → nächste Runde
6. **Gastgeber** beendet Probe → sieht Auswertung → "Veröffentlichen"
7. **Alle** sehen Ergebnisse + können Gruppenfoto hochladen

## Firebase Regeln (Testmodus — für Produktion anpassen)
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
Für mehr Sicherheit vor dem echten Event auf Datum-basierte Regeln umstellen.

## Video-Specs für Neuaufnahmen
- Format: MP4, H.264 Baseline Profile 3.1
- Auflösung: 480×854 (Portrait) oder 1080×1920
- `moov`-Atom muss vor `mdat` liegen (faststart)
- Zielgröße: unter 2MB für schnelles Laden
