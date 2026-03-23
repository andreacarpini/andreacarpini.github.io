var posts = [
  {
    title: 'SheetLabel — barcode labels and inventory from Google Sheets',
    date: 'March 14, 2026',
    body: `
I built [SheetLabel](https://sheetlabel.app/) because every inventory tool I tried was either too heavy or completely detached from where the data already lived — a spreadsheet.

The idea is simple: stay in Google Sheets, add a sidebar, and have everything else just work.

## What it does

SheetLabel is a Google Sheets add-on. Open the sidebar, map your columns once, and you can generate print-ready barcode labels (Code 128 or QR) for any row. Six label templates cover the most common thermal printers — Brother, Dymo, Munbyn, Phomemo — plus generic shipping and price-tag sizes. Batch printing generates a single PDF for every row matching a status filter.

The other half is a [PWA scanner](https://sheetlabel.app/) that runs entirely in the browser — no app install. Point your phone camera at a barcode, and it writes directly back to the sheet via the Google Sheets API. Check-in, check-out, and lookup workflows are built in. Scans queue offline and sync automatically when the connection comes back.

## A few things I'm proud of

**Smart column detection.** You don't need to name your columns exactly right. Fuzzy matching picks up SKU, Name, Quantity, Status, Location, and Timestamp automatically — and warns you if they've drifted after a save.

**Per-tab config.** Each sheet tab stores its own column mapping, so one spreadsheet can run multiple independent inventories.

**Security first.** Labels and barcodes are generated entirely client-side (jsPDF + JsBarcode). License checks go through a Cloudflare Worker with KV caching — the flow is fail-closed, so errors never accidentally grant access. SRI integrity hashes, constant-time comparisons, HMAC webhook verification, and per-user rate limiting round things out.

## Stack

Google Apps Script on the server side, vanilla JS in the sidebar and scanner, Cloudflare Workers for the license proxy, Jest for tests. No framework — just the platform.

---

[sheetlabel.app](https://sheetlabel.app/)
    `
  }
];

