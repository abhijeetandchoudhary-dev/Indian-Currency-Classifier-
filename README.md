# Indian Currency Classifier

AI-powered web application that detects Indian currency notes from a live camera feed and gives spoken feedback for accessibility.

## Features

- Live camera preview in browser
- One-tap scan workflow
- Roboflow inference integration
- Voice output using browser speech synthesis
- Server-side API key protection through Vercel API route

## Project Structure

```text
Currency_Classifier/
	dataset/
	main.py
	requirements.txt
	utils.py
	web/
		api/
			infer.js
		app.js
		index.html
		style.css
```

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Inference API: Roboflow Detect API
- Deployment: Vercel
- API proxy: Vercel Serverless Function (`web/api/infer.js`)

## Environment Variables (Vercel)

Add these in your Vercel project settings:

- `ROBOFLOW_API_KEY`
- `ROBOFLOW_MODEL_ID` (example: `indian-currency-notes-ecttv`)
- `ROBOFLOW_VERSION` (example: `2`)

## Deploy on Vercel

1. Import this repository into Vercel.
2. Set `Application Preset` to `Other`.
3. Set `Root Directory` to `Currency_Classifier/web`.
4. Add the required environment variables.
5. Deploy.

## Local Development

Because this project uses a Vercel API route (`/api/infer`), run it with Vercel CLI for full functionality.

```bash
npm i -g vercel
vercel dev
```

Then open the local URL shown by Vercel (usually `http://localhost:3000`).

## Accessibility Notes

- The app is designed for quick interaction with a large scan button.
- Audio announcements help communicate scan results.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
