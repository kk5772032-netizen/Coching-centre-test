/**
 * ============================================================================
 *  LEAD CAPTURE — Google Apps Script backend
 * ============================================================================
 *  Writes every website enquiry into a Google Sheet.
 *
 *  WHY THIS EXISTS
 *  The enquiry form opens WhatsApp with the student's details pre-filled. If
 *  they never press send — tab closed, WhatsApp not installed, second thoughts
 *  — the institute never learns that person existed. This logs the enquiry the
 *  moment the form is submitted, before WhatsApp is even opened, so no lead is
 *  ever lost.
 *
 *  There is no server and no monthly cost. Google runs this for free.
 * ============================================================================
 *
 *  SETUP (about 10 minutes, done once, by whoever owns the institute's Google
 *  account — the sheet must live in the client's Drive, not the developer's)
 *
 *  1.  Go to https://sheets.new and create a blank spreadsheet.
 *      Name it something like "Shikhar Academy — Website Enquiries".
 *
 *  2.  In that sheet: Extensions > Apps Script. Delete whatever is in the
 *      editor and paste this entire file in. Click the save icon.
 *
 *  3.  Click "Deploy" > "New deployment".
 *      - Click the gear next to "Select type" and choose "Web app"
 *      - Description:      Website enquiry capture
 *      - Execute as:       Me
 *      - Who has access:   Anyone            <-- must be "Anyone", not
 *                                                "Anyone with Google account"
 *      - Click Deploy.
 *
 *  4.  Google will ask you to authorise it. Click "Review permissions",
 *      pick the account, then "Advanced" > "Go to (project name) (unsafe)"
 *      > "Allow". That warning is normal for your own scripts.
 *
 *  5.  Copy the "Web app URL". It looks like:
 *          https://script.google.com/macros/s/AKfycb.../exec
 *
 *  6.  Paste it into index.html, in the CONFIG block, as:
 *          leadEndpoint: "https://script.google.com/macros/s/AKfycb.../exec",
 *
 *      (For the Astro version the same value goes in
 *       astro-site/src/site.config.ts as `leadEndpoint`.)
 *
 *  7.  Submit a test enquiry on the website and confirm a row appears.
 *
 *  IF YOU EVER EDIT THIS SCRIPT: you must click Deploy > "Manage deployments"
 *  > pencil icon > Version: "New version" > Deploy. Simply saving does NOT
 *  update the live web app.
 * ============================================================================
 */

/** Columns written to the sheet, in order. */
var HEADERS = [
  'Timestamp',
  'Name',
  'Mobile',
  'Exam',
  'Current status',
  'Preferred timing',
  'Batch',
  'Message',
  'Source page',
  'Reached WhatsApp?'
];

/** Set to an email address to get notified on every enquiry. Leave '' for none. */
var NOTIFY_EMAIL = '';

function doPost(e) {
  try {
    var data = parseBody(e);
    var sheet = getSheet();

    sheet.appendRow([
      new Date(),
      data.name || '',
      // Leading apostrophe stops Sheets turning a 10-digit number into 9.87123E+9
      data.mobile ? "'" + data.mobile : '',
      data.exam || '',
      data.status || '',
      data.timing || '',
      data.course || '',
      data.message || '',
      data.page || '',
      data.opened === 'true' ? 'Yes' : 'Unknown'
    ]);

    if (NOTIFY_EMAIL) notify(data);
    return json({ ok: true });
  } catch (err) {
    // Never fail loudly — the website must not break because logging broke.
    console.error(err);
    return json({ ok: false, error: String(err) });
  }
}

/** Lets you open the web app URL in a browser to check it is alive. */
function doGet() {
  return json({ ok: true, service: 'lead-capture', headers: HEADERS });
}

/**
 * The website sends form-urlencoded data (via navigator.sendBeacon) because
 * that avoids a CORS preflight. Some clients send JSON instead, so accept both.
 */
function parseBody(e) {
  if (e && e.parameter && e.parameter.name) return e.parameter;
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (ignored) {
      var out = {};
      e.postData.contents.split('&').forEach(function (pair) {
        var kv = pair.split('=');
        out[decodeURIComponent(kv[0])] = decodeURIComponent((kv[1] || '').replace(/\+/g, ' '));
      });
      return out;
    }
  }
  return {};
}

function getSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Enquiries');
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Enquiries');
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function notify(data) {
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'New website enquiry: ' + (data.name || 'unknown') + ' (' + (data.exam || '-') + ')',
    body: [
      'Name: ' + (data.name || '-'),
      'Mobile: ' + (data.mobile || '-'),
      'Exam: ' + (data.exam || '-'),
      'Currently: ' + (data.status || '-'),
      'Preferred timing: ' + (data.timing || '-'),
      data.course ? 'Batch: ' + data.course : '',
      data.message ? 'Message: ' + data.message : '',
      '',
      'Logged from ' + (data.page || 'the website') + '.'
    ].filter(String).join('\n')
  });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
