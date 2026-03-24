var posts = [
  {
    title: 'SheetLabel — inventory tracking and label printing inside Google Sheets',
    date: 'March 14, 2026',
    body: `
Most inventory tools want you to leave your spreadsheet. SheetLabel doesn't. It turns any Google Sheets spreadsheet into a barcode inventory system — scan with your phone, print labels, track stock — without installing anything beyond a sidebar.

## The problem

Every small inventory setup I've seen starts with a spreadsheet. Then someone decides they need barcodes, or a scanner, or real-time stock updates, and suddenly they're evaluating warehouse management software that costs more than the inventory itself. The spreadsheet was fine. It just needed a few superpowers.

## How it works

Install the add-on, open the sidebar. SheetLabel auto-detects your columns — SKU, Name, Quantity, Status, Location — using fuzzy matching. Or click Quick Setup to generate a ready-to-use sheet in one click.

From there, three things:

**Scan.** Open a link on your phone — iPhone or Android, no app install. Point the camera at any barcode (QR, Code 128, Code 39, EAN-13, EAN-8, UPC-A, UPC-E) and the data writes directly to your sheet. Check-in, check-out, lookup. Scans queue offline and sync the moment you reconnect. Multiple people can scan the same sheet simultaneously.

**Print.** Generate barcode labels from any row — one at a time or in bulk. Six built-in templates for Brother QL-800, Dymo LabelWriter, Munbyn 403B, Phomemo M220, plus shipping (4×6 in) and price tag (2×1 in). Labels export as high-resolution PDF with per-printer offset calibration. Works with anything that can print a PDF.

**Track.** Every scan updates quantity, status, and timestamp in real time. Per-tab configuration means one spreadsheet can run multiple independent inventories across tabs.

## What I got right

The phone scanner connects in seconds — scan a QR code on your desktop and the phone opens already linked to the right sheet. No account creation, no pairing screens. Full local scan history so you can review every action later.

Smart column detection means existing spreadsheets just work. You don't need to rename anything or restructure your data. The add-on adapts to what's already there and warns you if columns drift after a save.

Privacy was non-negotiable. SheetLabel only accesses the current spreadsheet — never your Drive, contacts, or other files. Your inventory data stays entirely in your own sheet. Labels and barcodes are generated client-side. We store your email for license management and that's it.

## Stack

Google Apps Script, vanilla JS, Cloudflare Workers for the license proxy, Jest for tests. No framework.

---

[sheetlabel.app](https://sheetlabel.app/)
    `
  }
];

